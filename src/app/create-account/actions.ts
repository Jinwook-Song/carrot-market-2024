'use server';

import {
  ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@/libs/constants';
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
      .toLowerCase()
      .trim()
      .transform((username) => `--${username}--`)
      .refine(checkUsername, 'custom error'),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, ERROR_MESSAGE.password_regex),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
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
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
