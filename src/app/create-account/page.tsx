'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import SocialLogin from '@/components/SocialLogin';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/libs/constants';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <main className='flex flex-col gap-10 px-6 py-8'>
      <section className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Fill in the form below to join!</h2>
      </section>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='username'
          type='text'
          placeholder='Username'
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text='Create account' />
      </form>
      <SocialLogin />
    </main>
  );
}
