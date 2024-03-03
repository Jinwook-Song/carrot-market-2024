'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import SocialLogin from '@/components/SocialLogin';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';

export default function LogIn() {
  const [state, dispatch] = useFormState(handleForm, null);

  return (
    <main className='flex flex-col gap-10 px-6 py-8'>
      <section className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Log in with email and password</h2>
      </section>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={state?.errors}
        />
        {state?.sms && (
          <Input
            name='password'
            type='password'
            placeholder='Password'
            required
            errors={state?.errors}
          />
        )}

        <Button text='Sign In' />
      </form>

      <SocialLogin />
    </main>
  );
}
