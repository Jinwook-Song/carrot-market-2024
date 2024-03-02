import FormButton from '@/components/FormButton';
import FormInput from '@/components/FormInput';

export default function SMSLogin() {
  return (
    <main className='flex flex-col gap-10 px-6 py-8'>
      <section className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </section>
      <form className='flex flex-col gap-3'>
        <FormInput
          type='number'
          placeholder='Phone number'
          required
          errors={[]}
        />
        <FormInput
          type='number'
          placeholder='Verification code'
          required
          errors={[]}
        />
        <FormButton text='Verify' />
      </form>
    </main>
  );
}
