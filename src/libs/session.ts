import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return await getIronSession<SessionContent>(cookies(), {
    cookieName: 'carrot-market-2024',
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function logInUser(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
  return redirect('/profile');
}
