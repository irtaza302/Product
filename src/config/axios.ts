import axios from 'axios';
import { store } from '../store';
import { clearUser } from '../store/slices/authSlice';

// Determine the base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use the Vercel URL in production
    return 'https://product-gold-mu.vercel.app/api';
  }
  return 'http://localhost:5000/api';
};

const instance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch(clearUser());
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance; 