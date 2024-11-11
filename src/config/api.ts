export const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://product-gold-mu.vercel.app/api'
    : '/api', // This will use the Vite proxy in development
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}; 