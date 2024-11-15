import { baseApi } from './baseApi';
import type { Product } from '../../types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      keepUnusedDataFor: 300, // Cache for 5 minutes
      providesTags: ['Products'],
    }),
    
    checkStock: builder.query<{ stock: number }, string>({
      query: (productId) => `/orders/check-stock/${productId}`,
      keepUnusedDataFor: 60, // Cache for 1 minute
    }),
  }),
  overrideExisting: false,
});

// Configure polling in the component instead
export const useGetProductsWithPolling = (pollingInterval?: number) => {
  return useGetProductsQuery(undefined, {
    pollingInterval: process.env.NODE_ENV === 'production' ? pollingInterval : undefined,
  });
};

export const {
  useGetProductsQuery,
  useCheckStockQuery,
  endpoints: productEndpoints,
} = productsApi; 