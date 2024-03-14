import { NextRequest, NextResponse } from 'next/server';
import getSession from './libs/session';

const publicUrls = new Set(['/', '/login', '/sms', '/create-account']);

export async function middleware(request: NextRequest) {
  const isPublicPath = publicUrls.has(request.nextUrl.pathname);
  const isLoggedIn = Boolean((await getSession()).id);

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
