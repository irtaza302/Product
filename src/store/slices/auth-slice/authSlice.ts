import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Define initial state first
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false
};

const loadAuthFromStorage = (): AuthState => {
  try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userStr || !token) {
      return initialState;
    }

    const user = JSON.parse(userStr);
    return {
      user,
      isAuthenticated: true,
      loading: false
    };
  } catch (error) {
    console.error('Error loading auth from localStorage:', error);
    // Clear potentially corrupted data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return initialState;
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Store as JSON string
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;