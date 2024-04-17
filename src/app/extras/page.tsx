import HackedComponent from '@/components/HackedComponent';
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from 'react';

async function getData() {
  const keys = {
    apiKey: '123123',
    secret: 'secret',
  };

  // 항상 server단에만 남아있어야 하는 데이터
  // experimental_taintObjectReference('API Keys leaked', keys);
  experimental_taintUniqueValue('Secret key was exposed', keys, keys.secret);
  return keys;
}

export default async function Extras() {
  const data = await getData();

  return (
    <section className='flex flex-col gap-3 py-10'>
      <h1 className='text-5xl font-rubik'>Extras</h1>
      <h2 className='font-spoca'>more things</h2>
      <HackedComponent data={data} />
    </section>
  );
}
