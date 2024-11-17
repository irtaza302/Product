import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CartInitializer } from './components';
import { AuthPersist } from './components/auth/AuthPersist';
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
