import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/index.js';
import type { ErrorResponse } from '../../types/index.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and get token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, body: req.body });
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await user.comparePassword(password);
    console.log('Password validation:', { email, isValid: isValidPassword });

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    const error = err as ErrorResponse;
    res.status(401).json({ message: error.message || 'Login failed' });
  }
});

export default router; 