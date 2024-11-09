import type { UserDocument } from '../models/User.js';

// Public user type (without sensitive data)
export type User = Pick<UserDocument, 'id' | 'name' | 'email'>;

export interface Product {
  id: string;
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

export interface ErrorResponse extends Error {
  message: string;
  code?: number;
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