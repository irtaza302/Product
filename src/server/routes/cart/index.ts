import express from 'express';
import { UserModel } from '../../../models/user/index.js';
import { auth, optionalAuth, AuthRequest } from '../../middleware/auth/index.js';
import type { ErrorResponse } from '../../../types/index.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 *         category:
 *           type: string
 *         stock:
 *           type: number
 *         quantity:
 *           type: number
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *   
 *   post:
 *     summary: Update user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - total
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CartItem'
 *               total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid input
 */

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
        { 
          $set: { 
            'cart.items': items,
            'cart.total': total
          }
        },
        { new: true }
      ).select('cart');

      if (!user) {
        throw new Error('User not found');
      }

      console.log('Cart updated for user:', user.id, user.cart);
      res.json(user.cart);
    } else {
      // For non-authenticated users, just return success
      res.json({ items, total });
    }
  } catch (err) {
    console.error('Cart update error:', err);
    const error = err as ErrorResponse;
    res.status(400).json({ message: error.message });
  }
});

export default router; 