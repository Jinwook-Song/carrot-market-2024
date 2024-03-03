'use server';

import { z } from 'zod';

interface CheckConfirmPasswordProps {
  password: string;
  confirmPassword: string;
}

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
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
      .toLowerCase()
      .trim()
      .transform((username) => `--${username}--`)
      .refine(checkUsername, 'custom error'),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(6)
      .regex(
        passwordRegex,
        'A password must be have lowercase, UPPERCASE, a number and special characters.'
      ),
    confirmPassword: z.string().min(6),
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
  } else {
    console.log(result.data);
  }
}
