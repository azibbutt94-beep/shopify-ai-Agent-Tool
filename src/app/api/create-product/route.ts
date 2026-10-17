import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, tags, price, sku, barcode, inventory, category } = body;

    const rawDomain = process.env.SHOPIFY_STORE_DOMAIN || "";
    const token = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || "";

    if (!rawDomain || !token) {
      return NextResponse.json(
        { error: "Shopify credentials missing in environment variables" },
        { status: 500 }
      );
    }

    const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

    const shopifyRes = await fetch(
      `https://${domain}/admin/api/2024-01/products.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({
          product: {
            title: title || "New Product",
            body_html: description ? `<p>${description.replace(/\n/g, "<br/>")}</p>` : "",
            vendor: "Brotherhood",
            product_type: category || "General",
            tags: tags || "",
            status: "active",
            variants: [
              {
                price: price || "49.99",
                sku: sku || "",
                barcode: barcode || "",
                inventory_management: "shopify",
                inventory_quantity: parseInt(inventory || "10", 10),
              },
            ],
          },
        }),
      }
    );

    const data = await shopifyRes.json();

    if (!shopifyRes.ok) {
      return NextResponse.json(
        { error: data.errors || "Shopify API Error" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, product: data.product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}