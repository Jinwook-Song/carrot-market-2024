'use client';

import ProductItem from './ProductItem';
import { useState } from 'react';
import { SimpleProducts, fetchProducts } from '@/app/(tabs)/products/actions';

interface ProductListProps {
  initialProducts: SimpleProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    const newProducts = await fetchProducts({ page: page + 1 });

    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  return (
    <div className='flex flex-col gap-5 p-5'>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
      {!isLastPage && (
        <div className='w-fit mx-auto active:scale-95 transition-transform'>
          <button
            onClick={handleLoad}
            disabled={isLoading}
            className='primary-btn whitespace-nowrap px-4 py-2'
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
}
