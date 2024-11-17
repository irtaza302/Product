import express from 'express';
import { Product } from '../../models/index.js';
import type { ErrorResponse } from '../../types/index.js';
import { AuthRequest, auth } from '../middleware/auth.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - image
 *         - category
 *         - stock
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated product ID
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Product price
 *         image:
 *           type: string
 *           description: Product image URL
 *         category:
 *           type: string
 *           description: Product category
 *         stock:
 *           type: number
 *           description: Available stock
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */

router.get('/', async (_req, res) => {
  try {
    const products = await Product.find({}).lean();
    if (!products) {
      throw new Error('No products found');
    }
    console.log('Products fetched successfully:', products.length);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    const error = err as ErrorResponse;
    res.status(500).json({ 
      message: error.message || 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
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