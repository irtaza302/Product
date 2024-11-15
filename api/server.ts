import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MESSAGES } from '../src/constants/messages';

const app = express();

// Initialize middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error(MESSAGES.ERRORS.MONGO_URI_NOT_DEFINED);
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

// Convert Express app to Vercel serverless function
const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    await connectDB();
    
    const Product = mongoose.model('Product', new mongoose.Schema({
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      stock: Number
    }));

    const products = await Product.find({}).lean();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ 
      message: err instanceof Error ? err.message : 'Error fetching products'
    });
  }
};

export default handler; 