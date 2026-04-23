import storageService from '../storageService';

const TOKEN = 'test-token-abc';
const USER = { id: '1', email: 'user@example.com', name: 'Test User' };

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('token management', () => {
    it('returns null when no token is stored', () => {
      expect(storageService.getToken()).toBeNull();
    });

    it('stores and retrieves a token', () => {
      storageService.setToken(TOKEN);
      expect(storageService.getToken()).toBe(TOKEN);
    });

    it('removes a token', () => {
      storageService.setToken(TOKEN);
      storageService.removeToken();
      expect(storageService.getToken()).toBeNull();
    });
  });

  describe('user management', () => {
    it('returns null when no user is stored', () => {
      expect(storageService.getUser()).toBeNull();
    });

    it('stores and retrieves a user', () => {
      storageService.setUser(USER);
      expect(storageService.getUser()).toEqual(USER);
    });

    it('removes a user', () => {
      storageService.setUser(USER);
      storageService.removeUser();
      expect(storageService.getUser()).toBeNull();
    });
  });

  describe('clear', () => {
    it('removes both token and user', () => {
      storageService.setToken(TOKEN);
      storageService.setUser(USER);
      storageService.clear();
      expect(storageService.getToken()).toBeNull();
      expect(storageService.getUser()).toBeNull();
    });
  });
});