import express from 'express';
import { Order } from '../../models/Order.js';
import type { ErrorResponse } from '../../types/index.js';
import { AuthRequest, auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { items, shippingDetails, total } = req.body;
    if (!req.user) {
      throw new Error('Authentication required');
    }
    
    const order = new Order({
      user: req.user.id,
      items,
      shippingDetails,
      total,
    });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(400).json({ success: false, message: error.message || 'Error creating order' });
  }
});

export default router; 