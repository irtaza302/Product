import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import { calculateCartTotal } from '../../utils/cartUtils';
import axios from '../../config/axios';
import type { RootState } from '../index';
import { clearUser } from './authSlice';

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
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

const initialState: CartState = {
  ...loadCartFromLocalStorage(),
  loading: false,
  error: null,
};

// Create async thunks
export const syncCart = createAsyncThunk(
  'cart/syncCart',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) return;

    await axios.post('/cart', {
      items: state.cart.items,
      total: state.cart.total,
    });
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await axios.get('/cart');
    return response.data;
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to sync cart';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.items;
          state.total = action.payload.total;
        } else {
          state.items = [];
          state.total = 0;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(clearUser, (state) => {
        state.items = [];
        state.total = 0;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;