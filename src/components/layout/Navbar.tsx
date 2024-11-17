import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearUser } from '../../store/slices/authSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { ShoppingCart, LogOut, Menu, X, ChevronDown } from 'lucide-react';
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
    <nav className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {UI_CONSTANTS.ECOMMERCE_STORE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-slate-300 hover:text-emerald-400 transition-colors ${
                location.pathname === '/' ? 'text-emerald-400' : ''
              }`}
            >
              {UI_CONSTANTS.PRODUCTS_LINK_TEXT}
            </Link>
            
            {/* Cart Button */}
            <button 
              onClick={() => navigate(cart.items.length ? '/cart' : '/')}
              className="relative p-2 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItemsCount(cart.items) > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItemsCount(cart.items)}
                </span>
              )}
            </button>

            {/* Auth Section */}
            {auth.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-900 font-medium">
                    {auth.user?.name.charAt(0)}
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl py-1 border border-slate-700">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-sm font-medium text-slate-200">{auth.user?.name}</p>
                      <p className="text-xs text-slate-400">{auth.user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 flex items-center space-x-2"
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
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
              >
                {UI_CONSTANTS.LOGIN_LINK_TEXT}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
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
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <div className="px-4 py-2 space-y-3">
            <Link 
              to="/"
              className="block text-slate-300 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {UI_CONSTANTS.PRODUCTS_LINK_TEXT}
            </Link>
            {auth.isAuthenticated ? (
              <div className="py-2 border-t border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-900 font-medium">
                    {auth.user?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{auth.user?.name}</p>
                    <p className="text-xs text-slate-400">{auth.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-3 w-full flex items-center space-x-2 text-red-400 hover:bg-slate-800 px-3 py-2 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{UI_CONSTANTS.LOGOUT_TEXT}</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="block text-center bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-medium"
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