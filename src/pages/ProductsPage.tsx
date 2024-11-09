import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '../components/product/ProductCard';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';
import axios from '../config/axios';
import { Loader2 } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products');
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

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-500 to-secondary-600 bg-clip-text text-transparent">
            Discover Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium products designed to enhance your lifestyle
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-6 rounded-2xl">
          <div className="flex gap-4">
            <select className="rounded-lg border-gray-200 focus:ring-2 focus:ring-primary-500">
              <option>All Categories</option>
              {/* Add categories */}
            </select>
            <select className="rounded-lg border-gray-200 focus:ring-2 focus:ring-primary-500">
              <option>Sort By</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:border-primary-600 transition-colors">
              Grid View
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:border-primary-600 transition-colors">
              List View
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-xl text-gray-600">No products available</p>
              <p className="text-gray-500">Check back later for new arrivals</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage; 