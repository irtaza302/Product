export const SWAGGER_CONSTANTS = {
  TITLE: 'Ecommerce API Documentation',
  DESCRIPTION: 'API documentation for the Ecommerce application',
  VERSION: '1.0.0',
  CONTACT: {
    NAME: 'API Support',
    EMAIL: 'support@ecomstore.com'
  },
  SERVERS: {
    DEV: {
      URL: 'http://localhost:5000',
      DESCRIPTION: 'Development server'
    }
  },
  TAGS: {
    AUTH: 'Authentication',
    PRODUCTS: 'Products',
    ORDERS: 'Orders',
    CART: 'Cart'
  }
} as const; 