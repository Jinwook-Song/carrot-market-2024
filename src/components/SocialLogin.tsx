import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import githubIcon from '../../public/icons/github.svg';

export default function SocialLogin() {
  return (
    <Fragment>
      <div className='w-full h-px bg-neutral-500' />
      <section className='flex flex-col gap-3'>
        <Link
          className='primary-btn flex justify-center items-center h-10 gap-3'
          href={'/api/auth/github/start'}
        >
          <span>
            <Image alt='github' src={githubIcon} width={24} height={24} />
          </span>

          <span>Sign up with Github</span>
        </Link>
        <Link
          className='primary-btn flex justify-center items-center h-10 gap-3'
          href={'/sms'}
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className='size-6' />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </section>
    </Fragment>
  );
}
