import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

  // Hardcoded admin user ID
  const ADMIN_USER_ID = 'f97a9218-57da-49b0-92b5-07be3d18c70e'

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('=== MIDDLEWARE ADMIN CHECK ===')
    console.log('Path:', request.nextUrl.pathname)
    console.log('User:', user?.id)
    console.log('Expected:', ADMIN_USER_ID)
    
    if (!user) {
      console.log('No user - redirecting to signin')
      return NextResponse.redirect(new URL('/auth/signin?redirect=/admin', request.url))
    }

    // Check if user ID matches hardcoded admin ID
    if (user.id !== ADMIN_USER_ID) {
      console.log('User ID mismatch - redirecting to home')
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    console.log('Admin access granted in middleware')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
