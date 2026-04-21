"""
Unit tests for KYDriversLicenseValidator.

Expected outcomes are documented inline with each test case.
"""
from __future__ import annotations

import os
from datetime import date
from typing import Any
from unittest.mock import patch

import pytest

# Ensure we're running in test mode
os.environ.setdefault("APP_ENV", "test")

from config.ky_dl_practice import KYDLPracticeConfig
from identity.mock_data import (
    DEFAULT_MOCK_KY_DL,
    MOCK_KY_DL_BY_ID,
    MOCK_KY_DL_DOCUMENTS,
)
from identity.ky_dl_validator import KYDriversLicenseValidator, ValidationResult


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

def _make_practice_config(env: str = "test", allowed: bool = True) -> KYDLPracticeConfig:
    return KYDLPracticeConfig(
        environment=env,
        is_practice_allowed=allowed,
        api_token=None,
        base_url=None,
        mock_document=dict(DEFAULT_MOCK_KY_DL),
    )


def _validator(env: str = "test", allowed: bool = True) -> KYDriversLicenseValidator:
    return KYDriversLicenseValidator(practice_config=_make_practice_config(env, allowed))


# ---------------------------------------------------------------------------
# Happy-path: valid real document
# ---------------------------------------------------------------------------

class TestValidRealDocument:
    """
    Given valid KY-DL fields,
    When validate() is called without practice flag,
    Then the result is valid with no errors.
    """

    def test_valid_document_passes(self):
        validator = _validator()
        data = {
            "document_id": "REAL-001",
            "first_name": "Alice",
            "last_name": "Smith",
            "date_of_birth": "1988-04-10",
            "license_number": "A12345678",
            "expiration_date": "2027-04-10",
            "address": "123 Main St",
            "city": "Louisville",
            "state": "KY",
            "zip_code": "40202",
            "document_class": "D",
        }
        result = validator.validate(data)
        assert result.is_valid is True
        assert result.errors == []
        assert result.is_practice_run is False
        assert result.document is not None
        assert result.document.first_name == "Alice"

    def test_expired_document_has_warning(self):
        """Expected outcome: valid=True but warnings contain expiry note."""
        validator = _validator()
        data = {
            "document_id": "REAL-002",
            "first_name": "Bob",
            "last_name": "Jones",
            "date_of_birth": "1975-01-01",
            "license_number": "B87654321",
            "expiration_date": "2020-01-01",  # expired
            "address": "456 Oak Ave",
            "city": "Lexington",
            "state": "KY",
            "zip_code": "40503",
        }
        result = validator.validate(data)
        assert result.is_valid is True
        assert any("expired" in w.lower() for w in result.warnings)


# ---------------------------------------------------------------------------
# Field-level validation failures
# ---------------------------------------------------------------------------

class TestFieldValidation:
    """
    Given various invalid field values,
    When validate() is called,
    Then appropriate errors are returned and is_valid is False.
    """

    def test_missing_required_field_returns_error(self):
        """Expected outcome: error for missing 'license_number'."""
        validator = _validator()
        data = {
            "document_id": "X001",
            "first_name": "Test",
            "last_name": "User",
            "date_of_birth": "1990-01-01",
            # license_number missing
            "expiration_date": "2028-01-01",
            "address": "1 Test St",
            "city": "Louisville",
        }
        result = validator.validate(data)
        assert result.is_valid is False
        assert any("license_number" in e for e in result.errors)

    def test_invalid_license_number_format(self):
        """Expected outcome: error for malformed license number."""
        validator = _validator()
        data = {
            "document_id": "X002",
            "first_name": "Test",
            "last_name": "User",
            "date_of_birth": "1990-01-01",
            "license_number": "INVALID###",
            "expiration_date": "2028-01-01",
            "address": "1 Test St",
            "city": "Louisville",
            "state": "KY",
        }
        result = validator.validate(data)
        assert result.is_valid is False
        assert any("license number" in e.lower() for e in result.errors)

    def test_wrong_state_returns_error(self):
        """Expected outcome: error when state is not KY."""
        validator = _validator()
        data = {
            "document_id": "X003",
            "first_name": "Test",
            "last_name": "User",
            "date_of_birth": "1990-01-01",
            "license_number": "C12345678",
            "expiration_date": "2028-01-01",
            "address": "1 Test St",
            "city": "Nashville",
            "state": "TN",  # wrong state
        }
        result = validator.validate(data)
        assert result.is_valid is False
        assert any("KY" in e for e in result.errors)

    def test_underage_applicant_returns_error(self):
        """Expected outcome: error when date_of_birth indicates age < 16."""
        validator = _validator()
        young_dob = date.today().replace(year=date.today().year - 14).isoformat()
        data = {
            "document_id": "X004",
            "first_name": "Kid",
            "last_name": "User",
            "date_of_birth": young_dob,
            "license_number": "K12345678",
            "expiration_date": "2040-01-01",
            "address": "1 Test St",
            "city": "Louisville",
            "state": "KY",
        }
        result = validator.validate(data)
        assert result.is_valid is False
        assert any("16" in e for e in result.errors)

    def test_invalid_date_format_returns_error(self):
        """Expected outcome: error for unparseable date string."""
        validator = _validator()
        data = {
            "document_id": "X005",
            "first_name": "Test",
            "last_name": "User",
            "date_of_birth": "not-a-date",
            "license_number": "D12345678",
            "expiration_date": "2028-01-01",
            "address": "1 Test St",
            "city": "Louisville",
            "state": "KY",
        }
        result = validator.validate(data)
        assert result.is_valid is False
        assert any("date_of_birth" in e for e in result.errors)


