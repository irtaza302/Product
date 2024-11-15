import React, { useCallback, memo } from 'react';
import { Product } from '../../types';
import { ShoppingCart, Heart } from 'lucide-react';
import { PRODUCT_CONSTANTS } from '../../constants/productConstants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addToCart } from '../../store/slices/cartSlice';
import { useUpdateCartMutation } from '../../store/api/cartApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { calculateCartTotal } from '../../utils/cartUtils';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading = false }) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const [updateCart] = useUpdateCartMutation();

  const handleAddToCart = useCallback(async () => {
    dispatch(addToCart(product));
    
    if (auth.isAuthenticated) {
      try {
        const existingItem = cart.items.find(item => item._id === product._id);
        const updatedItems = existingItem
          ? cart.items.map(item => 
              item._id === product._id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...cart.items, { ...product, quantity: 1 }];
        
        await updateCart({
          items: updatedItems,
          total: calculateCartTotal(updatedItems)
        }).unwrap();
      } catch (error) {
        console.error('Failed to sync cart:', error);
      }
    }
  }, [dispatch, product, auth.isAuthenticated, cart.items, updateCart]);

  if (loading) {
    return (
      <div className="group relative bg-white rounded-2xl p-4 shadow-sm animate-pulse">
        <div className="aspect-square rounded-xl bg-gray-200" />
        <div className="mt-4 space-y-2">
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 w-full">
      <button 
        className="absolute right-6 top-6 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 relative w-full h-[280px]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy" // Add lazy loading for images
        />
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        
        <div className="text-sm">
          <span className={`${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 
              ? PRODUCT_CONSTANTS.STOCK_STATUS.IN_STOCK(product.stock)
              : PRODUCT_CONSTANTS.STOCK_STATUS.OUT_OF_STOCK}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-2 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>
            {product.stock > 0 
              ? PRODUCT_CONSTANTS.BUTTONS.ADD_TO_CART 
              : PRODUCT_CONSTANTS.STOCK_STATUS.OUT_OF_STOCK}
          </span>
        </button>
      </div>
    </div>
  );
};

export const MemoizedProductCard = memo(ProductCard);