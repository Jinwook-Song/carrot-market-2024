import { formatPrice, formatTimeAgo } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProductListProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  createdAt: Date;
}

export default function ProductList({
  id,
  title,
  price,
  photo,
  createdAt,
}: ProductListProps) {
  return (
    <Link href={`products/${id}}`} className='flex gap-5'>
      <div className='relative size-28 rounded-md overflow-hidden'>
        <Image src={photo} alt={title} fill />
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
