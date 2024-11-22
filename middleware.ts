import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/hr') || pathname.startsWith('/accounting') || pathname.startsWith('/projects') || pathname.startsWith('/sales-purchases') || pathname.startsWith('/inventory') || pathname.startsWith('/reports')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/hr/:path*', '/accounting/:path*', '/projects/:path*', '/sales-purchases/:path*', '/inventory/:path*', '/reports/:path*'],
};
