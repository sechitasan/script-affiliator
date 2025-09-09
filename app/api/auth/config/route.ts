import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Cek environment variables yang diperlukan untuk OAuth
    const config = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'not set',
      nodeEnv: process.env.NODE_ENV,
    }

    return NextResponse.json({ 
      message: "Auth config check",
      config 
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
