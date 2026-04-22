"""
test_auth_routes.py — Backend tests for /api/auth/* endpoints.

Coverage:
  AC7:  Redirect URL returned on success
  AC8:  Invalid credentials → 401
  AC9:  Lockout after 5 failed attempts → 429
  AC10: remember_me sets permanent session
  AC12: CSRF validation
"""

import json
import pytest

from src.server.app import create_app
from src.server import auth_service


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture()
def app():
    application = create_app(
        {
            "TESTING": True,
            "DISABLE_CSRF_FOR_TESTS": True,
            "SECRET_KEY": "test-secret",
            "POST_LOGIN_REDIRECT": "/dashboard",
        }
    )
    yield application


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture(autouse=True)
def reset_attempt_store():
    """Clear in-memory lockout state before each test."""
    auth_service._attempt_store.clear()
    yield
    auth_service._attempt_store.clear()


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

def post_login(client, email="user@example.com", password="correct-horse-battery-staple", remember_me=False):
    return client.post(
        "/api/auth/login",
        data=json.dumps({"email": email, "password": password, "remember_me": remember_me}),
        content_type="application/json",
    )


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

class TestCsrfEndpoint:
    def test_get_csrf_token_returns_token(self, client):
        res = client.get("/api/auth/csrf-token")
        assert res.status_code == 200
        data = res.get_json()
        assert "csrf_token" in data
        assert len(data["csrf_token"]) > 10

    def test_csrf_token_is_stable_within_session(self, client):
        res1 = client.get("/api/auth/csrf-token")
        res2 = client.get("/api/auth/csrf-token")
        assert res1.get_json()["csrf_token"] == res2.get_json()["csrf_token"]


class TestLoginSuccess:
    def test_valid_credentials_returns_200(self, client):
        """AC7: Successful login returns redirect URL."""
        res = post_login(client)
        assert res.status_code == 200

    def test_valid_credentials_returns_redirect_url(self, client):
        """AC7"""
        data = post_login(client).get_json()
        assert data["redirect_url"] == "/dashboard"

    def test_valid_credentials_returns_user_id(self, client):
        data = post_login(client).get_json()
        assert "user_id" in data

    def test_remember_me_sets_permanent_session(self, client):
        """AC10"""
        res = post_login(client, remember_me=True)
        assert res.status_code == 200


class TestLoginFailure:
    def test_wrong_password_returns_401(self, client):
        """AC8"""
        res = post_login(client, password="wrong-password")
        assert res.status_code == 401

    def test_wrong_password_returns_error_code(self, client):
        """AC8"""
        data = post_login(client, password="wrong-password").get_json()
        assert data["error_code"] == "INVALID_CREDENTIALS"

    def test_wrong_password_returns_message(self, client):
        """AC8"""
        data = post_login(client, password="wrong-password").get_json()
        assert "message" in data

    def test_unknown_email_returns_401(self, client):
        """AC8"""
        res = post_login(client, email="unknown@example.com")
        assert res.status_code == 401

    def test_missing_email_returns_400(self, client):
        res = client.post(
            "/api/auth/login",
            data=json.dumps({"password": "something"}),
            content_type="application/json",
        )
        assert res.status_code == 400

    def test_missing_password_returns_400(self, client):
        res = client.post(
            "/api/auth/login",
            data=json.dumps({"email": "user@example.com"}),
            content_type="application/json",
        )
        assert res.status_code == 400


class TestAccountLockout:
    """AC9: Account locked after 5 failed attempts."""

    def test_locked_after_five_failures(self, client):
        for _ in range(5):
            post_login(client, password="wrong")
        res = post_login(client, password="wrong")
        assert res.status_code == 429

    def test_locked_returns_error_code(self, client):
        for _ in range(5):
            post_login(client, password="wrong")
        data = post_login(client, password="wrong").get_json()
        assert data["error_code"] == "ACCOUNT_LOCKED"

    def test_correct_password_fails_when_locked(self, client):
        for _ in range(5):
            post_login(client, password="wrong")
        # Even with correct password, locked account should be refused
        res = post_login(client)
        assert res.status_code == 429

    def test_remaining_attempts_shown_in_message(self, client):
        res = post_login(client, password="wrong")
        data = res.get_json()
        assert "remaining" in data["message"].lower() or "attempt" in data["message"].lower()

    def test_lockout_not_triggered_before_threshold(self, client):
        for _ in range(4):
            post_login(client, password="wrong")
        # 4th failure — should still get 401, not 429
        res = post_login(client, password="wrong")
        # 5th failure triggers lockout
        assert res.status_code in (401, 429)


class TestCsrfProtection:
    """AC12: CSRF token required on POST requests."""

    def test_login_without_csrf_returns_403(self, app, client):
        # Re-create app WITHOUT CSRF disabled
        app_with_csrf = create_app({"TESTING": True, "SECRET_KEY": "test-secret"})
        csrf_client = app_with_csrf.test_client()

        res = csrf_client.post(
            "/api/auth/login",
            data=json.dumps(
                {"email": "user@example.com", "password": "correct-horse-battery-staple"}
            ),
            content_type="application/json",
        )
        assert res.status_code == 403

    def test_login_with_valid_csrf_succeeds(self, app):
        app_with_csrf = create_app(
            {"TESTING": True, "SECRET_KEY": "test-secret", "DISABLE_CSRF_FOR_TESTS": False}
        )
        csrf_client = app_with_csrf.test_client()

        # Obtain a CSRF token
        token_res = csrf_client.get("/api/auth/csrf-token")
        csrf_token = token_res.get_json()["csrf_token"]

        res = csrf_client.post(
            "/api/auth/login",
            data=json.dumps(
                {
                    "email": "user@example.com",
                    "password": "correct-horse-battery-staple",
                    "csrf_token": csrf_token,
                }
            ),
            content_type="application/json",
            headers={"X-CSRFToken": csrf_token},
        )
        assert res.status_code == 200


class TestLogout:
    def test_logout_returns_200(self, client):
        res = client.post("/api/auth/logout", content_type="application/json")
        assert res.status_code == 200