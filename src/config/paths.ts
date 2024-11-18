export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  TEST_ERROR: '/test-error',
} as const;

export const API_PATHS = {
  BASE: process.env.NODE_ENV === 'production' 
    ? 'https://product-mru.vercel.app/api'
    : 'http://localhost:5000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PRODUCTS: '/products',
  ORDERS: '/orders',
  CART: '/cart',
  HEALTH: '/health',
} as const; 