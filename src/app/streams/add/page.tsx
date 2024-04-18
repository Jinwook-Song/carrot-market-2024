'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useFormState } from 'react-dom';
import { startStream } from './actions';

export default function AddStream() {
  const [state, action] = useFormState(startStream, null);
  return (
    <form action={action} className='flex flex-col gap-2 p-5'>
      <Input
        name='title'
        required
        placeholder='Title or your stream.'
        errors={state?.formErrors}
      />
      <Button text='Start streaming' />
    </form>
  );
}
