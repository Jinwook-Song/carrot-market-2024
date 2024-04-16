import ProductList from '@/components/ProductList';
import { fetchProducts } from './actions';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import { unstable_cache as nextCache, revalidatePath } from 'next/cache';

export const metadata = {
  title: 'home',
};

const getCachedProducts = nextCache(
  (page: number) => fetchProducts({ page }),
  ['products'],
  { revalidate: 60 }
);

// export const dynamic = "force-dynamic";
export const revalidate = 60; // 60초 이후에 revalidate

export default async function Products() {
  // const products = await fetchProducts({ page: 0 });
  const products = await getCachedProducts(0);

  const revalidate = async () => {
    'use server';
    revalidatePath('/home');
  };
  return (
    <div>
      <ProductList initialProducts={products} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href={'/products/add'}
        className='fixed bg-orange-500 flex justify-center items-center rounded-full size-12 text-white bottom-24 right-4 hover:brightness-105 transition'
      >
        <PlusIcon className='size-8' />
      </Link>
    </div>
  );
}
