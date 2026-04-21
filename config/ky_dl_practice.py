"""
KY-DL practice/sandbox environment configuration.

All sensitive values (API tokens, secrets) are read from environment
variables.  No credentials or mock data are hard-coded here.

Environment variable reference
-------------------------------
APP_ENV                     : Current environment name.
                              Allowed practice-mode values: "development", "dev", "staging", "test".
                              Any value of "production" or "prod" disables practice mode.
KY_DL_PRACTICE_API_TOKEN    : (Optional) Token used to authenticate against an
                              external KY-DL sandbox API, if one is configured.
KY_DL_PRACTICE_BASE_URL     : (Optional) Base URL for an external sandbox API.
KY_DL_PRACTICE_MOCK_DOC_ID  : (Optional) Override the default mock document ID.
"""
from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field
from typing import Any, Optional

from identity.mock_data import DEFAULT_MOCK_KY_DL

logger = logging.getLogger(__name__)

# Environments in which practice mode is permitted
_PRACTICE_ALLOWED_ENVS: frozenset[str] = frozenset(
    {"development", "dev", "staging", "test", "qa"}
)

# Environments that are explicitly production (practice mode always blocked)
_PRODUCTION_ENVS: frozenset[str] = frozenset({"production", "prod"})


@dataclass
class KYDLPracticeConfig:
    """Holds runtime practice-mode configuration for KY-DL."""

    environment: str
    is_practice_allowed: bool
    api_token: Optional[str]          # from env var — never hard-coded
    base_url: Optional[str]           # from env var — never hard-coded
    mock_document: dict[str, Any]     # synthetic data only
    extra: dict[str, Any] = field(default_factory=dict)


def get_practice_config() -> KYDLPracticeConfig:
    """
    Build and return the KY-DL practice configuration for the current runtime
    environment.

    Reads exclusively from environment variables; raises no exceptions on
    missing optional vars.
    """
    env = os.environ.get("APP_ENV", "development").lower().strip()

    is_allowed = _is_practice_allowed(env)

    # Optional external sandbox API credentials
    api_token: Optional[str] = os.environ.get("KY_DL_PRACTICE_API_TOKEN") or None
    base_url: Optional[str] = os.environ.get("KY_DL_PRACTICE_BASE_URL") or None

    # Allow overriding the mock document ID from env (for CI parameterisation)
    mock_doc_id_override: Optional[str] = (
        os.environ.get("KY_DL_PRACTICE_MOCK_DOC_ID") or None
    )

    mock_document = _build_mock_document(mock_doc_id_override)

    if not is_allowed:
        logger.debug(
            "KY-DL practice mode is DISABLED for environment %r.", env
        )
    else:
        logger.debug(
            "KY-DL practice mode is ENABLED for environment %r.", env
        )

    return KYDLPracticeConfig(
        environment=env,
        is_practice_allowed=is_allowed,
        api_token=api_token,
        base_url=base_url,
        mock_document=mock_document,
    )


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _is_practice_allowed(env: str) -> bool:
    """Return True only for explicitly non-production environments."""
    if env in _PRODUCTION_ENVS:
        return False
    if env in _PRACTICE_ALLOWED_ENVS:
        return True
    # Unknown environments: default to *blocked* for safety
    logger.warning(
        "Unknown APP_ENV value %r — defaulting to practice mode DISABLED "
        "for safety. Set APP_ENV to a known non-production value to enable it.",
        env,
    )
    return False


def _build_mock_document(doc_id_override: Optional[str]) -> dict[str, Any]:
    """Return the appropriate mock document dict."""
    if doc_id_override:
        from identity.mock_data import MOCK_KY_DL_BY_ID  # local import avoids circularity

        doc = MOCK_KY_DL_BY_ID.get(doc_id_override)
        if doc is None:
            logger.warning(
                "KY_DL_PRACTICE_MOCK_DOC_ID=%r does not match any known mock "
                "document; falling back to default.",
                doc_id_override,
            )
            return dict(DEFAULT_MOCK_KY_DL)
        return dict(doc)
    return dict(DEFAULT_MOCK_KY_DL)