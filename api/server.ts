import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Schema, model, models, connect, connection } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }
}, {
  timestamps: true
});

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  
  if (connection.readyState !== 1) {
    await connect(process.env.MONGO_URI);
  }
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    await connectDB();
    
    const Product = models.Product || model('Product', ProductSchema);
    const products = await Product.find({}).lean();
    
    return res.status(200).json(products);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default handler; 