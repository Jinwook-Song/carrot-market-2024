export default function Loading() {
  return (
    <div className='p-5 flex flex-col gap-5 animate-pulse'>
      {new Array(10).fill(true).map((_, index) => (
        <div key={index} className='*:rounded-md flex gap-5 animate-pulse'>
          <div className='bg-neutral-700 size-28' />
          <div className='*:rounded-md flex flex-col gap-2 '>
            <span className='bg-neutral-700 w-40 h-5' />
            <span className='bg-neutral-700 w-20 h-5' />
            <span className='bg-neutral-700 w-10 h-5' />
          </div>
        </div>
      ))}
    </div>
  );
}
