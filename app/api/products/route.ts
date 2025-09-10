import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

interface ProductPayload {
  name: string;
  description?: string;
  price: string;
  affiliate_fee: string;
  category_id: string | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // service role key karena server-side
)

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_category:category_id(name)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map category_name
    const mapped = data?.map((d) => ({
      ...d,
      category_name: (d as any).product_category?.name || null,
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, products } = body as { userId: string; products: ProductPayload[] };

    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Ambil semua nama produk yang sudah ada untuk user ini
    const { data: existingProducts, error: fetchError } = await supabase
      .from("products")
      .select("name")
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching existing products:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const existingNames = existingProducts?.map((p) => p.name.toLowerCase()) || [];
    const newNames = products.map((p) => p.name.toLowerCase());

    // Cek duplikat di database
    const duplicates = newNames.filter((name) => existingNames.includes(name));
    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: `Products with these names already exist: ${duplicates.join(", ")}` },
        { status: 400 }
      );
    }

    // Insert products
    const insertData = products.map((p) => ({
      user_id: userId,
      name: p.name,
      description: p.description || null,
      price: p.price,
      affiliate_fee: p.affiliate_fee,
      category_id: p.category_id || null,
    }));

    const { data, error } = await supabase.from("products").insert(insertData).select("*");

    if (error) {
      console.error("Error inserting products:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, name, description, price, affiliate_fee, category_id } = body;

  if (!id) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("products")
    .update({ name, description, price, affiliate_fee, category_id })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Product updated successfully" });
}