import React from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { MemoizedProductCard } from '../components/product/ProductCard';
import { useGetProductsWithPolling } from '../store/api/productsApi';

const ProductsPage: React.FC = () => {
  const { data: products = [], isLoading } = useGetProductsWithPolling(30000);
  const COLUMN_WIDTH = 300;
  const ROW_HEIGHT = 400;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8" style={{ height: 'calc(100vh - 100px)' }}>
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.floor(width / COLUMN_WIDTH);
          const rowCount = Math.ceil(products.length / columnCount);

          return (
            <FixedSizeGrid
              columnCount={columnCount}
              columnWidth={COLUMN_WIDTH}
              height={height}
              rowCount={rowCount}
              rowHeight={ROW_HEIGHT}
              width={width}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const product = products[index];
                
                if (!product) return null;

                return (
                  <div style={style}>
                    <MemoizedProductCard product={product} />
                  </div>
                );
              }}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default ProductsPage; 