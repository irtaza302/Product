import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearUser } from '../../store/slices/authSlice';
import { ShoppingCart, LogOut } from 'lucide-react';
import type { CartItem } from '../../types';
import { UI_CONSTANTS } from '../../constants/uiConstants';

const getTotalItemsCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const Navbar: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="backdrop-blur-md bg-white/75 border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary-600 via-purple-500 to-secondary-600 bg-clip-text text-transparent">
              {UI_CONSTANTS.ECOMMERCE_STORE_NAME}
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 transition-all hover:scale-105"
            >
              {UI_CONSTANTS.PRODUCTS_LINK_TEXT}
            </Link>
            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-all group-hover:scale-110" />
              {getTotalItemsCount(cart.items) > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItemsCount(cart.items)}
                </span>
              )}
            </Link>
            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{auth.user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{UI_CONSTANTS.LOGOUT_TEXT}</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                {UI_CONSTANTS.LOGIN_LINK_TEXT}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;