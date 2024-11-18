import { baseApi } from '../base-api';
import type { Order, OrderItem, ShippingDetails } from '../../../types';

interface CreateOrderRequest {
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  total: number;
}

interface CreateOrderResponse {
  success: boolean;
  order: Order;
  message: string;
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Cart', 'Products'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
} = ordersApi; 