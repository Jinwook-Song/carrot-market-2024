'use server';

import {
  ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@/libs/constants';
import db from '@/libs/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/libs/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An account with this email does not exist.'),
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

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const { email, password } = result.data;
    const user = (await db.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    }))!;

    const matched = await bcrypt.compare(password, user.password ?? '');
    if (matched) {
      const session = await getSession();
      session.id = user.id;
      await session.save();
      redirect('/profile');
    }

    return {
      fieldErrors: {
        email: [],
        password: ['Wrong password.'],
      },
    };
  }
}
