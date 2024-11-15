import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { MESSAGES } from '../src/constants/messages';

// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error(MESSAGES.ERRORS.MONGO_URI_NOT_DEFINED);
    }

    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number
}, {
  timestamps: true
});

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    await connectDB();
    
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    const products = await Product.find({}).lean();
    
    res.status(200).json(products);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ 
      message: err instanceof Error ? err.message : 'Internal server error'
    });
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
};

export default handler; 