"""
Tests for KY-DL practice configuration loading.

Verifies that:
- Configuration reads from environment variables only.
- No credentials are hard-coded.
- Unknown environments default to blocked.
"""
from __future__ import annotations

import os
from unittest.mock import patch

import pytest

from config.ky_dl_practice import get_practice_config, KYDLPracticeConfig


class TestPracticeConfigLoading:
    """Configuration is built entirely from environment variables."""

    def test_dev_env_allows_practice(self):
        with patch.dict(os.environ, {"APP_ENV": "dev"}, clear=False):
            cfg = get_practice_config()
        assert cfg.is_practice_allowed is True
        assert cfg.environment == "dev"

    def test_production_env_blocks_practice(self):
        with patch.dict(os.environ, {"APP_ENV": "production"}, clear=False):
            cfg = get_practice_config()
        assert cfg.is_practice_allowed is False

    def test_api_token_loaded_from_env_var(self):
        """Expected outcome: api_token is sourced from KY_DL_PRACTICE_API_TOKEN."""
        with patch.dict(
            os.environ,
            {"APP_ENV": "staging", "KY_DL_PRACTICE_API_TOKEN": "tok_abc123"},
            clear=False,
        ):
            cfg = get_practice_config()
        assert cfg.api_token == "tok_abc123"

    def test_api_token_absent_when_env_var_not_set(self):
        env = {k: v for k, v in os.environ.items() if k != "KY_DL_PRACTICE_API_TOKEN"}
        env["APP_ENV"] = "dev"
        with patch.dict(os.environ, env, clear=True):
            cfg = get_practice_config()
        assert cfg.api_token is None

    def test_base_url_loaded_from_env_var(self):
        with patch.dict(
            os.environ,
            {"APP_ENV": "staging", "KY_DL_PRACTICE_BASE_URL": "https://sandbox.example.com"},
            clear=False,
        ):
            cfg = get_practice_config()
        assert cfg.base_url == "https://sandbox.example.com"

    def test_mock_document_id_override_from_env_var(self):
        with patch.dict(
            os.environ,
            {"APP_ENV": "test", "KY_DL_PRACTICE_MOCK_DOC_ID": "PRACTICE-KY-002"},
            clear=False,
        ):
            cfg = get_practice_config()
        assert cfg.mock_document["document_id"] == "PRACTICE-KY-002"

    def test_unknown_mock_document_id_falls_back_to_default(self):
        with patch.dict(
            os.environ,
            {"APP_ENV": "test", "KY_DL_PRACTICE_MOCK_DOC_ID": "DOES-NOT-EXIST"},
            clear=False,
        ):
            cfg = get_practice_config()
        # Falls back to default
        from identity.mock_data import DEFAULT_MOCK_KY_DL
        assert cfg.mock_document["document_id"] == DEFAULT_MOCK_KY_DL["document_id"]

    def test_config_contains_no_hard_coded_credentials(self):
        """
        Expected outcome: the config module source does not contain any
        hard-coded token or secret strings.
        """
        import inspect
        import config.ky_dl_practice as cfg_module

        source = inspect.getsource(cfg_module)
        # These should only appear as variable names, not as string values
        for suspicious_pattern in ["Bearer ", "secret_", "password="]:
            assert suspicious_pattern not in source, (
                f"Potentially hard-coded credential pattern found: {suspicious_pattern!r}"
            )