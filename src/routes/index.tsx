import { createBrowserRouter } from 'react-router-dom';
import { ProductsPage, CartPage, CheckoutPage, OrderSuccessPage } from '../pages';
import { LoginForm, PrivateRoute, Layout } from '../components';
import { NotFoundError } from '../components/errors/NotFoundError';
import { TestErrorComponent } from '../components/test-error-components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundError />,
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
      {
        path: 'test-error',
        element: <TestErrorComponent />,
      },
    ],
  },
]);