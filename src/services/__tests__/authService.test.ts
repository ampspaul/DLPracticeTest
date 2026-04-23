import authService from '../authService';
import storageService from '../storageService';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

const MOCK_RESPONSE: { token: string; user: { id: string; email: string; name: string } } = {
  token: 'jwt-token-xyz',
  user: { id: '42', email: 'test@example.com', name: 'Test User' },
};

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('calls the correct endpoint and returns data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_RESPONSE,
      });

      const result = await authService.login({
        email: 'test@example.com',
        password: 'secret123',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({ method: 'POST' })
      );
      expect(result).toEqual(MOCK_RESPONSE);
    });

    it('persists token and user on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_RESPONSE,
      });

      await authService.login({ email: 'test@example.com', password: 'secret123' });

      expect(storageService.getToken()).toBe(MOCK_RESPONSE.token);
      expect(storageService.getUser()).toEqual(MOCK_RESPONSE.user);
    });

    it('throws an error on failed login', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      await expect(
        authService.login({ email: 'bad@example.com', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });

    it('throws a generic error when response has no message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      await expect(
        authService.login({ email: 'bad@example.com', password: 'wrong' })
      ).rejects.toThrow('Login failed');
    });
  });

  describe('logout', () => {
    it('clears stored token and user', () => {
      storageService.setToken('some-token');
      storageService.setUser({ id: '1', email: 'a@b.com' });
      authService.logout();
      expect(storageService.getToken()).toBeNull();
      expect(storageService.getUser()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('returns false when no token exists', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('returns true when a token exists', () => {
      storageService.setToken('token');
      expect(authService.isAuthenticated()).toBe(true);
    });
  });
});