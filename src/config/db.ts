import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.VITE_MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(uri);
    
    console.log('\nMongoDB Connection Details:');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
  } catch (error) {
    console.error('\nMongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB; 