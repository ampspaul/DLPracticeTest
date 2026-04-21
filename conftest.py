"""
Pytest configuration for the test suite.

Sets APP_ENV=test before any tests run so that practice mode is
available by default during testing.
"""
import os

# Default to test environment — individual tests override this as needed
os.environ.setdefault("APP_ENV", "test")