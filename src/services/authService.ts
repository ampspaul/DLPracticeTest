import storageService from './storageService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      let message = 'Login failed. Please check your credentials.';
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {
        // Use default message
      }
      throw new Error(message);
    }

    const data: LoginResponse = await response.json();
    storageService.setToken(data.token);
    storageService.setUser(data.user);
    return data;
  },

  logout(): void {
    storageService.clear();
  },

  isAuthenticated(): boolean {
    return storageService.getToken() !== null;
  },

  getCurrentUser(): AuthUser | null {
    return storageService.getUser<AuthUser>();
  },

  getToken(): string | null {
    return storageService.getToken();
  },
};

export default authService;