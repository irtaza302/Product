import mongoose from 'mongoose';
import { MESSAGES } from '@constants/messages';

let cachedConnection: typeof mongoose | null = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      maxIdleTimeMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    cachedConnection = mongoose;
    console.log(MESSAGES.SUCCESS.MONGODB_CONNECTED);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDB; 