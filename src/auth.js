/**
 * auth.js — Login page client-side logic
 *
 * AC2:  Client-side validation (empty fields, email format)
 * AC3:  Password masked by default
 * AC4:  Show/hide password toggle
 * AC5:  Submit disabled until fields are valid
 * AC6:  Loading state during submission
 * AC7:  Successful login redirects to dashboard
 * AC8:  Invalid credentials shows error message
 * AC9:  Account lockout after 5 failed attempts
 * AC10: Remember me
 * AC12: CSRF token attached to request
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* DOM references                                                       */
  /* ------------------------------------------------------------------ */
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberMe = document.getElementById("remember-me");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnSpinner = submitBtn.querySelector(".btn-spinner");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const errorBanner = document.getElementById("login-error-banner");
  const errorMessage = document.getElementById("login-error-message");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const csrfTokenInput = document.getElementById("csrf-token");

  /* ------------------------------------------------------------------ */
  /* AC12: Fetch CSRF token on page load                                  */
  /* ------------------------------------------------------------------ */
  async function fetchCsrfToken() {
    try {
      const res = await fetch("/api/auth/csrf-token", {
        method: "GET",
        credentials: "same-origin",
      });
      if (res.ok) {
        const data = await res.json();
        csrfTokenInput.value = data.csrf_token || "";
      }
    } catch (_) {
      // Non-fatal: token may already be server-rendered into the page
    }
  }

  /* ------------------------------------------------------------------ */
  /* AC2: Validation helpers                                               */
  /* ------------------------------------------------------------------ */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      showFieldError(emailInput, emailError, "Email address is required.");
      return false;
    }
    if (!EMAIL_RE.test(val)) {
      showFieldError(emailInput, emailError, "Please enter a valid email address.");
      return false;
    }
    clearFieldError(emailInput, emailError);
    return true;
  }

  function validatePassword() {
    const val = passwordInput.value;
    if (!val) {
      showFieldError(passwordInput, passwordError, "Password is required.");
      return false;
    }
    clearFieldError(passwordInput, passwordError);
    return true;
  }

  function isFormValid() {
    const emailOk = EMAIL_RE.test(emailInput.value.trim()) && emailInput.value.trim() !== "";
    const passwordOk = passwordInput.value.length > 0;
    return emailOk && passwordOk;
  }

  /* ------------------------------------------------------------------ */
  /* Field error display helpers                                           */
  /* ------------------------------------------------------------------ */
  function showFieldError(input, errorEl, message) {
    input.classList.add("is-invalid");
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove("is-invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  /* ------------------------------------------------------------------ */
  /* AC5: Enable/disable submit based on field validity                    */
  /* ------------------------------------------------------------------ */
  function updateSubmitState() {
    const valid = isFormValid();
    submitBtn.disabled = !valid;
    submitBtn.setAttribute("aria-disabled", String(!valid));
  }

  emailInput.addEventListener("input", updateSubmitState);
  passwordInput.addEventListener("input", updateSubmitState);

  /* Validate on blur (show error only after user leaves the field) */
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);

  /* ------------------------------------------------------------------ */
  /* AC4: Show / hide password toggle                                      */
  /* ------------------------------------------------------------------ */
  togglePasswordBtn.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";

    const eyeIcon = togglePasswordBtn.querySelector(".icon--eye");
    const eyeOffIcon = togglePasswordBtn.querySelector(".icon--eye-off");

    if (isHidden) {
      eyeIcon.style.display = "none";
      eyeOffIcon.style.display = "";
      togglePasswordBtn.setAttribute("aria-label", "Hide password");
      togglePasswordBtn.setAttribute("aria-pressed", "true");
    } else {
      eyeIcon.style.display = "";
      eyeOffIcon.style.display = "none";
      togglePasswordBtn.setAttribute("aria-label", "Show password");
      togglePasswordBtn.setAttribute("aria-pressed", "false");
    }
  });

  /* ------------------------------------------------------------------ */
  /* Banner helpers                                                        */
  /* ------------------------------------------------------------------ */
  function showErrorBanner(msg) {
    errorMessage.textContent = msg;
    errorBanner.hidden = false;
    errorBanner.focus && errorBanner.focus();
  }

  function hideErrorBanner() {
    errorBanner.hidden = true;
    errorMessage.textContent = "";
  }

  /* ------------------------------------------------------------------ */
  /* AC6: Loading state helpers                                            */
  /* ------------------------------------------------------------------ */
  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.setAttribute("aria-disabled", String(loading));
    btnText.hidden = loading;
    btnSpinner.hidden = !loading;
  }

  /* ------------------------------------------------------------------ */
  /* AC7/AC8/AC9: Form submission                                          */
  /* ------------------------------------------------------------------ */
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideErrorBanner();

    // Final validation before submit
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    if (!emailValid || !passwordValid) return;

    setLoading(true);

    const payload = {
      email: emailInput.value.trim(),
      password: passwordInput.value,
      remember_me: rememberMe.checked,
      csrf_token: csrfTokenInput.value,
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfTokenInput.value,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.redirect_url) {
        // AC7: Redirect to dashboard on success
        window.location.href = data.redirect_url;
        return; // keep loading spinner visible during navigation
      }

      // AC9: Account locked
      if (res.status === 429 || data.error_code === "ACCOUNT_LOCKED") {
        showErrorBanner(
          data.message ||
            "Your account has been temporarily locked due to too many failed attempts. " +
            "Please try again later or reset your password."
        );
        setLoading(false);
        return;
      }

      // AC8: Invalid credentials or other errors
      showErrorBanner(
        data.message || "Invalid email or password. Please try again."
      );
    } catch (_) {
      showErrorBanner(
        "Unable to connect. Please check your internet connection and try again."
      );
    } finally {
      // Only re-enable if we haven't redirected
      if (!form.dataset.redirecting) {
        setLoading(false);
        updateSubmitState();
      }
    }
  });

  /* ------------------------------------------------------------------ */
  /* Initialise                                                            */
  /* ------------------------------------------------------------------ */
  fetchCsrfToken();
  updateSubmitState();
})();