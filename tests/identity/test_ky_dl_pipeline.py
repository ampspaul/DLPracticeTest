"""
Integration tests: KY-DL validation via the IdentityVerificationPipeline.

Verifies that the pipeline correctly routes KY-DL documents (including
practice mode) to the validator.
"""
from __future__ import annotations

import os

os.environ.setdefault("APP_ENV", "test")

from config.ky_dl_practice import KYDLPracticeConfig
from identity.mock_data import DEFAULT_MOCK_KY_DL
from identity.ky_dl_validator import KYDriversLicenseValidator
from identity.pipeline import IdentityVerificationPipeline, DOCUMENT_TYPE_KY_DL


def _test_pipeline(env: str = "test", allowed: bool = True) -> IdentityVerificationPipeline:
    cfg = KYDLPracticeConfig(
        environment=env,
        is_practice_allowed=allowed,
        api_token=None,
        base_url=None,
        mock_document=dict(DEFAULT_MOCK_KY_DL),
    )
    validator = KYDriversLicenseValidator(practice_config=cfg)
    return IdentityVerificationPipeline(ky_dl_validator=validator)


class TestPipelineKYDL:
    """Pipeline correctly handles KY-DL documents."""

    def test_pipeline_processes_real_ky_dl(self):
        """Expected outcome: real KY-DL document passes through pipeline successfully."""
        pipeline = _test_pipeline()
        data = {
            "document_id": "PIPE-001",
            "first_name": "Diana",
            "last_name": "Prince",
            "date_of_birth": "1983-03-17",
            "license_number": "P12345678",
            "expiration_date": "2028-03-17",
            "address": "101 Paradise Island Dr",
            "city": "Louisville",
            "state": "KY",
            "zip_code": "40203",
        }
        result = pipeline.verify(DOCUMENT_TYPE_KY_DL, data)
        assert result.is_valid is True
        assert result.is_practice_run is False

    def test_pipeline_processes_practice_ky_dl_in_dev(self):
        """Expected outcome: practice KY-DL document passes through pipeline in dev."""
        pipeline = _test_pipeline(env="dev", allowed=True)
        result = pipeline.verify(DOCUMENT_TYPE_KY_DL, {"is_practice": True})
        assert result.is_valid is True
        assert result.is_practice_run is True

    def test_pipeline_blocks_practice_ky_dl_in_production(self):
        """Expected outcome: practice KY-DL is rejected when pipeline is in production mode."""
        pipeline = _test_pipeline(env="production", allowed=False)
        result = pipeline.verify(DOCUMENT_TYPE_KY_DL, {"is_practice": True})
        assert result.is_valid is False

    def test_pipeline_returns_error_for_unknown_document_type(self):
        """Expected outcome: unsupported document types return is_valid=False."""
        pipeline = _test_pipeline()
        result = pipeline.verify("UNKNOWN_DOC_TYPE", {"some": "data"})
        assert result.is_valid is False
        assert any("unsupported" in e.lower() for e in result.errors)

    def test_pipeline_case_insensitive_document_type(self):
        """Expected outcome: document type matching is case-insensitive."""
        pipeline = _test_pipeline()
        data = {
            "document_id": "PIPE-002",
            "first_name": "Eve",
            "last_name": "Adams",
            "date_of_birth": "1991-05-05",
            "license_number": "E12345678",
            "expiration_date": "2029-05-05",
            "address": "202 Garden St",
            "city": "Lexington",
            "state": "KY",
            "zip_code": "40504",
        }
        result = pipeline.verify("ky_drivers_license", data)
        assert result.is_valid is True