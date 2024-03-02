'use server';

import { z } from 'zod';

interface CheckConfirmPasswordProps {
  password: string;
  confirmPassword: string;
}

const checkUsername = (username: string) => username.includes('carrot');
const checkConfirmPassword = ({
  password,
  confirmPassword,
}: CheckConfirmPasswordProps) => password == confirmPassword;

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Too short!')
      .max(10, 'Too long!')
      .refine(checkUsername, 'custom error'),
    email: z.string().email(),
    password: z.string().min(10),
    confirmPassword: z.string().min(10),
  })
  .refine(checkConfirmPassword, {
    message: 'Both password should be the same',
    path: ['confirmPassword'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
}
