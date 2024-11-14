import axios from '../../config/axios';
import type { Order, OrderItem, ShippingDetails } from '../../types';
import { handleApiError } from '../../utils/errorHandler';

export const orderService = {
  create: async (data: { 
    items: OrderItem[], 
    shippingDetails: ShippingDetails, 
    total: number 
  }): Promise<{ success: boolean, order: Order }> => {
    try {
      const response = await axios.post<{ success: boolean, order: Order }>('/orders', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  checkStock: async (productId: string): Promise<{ stock: number }> => {
    try {
      const response = await axios.get<{ stock: number }>(`/orders/check-stock/${productId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 