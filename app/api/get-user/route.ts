import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { message: "User not found", data: null },
        { status: 200 }
      )
    }

    return NextResponse.json({ message: "Success", data }, { status: 200 })
  } catch (err) {
    console.error("Error fetching user:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
