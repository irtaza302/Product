import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce application',
      contact: {
        name: 'API Support',
        email: 'support@ecomstore.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/server/routes/*.ts'] // Path to the API routes
};

export const specs = swaggerJsdoc(options); 