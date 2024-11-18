import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import { calculateCartTotal } from '../../utils/cart-utils';
import { clearUser } from './authSlice';

interface CartState {
  items: CartItem[];
  total: number;
}

const saveCartToLocalStorage = (items: CartItem[], total: number) => {
  try {
    localStorage.setItem('cart', JSON.stringify({ items, total }));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : { items: [], total: 0 };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [], total: 0 };
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.total = calculateCartTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.total = calculateCartTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },
    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.itemId);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
      }
      state.total = calculateCartTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
    updateCartFromServer: (state, action: PayloadAction<{ items: CartItem[]; total: number }>) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      saveCartToLocalStorage(state.items, state.total);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearUser, (state) => {
      state.items = [];
      state.total = 0;
    });
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  updateCartFromServer 
} = cartSlice.actions;

export default cartSlice.reducer;