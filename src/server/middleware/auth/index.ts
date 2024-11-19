import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, UserDocument } from '@/models/user/index.js';
import type { ErrorResponse } from '@/types/index.js';

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: UserDocument;
  token?: string;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await UserModel.findById(decoded.id);
    
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    const error = err as ErrorResponse;
    res.status(401).json({ message: error.message || 'Authentication failed' });
  }
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return next();
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await UserModel.findById(decoded.id);
    
    if (user) {
      req.user = user;
    }
    
    next();
  } catch {
    next();
  }
}; 