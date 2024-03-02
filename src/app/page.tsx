import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col justify-between items-center min-h-screen p-6'>
      <section className='my-auto *:font-medium flex flex-col items-center gap-2'>
        <span className='text-9xl'>🥕</span>
        <h1 className='text-4xl'>당근</h1>
        <h2 className='text-2xl'>당근 마켓에 어서오세요!</h2>
      </section>
      <section className='w-full flex flex-col items-center gap-3'>
        <Link href='/create-account' className='primary-btn py-2 text-lg'>
          시작하기
        </Link>
        <div className='flex gap-2'>
          <span>이미 계정이 있나요?</span>
          <Link href={'/login'} className='hover:underline'>
            로그인
          </Link>
        </div>
      </section>
    </div>
  );
}
