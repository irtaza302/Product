export { AUTH_CONSTANTS } from './authConstants';
export { FORM_CONSTANTS } from './formConstants';
export { MESSAGES } from './messages';
export { ORDER_CONSTANTS } from './orderConstants';
export { PAGE_CONSTANTS } from './pageConstants';
export { PRODUCT_CONSTANTS } from './productConstants';
export { SWAGGER_CONSTANTS } from './swaggerConstants';
export { UI_CONSTANTS } from './uiConstants';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PRODUCTS: '/products',
  ORDERS: '/orders',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
} as const;