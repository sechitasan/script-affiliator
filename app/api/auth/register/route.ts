import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { email, password, fullName } = await request.json()

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, password, dan nama lengkap harus diisi" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Kata sandi harus memiliki minimal 6 karakter" },
        { status: 400 }
      )
    }

    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName, // metadata user di auth
        },
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`, // redirect setelah verifikasi email
      },
    })

    if (authError) {
      console.error("Auth signup error:", authError)
      if (authError.message.includes("already registered")) {
        return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 })
      }
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (authData.user) {
      // Insert user data ke tabel users
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: authData.user.id, // id dari auth.users
          email: authData.user.email,
          name: fullName, // gunakan fullname dari input user
          created_at: new Date().toISOString(),
        },
      ])

      if (insertError) {
        console.error("Error inserting user data:", insertError)
        // tidak perlu return error, auth tetap sukses
      }

      return NextResponse.json({
        success: true,
        message: "Registrasi berhasil, silakan cek email untuk verifikasi.",
        user: authData.user,
      })
    }

    return NextResponse.json({ error: "Gagal membuat user" }, { status: 500 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
