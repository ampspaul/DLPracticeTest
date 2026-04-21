"""
Kentucky Driver's License (KY-DL) Validator.

Supports both production verification and a practice/sandbox mode for
development and QA purposes. Practice mode is blocked in production
environments.
"""
from __future__ import annotations

import logging
import re
from dataclasses import dataclass, field
from datetime import date
from typing import Any, Optional

from config.ky_dl_practice import KYDLPracticeConfig, get_practice_config

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class KYDLDocument:
    """Represents a parsed Kentucky Driver's License document."""
    document_id: str
    first_name: str
    last_name: str
    date_of_birth: date
    license_number: str
    expiration_date: date
    address: str
    city: str
    state: str = "KY"
    zip_code: str = ""
    document_class: str = ""
    is_practice: bool = False
    raw_data: dict[str, Any] = field(default_factory=dict)


@dataclass
class ValidationResult:
    """Result of a KY-DL validation attempt."""
    is_valid: bool
    document: Optional[KYDLDocument] = None
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    is_practice_run: bool = False


# ---------------------------------------------------------------------------
# Validator
# ---------------------------------------------------------------------------

class KYDriversLicenseValidator:
    """
    Validates Kentucky Driver's Licenses.

    In dev/staging environments, accepts practice/mock documents and
    routes them through the same validation workflow as real documents
    (using synthetic data).  In production, practice mode is blocked.
    """

    # KY license number pattern: one letter + 8 digits (e.g. A12345678)
    _LICENSE_NUMBER_RE = re.compile(r"^[A-Z]\d{8}$")
    # Zip code: 5 digits or ZIP+4
    _ZIP_RE = re.compile(r"^\d{5}(-\d{4})?$")

    def __init__(self, practice_config: Optional[KYDLPracticeConfig] = None) -> None:
        self._practice_cfg = practice_config or get_practice_config()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def validate(self, document_data: dict[str, Any]) -> ValidationResult:
        """
        Validate a KY-DL document payload.

        If the payload contains ``"is_practice": true`` the request is
        routed to the sandbox workflow (dev/staging only).
        """
        is_practice = bool(document_data.get("is_practice", False))

        if is_practice:
            return self._validate_practice(document_data)
        return self._validate_real(document_data)

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _validate_practice(self, document_data: dict[str, Any]) -> ValidationResult:
        """Handle a practice/sandbox validation request."""
        if not self._practice_cfg.is_practice_allowed:
            logger.warning(
                "KY-DL practice mode requested in a disallowed environment (%s). "
                "Request rejected.",
                self._practice_cfg.environment,
            )
            return ValidationResult(
                is_valid=False,
                errors=[
                    "Practice mode is not available in the current environment "
                    f"({self._practice_cfg.environment}). "
                    "This event has been logged."
                ],
                is_practice_run=True,
            )

        logger.info(
            "KY-DL practice validation requested (env=%s).",
            self._practice_cfg.environment,
        )

        # Merge submitted data over the practice defaults so that tests can
        # override individual fields while still getting synthetic PII for
        # any field not explicitly provided.
        merged = {**self._practice_cfg.mock_document, **document_data}
        merged["is_practice"] = True  # ensure flag stays set

        result = self._parse_and_validate(merged)
        result.is_practice_run = True

        if result.is_valid:
            logger.info("KY-DL practice validation passed.")
        else:
            logger.warning("KY-DL practice validation failed: %s", result.errors)

        return result

    def _validate_real(self, document_data: dict[str, Any]) -> ValidationResult:
        """Handle a real (non-practice) validation request."""
        return self._parse_and_validate(document_data)

    def _parse_and_validate(self, data: dict[str, Any]) -> ValidationResult:
        """Parse raw document data and run all field-level validations."""
        errors: list[str] = []
        warnings: list[str] = []

        # --- Required field presence check ---
        required = [
            "document_id", "first_name", "last_name",
            "date_of_birth", "license_number", "expiration_date",
            "address", "city",
        ]
        for key in required:
            if not data.get(key):
                errors.append(f"Missing required field: {key}")

        if errors:
            return ValidationResult(is_valid=False, errors=errors)

        # --- Parse dates ---
        dob = self._parse_date(data["date_of_birth"], "date_of_birth", errors)
        exp = self._parse_date(data["expiration_date"], "expiration_date", errors)

        if errors:
            return ValidationResult(is_valid=False, errors=errors)

        # --- Business rule validations ---
        self._validate_license_number(data["license_number"], errors)
        self._validate_state(data.get("state", "KY"), errors)
        self._validate_zip(data.get("zip_code", ""), warnings)
        self._validate_expiration(exp, warnings)
        self._validate_age(dob, errors)

        is_valid = len(errors) == 0

        doc: Optional[KYDLDocument] = None
        if is_valid:
            doc = KYDLDocument(
                document_id=data["document_id"],
                first_name=data["first_name"],
                last_name=data["last_name"],
                date_of_birth=dob,
                license_number=data["license_number"],
                expiration_date=exp,
                address=data["address"],
                city=data["city"],
                state=data.get("state", "KY"),
                zip_code=data.get("zip_code", ""),
                document_class=data.get("document_class", ""),
                is_practice=data.get("is_practice", False),
                raw_data=data,
            )

        return ValidationResult(
            is_valid=is_valid,
            document=doc,
            errors=errors,
            warnings=warnings,
        )

    # ------------------------------------------------------------------
    # Field validators
    # ------------------------------------------------------------------

    @staticmethod
    def _parse_date(value: Any, field_name: str, errors: list[str]) -> Optional[date]:
        if isinstance(value, date):
            return value
        try:
            return date.fromisoformat(str(value))
        except (ValueError, TypeError):
            errors.append(
                f"Invalid date format for '{field_name}': expected YYYY-MM-DD, got {value!r}"
            )
            return None

    def _validate_license_number(self, number: str, errors: list[str]) -> None:
        if not self._LICENSE_NUMBER_RE.match(str(number).upper()):
            errors.append(
                f"Invalid KY license number format: {number!r}. "
                "Expected one letter followed by 8 digits (e.g. A12345678)."
            )

    @staticmethod
    def _validate_state(state: str, errors: list[str]) -> None:
        if str(state).upper() != "KY":
            errors.append(
                f"Document state must be 'KY' for a Kentucky Driver's License; got {state!r}."
            )

    def _validate_zip(self, zip_code: str, warnings: list[str]) -> None:
        if zip_code and not self._ZIP_RE.match(str(zip_code)):
            warnings.append(f"Zip code format may be invalid: {zip_code!r}.")

    @staticmethod
    def _validate_expiration(exp: Optional[date], warnings: list[str]) -> None:
        if exp and exp < date.today():
            warnings.append("Document appears to be expired.")

    @staticmethod
    def _validate_age(dob: Optional[date], errors: list[str]) -> None:
        if dob is None:
            return
        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        if age < 16:
            errors.append("Date of birth indicates holder is under the minimum driving age (16).")
        if age > 120:
            errors.append("Date of birth is not plausible (age > 120).")