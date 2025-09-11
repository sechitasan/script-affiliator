import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // gunakan anon key
)

export async function PUT(req: NextRequest) {
  try {
    const { id, is_publish } = await req.json()
   
    if (!id || typeof is_publish !== "boolean") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { error } = await supabase
      .from("scripts")
      .update({ is_publish })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
