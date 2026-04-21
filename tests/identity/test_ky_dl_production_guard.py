"""
Tests that practice mode is blocked in production environments.

Expected outcome (acceptance criterion):
  'Given a production environment, when a request uses the practice test
  configuration, then the system rejects or ignores it and logs a warning.'
"""
from __future__ import annotations

import logging
import os

import pytest

os.environ.setdefault("APP_ENV", "test")

from config.ky_dl_practice import KYDLPracticeConfig, _is_practice_allowed
from identity.mock_data import DEFAULT_MOCK_KY_DL
from identity.ky_dl_validator import KYDriversLicenseValidator


def _production_validator() -> KYDriversLicenseValidator:
    cfg = KYDLPracticeConfig(
        environment="production",
        is_practice_allowed=False,
        api_token=None,
        base_url=None,
        mock_document=dict(DEFAULT_MOCK_KY_DL),
    )
    return KYDriversLicenseValidator(practice_config=cfg)


class TestProductionGuard:
    """Practice mode must be rejected in production."""

    def test_practice_request_rejected_in_production(self):
        """
        Expected outcome: is_valid=False when practice mode is requested
        in a production environment.
        """
        validator = _production_validator()
        result = validator.validate({"is_practice": True})
        assert result.is_valid is False
        assert result.is_practice_run is True

    def test_production_rejection_includes_environment_in_error(self):
        """Expected outcome: error message references the current environment."""
        validator = _production_validator()
        result = validator.validate({"is_practice": True})
        assert any("production" in e.lower() for e in result.errors)

    def test_production_rejection_logs_warning(self, caplog):
        """Expected outcome: a WARNING-level log entry is emitted on rejection."""
        validator = _production_validator()
        with caplog.at_level(logging.WARNING, logger="identity.ky_dl_validator"):
            validator.validate({"is_practice": True})
        assert any("practice mode" in r.message.lower() for r in caplog.records)

    @pytest.mark.parametrize("env", ["production", "prod"])
    def test_is_practice_allowed_returns_false_for_production_envs(self, env):
        """Expected outcome: helper returns False for all production env names."""
        assert _is_practice_allowed(env) is False

    @pytest.mark.parametrize("env", ["development", "dev", "staging", "test", "qa"])
    def test_is_practice_allowed_returns_true_for_non_production_envs(self, env):
        """Expected outcome: helper returns True for recognised non-prod envs."""
        assert _is_practice_allowed(env) is True

    def test_unknown_env_defaults_to_blocked(self):
        """Expected outcome: unknown APP_ENV values are treated as production (blocked)."""
        assert _is_practice_allowed("some-unknown-env") is False

    def test_real_document_still_processed_in_production(self):
        """
        Expected outcome: non-practice requests are unaffected by production
        guard and can still be validated.
        """
        validator = _production_validator()
        data = {
            "document_id": "PROD-REAL-001",
            "first_name": "Carol",
            "last_name": "Williams",
            "date_of_birth": "1982-08-20",
            "license_number": "W12345678",
            "expiration_date": "2029-08-20",
            "address": "789 Elm St",
            "city": "Louisville",
            "state": "KY",
            "zip_code": "40207",
        }
        result = validator.validate(data)
        assert result.is_valid is True
        assert result.is_practice_run is False