// app/api/save-script/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // service role key karena server-side
)

export async function POST(req: Request) {
  try {
    const { userId, productId, scripts } = await req.json()

    if (!userId || !productId || !scripts || !Array.isArray(scripts)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    // Bentuk rows untuk insert
    const rows = scripts.map((script: string) => ({
      user_id: userId,
      product_id: productId,
      content: script,
    }))

    const { data, error } = await supabase.from("scripts").insert(rows).select()

    if (error) {
      console.error(error)
      return NextResponse.json({ error: "Failed to save scripts" }, { status: 500 })
    }

    return NextResponse.json({ success: true, count: data.length, data })
  } catch (err) {
    console.error("Save script error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
