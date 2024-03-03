import Button from '@/components/Button';
import Input from '@/components/Input';

export default function SMSLogin() {
  return (
    <main className='flex flex-col gap-10 px-6 py-8'>
      <section className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </section>
      <form className='flex flex-col gap-3'>
        <Input
          name='phone-number'
          type='number'
          placeholder='Phone number'
          required
          errors={[]}
        />
        <Input
          name='verification-code'
          type='number'
          placeholder='Verification code'
          required
          errors={[]}
        />
        <Button text='Verify' />
      </form>
    </main>
  );
}
