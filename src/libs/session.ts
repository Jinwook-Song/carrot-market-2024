import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return await getIronSession<SessionContent>(cookies(), {
    cookieName: 'carrot-market-2024',
    password: process.env.COOKIE_PASSWORD!,
  });
}
