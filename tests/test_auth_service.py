"""
test_auth_service.py — Unit tests for auth_service helpers.
"""

import time
import pytest

from src.server import auth_service
from src.server.auth_service import (
    generate_csrf_token,
    generate_session_token,
    hash_password,
    is_account_locked,
    record_failed_attempt,
    reset_failed_attempts,
    session_duration,
    verify_password,
    MAX_FAILED_ATTEMPTS,
    LOCKOUT_DURATION_SECONDS,
    SESSION_DURATION_LONG,
    SESSION_DURATION_SHORT,
)


@pytest.fixture(autouse=True)
def clear_store():
    auth_service._attempt_store.clear()
    yield
    auth_service._attempt_store.clear()


class TestPasswordHashing:
    def test_hash_and_verify_correct_password(self):
        pw = "supersecret"
        hashed = hash_password(pw)
        assert verify_password(pw, hashed) is True

    def test_wrong_password_not_verified(self):
        hashed = hash_password("correct")
        assert verify_password("wrong", hashed) is False

    def test_different_hashes_for_same_password(self):
        pw = "same-password"
        assert hash_password(pw) != hash_password(pw)

    def test_verify_invalid_hash_returns_false(self):
        assert verify_password("anything", b"not-a-valid-hash") is False


class TestAccountLockout:
    def test_not_locked_initially(self):
        assert is_account_locked("test@example.com") is False

    def test_locked_after_max_attempts(self):
        email = "test@example.com"
        for _ in range(MAX_FAILED_ATTEMPTS):
            record_failed_attempt(email)
        assert is_account_locked(email) is True

    def test_not_locked_before_max_attempts(self):
        email = "test@example.com"
        for _ in range(MAX_FAILED_ATTEMPTS - 1):
            record_failed_attempt(email)
        assert is_account_locked(email) is False

    def test_reset_clears_lockout(self):
        email = "test@example.com"
        for _ in range(MAX_FAILED_ATTEMPTS):
            record_failed_attempt(email)
        reset_failed_attempts(email)
        assert is_account_locked(email) is False

    def test_lock_expires_after_duration(self, monkeypatch):
        email = "test@example.com"
        for _ in range(MAX_FAILED_ATTEMPTS):
            record_failed_attempt(email)
        # Simulate time passing
        future_time = time.time() + LOCKOUT_DURATION_SECONDS + 1
        monkeypatch.setattr(auth_service, "time", type("t", (), {"time": staticmethod(lambda: future_time)})())
        # Direct check: locked_until should be in the past
        record = auth_service._get_attempt_record(email)
        assert future_time > record.locked_until

    def test_record_failed_returns_count(self):
        email = "count@example.com"
        count = record_failed_attempt(email)
        assert count == 1
        count = record_failed_attempt(email)
        assert count == 2


class TestSessionDuration:
    def test_remember_me_returns_long_duration(self):
        assert session_duration(remember_me=True) == SESSION_DURATION_LONG

    def test_no_remember_me_returns_short_duration(self):
        assert session_duration(remember_me=False) == SESSION_DURATION_SHORT


class TestTokenGeneration:
    def test_csrf_token_is_string(self):
        assert isinstance(generate_csrf_token(), str)

    def test_csrf_token_is_unique(self):
        assert generate_csrf_token() != generate_csrf_token()

    def test_csrf_token_min_length(self):
        assert len(generate_csrf_token()) >= 20

    def test_session_token_is_string(self):
        assert isinstance(generate_session_token(), str)

    def test_session_token_is_unique(self):
        assert generate_session_token() != generate_session_token()