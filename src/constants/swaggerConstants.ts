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
    }
  },
  SECURITY: {
    JWT: {
      TYPE: 'http',
      SCHEME: 'bearer',
      FORMAT: 'JWT'
    }
  }
} as const; 