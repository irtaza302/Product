import express from 'express';
import Product from '../../models/Product.js';
import type { ErrorResponse } from '../../types/index.js';
import { AuthRequest, auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(500).json({ message: error.message || 'Error fetching products' });
  }
});

router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      throw new Error('Authentication required');
    }
    
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(400).json({ message: error.message || 'Error creating product' });
  }
});

export default router; 