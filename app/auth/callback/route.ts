import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Handle the auth callback
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
      // Exchange the code for a session dengan timeout
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
      }
    }

    // Get the session to verify it was created
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Session error:', sessionError)
      return NextResponse.redirect(new URL('/?error=no_session', request.url))
    }

    // Success - redirect to dashboard or next URL
    return NextResponse.redirect(new URL(next, request.url))
  } catch (error) {
    console.error('Auth callback unexpected error:', error)
    return NextResponse.redirect(new URL('/?error=unexpected', request.url))
  }
}
