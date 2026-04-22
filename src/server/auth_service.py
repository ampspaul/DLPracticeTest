"""
auth_service.py — Authentication business logic.

Covers:
  AC8:  Verify credentials
  AC9:  Lockout after 5 failed attempts
  AC10: Remember-me session duration
  AC12: CSRF token generation
"""

import hashlib
import hmac
import os
import secrets
import time
from dataclasses import dataclass, field
from typing import Optional

import bcrypt

# ---------------------------------------------------------------------------
# Configuration (override via environment variables in production)
# ---------------------------------------------------------------------------
MAX_FAILED_ATTEMPTS: int = 5
LOCKOUT_DURATION_SECONDS: int = 15 * 60  # 15 minutes
SESSION_DURATION_SHORT: int = 60 * 60  # 1 hour
SESSION_DURATION_LONG: int = 30 * 24 * 60 * 60  # 30 days (AC10)


@dataclass
class LoginAttemptRecord:
    failed_count: int = 0
    locked_until: Optional[float] = None
    last_attempt_at: Optional[float] = None


# In-memory store for demo purposes.
# Replace with Redis / DB in production.
_attempt_store: dict[str, LoginAttemptRecord] = {}


def _get_attempt_record(email: str) -> LoginAttemptRecord:
    key = email.lower()
    if key not in _attempt_store:
        _attempt_store[key] = LoginAttemptRecord()
    return _attempt_store[key]


def is_account_locked(email: str) -> bool:
    """AC9: Return True if the account is currently locked."""
    record = _get_attempt_record(email)
    if record.locked_until is None:
        return False
    if time.time() < record.locked_until:
        return True
    # Lock has expired — reset
    record.failed_count = 0
    record.locked_until = None
    return False


def record_failed_attempt(email: str) -> int:
    """Increment failed-attempt counter and lock account if threshold reached.

    Returns the current failed-attempt count.
    """
    record = _get_attempt_record(email)
    record.failed_count += 1
    record.last_attempt_at = time.time()
    if record.failed_count >= MAX_FAILED_ATTEMPTS:
        record.locked_until = time.time() + LOCKOUT_DURATION_SECONDS
    return record.failed_count


def reset_failed_attempts(email: str) -> None:
    """Reset counter on successful login."""
    key = email.lower()
    _attempt_store.pop(key, None)


def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    """AC8: Verify a plaintext password against a bcrypt hash."""
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password)
    except Exception:
        return False


def hash_password(plain_password: str) -> bytes:
    """Return a bcrypt hash for a given plaintext password."""
    return bcrypt.hashpw(plain_password.encode("utf-8"), bcrypt.gensalt(rounds=12))


def generate_session_token() -> str:
    """Generate a cryptographically-secure session token."""
    return secrets.token_urlsafe(32)


def generate_csrf_token() -> str:
    """AC12: Generate a CSRF token."""
    return secrets.token_urlsafe(32)


def session_duration(remember_me: bool) -> int:
    """AC10: Return session duration in seconds based on remember-me flag."""
    return SESSION_DURATION_LONG if remember_me else SESSION_DURATION_SHORT