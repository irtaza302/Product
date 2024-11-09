import axios from '../../config/axios';
import type { Product } from '../../types';
import { handleApiError } from '../../utils/errorHandler';

export const productService = {
  getAll: async () => {
    try {
      const response = await axios.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 