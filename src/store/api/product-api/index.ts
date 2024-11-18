import { baseApi } from '../base-api';
import type { Product } from '../../../types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Products' as const, id: _id })),
            { type: 'Products' as const, id: 'LIST' },
          ]
          : [{ type: 'Products' as const, id: 'LIST' }],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products' as const, id }],
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