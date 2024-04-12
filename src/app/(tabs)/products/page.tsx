import ProductList from '@/components/ProductList';
import { fetchProducts } from './actions';

export default async function Products() {
  const products = await fetchProducts({ page: 0 });
  return (
    <div>
      <ProductList initialProducts={products} />
    </div>
  );
}
