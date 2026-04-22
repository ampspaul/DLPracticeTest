import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './LoginPage.module.css';

interface FormFields {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!fields.password) {
    errors.password = 'Password is required.';
  } else if (fields.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();

  const [fields, setFields] = useState<FormFields>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Redirect destination after login
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  // If already authenticated, redirect away from login
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    clearError();

    // Re-validate on change after first submission attempt
    if (submitted) {
      const updated = { ...fields, [name]: value };
      const errors = validateForm(updated);
      setFieldErrors(errors);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    clearError();

    const errors = validateForm(fields);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await login({ email: fields.email.trim(), password: fields.password });
      navigate(from, { replace: true });
    } catch {
      // Error is handled by useAuth and exposed via `error`
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your account to continue</p>
        </div>

        {error && (
          <div className={styles.globalError} role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Login form"
        >
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              disabled={isLoading}
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
              placeholder="you@example.com"
            />
            {fieldErrors.email && (
              <p id="email-error" className={styles.fieldError} role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={fields.password}
              onChange={handleChange}
              disabled={isLoading}
              aria-required="true"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={
                fieldErrors.password ? 'password-error' : undefined
              }
              className={`${styles.input} ${
                fieldErrors.password ? styles.inputError : ''
              }`}
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p id="password-error" className={styles.fieldError} role="alert">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;