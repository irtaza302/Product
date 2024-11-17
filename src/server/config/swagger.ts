import swaggerJsdoc from 'swagger-jsdoc';
import { SWAGGER_CONSTANTS } from '../../constants/swaggerConstants.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: SWAGGER_CONSTANTS.TITLE,
      description: SWAGGER_CONSTANTS.DESCRIPTION,
      version: SWAGGER_CONSTANTS.VERSION,
      contact: SWAGGER_CONSTANTS.CONTACT
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://product-mru.vercel.app/'
          : SWAGGER_CONSTANTS.SERVERS.DEV.URL,
        description: process.env.NODE_ENV === 'production'
          ? 'Production server'
          : SWAGGER_CONSTANTS.SERVERS.DEV.DESCRIPTION
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: SWAGGER_CONSTANTS.SECURITY.JWT.TYPE,
          scheme: SWAGGER_CONSTANTS.SECURITY.JWT.SCHEME,
          bearerFormat: SWAGGER_CONSTANTS.SECURITY.JWT.FORMAT
        }
      }
    }
  },
  apis: ['./src/server/routes/*.ts']
};

export const specs = swaggerJsdoc(options); 