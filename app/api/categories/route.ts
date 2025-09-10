import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // service role key karena server-side
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("product_category")
      .select("id, name, description")
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
