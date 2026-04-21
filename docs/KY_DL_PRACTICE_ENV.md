# Kentucky Driver's License (KY-DL) Practice / Sandbox Environment

This guide explains how to use the KY-DL practice (sandbox) test environment
for development and QA purposes.

---

## Table of Contents

1. [Overview](#overview)
2. [Environment Variables](#environment-variables)
3. [Running the Practice Test Suite](#running-the-practice-test-suite)
4. [Mock / Synthetic Test Documents](#mock--synthetic-test-documents)
5. [Integration with the Verification Pipeline](#integration-with-the-verification-pipeline)
6. [Production Safety Guard](#production-safety-guard)
7. [Adding New Test Cases](#adding-new-test-cases)
8. [FAQ](#faq)

---

## Overview

The KY-DL practice environment lets developers and QA engineers test the full
Kentucky Driver's Licence validation workflow — scanning, parsing, and
verification — **without using any real PII**.

Key properties:

| Property | Detail |
|---|---|
| Environments | `development`, `dev`, `staging`, `test`, `qa` |
| Practice mode blocked | `production`, `prod`, any unknown env name |
| PII used | None — all data is synthetic |
| Credentials storage | Environment variables / secrets manager only |

---

## Environment Variables

Copy `.env.example` to `.env` (git-ignored) and configure as needed.

| Variable | Required | Description |
|---|---|---|
| `APP_ENV` | Yes | Current environment (`dev`, `staging`, `test`, `production`, etc.) |
| `KY_DL_PRACTICE_API_TOKEN` | No | Token for external sandbox API (if applicable) |
| `KY_DL_PRACTICE_BASE_URL` | No | Base URL for external sandbox API (if applicable) |
| `KY_DL_PRACTICE_MOCK_DOC_ID` | No | Override the default mock document ID used in practice mode |

> **Security note:** Never commit real credentials to source control.
> All sensitive values must be set via environment variables or a secrets manager
> (e.g., AWS Secrets Manager, HashiCorp Vault, GitHub Actions Secrets).

---

## Running the Practice Test Suite

### Prerequisites

```bash
pip install -r requirements-dev.txt
```

### Run all KY-DL tests

```bash
# Set environment to test mode (practice mode enabled)
export APP_ENV=test

pytest tests/identity/ -v
```

### Run only practice-mode tests

```bash
pytest tests/identity/test_ky_dl_validator.py -v -k "Practice"
```

### Run production-guard tests

```bash
pytest tests/identity/test_ky_dl_production_guard.py -v
```

### Expected output (all passing)

```
tests/identity/test_ky_dl_config.py::TestPracticeConfigLoading::test_dev_env_allows_practice PASSED
tests/identity/test_ky_dl_config.py::TestPracticeConfigLoading::test_production_env_blocks_practice PASSED
...
tests/identity/test_ky_dl_validator.py::TestPracticeMode::test_practice_happy_path PASSED
tests/identity/test_ky_dl_validator.py::TestPracticeMode::test_practice_uses_synthetic_data_not_real_pii PASSED
...
tests/identity/test_ky_dl_production_guard.py::TestProductionGuard::test_practice_request_rejected_in_production PASSED
tests/identity/test_ky_dl_production_guard.py::TestProductionGuard::test_production_rejection_logs_warning PASSED
...
```

---

## Mock / Synthetic Test Documents

All mock documents are defined in `src/identity/mock_data.py`.
**No real personal information is contained there.**

| Document ID | Scenario | Expected Outcome |
|---|---|---|
| `PRACTICE-KY-001` | Standard valid licence | ✅ Valid — no errors |
| `PRACTICE-KY-002` | Standard valid licence (alt) | ✅ Valid — no errors |
| `PRACTICE-KY-003` | Expired licence | ✅ Valid + expiry warning |
| `PRACTICE-KY-004` | Under-age applicant | ❌ Invalid — age < 16 error |
| `PRACTICE-KY-005` | Malformed licence number | ❌ Invalid — format error |

### Submitting a practice request

Set `is_practice: true` in the document payload:

```python
from identity.pipeline import IdentityVerificationPipeline, DOCUMENT_TYPE_KY_DL

pipeline = IdentityVerificationPipeline()
result = pipeline.verify(
    DOCUMENT_TYPE_KY_DL,
    {"is_practice": True}
)

print(result.is_valid)        # True
print(result.is_practice_run) # True
print(result.document)        # KYDLDocument with synthetic data
```

You can override individual fields while keeping everything else synthetic:

```python
result = pipeline.verify(
    DOCUMENT_TYPE_KY_DL,
    {"is_practice": True, "city": "Covington"}
)
```

To use a specific mock document, set `KY_DL_PRACTICE_MOCK_DOC_ID`:

```bash
export KY_DL_PRACTICE_MOCK_DOC_ID=PRACTICE-KY-003
python your_script.py
```

---

## Integration with the Verification Pipeline

The practice test environment is fully integrated with
`IdentityVerificationPipeline`. The same code path that handles real
documents is used for practice documents — the only difference is:

1. The document data is sourced from the synthetic mock library (unless
   field overrides are provided by the caller).
2. `ValidationResult.is_practice_run` is set to `True`.
3. The practice flag is only honoured in non-production environments.

```
Caller
  │
  ▼
IdentityVerificationPipeline.verify(DOCUMENT_TYPE_KY_DL, payload)
  │
  ├─ is_practice=True ──► KYDriversLicenseValidator._validate_practice()
  │                            │
  │                            ├─ env is production? → reject + log warning
  │                            │
  │                            └─ merge mock defaults + caller overrides
  │                                      │
  │                                      ▼
  └─ is_practice=False ──► KYDriversLicenseValidator._validate_real()
                                      │
                                      ▼
                              _parse_and_validate()  (shared path)
                                      │
                                      ▼
                              ValidationResult
```

---

## Production Safety Guard

When `APP_ENV` is `production` or `prod`:

- Any request with `"is_practice": true` is **rejected**.
- `ValidationResult.is_valid` is `False`.
- A **WARNING**-level log entry is emitted by `identity.ky_dl_validator`.
- The error message references the current environment name.

Example warning log:

```
WARNING  identity.ky_dl_validator: KY-DL practice mode requested in a
disallowed environment (production). Request rejected.
```

Unknown `APP_ENV` values (not in the recognised allow-list) default to
**blocked** for safety.

---

## Adding New Test Cases

1. Add a new entry to `MOCK_KY_DL_DOCUMENTS` in `src/identity/mock_data.py`.
   - Use a unique `PRACTICE-KY-XXX` document ID.
   - Use entirely fictitious names, addresses, and licence numbers.
   - Document the expected validation outcome in a comment.
2. Add a corresponding test in `tests/identity/test_ky_dl_validator.py`
   following the existing pattern.
3. Update the table in this document.

---

## FAQ

**Q: Can I use real Kentucky licence numbers in the mock data?**
A: No. All data must be synthetic. Real licence numbers must never appear
in source code, test fixtures, or documentation.

**Q: How are practice API tokens stored?**
A: Via the `KY_DL_PRACTICE_API_TOKEN` environment variable (or a secrets
manager). They are never stored in source code.

**Q: What happens if I forget to set `APP_ENV`?**
A: The default is `development`, which **enables** practice mode. Set
`APP_ENV=production` explicitly in production deployments.

**Q: Can I run practice tests in CI?**
A: Yes. Set `APP_ENV=test` (or `staging`) in your CI environment. Do not
expose real API tokens in CI logs — use masked/secret variables.

**Q: Is the practice data stored anywhere?**
A: Practice validation results are processed in memory only and follow the
same data-handling rules as your application's normal audit/logging pipeline.
Ensure your logging configuration does not write PII (even synthetic data)
to persistent storage in environments where that is a concern.