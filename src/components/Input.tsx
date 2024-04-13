import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
}

function _Input(
  { name, errors = [], ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        ref={ref}
        name={name}
        className='w-full h-10 bg-transparent rounded-md ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 transition
          '
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className='text-red-500 font-medium'>
          {error}
        </span>
      ))}
    </div>
  );
}

export default forwardRef(_Input);
