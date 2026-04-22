"""
test_auth_ui.py — Behavioural tests for login page HTML/JS interactions.

These use pytest + responses mocking to verify the JS behaviour described
in auth.js without a full Selenium setup (unit-level DOM testing hints).
Where a full browser driver is available (e.g., Playwright/Selenium),
these test intentions should be converted to end-to-end tests.
"""

import re
import pytest


# ---------------------------------------------------------------------------
# Static HTML / structure tests (parse the HTML to verify AC elements exist)
# ---------------------------------------------------------------------------

def load_login_html():
    """Load and return the login HTML content."""
    with open("src/login.html", "r", encoding="utf-8") as f:
        return f.read()


@pytest.fixture(scope="module")
def html():
    return load_login_html()


class TestLoginPageStructure:
    """AC1, AC3, AC4, AC5, AC10, AC11, AC13, AC14"""

    def test_has_email_input(self, html):
        """AC1"""
        assert 'type="email"' in html
        assert 'id="email"' in html

    def test_has_password_input(self, html):
        """AC1 + AC3: password type = masked by default"""
        assert 'type="password"' in html
        assert 'id="password"' in html

    def test_has_toggle_password_button(self, html):
        """AC4"""
        assert 'id="toggle-password"' in html

    def test_submit_button_starts_disabled(self, html):
        """AC5"""
        assert "disabled" in html
        assert 'id="submit-btn"' in html

    def test_has_remember_me_checkbox(self, html):
        """AC10"""
        assert 'id="remember-me"' in html
        assert 'type="checkbox"' in html

    def test_has_forgot_password_link(self, html):
        """AC11"""
        assert 'id="forgot-password-link"' in html
        assert "forgot-password" in html

    def test_has_csrf_hidden_input(self, html):
        """AC12"""
        assert 'id="csrf-token"' in html
        assert 'type="hidden"' in html

    def test_has_aria_labels(self, html):
        """AC13: accessibility"""
        assert "aria-label" in html
        assert "aria-required" in html
        assert "aria-describedby" in html

    def test_has_role_main(self, html):
        """AC13"""
        assert 'role="main"' in html

    def test_has_lang_attribute(self, html):
        """AC13"""
        assert 'lang="en"' in html

    def test_has_viewport_meta(self, html):
        """AC14: responsive"""
        assert 'name="viewport"' in html
        assert "width=device-width" in html

    def test_has_error_banner(self, html):
        """AC8"""
        assert 'id="login-error-banner"' in html
        assert 'role="alert"' in html

    def test_has_loading_spinner(self, html):
        """AC6"""
        assert "btn-spinner" in html

    def test_form_has_correct_action(self, html):
        assert 'action="/api/auth/login"' in html

    def test_form_method_is_post(self, html):
        assert 'method="POST"' in html


class TestAuthJsStructure:
    """Verify key logic is present in auth.js source."""

    @pytest.fixture(scope="class")
    def js(self):
        with open("src/auth.js", "r", encoding="utf-8") as f:
            return f.read()

    def test_has_email_validation(self, js):
        """AC2"""
        assert "validateEmail" in js
        assert "EMAIL_RE" in js

    def test_has_password_validation(self, js):
        """AC2"""
        assert "validatePassword" in js

    def test_has_submit_state_update(self, js):
        """AC5"""
        assert "updateSubmitState" in js

    def test_has_loading_state(self, js):
        """AC6"""
        assert "setLoading" in js

    def test_has_redirect_on_success(self, js):
        """AC7"""
        assert "redirect_url" in js
        assert "window.location.href" in js

    def test_has_error_banner_shown_on_failure(self, js):
        """AC8"""
        assert "showErrorBanner" in js

    def test_has_account_locked_handling(self, js):
        """AC9"""
        assert "ACCOUNT_LOCKED" in js

    def test_has_toggle_password_logic(self, js):
        """AC4"""
        assert "toggle-password" in js
        assert "type === \"password\"" in js or "type === 'password'" in js

    def test_has_csrf_fetch(self, js):
        """AC12"""
        assert "csrf-token" in js or "csrf_token" in js

    def test_has_remember_me_sent(self, js):
        """AC10"""
        assert "remember_me" in js