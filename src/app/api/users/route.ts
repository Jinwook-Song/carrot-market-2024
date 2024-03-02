import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const cookies = request.cookies;
  const data = await request.json();
  console.log(cookies, data);
  return Response.json({ ok: true, data, cookies });
}
