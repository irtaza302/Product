import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from '@/store/slices/cart-slice/cartSlice';
import authReducer from '@/store/slices/auth-slice/authSlice';
import { baseApi } from '@/store/api/base-api';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;