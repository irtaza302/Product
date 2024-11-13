import { createBrowserRouter } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { LoginForm } from '../components/auth/LoginForm';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import PrivateRoute from '../components/auth/PrivateRoute';
import Layout from '../components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: (
          <PrivateRoute requireAuth={false}>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'order-success',
        element: <OrderSuccessPage />,
      },
    ],
  },
]);