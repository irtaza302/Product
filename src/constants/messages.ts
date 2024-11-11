export const MESSAGES = {
  ERRORS: {
    MONGO_URI_NOT_DEFINED: 'MONGO_URI is not defined in environment variables',
    JWT_SECRET_NOT_DEFINED: 'JWT_SECRET is not defined',
    FAILED_CONNECT_MONGODB: 'Failed to connect to MongoDB',
    AUTH_REQUIRED: 'Authentication required',
    NO_TOKEN: 'No token provided',
    USER_NOT_FOUND: 'User not found',
    AUTH_FAILED: 'Authentication failed',
    INVALID_CREDENTIALS: 'Invalid credentials',
    LOGIN_FAILED: 'Login failed',
    PRODUCT_NOT_FOUND: 'Product not found',
    EMAIL_PASSWORD_REQUIRED: 'Email and password are required',
    UNKNOWN_ERROR: 'An unknown error occurred',
    INSUFFICIENT_STOCK: (productName: string) => `Insufficient stock for ${productName}`,
    EMAIL_REQUIRED: 'Email and password are required',
    JWT_SECRET_MISSING: 'JWT_SECRET is not defined',
  },
  SUCCESS: {
    MONGODB_CONNECTED: 'MongoDB Connected Successfully',
    ORDER_PLACED: 'Order placed successfully and stock updated',
  },
} as const; 