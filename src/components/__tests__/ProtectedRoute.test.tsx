import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import authService from '../../services/authService';

jest.mock('../../services/authService');
const mockAuthService = authService as jest.Mocked<typeof authService>;

function renderWithRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/test" element={<div>Test Page</div>} />
          <Route path="/results" element={<div>Results Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders child route when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);
    renderWithRoute('/test');
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('redirects /test to /login when unauthenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);
    renderWithRoute('/test');
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Test Page')).not.toBeInTheDocument();
  });

  it('redirects /results to /login when unauthenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);
    renderWithRoute('/results');
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Results Page')).not.toBeInTheDocument();
  });

  it('renders results when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);
    renderWithRoute('/results');
    expect(screen.getByText('Results Page')).toBeInTheDocument();
  });
});