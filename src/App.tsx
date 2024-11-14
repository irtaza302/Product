import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './routes';
import { CartInitializer } from './components/cart/CartInitializer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <CartInitializer />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
