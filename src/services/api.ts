import axios from '../config/axios';
import { Product, Order, ShippingDetails, OrderItem } from '../types';

export const api = {
  products: {
    getAll: () => axios.get<Product[]>('/products'),
    create: (product: Omit<Product, 'id'>) => axios.post<Product>('/products', product),
  },
  orders: {
    create: (data: { 
      items: OrderItem[], 
      shippingDetails: ShippingDetails, 
      total: number 
    }) => axios.post<{ success: boolean, order: Order }>('/orders', data),
  }
}; 