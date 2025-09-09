import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const body = await req.json()
    const { provider, redirectTo } = body

    if (!provider) {
      return NextResponse.json({ error: "Provider diperlukan" }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo || `${req.nextUrl.origin}/auth/callback`
      }
    })

    if (error) {
      console.error('OAuth error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data.url) {
      return NextResponse.json({ error: "URL OAuth tidak ditemukan" }, { status: 500 })
    }

    return NextResponse.json({ 
      message: "OAuth redirect berhasil",
      url: data.url 
    }, { status: 200 })
  } catch (error: any) {
    console.error('OAuth unexpected error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
