import axios from '../config/axios';
import { LoginCredentials, AuthResponse } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }
}; 