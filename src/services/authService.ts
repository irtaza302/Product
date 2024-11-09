import axios from '../config/axios';
import type { AuthResponse } from '../types';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post<AuthResponse>('/auth/login', {
      email,
      password
    });
    return response.data;
  }
}; 