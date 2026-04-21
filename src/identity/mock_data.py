"""
Synthetic / mock data for KY-DL practice testing.

IMPORTANT: All data in this module is entirely fictitious.
No real PII is contained here. Do NOT add real names, addresses,
license numbers, or any other genuine personal information.

Credentials and tokens are NOT stored here — they are loaded from
environment variables or a secrets manager at runtime.
"""
from __future__ import annotations

from datetime import date


# ---------------------------------------------------------------------------
# Synthetic KY-DL documents (no real PII)
# ---------------------------------------------------------------------------

MOCK_KY_DL_DOCUMENTS: list[dict] = [
    {
        "document_id": "PRACTICE-KY-001",
        "first_name": "Jane",
        "last_name": "Testington",
        "date_of_birth": "1990-06-15",
        "license_number": "T12345678",
        "expiration_date": "2028-06-15",
        "address": "100 Mockingbird Lane",
        "city": "Louisville",
        "state": "KY",
        "zip_code": "40201",
        "document_class": "D",
        "is_practice": True,
    },
    {
        "document_id": "PRACTICE-KY-002",
        "first_name": "John",
        "last_name": "Sampleton",
        "date_of_birth": "1985-03-22",
        "license_number": "S98765432",
        "expiration_date": "2026-03-22",
        "address": "200 Placeholder Ave",
        "city": "Lexington",
        "state": "KY",
        "zip_code": "40502",
        "document_class": "D",
        "is_practice": True,
    },
    {
        "document_id": "PRACTICE-KY-003",
        "first_name": "Alex",
        "last_name": "Demouser",
        "date_of_birth": "2000-11-01",
        "license_number": "D11223344",
        "expiration_date": "2025-11-01",  # intentionally expired — for expiry test case
        "address": "300 Synthetic Street",
        "city": "Bowling Green",
        "state": "KY",
        "zip_code": "42101",
        "document_class": "D",
        "is_practice": True,
    },
    {
        # Edge-case: under-age applicant (should fail validation)
        "document_id": "PRACTICE-KY-004",
        "first_name": "Young",
        "last_name": "Testcase",
        "date_of_birth": str(date.today().replace(year=date.today().year - 14)),
        "license_number": "Y55667788",
        "expiration_date": "2030-01-01",
        "address": "400 Fake Boulevard",
        "city": "Frankfort",
        "state": "KY",
        "zip_code": "40601",
        "document_class": "D",
        "is_practice": True,
    },
    {
        # Edge-case: malformed license number (should fail validation)
        "document_id": "PRACTICE-KY-005",
        "first_name": "Bad",
        "last_name": "Format",
        "date_of_birth": "1992-07-04",
        "license_number": "INVALID###",
        "expiration_date": "2027-07-04",
        "address": "500 Error Road",
        "city": "Paducah",
        "state": "KY",
        "zip_code": "42001",
        "document_class": "D",
        "is_practice": True,
    },
]

# Look-up by document_id for convenience
MOCK_KY_DL_BY_ID: dict[str, dict] = {
    doc["document_id"]: doc for doc in MOCK_KY_DL_DOCUMENTS
}

# The default "happy-path" practice document
DEFAULT_MOCK_KY_DL = MOCK_KY_DL_DOCUMENTS[0]