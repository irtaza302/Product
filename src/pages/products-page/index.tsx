import React, { useState } from 'react';
import { MemoizedProductCard } from '../../components';
import { useGetProductsQuery } from '../../store/api';
import { Search, X } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { data: products, isLoading, error } = useGetProductsQuery();

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestions = filteredProducts?.slice(0, 5) || [];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          setSearchTerm(suggestions[selectedIndex].name);
          setIsFocused(false);
        }
        break;
        
      case 'Escape':
        setIsFocused(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-red-600">Failed to fetch products</p>
          <p className="text-gray-500">Please check your connection and try again</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 
                     transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className={`relative group ${
              isFocused ? 'ring-2 ring-primary-500' : ''
            }`}>
              <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-200">
                <div className="flex-grow flex items-center">
                  <Search className={`w-5 h-5 ml-4 ${
                    isFocused ? 'text-primary-500' : 'text-gray-400'
                  } transition-colors duration-200`} />
                  <input
                    type="text"
                    placeholder="Search for products, brands, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                      setIsFocused(true);
                      setSelectedIndex(-1);
                    }}
                    onBlur={() => {
                      setTimeout(() => setIsFocused(false), 200);
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 text-gray-700 bg-transparent border-none rounded-xl focus:outline-none focus:ring-0 placeholder-gray-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 mr-2"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Suggestions */}
              {isFocused && searchTerm && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                    Suggested Products
                  </div>
                  {filteredProducts?.slice(0, 5).map((product, index) => (
                    <button
                      key={product._id}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors duration-150
                        ${selectedIndex === index ? 'bg-primary-50 text-primary-900' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setSearchTerm(product.name);
                        setIsFocused(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="text-sm text-gray-700">{product.name}</div>
                        <div className="text-xs text-gray-500">${product.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Stats */}
            {searchTerm && (
              <div className="mt-3 text-sm text-gray-500">
                Found {filteredProducts?.length} results for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
            {searchTerm && (
              <p className="text-gray-500 mt-2">
                Try adjusting your search terms or browse all products
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <MemoizedProductCard
                key={product._id}
                product={product}
                className="h-full transform hover:scale-[1.02] transition-transform duration-200"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage; 