import ProductList from '@/components/ProductList';
import { fetchProducts } from './actions';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

export default async function Products() {
  const products = await fetchProducts({ page: 0 });
  return (
    <div>
      <ProductList initialProducts={products} />
      <Link
        href={'/products/add'}
        className='fixed bg-orange-500 flex justify-center items-center rounded-full size-12 text-white bottom-24 right-4 hover:brightness-105 transition'
      >
        <PlusIcon className='size-8' />
      </Link>
    </div>
  );
}
