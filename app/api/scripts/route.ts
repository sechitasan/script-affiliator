import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // service role key karena server-side
)
export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("scripts")
      .select(`
        id,
        content,
        created_at,
        is_publish,
        product_id,
        products ( id, name )
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    // Kelompokkan berdasarkan product_id
    const grouped = data.reduce((acc: any, item: any) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = {
          ...item,
          script_count: 0, // inisialisasi counter
        }
      }
      acc[item.product_id].script_count++
      return acc
    }, {})

    // Ambil hanya 1 script terbaru per produk + total count
    const uniqueScripts = Object.values(grouped)
    return NextResponse.json(uniqueScripts)
  } catch (err: any) {
    console.error("Error fetching scripts:", err.message)
    return NextResponse.json(
      { error: "Failed to fetch scripts" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, content } = await req.json()

    if (!id || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { error } = await supabase
      .from("scripts")
      .update({ content })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}