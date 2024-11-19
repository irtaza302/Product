import axios from 'axios';
import type { AuthResponse } from '@/types/index.js';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://product-mru.vercel.app/api'
  : 'http://localhost:5000/api';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  }
}; 