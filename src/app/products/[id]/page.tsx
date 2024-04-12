import Avatar from '@/components/Avatar';
import db from '@/libs/db';
import getSession from '@/libs/session';
import { formatPrice } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

async function getIsOwner(userId: number) {
  const session = await getSession();
  return session.id === userId;
}

async function getProudct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
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

  const isOwner = await getIsOwner(product.userId);
  const deleteProduct = async () => {
    'use server';
    await db.product.delete({ where: { id } });
    redirect('/');
  };

  return (
    <div>
      <div className='relative aspect-square max-h-[60vh] mx-auto'>
        <Image fill src={product.photo} alt={product.title} />
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
        {isOwner && (
          <form action={deleteProduct}>
            <button className='bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold'>
              Delete
            </button>
          </form>
        )}
        <Link
          className='bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold'
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}