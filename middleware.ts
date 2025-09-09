import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Daftar path yang bisa diakses tanpa login
  const publicPaths = ['/', '/auth/callback', '/', '/login', '/register', '/api/auth/config', '/verify-email']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // Skip auth check untuk public paths
  if (isPublicPath) {
    return res
  }

  // Skip auth check untuk API routes lainnya
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return res
  }

  try {
    // Refresh session jika sudah expired
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Jika user belum login dan mencoba akses protected paths
    if (!session) {
      // Redirect ke halaman utama
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch (error) {
    console.error('Middleware auth error:', error)
    // Jika terjadi error, redirect ke home untuk safety
    return NextResponse.redirect(new URL('/', request.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
