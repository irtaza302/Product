export const SWAGGER_CONSTANTS = {
  TITLE: 'Ecommerce API Documentation',
  DESCRIPTION: `
    RESTful API documentation for the Ecommerce application.
    This API provides endpoints for managing products, orders, cart, and user authentication.
  `,
  VERSION: '1.0.0',
  CONTACT: {
    NAME: 'API Support',
    EMAIL: 'support@ecomstore.com',
    URL: 'https://ecomstore.com/support'
  },
  SERVERS: {
    DEV: {
      URL: 'http://localhost:5000',
      DESCRIPTION: 'Development server'
    },
    STAGING: {
      URL: 'https://staging-api.ecomstore.com',
      DESCRIPTION: 'Staging server'
    },
    PROD: {
      URL: 'https://api.ecomstore.com',
      DESCRIPTION: 'Production server'
    }
  },
  TAGS: {
    AUTH: 'Authentication',
    PRODUCTS: 'Products',
    ORDERS: 'Orders',
    CART: 'Cart'
  },
  SECURITY: {
    JWT: {
      TYPE: 'http',
      SCHEME: 'bearer',
      FORMAT: 'JWT'
    }
  }
} as const; 