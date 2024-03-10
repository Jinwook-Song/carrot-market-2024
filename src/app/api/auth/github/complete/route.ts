import db from '@/libs/db';
import { logInUser } from '@/libs/session';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (!code)
    return new Response(null, {
      status: 400,
    });

  const accessTokenURL = 'https://github.com/login/oauth/access_token';
  const accessTokenParmas = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const finalURL = `${accessTokenURL}?${accessTokenParmas}`;

  const { error, access_token } = await (
    await fetch(finalURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const useProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-cache',
  });

  // Email info
  /*   const emails = (await (
    await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-cache',
    })
  ).json()) as Array<any>;

  const { email } = emails.filter((email) => email.primary)[0]; */

  const {
    id,
    avatar_url: avatar,
    login: username,
  } = await useProfileResponse.json();

  const githubId = id.toString();

  const user = await db.user.findUnique({
    where: { githubId },
    select: { id: true },
  });

  if (user) await logInUser(user.id);

  const newuser = await db.user.create({
    data: {
      username,
      githubId,
      avatar,
    },
  });

  await logInUser(newuser.id);
}
