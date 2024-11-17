import swaggerJsdoc from 'swagger-jsdoc';
import { SWAGGER_CONSTANTS } from '@constants/swaggerConstants';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: SWAGGER_CONSTANTS.TITLE,
      version: SWAGGER_CONSTANTS.VERSION,
      description: SWAGGER_CONSTANTS.DESCRIPTION,
      contact: SWAGGER_CONSTANTS.CONTACT
    },
    servers: [
      {
        url: SWAGGER_CONSTANTS.SERVERS.DEV.URL,
        description: SWAGGER_CONSTANTS.SERVERS.DEV.DESCRIPTION
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            code: {
              type: 'string',
              description: 'Error code'
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    tags: [
      { name: SWAGGER_CONSTANTS.TAGS.AUTH, description: 'Authentication endpoints' },
      { name: SWAGGER_CONSTANTS.TAGS.PRODUCTS, description: 'Product management endpoints' },
      { name: SWAGGER_CONSTANTS.TAGS.ORDERS, description: 'Order management endpoints' },
      { name: SWAGGER_CONSTANTS.TAGS.CART, description: 'Shopping cart endpoints' }
    ]
  },
  apis: ['./src/server/routes/*.ts']
};

export const specs = swaggerJsdoc(options); 