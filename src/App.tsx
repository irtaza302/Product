import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary, CartInitializer } from './components';
import { router } from './routes';

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
