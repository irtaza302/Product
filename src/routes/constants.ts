import { lazy } from 'react';

export const ProductsPage = lazy(() => 
  import('../pages/ProductsPage').then(module => ({ default: module.default }))
);
export const CartPage = lazy(() => 
  import('../pages/CartPage').then(module => ({ default: module.default }))
);
export const CheckoutPage = lazy(() => 
  import('../pages/CheckoutPage').then(module => ({ default: module.default }))
);
export const OrderSuccessPage = lazy(() => 
  import('../pages/OrderSuccessPage').then(module => ({ default: module.default }))
);
export const LoginForm = lazy(() => 
  import('../components/auth/LoginForm').then(module => ({ default: module.default }))
); 