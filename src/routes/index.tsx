import { createBrowserRouter } from 'react-router-dom';
import { ProductsPage, CartPage, CheckoutPage, OrderSuccessPage } from '../pages';
import { LoginForm, PrivateRoute, Layout } from '../components';

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