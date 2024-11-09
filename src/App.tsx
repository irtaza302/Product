import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { LoginForm } from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';
import OrderSuccessPage from './pages/OrderSuccessPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />
              <Route path="/order-success" element={<OrderSuccessPage />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
