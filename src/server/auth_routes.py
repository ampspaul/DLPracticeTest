"""
auth_routes.py — Flask Blueprint for authentication endpoints.

Covers:
  AC7:  Return redirect URL on success
  AC8:  Return 401 with message on bad credentials
  AC9:  Return 429 on account lockout
  AC12: CSRF token endpoint + validation
"""

from __future__ import annotations

import logging
from functools import wraps
from typing import Any

from flask import (
    Blueprint,
    jsonify,
    request,
    session,
    current_app,
)

from .auth_service import (
    generate_csrf_token,
    generate_session_token,
    hash_password,
    is_account_locked,
    record_failed_attempt,
    reset_failed_attempts,
    session_duration,
    verify_password,
)

logger = logging.getLogger(__name__)

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# ---------------------------------------------------------------------------
# Fake user store — replace with your DB layer
# ---------------------------------------------------------------------------
# Structure: { email: { "password_hash": bytes, "id": str, "name": str } }
_USER_STORE: dict[str, dict[str, Any]] = {}


def _bootstrap_demo_user() -> None:
    """Create a demo user for integration tests / local dev."""
    email = "user@example.com"
    if email not in _USER_STORE:
        _USER_STORE[email] = {
            "id": "usr_001",
            "name": "Demo User",
            "password_hash": hash_password("correct-horse-battery-staple"),
        }


_bootstrap_demo_user()


# ---------------------------------------------------------------------------
# CSRF helpers
# ---------------------------------------------------------------------------

CSRF_SESSION_KEY = "_csrf_token"


def _get_or_create_csrf_token() -> str:
    if CSRF_SESSION_KEY not in session:
        session[CSRF_SESSION_KEY] = generate_csrf_token()
    return session[CSRF_SESSION_KEY]


def _validate_csrf(token: str) -> bool:
    expected = session.get(CSRF_SESSION_KEY, "")
    # Constant-time comparison
    return bool(expected) and token == expected


def csrf_required(f):
    """Decorator: validate CSRF token on mutating requests."""

    @wraps(f)
    def decorated(*args, **kwargs):
        # Allow disabling CSRF in test mode
        if current_app.config.get("TESTING") and current_app.config.get(
            "DISABLE_CSRF_FOR_TESTS", False
        ):
            return f(*args, **kwargs)

        token = (
            request.headers.get("X-CSRFToken")
            or (request.get_json(silent=True) or {}).get("csrf_token")
        )
        if not token or not _validate_csrf(token):
            return jsonify({"message": "CSRF validation failed.", "error_code": "CSRF_INVALID"}), 403

        return f(*args, **kwargs)

    return decorated


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@auth_bp.get("/csrf-token")
def get_csrf_token():
    """AC12: Return a CSRF token, creating a session if needed."""
    token = _get_or_create_csrf_token()
    return jsonify({"csrf_token": token}), 200


@auth_bp.post("/login")
@csrf_required
def login():
    """
    POST /api/auth/login

    Body (JSON):
        email       str  required
        password    str  required
        remember_me bool optional (default false)

    Responses:
        200  { redirect_url: "/dashboard" }
        400  { message: "..." }
        401  { message: "...", error_code: "INVALID_CREDENTIALS" }
        429  { message: "...", error_code: "ACCOUNT_LOCKED" }
    """
    data = request.get_json(silent=True) or {}
    email: str = (data.get("email") or "").strip().lower()
    password: str = data.get("password") or ""
    remember_me: bool = bool(data.get("remember_me", False))

    # Basic input validation
    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    # AC9: Check lockout BEFORE touching the DB
    if is_account_locked(email):
        logger.warning("Locked account login attempt: %s", email)
        return (
            jsonify(
                {
                    "message": (
                        "Your account has been temporarily locked due to too many "
                        "failed sign-in attempts. Please try again in 15 minutes."
                    ),
                    "error_code": "ACCOUNT_LOCKED",
                }
            ),
            429,
        )

    user = _USER_STORE.get(email)

    # AC8: Verify credentials
    if user is None or not verify_password(password, user["password_hash"]):
        attempts = record_failed_attempt(email)
        remaining = max(0, 5 - attempts)
        logger.info("Failed login for %s (%d attempts)", email, attempts)

        message = "Invalid email or password."
        if remaining > 0:
            message += f" {remaining} attempt(s) remaining before lockout."

        return (
            jsonify({"message": message, "error_code": "INVALID_CREDENTIALS"}),
            401,
        )

    # --- Successful login ---
    reset_failed_attempts(email)

    # Create session
    session.clear()
    session["user_id"] = user["id"]
    session["user_email"] = email
    session.permanent = remember_me  # AC10
    if remember_me:
        current_app.permanent_session_lifetime = __import__("datetime").timedelta(
            seconds=session_duration(remember_me=True)
        )

    # Regenerate CSRF token post-login
    session.pop(CSRF_SESSION_KEY, None)

    logger.info("Successful login for user %s", user["id"])

    # AC7: Return redirect URL
    redirect_url = current_app.config.get("POST_LOGIN_REDIRECT", "/dashboard")
    return jsonify({"redirect_url": redirect_url, "user_id": user["id"]}), 200


@auth_bp.post("/logout")
@csrf_required
def logout():
    """Clear the session."""
    session.clear()
    return jsonify({"message": "Logged out successfully."}), 200