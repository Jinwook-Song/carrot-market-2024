import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: 'read:user,user:email',
    allow_signup: 'true',
  }).toString();

  const finalURL = `${baseURL}?${params}`;

  return redirect(finalURL);
}
