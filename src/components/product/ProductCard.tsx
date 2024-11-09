import React from 'react';
import { Product } from '../../types';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 w-full">
      <button className="absolute right-6 top-6 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all">
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      <div className="aspect-square overflow-hidden rounded-xl bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-2 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
        >
          <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}; 