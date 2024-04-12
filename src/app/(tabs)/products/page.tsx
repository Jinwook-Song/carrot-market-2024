import ProductList from '@/components/ProductList';
import db from '@/libs/db';

async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      photo: true,
    },
  });
  return products;
}

export default async function Products() {
  const products = await getProducts();
  return (
    <div className='flex flex-col gap-5 p-5'>
      {products.map((product) => (
        <ProductList key={product.id} {...product} />
      ))}
    </div>
  );
}
