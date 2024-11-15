import mongoose from 'mongoose';
import { MESSAGES } from '../constants/messages';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error(MESSAGES.ERRORS.MONGO_URI_NOT_DEFINED);
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
    };

    await mongoose.connect(uri, options);

    // Test the connection
    await mongoose.connection.db?.admin().ping();
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

export default connectDB; 