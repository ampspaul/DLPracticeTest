"""
Identity Document Verification Pipeline.

Orchestrates end-to-end document verification, including KY-DL practice
mode routing.
"""
from __future__ import annotations

import logging
from typing import Any

from .ky_dl_validator import KYDriversLicenseValidator, ValidationResult

logger = logging.getLogger(__name__)

# Supported document types
DOCUMENT_TYPE_KY_DL = "KY_DRIVERS_LICENSE"


class IdentityVerificationPipeline:
    """
    Entry point for identity document verification.

    Routes documents to the appropriate document-type validator and
    returns a unified ``ValidationResult``.
    """

    def __init__(self, ky_dl_validator: KYDriversLicenseValidator | None = None) -> None:
        self._ky_dl_validator = ky_dl_validator or KYDriversLicenseValidator()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def verify(self, document_type: str, document_data: dict[str, Any]) -> ValidationResult:
        """
        Verify an identity document.

        Parameters
        ----------
        document_type:
            One of the ``DOCUMENT_TYPE_*`` constants defined in this module.
        document_data:
            Parsed or raw document payload.

        Returns
        -------
        ValidationResult
        """
        doc_type = document_type.upper().strip()
        logger.info("IdentityVerificationPipeline.verify called for type=%s", doc_type)

        if doc_type == DOCUMENT_TYPE_KY_DL:
            return self._ky_dl_validator.validate(document_data)

        logger.warning("Unsupported document type: %s", doc_type)
        return ValidationResult(
            is_valid=False,
            errors=[f"Unsupported document type: {document_type!r}"],
        )