import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearUser } from '../../store/slices/authSlice';
import { ShoppingCart, Search, LogOut } from 'lucide-react';
import type { CartItem } from '../../types';
import { UI_CONSTANTS } from '../../constants/uiConstants';
import { useSearchProductsQuery } from '../../store/api/apiSlice';
import { useDebounce } from '../../hooks/useDebounce';

const getTotalItemsCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const { data: searchResults, isLoading } = useSearchProductsQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });

  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={UI_CONSTANTS.SEARCH_PLACEHOLDER}
                className="w-full pl-12 pr-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${
                isLoading ? 'animate-spin text-primary-600' : 'text-gray-400'
              }`} />
              
              {/* Search Results Dropdown */}
              {searchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Rest of the navbar code remains the same */}
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