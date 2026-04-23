const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storageService = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      console.error('Failed to persist auth token');
    }
  },

  removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      console.error('Failed to remove auth token');
    }
  },

  getUser<T = unknown>(): T | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  setUser<T = unknown>(user: T): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      console.error('Failed to persist user data');
    }
  },

  removeUser(): void {
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      console.error('Failed to remove user data');
    }
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },
};

export default storageService;