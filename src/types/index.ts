import { ORDER_STATUS } from '../constants/index.js';
import type { UserDocument } from '../models/User.js';

// Public user type (without sensitive data)
export type User = Pick<UserDocument, 'id' | 'name' | 'email'>;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user: string;
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Add ErrorResponse type
export interface ErrorResponse extends Error {
  status?: number;
  code?: string;
  data?: unknown;
} 