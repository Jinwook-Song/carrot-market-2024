import Avatar from '@/components/Avatar';
import DeleteButton from '@/components/DeleteButton';
import db from '@/libs/db';
import { formatPrice } from '@/libs/utils';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { createChatRoom } from './actions';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProudct(Number(params.id));
  return {
    title: product?.title,
  };
}

async function getProudct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const product = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const product = await getProudct(id);
  if (!product) return notFound();

  const deleteProduct = async () => {
    'use server';
    await db.product.delete({ where: { id } });
    redirect('/');
  };

  const onSubmit = async () => {
    'use server';
    await createChatRoom(product.userId);
  };

  return (
    <div>
      <div className='relative aspect-square max-h-[60vh] mx-auto'>
        <Image
          fill
          src={`${product.photo}/width=500,height=500`}
          alt={product.title}
          className='object-cover'
        />
      </div>
      <div className='p-5 flex items-center gap-3 border-b border-neutral-700'>
        <Avatar username={product.user.username} avatar={product.user.avatar} />
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className='p-5'>
        <h1 className='text-2xl font-semibold'>{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className='fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center'>
        <span className='font-semibold text-xl'>
          {formatPrice(product.price)}
        </span>
        <DeleteButton ownerId={product.userId} deleteProduct={deleteProduct} />
        <form action={onSubmit}>
          <button className='bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold'>
            채팅하기
          </button>
        </form>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { id: true },
  });
  return products.map((product) => ({ id: String(product.id) }));
}
