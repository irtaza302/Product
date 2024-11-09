import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/User.js';
import type { ErrorResponse } from '../../types/index.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
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
    const error = err as ErrorResponse;
    res.status(401).json({ message: error.message || 'Login failed' });
  }
});

export default router; 