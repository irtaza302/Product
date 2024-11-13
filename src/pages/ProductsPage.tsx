import React from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import { api } from '../services/api';
import { Loader2 } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.products.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
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
          <p className="text-xl text-red-600">{error}</p>
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
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage; 