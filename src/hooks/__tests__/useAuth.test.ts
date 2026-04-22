import { renderHook, act } from '@testing-library/react';
import useAuth from '../useAuth';
import authService from '../../services/authService';

jest.mock('../../services/authService');
const mockAuthService = authService as jest.Mocked<typeof authService>;

const MOCK_RESPONSE = {
  token: 'tok',
  user: { id: '1', email: 'u@example.com', name: 'U' },
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthService.getCurrentUser.mockReturnValue(null);
    mockAuthService.isAuthenticated.mockReturnValue(false);
  });

  it('initialises with no user and not loading', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets user on successful login', async () => {
    mockAuthService.login.mockResolvedValueOnce(MOCK_RESPONSE);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({ email: 'u@example.com', password: 'pass123' });
    });

    expect(result.current.user).toEqual(MOCK_RESPONSE.user);
    expect(result.current.error).toBeNull();
  });

  it('sets error on failed login', async () => {
    mockAuthService.login.mockRejectedValueOnce(new Error('Bad creds'));
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(
        result.current.login({ email: 'u@example.com', password: 'bad' })
      ).rejects.toThrow('Bad creds');
    });

    expect(result.current.error).toBe('Bad creds');
    expect(result.current.user).toBeNull();
  });

  it('clears error on clearError', async () => {
    mockAuthService.login.mockRejectedValueOnce(new Error('Oops'));
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.login({ email: 'x@x.com', password: 'y' })).rejects.toThrow();
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('clears user on logout', async () => {
    mockAuthService.login.mockResolvedValueOnce(MOCK_RESPONSE);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({ email: 'u@example.com', password: 'pass123' });
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});