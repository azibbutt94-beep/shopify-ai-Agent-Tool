import { NextResponse } from "next/server";


export async function GET() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || "brotherhood-f5g25mtk.myshopify.com";
  const token = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  const res = await fetch(`https://${storeDomain}/admin/api/2024-01/products.json?status=active`, {
    headers: {
      "X-Shopify-Access-Token": token || "",
    },
    cache: "no-store", // Hamesha fresh products layega
  });

  const data = await res.json();
  return NextResponse.json({ products: data.products || [] });
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      price,
      category,
      imageUrl,
      colors = [],
      sizes = [],
    } = body;

    const storeDomain =
      process.env.SHOPIFY_STORE_DOMAIN?.replace(/"/g, "").trim() ||
      "brotherhood-f5g25mtk.myshopify.com";

    // Direct token priority (shpua_ or shpat_)
    const accessToken =
      process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN?.replace(/"/g, "").trim() ||
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.replace(/"/g, "").trim();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Shopify Admin Access Token missing in .env.local" },
        { status: 500 }
      );
    }

    const cleanTitle = title || "Modern Product";
    const autoImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      cleanTitle +
        " isolated commercial product shot on white background, no human face, studio product photography, clean 4k"
    )}?width=800&height=800&nologo=true`;

    const finalImageSrc =
      imageUrl && imageUrl.trim() !== "" ? imageUrl : autoImage;

    // 🎨 Prepare Options & Variants Structure for Shopify
    const finalColors = colors.length > 0 ? colors : ["Default"];
    const hasMultipleSizes =
      sizes.length > 0 &&
      !(sizes.length === 1 && (sizes[0] === "Standard" || sizes[0] === "One Size"));

    const options = [];
    options.push({ name: "Color", values: finalColors });
    if (hasMultipleSizes) {
      options.push({ name: "Size", values: sizes });
    }

    // Build combinations of variants
    const variants = [];
    if (hasMultipleSizes) {
      for (const col of finalColors) {
        for (const sz of sizes) {
          variants.push({
            option1: col,
            option2: sz,
            price: String(price || "89.99"),
            requires_shipping: true,
          });
        }
      }
    } else {
      for (const col of finalColors) {
        variants.push({
          option1: col,
          price: String(price || "89.99"),
          requires_shipping: true,
        });
      }
    }

    const shopifyUrl = `https://${storeDomain}/admin/api/2024-01/products.json`;

    const productPayload = {
      product: {
        title: cleanTitle,
        body_html:
          description || "<p>Premium product crafted with high quality standards.</p>",
        product_type: category || "Gadgets",
        status: "active",              // Direct Active
        published_scope: "global",      // Live on online store
        options: options,
        variants: variants,
        images: [
          {
            src: finalImageSrc,
          },
        ],
      },
    };

    const res = await fetch(shopifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify(productPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Shopify API Rejection:", data);
      return NextResponse.json(
        { error: data.errors || "Failed to publish to Shopify" },
        { status: res.status }
      );
    }

    console.log("✅ Product & Variants Listed Successfully:", data.product.id);

    return NextResponse.json({
      success: true,
      product: data.product,
      productId: data.product.id,
      variantCount: data.product.variants?.length || 1,
      imageUrl: data.product.images?.[0]?.src || finalImageSrc,
    });
  } catch (error: any) {
    console.error("❌ Server Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}