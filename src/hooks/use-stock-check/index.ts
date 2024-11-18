import { useCallback } from 'react';
import { productsApi } from '../../store/api/product-api';
import type { CartItem } from '../../types';

export const useStockCheck = () => {
  const [triggerStockCheck] = productsApi.endpoints.checkStock.useLazyQuery();

  const checkStockForItems = useCallback(async (items: CartItem[]) => {
    for (const item of items) {
      const { data, error } = await triggerStockCheck(item._id);
      if (error) {
        throw new Error(`Failed to check stock for ${item.name}`);
      }
      if (data && data.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name}`);
      }
    }
  }, [triggerStockCheck]);

  return checkStockForItems;
}; 