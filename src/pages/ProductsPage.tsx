import React from 'react';
import { MemoizedProductCard } from '../components/product/ProductCard';
import { useGetProductsQuery } from '../store/api/productsApi';
import { Loader2 } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-red-600">Failed to fetch products</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-primary-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <MemoizedProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage; 