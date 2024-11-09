import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    // Check if connection is established
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Failed to connect to MongoDB');
    }

    // Test the connection without using .db directly
    await mongoose.connection.db?.admin().ping();
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

export default connectDB; 