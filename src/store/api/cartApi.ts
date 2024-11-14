import { baseApi } from './baseApi';
import type { CartItem } from '../../types';

interface CartResponse {
  items: CartItem[];
  total: number;
}

interface UpdateCartRequest {
  items: CartItem[];
  total: number;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),

    updateCart: builder.mutation<CartResponse, UpdateCartRequest>({
      query: (cart) => ({
        url: '/cart',
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
} = cartApi; 