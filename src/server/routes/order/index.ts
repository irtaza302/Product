import express from 'express';
import { Order, Product } from '@/models/index.js';
import type { ErrorResponse } from '@/types/index.js';
import { AuthRequest, optionalAuth } from '@/server/middleware/auth/index.js';
import type { ProductDocument } from '@/models/product/index.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - items
 *         - shippingDetails
 *         - total
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated order ID
 *           example: "507f1f77bcf86cd799439011"
 *         user:
 *           type: string
 *           description: User ID (optional for guest checkout)
 *           example: "507f1f77bcf86cd799439012"
 *         items:
 *           type: array
 *           description: Array of order items
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         shippingDetails:
 *           $ref: '#/components/schemas/ShippingDetails'
 *         total:
 *           type: number
 *           description: Total order amount
 *           minimum: 0
 *           example: 99.99
 *         status:
 *           type: string
 *           description: Current order status
 *           enum:
 *             - pending
 *             - processing
 *             - shipped
 *             - delivered
 *           default: pending
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Order creation timestamp
 *           example: "2024-03-20T15:30:00Z"
 *     OrderItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: Reference to product ID
 *           example: "507f1f77bcf86cd799439013"
 *         quantity:
 *           type: number
 *           description: Quantity ordered
 *           minimum: 1
 *           example: 2
 *         price:
 *           type: number
 *           description: Price per item at time of order
 *           minimum: 0
 *           example: 29.99
 *     ShippingDetails:
 *       type: object
 *       required:
 *         - fullName
 *         - address
 *         - city
 *         - postalCode
 *         - country
 *       properties:
 *         fullName:
 *           type: string
 *           description: Customer's full name
 *           example: "John Doe"
 *         address:
 *           type: string
 *           description: Shipping street address
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           description: City name
 *           example: "New York"
 *         postalCode:
 *           type: string
 *           description: Postal/ZIP code
 *           example: "10001"
 *         country:
 *           type: string
 *           description: Country name
 *           example: "United States"
 *
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order with the provided items and shipping details
 *     tags: [Orders]
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
 *               - shippingDetails
 *               - total
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               shippingDetails:
 *                 $ref: '#/components/schemas/ShippingDetails'
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully and stock updated"
 *       400:
 *         description: Invalid input or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidInput:
 *                 value:
 *                   message: "Invalid input data"
 *                   code: "INVALID_INPUT"
 *               insufficientStock:
 *                 value:
 *                   message: "Insufficient stock for Product X"
 *                   code: "INSUFFICIENT_STOCK"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /api/orders/check-stock/{productId}:
 *   get:
 *     summary: Check product stock
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stock:
 *                   type: number
 *       404:
 *         description: Product not found
 */

router.post('/', optionalAuth, async (req: AuthRequest, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { items, shippingDetails, total } = req.body;
    
    // Create order with optional user ID
    const orderData = {
      ...(req.user && { user: req.user.id }), // Only include user if authenticated
      items,
      shippingDetails,
      total,
    };

    // Verify stock and update products
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save({ session });
    }
    
    const order = new Order(orderData);
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