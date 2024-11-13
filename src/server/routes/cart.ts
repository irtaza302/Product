import express from 'express';
import { UserModel } from '../../models/User.js';
import { auth, optionalAuth, AuthRequest } from '../middleware/auth.js';
import type { ErrorResponse } from '../../types/index.js';

const router = express.Router();

// Get user's cart - requires authentication
router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findById(req.user?.id).select('cart');
    res.json(user?.cart || { items: [], total: 0 });
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(400).json({ message: error.message });
  }
});

// Update user's cart - optional authentication
router.post('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { items, total } = req.body;
    
    // If user is authenticated, save to their cart
    if (req.user) {
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { cart: { items, total } },
        { new: true }
      ).select('cart');
      res.json(user?.cart);
    } else {
      // For non-authenticated users, just return success
      res.json({ items, total });
    }
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(400).json({ message: error.message });
  }
});

export default router; 