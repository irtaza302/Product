import { AppRouteObject } from '../types/route';
import { ProductsPage, CartPage, CheckoutPage, OrderSuccessPage, LoginForm } from './constants';

export const routeConfig: AppRouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true as const,
        Component: ProductsPage,
      },
      {
        path: 'login',
        Component: LoginForm,
        index: false as const,
      },
      {
        path: 'cart',
        Component: CartPage,
        index: false as const,
      },
      {
        path: 'checkout',
        Component: CheckoutPage,
        requireAuth: false,
        index: false as const,
      },
      {
        path: 'order-success',
        Component: OrderSuccessPage,
        index: false as const,
      },
    ],
  },
]; 