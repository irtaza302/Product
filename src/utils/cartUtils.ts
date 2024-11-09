import { CartItem } from '../types';

export const calculateCartTotal = (items: CartItem[]): number => {
  return Number(items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2));
};

export const findCartItem = (items: CartItem[], productId: string): CartItem | undefined => {
  return items.find(item => item._id === productId);
};

export const updateCartItemQuantity = (
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] => {
  return items.map(item => 
    item._id === productId 
      ? { ...item, quantity: Math.max(0, quantity) }
      : item
  );
}; 