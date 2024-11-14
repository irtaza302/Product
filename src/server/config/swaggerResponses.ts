export const commonResponses = {
  UnauthorizedError: {
    description: 'Authentication failed',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Authentication failed'
            },
            code: {
              type: 'string',
              example: 'UNAUTHORIZED'
            }
          }
        }
      }
    }
  },
  NotFoundError: {
    description: 'Resource not found',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Resource not found'
            },
            code: {
              type: 'string',
              example: 'NOT_FOUND'
            }
          }
        }
      }
    }
  }
}; 