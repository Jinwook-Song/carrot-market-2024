'use server';

import { redirect } from 'next/navigation';

import {
  ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@/libs/constants';
import db from '@/libs/db';
import { z } from 'zod';
import getSession from '@/libs/session';

import bcrypt from 'bcrypt';
interface CheckConfirmPasswordProps {
  password: string;
  confirmPassword: string;
}

const checkUsernameUnique = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !Boolean(user);
};

const checkEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !Boolean(user);
};

const checkConfirmPassword = ({
  password,
  confirmPassword,
}: CheckConfirmPasswordProps) => password == confirmPassword;

const formSchema = z
  .object({
    username: z.string().toLowerCase().trim(),
    // .transform((username) => `--${username}--`)
    // .refine(checkUsernameUnique, 'This username is already in use.'),
    email: z.string().email().toLowerCase(),
    // .refine(
    //   checkEmailUnique,
    //   'There is an account already registered with this email.'
    // ),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, ERROR_MESSAGE.password_regex),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This username is already in use.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'There is an account already registered with this email.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
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

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { username, email, password: rawPassword } = result.data;
    const password = await bcrypt.hash(rawPassword, 12);
    const user = await db.user.create({
      data: {
        username,
        email,
        password,
      },
      select: { id: true },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/profile');
  }
}
