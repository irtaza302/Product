import mongoose, { ConnectOptions } from 'mongoose';
import { MESSAGES } from '../constants/messages';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error(MESSAGES.ERRORS.MONGO_URI_NOT_DEFINED);
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
      // Add these options for Vercel deployment
      bufferCommands: false,
      maxPoolSize: 10,
    };

    // Close existing connections before creating new one
    if (mongoose.connections[0].readyState) {
      await mongoose.disconnect();
    }

    await mongoose.connect(uri, options as ConnectOptions);
    
    // Add connection error handler
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

export default connectDB; 