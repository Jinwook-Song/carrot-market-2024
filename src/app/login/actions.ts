'use server';

import {
  ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@/libs/constants';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, ERROR_MESSAGE.password_regex),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
