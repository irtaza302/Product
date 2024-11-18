import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from '@/components/error-boundary';
import { CartInitializer } from '@/components/cart/cartInitializer';
import { AuthPersist } from './components/auth/auth-persist';
import { router } from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AuthPersist />
        <CartInitializer />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
