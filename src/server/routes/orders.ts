import express from 'express';
import { Order } from '../../models/Order.js';
import Product, { ProductDocument } from '../../models/Product.js';
import type { ErrorResponse } from '../../types/index.js';
import { AuthRequest, auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req: AuthRequest, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { items, shippingDetails, total } = req.body;
    if (!req.user) {
      throw new Error('Authentication required');
    }

    // Verify stock and update products
    for (const item of items) {
      const product = await Product.findById(item.product).session(session) as ProductDocument | null;
      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      // Update stock
      product.stock -= item.quantity;
      await product.save({ session });
    }
    
    // Create order
    const order = new Order({
      user: req.user.id,
      items,
      shippingDetails,
      total,
    });
    await order.save({ session });

    await session.commitTransaction();
    
    res.status(201).json({ 
      success: true, 
      order,
      message: 'Order placed successfully and stock updated' 
    });

  } catch (err) {
    await session.abortTransaction();
    const error = err as ErrorResponse;
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Error creating order' 
    });
  } finally {
    session.endSession();
  }
});

router.get('/check-stock/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId) as ProductDocument | null;
    if (!product) {
      throw new Error('Product not found');
    }
    res.json({ stock: product.stock });
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(404).json({ message: error.message });
  }
});

export default router; 