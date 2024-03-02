interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='w-full h-10 bg-transparent rounded-md ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 transition
          '
        type={type}
        required={required}
        placeholder={placeholder}
      />
      {errors.map((error, index) => (
        <span key={index} className='text-red-500 font-medium'>
          {error}
        </span>
      ))}
    </div>
  );
}
