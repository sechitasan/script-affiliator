import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // service role key karena server-side
)

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId")

    let query = supabase
      .from("scripts")
      .select("id, content, created_at, is_publish")
      .order("created_at", { ascending: false })

    if (productId) {
      query = query.eq("product_id", productId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (err: any) {
    console.error("Error fetching scripts:", err.message)
    return NextResponse.json(
      { error: "Failed to fetch scripts" },
      { status: 500 }
    )
  }
}
