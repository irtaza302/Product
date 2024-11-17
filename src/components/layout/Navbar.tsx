import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearUser } from '../../store/slices/authSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { ShoppingCart, LogOut, Menu, X, User, ChevronDown } from 'lucide-react';
import type { CartItem } from '../../types';
import { UI_CONSTANTS } from '@constants/uiConstants';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getTotalItemsCount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    setIsProfileOpen(false);
  };

  return (
    <nav className="backdrop-blur-md bg-white/80 border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-purple-500 to-secondary-600 bg-clip-text text-transparent">
              {UI_CONSTANTS.ECOMMERCE_STORE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-primary-600 transition-all hover:scale-105 ${
                location.pathname === '/' ? 'text-primary-600 font-medium' : ''
              }`}
            >
              {UI_CONSTANTS.PRODUCTS_LINK_TEXT}
            </Link>
            
            {/* Cart Button */}
            <button 
              onClick={() => navigate(cart.items.length ? '/cart' : '/')}
              className="relative group p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary-600" />
              {getTotalItemsCount(cart.items) > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-in fade-in duration-200">
                  {getTotalItemsCount(cart.items)}
                </span>
              )}
            </button>

            {/* Auth Section */}
            {auth.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white">
                    {auth.user?.name.charAt(0)}
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{auth.user?.name}</p>
                      <p className="text-xs text-gray-500">{auth.user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{UI_CONSTANTS.LOGOUT_TEXT}</span>
                    </button>
                  </div>
                )}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/"
              className="block text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {UI_CONSTANTS.PRODUCTS_LINK_TEXT}
            </Link>
            {auth.isAuthenticated ? (
              <>
                <div className="py-2 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white">
                      {auth.user?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{auth.user?.name}</p>
                      <p className="text-xs text-gray-500">{auth.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full flex items-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{UI_CONSTANTS.LOGOUT_TEXT}</span>
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login"
                className="block text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2.5 rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {UI_CONSTANTS.LOGIN_LINK_TEXT}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;