'use client';

import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function Modal({ params }: { params: { id: string } }) {
  const router = useRouter();

  const onBackgroundTap = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  return (
    <section
      onClick={onBackgroundTap}
      className='absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0'
    >
      <button
        onClick={router.back}
        className='absolute right-5 top-5 text-neutral-200'
      >
        <XMarkIcon className='size-10' />
      </button>
      <div className='max-w-screen-sm h-1/2  flex justify-center w-full'>
        <div className='aspect-square  bg-neutral-700 text-neutral-200  rounded-md flex justify-center items-center'>
          <PhotoIcon className='h-28' />
        </div>
      </div>
    </section>
  );
}
