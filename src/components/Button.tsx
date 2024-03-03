'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className='primary-btn h-10'>
      {pending ? 'Loading...' : text}
    </button>
  );
}