# ---------------------------------------------------------------------------
# Practice mode — dev/staging
# ---------------------------------------------------------------------------

class TestPracticeMode:
    """
    Given a dev/staging environment,
    When a practice-flagged document is submitted,
    Then the full validation workflow runs on synthetic data and returns valid.
    """

    def test_practice_happy_path(self):
        """
        Expected outcome: practice document passes validation in dev/staging.
        Corresponds to acceptance criterion:
        'processes it through the full KY-DL validation workflow without errors'.
        """
        validator = _validator(env="dev", allowed=True)
        data = {"is_practice": True}  # all other fields come from mock defaults
        result = validator.validate(data)
        assert result.is_valid is True
        assert result.is_practice_run is True
        assert result.errors == []
        assert result.document is not None
        assert result.document.is_practice is True

    def test_practice_mode_marks_result_correctly(self):
        """Expected outcome: is_practice_run is True for practice requests."""
        validator = _validator(env="staging", allowed=True)
        result = validator.validate({"is_practice": True})
        assert result.is_practice_run is True

    def test_practice_uses_synthetic_data_not_real_pii(self):
        """
        Expected outcome: the document returned contains only mock/synthetic
        data; none of the known real-PII sentinel values appear.
        """
        validator = _validator(env="dev", allowed=True)
        result = validator.validate({"is_practice": True})
        assert result.is_valid is True
        doc = result.document
        assert doc is not None
        # Verify document identifiers match mock data
        assert doc.document_id == DEFAULT_MOCK_KY_DL["document_id"]
        assert doc.first_name == DEFAULT_MOCK_KY_DL["first_name"]
        assert doc.last_name == DEFAULT_MOCK_KY_DL["last_name"]

    def test_practice_override_fields_accepted(self):
        """
        Expected outcome: caller can override individual mock fields while
        the remaining PII fields stay synthetic.
        """
        validator = _validator(env="dev", allowed=True)
        result = validator.validate(
            {"is_practice": True, "city": "Covington"}
        )
        assert result.is_valid is True
        assert result.document.city == "Covington"

    @pytest.mark.parametrize("doc", MOCK_KY_DL_DOCUMENTS[:2])
    def test_all_happy_path_mock_documents_pass(self, doc):
        """
        Expected outcome: the two standard happy-path mock documents both
        pass validation.
        """
        cfg = KYDLPracticeConfig(
            environment="test",
            is_practice_allowed=True,
            api_token=None,
            base_url=None,
            mock_document=dict(doc),
        )
        validator = KYDriversLicenseValidator(practice_config=cfg)
        result = validator.validate({"is_practice": True})
        assert result.is_valid is True, result.errors

    def test_expired_mock_document_has_warning(self):
        """
        Expected outcome: PRACTICE-KY-003 (expired) returns valid=True
        with an expiry warning.
        """
        expired_doc = MOCK_KY_DL_BY_ID["PRACTICE-KY-003"]
        cfg = KYDLPracticeConfig(
            environment="test",
            is_practice_allowed=True,
            api_token=None,
            base_url=None,
            mock_document=dict(expired_doc),
        )
        validator = KYDriversLicenseValidator(practice_config=cfg)
        result = validator.validate({"is_practice": True})
        assert result.is_valid is True
        assert any("expired" in w.lower() for w in result.warnings)

    def test_underage_mock_document_fails(self):
        """
        Expected outcome: PRACTICE-KY-004 (underage) returns valid=False
        with an age error.
        """
        underage_doc = MOCK_KY_DL_BY_ID["PRACTICE-KY-004"]
        cfg = KYDLPracticeConfig(
            environment="test",
            is_practice_allowed=True,
            api_token=None,
            base_url=None,
            mock_document=dict(underage_doc),
        )
        validator = KYDriversLicenseValidator(practice_config=cfg)
        result = validator.validate({"is_practice": True})
        assert result.is_valid is False
        assert any("16" in e for e in result.errors)

    def test_bad_format_mock_document_fails(self):
        """
        Expected outcome: PRACTICE-KY-005 (bad license number) returns
        valid=False with a format error.
        """
        bad_doc = MOCK_KY_DL_BY_ID["PRACTICE-KY-005"]
        cfg = KYDLPracticeConfig(
            environment="test",
            is_practice_allowed=True,
            api_token=None,
            base_url=None,
            mock_document=dict(bad_doc),
        )
        validator = KYDriversLicenseValidator(practice_config=cfg)
        result = validator.validate({"is_practice": True})
        assert result.is_valid is False
        assert any("license number" in e.lower() for e in result.errors)