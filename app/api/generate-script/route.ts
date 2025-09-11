import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { GoogleGenAI } from "@google/genai"

type GenerateScriptRequest = {
  productId: string
  productName?: string
  keyPoints: string[]
  tone?: string
  duration?: number
  contentType?: string
  openingLines?: string[]
  language?: string
  scriptCount?: number
  userId: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function fillPrompt(template: string, vars: Record<string, any>) {
  let filled = template
  for (const [key, value] of Object.entries(vars)) {
    const v = Array.isArray(value) ? value.join("\n") : value
    filled = filled.replace(new RegExp(`{${key}}`, "g"), String(v))
  }
  return filled
}

export async function POST(req: NextRequest) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  })

  try {
    const body: GenerateScriptRequest = await req.json()
    const {
      productId,
      productName,
      keyPoints,
      tone,
      duration,
      contentType,
      openingLines = [],
      scriptCount = 1,
      language,
      userId,
    } = body

    if (!productId || !keyPoints?.length || !userId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Ambil prompt template dari Supabase
    const { data, error } = await supabase
      .from("prompt")
      .select("text")
      .eq("code", "GENERATE_SCRIPT")
      .single()

    if (error || !data?.text) {
      return NextResponse.json({ message: "Prompt not found" }, { status: 404 })
    }

    // Hitung total script yang perlu digenerate
    const totalScript = scriptCount * (openingLines.length || 1)
       // Gabungkan parameter
    const parameters = {
      productName,
      keyPoints: keyPoints.join(", "),
      tone,
      duration,
      contentType,
      openingLines: openingLines.join("\n"),
      language,
      scriptCount: totalScript,
    }
    // Isi template dengan parameter → finalPrompt
    const finalPrompt = fillPrompt(data.text, parameters)

    // Panggil AI dengan prompt gabungan
    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash-preview-05-20",
      contents: finalPrompt,
    })

    const output = response.text?.trim() || ""
    return NextResponse.json({ output }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
