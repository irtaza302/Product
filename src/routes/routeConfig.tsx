import { lazy } from 'react';
import Layout from '../components/layout/Layout';

// Lazy load components
export const ProductsPage = lazy(() => import('../pages/ProductsPage'));
export const CartPage = lazy(() => import('../pages/CartPage'));
export const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
export const OrderSuccessPage = lazy(() => import('../pages/OrderSuccessPage'));
export const LoginForm = lazy(() => import('../components/auth/LoginForm'));

// Define routes configuration
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        Component: ProductsPage,
      },
      {
        path: 'login',
        Component: LoginForm,
      },
      {
        path: 'cart',
        Component: CartPage,
      },
      {
        path: 'checkout',
        Component: CheckoutPage,
        requireAuth: false,
      },
      {
        path: 'order-success',
        Component: OrderSuccessPage,
      },
    ],
  },
]; 