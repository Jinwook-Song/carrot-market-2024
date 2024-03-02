import FormButton from '@/components/FormButton';
import FormInput from '@/components/FormInput';
import SocialLogin from '@/components/SocialLogin';

export default function LogIn() {
  return (
    <main className='flex flex-col gap-10 px-6 py-8'>
      <section className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Log in with email and password</h2>
      </section>
      <form className='flex flex-col gap-3'>
        <FormInput type='email' placeholder='Email' required errors={[]} />
        <FormInput
          type='password'
          placeholder='Password'
          required
          errors={[]}
        />

        <FormButton text='Sign In' />
      </form>
      <SocialLogin />
    </main>
  );
}
