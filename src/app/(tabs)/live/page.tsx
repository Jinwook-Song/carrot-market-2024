import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Live() {
  return (
    <div>
      <Link
        href={'/streams/add'}
        className='fixed bg-orange-500 flex justify-center items-center rounded-full size-12 text-white bottom-24 right-4 hover:brightness-105 transition'
      >
        <PlusIcon className='size-8' />
      </Link>
    </div>
  );
}
