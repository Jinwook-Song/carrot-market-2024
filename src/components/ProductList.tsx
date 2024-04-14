'use client';

import ProductItem from './ProductItem';
import { useEffect, useRef, useState } from 'react';
import { SimpleProducts, fetchProducts } from '@/app/(tabs)/home/actions';

interface ProductListProps {
  initialProducts: SimpleProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const isIntersecting = entries[0].isIntersecting;
        if (isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          await handleLoad();
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px',
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      {/* {!isLastPage && (
        <div
          style={{
            marginTop: `${(page + 1) * 300}vh`,
          }}
          className='w-fit mb-40 mx-auto active:scale-95 transition-transform'
        >
          <span
            ref={trigger}
            className='primary-btn whitespace-nowrap px-4 py-2'
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </span>
        </div>
      )} */}
    </div>
  );
}
