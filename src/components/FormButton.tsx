interface FormButtonProps {
  text: string;
  disabled?: boolean;
}

export default function FormButton({ text, disabled }: FormButtonProps) {
  return (
    <button
      disabled={disabled}
      className='primary-btn h-10 disabled:opacity-30 disabled:cursor-not-allowed'
    >
      {text}
    </button>
  );
}
