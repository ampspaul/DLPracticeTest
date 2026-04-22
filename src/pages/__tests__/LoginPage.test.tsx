import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import * as useAuthModule from '../../hooks/useAuth';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
}));

const mockLogin = jest.fn();
const mockClearError = jest.fn();

function setupUseAuth(overrides: Partial<ReturnType<typeof useAuthModule.useAuth>> = {}) {
  jest.spyOn(useAuthModule, 'default').mockReturnValue({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: mockLogin,
    logout: jest.fn(),
    clearError: mockClearError,
    ...overrides,
  });
}

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupUseAuth();
  });

  it('renders the login form', () => {
    renderLoginPage();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    renderLoginPage();
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows error for invalid email format', async () => {
    renderLoginPage();
    await userEvent.type(screen.getByLabelText(/email address/i), 'not-an-email');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('shows error for short password', async () => {
    renderLoginPage();
    await userEvent.type(screen.getByLabelText(/email address/i), 'user@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), '123');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
  });

  it('calls login with correct credentials on valid submission', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    renderLoginPage();

    await userEvent.type(screen.getByLabelText(/email address/i), 'user@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'secret123',
      });
    });
  });

  it('displays global error when login fails', async () => {
    setupUseAuth({ error: 'Invalid credentials' });
    renderLoginPage();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('shows loading state while submitting', () => {
    setupUseAuth({ isLoading: true });
    renderLoginPage();
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
  });

  it('redirects when already authenticated', () => {
    setupUseAuth({ isAuthenticated: true, user: { id: '1', email: 'a@b.com' } });
    renderLoginPage();
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});