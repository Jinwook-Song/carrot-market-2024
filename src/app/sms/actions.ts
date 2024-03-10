'use server';

import db from '@/libs/db';
import validator from 'validator';
import { z } from 'zod';
import crypto from 'crypto';
import twilio from 'twilio';
import { logInUser } from '@/libs/session';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone format'
  );

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: { token: token.toString() },
    select: { id: true },
  });

  return Boolean(exists);
}

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, 'This token does not exist');

async function createToken() {
  const token = crypto.randomInt(100000, 999999).toString();

  const exists = await db.sMSToken.findUnique({
    where: { token },
    select: { id: true },
  });

  if (exists) return createToken();
  return token;
}

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      const user = await db.user.findUnique({
        where: { phone: result.data },
        select: { id: true },
      });
      if (user) {
        await db.sMSToken.deleteMany({
          where: { userId: user.id },
        });
      }
      const token = await createToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone: result.data,
              },
            },
          },
        },
      });

      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await client.messages.create({
        to: process.env.MY_PHONE_NUMBER!,
        body: `Carrot Market verification code is ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      return {
        token: true,
      };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: { token: result.data.toString() },
        select: { id: true, userId: true },
      });
      await db.sMSToken.delete({ where: { id: token!.id } });
      await logInUser(token!.userId);
      return { token: false };
    }
  }
}
