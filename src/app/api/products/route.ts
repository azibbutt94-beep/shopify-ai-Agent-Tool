import { NextResponse } from "next/server";

export async function GET() {
  try {
    const storeDomain =
      process.env.SHOPIFY_STORE_DOMAIN?.replace(/"/g, "").trim() ||
      "brotherhood-f5g25mtk.myshopify.com";

    const accessToken =
      process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN?.replace(/"/g, "").trim() ||
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.replace(/"/g, "").trim();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token missing in .env.local" },
        { status: 500 }
      );
    }

    // Shopify se tamam active products fetch karein
    const res = await fetch(
      `https://${storeDomain}/admin/api/2024-01/products.json?limit=50&status=active`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        cache: "no-store", // Taake hamesha fresh live products load hon
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.errors || "Failed to fetch products" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      products: data.products || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}