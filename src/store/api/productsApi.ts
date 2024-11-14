import { baseApi } from './baseApi';
import type { Product } from '../../types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),

    checkStock: builder.query<{ stock: number }, string>({
      query: (productId) => `/orders/check-stock/${productId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCheckStockQuery,
  endpoints: productEndpoints,
} = productsApi; 