import api from '../config/axios';
import { User, ErrorResponse } from '../types';

interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const { data } = await api.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (err) {
      const error = err as ErrorResponse;
      throw new Error(error.message || 'Login failed');
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}; 