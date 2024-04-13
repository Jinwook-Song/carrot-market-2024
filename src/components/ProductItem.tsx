import { formatPrice, formatTimeAgo } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  createdAt: Date;
}

export default function ProductItem({
  id,
  title,
  price,
  photo,
  createdAt,
}: ProductItemProps) {
  return (
    <Link href={`/products/${id}`} className='flex gap-5'>
      <div className='relative size-28 rounded-md overflow-hidden'>
        <Image
          src={`${photo}/width=100,height=100`}
          alt={title}
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-1 *:text-white'>
        <span className='text-lg'>{title}</span>
        <span className='text-sm text-neutral-500'>
          {formatTimeAgo(createdAt)}
        </span>
        <span className='text-lg font-semibold'>{formatPrice(price)}</span>
      </div>
    </Link>
  );
}
