import React, { useCallback, memo, useState } from 'react';
import { Product } from '../../types';
import { ShoppingCart, Heart, Star, Loader2 } from 'lucide-react';
import { PRODUCT_CONSTANTS } from '../../../public/constants/productConstants';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { addToCart } from '@/store/slices/cartSlice';
import { useUpdateCartMutation } from '@/store/api/cart-api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { calculateCartTotal } from '@/utils/cart-utils';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, className }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const [updateCart] = useUpdateCartMutation();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const fallbackImage = '/images/placeholder-product.jpg';

  const handleAddToCart = useCallback(async () => {
    if (isAddingToCart) return;
    
    try {
      setIsAddingToCart(true);
      dispatch(addToCart(product));
      
      if (auth.isAuthenticated) {
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
        
        toast.success(PRODUCT_CONSTANTS.MESSAGES.ADDED_TO_CART);
      }
    } catch (error) {
      console.error('Failed to sync cart:', error);
      toast.error(PRODUCT_CONSTANTS.MESSAGES.FAILED_TO_ADD);
    } finally {
      setIsAddingToCart(false);
    }
  }, [dispatch, product, auth.isAuthenticated, cart.items, updateCart, isAddingToCart]);

  const isInCart = cart.items.some(item => item._id === product._id);
  const defaultRating = 4;
  const rating = typeof product.rating === 'number' ? product.rating : defaultRating;

  return (
    <div 
      className={`relative group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Wishlist Button */}
      <button 
        className="absolute right-3 top-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm 
                   hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Image Container */}
      <div className="relative w-full pt-[100%] rounded-t-xl overflow-hidden bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imageError ? fallbackImage : product.image} 
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-contain p-4
                     transition-all duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => setImageLoading(false)}
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
            Only {product.stock} left
          </span>
        )}
      </div>
      
      {/* Content Container */}
      <div className="p-3 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 flex-1">
            {product.name}
          </h3>
          <span className="text-base font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              aria-hidden="true"
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>
        
        {/* Stock Status */}
        <div className="text-xs">
          <span className={`${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          } font-medium`}>
            {product.stock > 0 
              ? PRODUCT_CONSTANTS.STOCK_STATUS.IN_STOCK(product.stock)
              : PRODUCT_CONSTANTS.STOCK_STATUS.OUT_OF_STOCK}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
          className={`w-full flex items-center justify-center gap-2 
                     ${isInCart ? 'bg-green-600' : 'bg-gradient-to-r from-primary-600 to-secondary-600'}
                     text-white py-2 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group`}
          aria-label={`${isInCart ? 'Added to cart' : 'Add to cart'}: ${product.name}`}
        >
          {isAddingToCart ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">
                {isInCart 
                  ? PRODUCT_CONSTANTS.BUTTONS.IN_CART
                  : product.stock > 0 
                    ? PRODUCT_CONSTANTS.BUTTONS.ADD_TO_CART 
                    : PRODUCT_CONSTANTS.STOCK_STATUS.OUT_OF_STOCK}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export const MemoizedProductCard = ProductCard;