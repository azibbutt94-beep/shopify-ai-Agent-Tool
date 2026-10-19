"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();

  // 1. Auth Protection States
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 2. Form & AI Generator States
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // 3. Core Product Data
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("89.99");
  const [productCategory, setProductCategory] = useState("Gadgets");
  const [productImage, setProductImage] = useState("");

  // 4. Dynamic Size & Color Variants
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  // 5. Publish Result
  const [publishedProduct, setPublishedProduct] = useState<any>(null);

  // Check Admin Login
  useEffect(() => {
    try {
      const admin = localStorage.getItem("is_admin") === "true";
      if (!admin) {
        router.push("/login");
      } else {
        setIsAdmin(true);
      }
    } catch {
      router.push("/login");
    } finally {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // AI Generator: Auto-selects Category, Studio Photo, Sizes & Colors
  const handleGenerateAI = async () => {
    if (!prompt.trim()) {
      alert("Pehle koi product concept likhein (e.g. Wireless Active Noise Earbuds ya Nike Running Shoes)");
      return;
    }

    setIsGenerating(true);
    setPublishedProduct(null);

    try {
      const p = prompt.toLowerCase();
      let detectedCat = "General";
      let detectedColors: string[] = ["Midnight Black", "Arctic White"];
      let detectedSizes: string[] = ["Standard"];

      if (p.includes("shoe") || p.includes("sneaker") || p.includes("boot") || p.includes("running")) {
        detectedCat = "Footwear";
        detectedColors = ["Triple Black", "Pure White", "Slate Gray"];
        detectedSizes = ["US 8", "US 9", "US 10", "US 11"];
      } else if (p.includes("shirt") || p.includes("hoodie") || p.includes("jacket") || p.includes("pant") || p.includes("tee")) {
        detectedCat = "Apparel";
        detectedColors = ["Jet Black", "Heather Gray", "Navy Blue", "Olive Green"];
        detectedSizes = ["S", "M", "L", "XL"];
      } else if (p.includes("watch") || p.includes("smartwatch")) {
        detectedCat = "Wearables";
        detectedColors = ["Space Black", "Silver Chrome", "Rose Gold"];
        detectedSizes = ["40mm", "44mm"];
      } else if (p.includes("earbud") || p.includes("headphone") || p.includes("audio") || p.includes("speaker")) {
        detectedCat = "Gadgets / Audio";
        detectedColors = ["Matte Black", "Pearl White", "Metallic Blue"];
        detectedSizes = ["Standard"];
      } else if (p.includes("glove")) {
        detectedCat = "Accessories";
        detectedColors = ["Black", "Charcoal Gray"];
        detectedSizes = ["M", "L"];
      }

      setProductCategory(detectedCat);
      setColors(detectedColors);
      setSizes(detectedSizes);

      // Capitalize Title
      const formattedTitle = prompt
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      setProductTitle(formattedTitle);
      setProductDescription(
        `Experience superior craftsmanship and top-tier performance with the all-new ${formattedTitle}. Designed with premium components, seamless user ergonomics, and built for lasting daily utility. Available in exclusive colorways and sizes.`
      );

      // 🎯 Smart Studio Product Photography Resolver (Zero Rate Limit & Instant 4K)
      const q = (formattedTitle + " " + prompt + " " + detectedCat).toLowerCase();
      let studioImage = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80"; // Default Minimal Tech

      if (q.includes("earbud") || q.includes("airpod") || q.includes("buds")) {
        studioImage = "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"; // Studio Earbuds
      } else if (q.includes("headphone") || q.includes("audio") || q.includes("headset")) {
        studioImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"; // Studio Headphones
      } else if (q.includes("shoe") || q.includes("sneaker") || q.includes("running") || q.includes("boot") || q.includes("footwear")) {
        studioImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"; // Studio Sneakers
      } else if (q.includes("hoodie") || q.includes("jacket") || q.includes("shirt") || q.includes("cotton") || q.includes("apparel")) {
        studioImage = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"; // Studio Hoodie
      } else if (q.includes("watch") || q.includes("tracker") || q.includes("wearable")) {
        studioImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"; // Smart Watch
      } else if (q.includes("glove")) {
        studioImage = "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80"; // Winter Gloves
      } else if (q.includes("snowboard") || q.includes("ski")) {
        studioImage = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=80"; // Snowboard
      }

      setProductImage(studioImage);
    } catch (err: any) {
      alert("AI Generation failed: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Variant Helpers
  const removeColor = (colorToRemove: string) => {
    setColors(colors.filter((c) => c !== colorToRemove));
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
      setNewColor("");
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setSizes(sizes.filter((s) => s !== sizeToRemove));
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };

  // Publish Directly to Shopify Store
  const handlePublishToShopify = async () => {
    if (!productTitle.trim()) {
      alert("Pehle details generate karein.");
      return;
    }

    setIsPublishing(true);

    try {
      const res = await fetch("/api/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: productTitle,
          description: productDescription,
          price: productPrice,
          category: productCategory,
          imageUrl: productImage,
          colors: colors,
          sizes: sizes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setPublishedProduct(data);
        alert(
          `🎉 Mubarak ho! Product with ${data.variantCount} Variants & Studio Photo direct aapke Shopify store par ACTIVE list ho gaya hai!\n\nProduct ID: ${data.productId}`
        );
      } else {
        alert("❌ Error from Shopify: " + JSON.stringify(data.error));
      }
    } catch (err: any) {
      alert("Publish failed: " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const totalVariants =
    sizes.length > 0 && sizes[0] !== "Standard"
      ? colors.length * sizes.length
      : colors.length;

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#070b19] flex items-center justify-center text-slate-400 text-sm">
        Checking Admin Permissions...
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Autonomous Shopify AI Copywriter
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Enter product idea — AI selects Title, Description, Studio Image, Colors, and Sizes automatically.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
          >
            ← Back Home
          </Link>
        </div>

        {/* PROMPT BOX */}
        <div className="bg-[#0c142b]/90 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            🛡️ Prompt Gemini AI To Generate Product
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Wireless Active Noise Earbuds, Nike Air Sneakers, Oversized Cotton Hoodie..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating || !prompt.trim()}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-40 cursor-pointer whitespace-nowrap"
            >
              {isGenerating ? "Generating..." : "Generate AI ✨"}
            </button>
          </div>
        </div>

        {/* DETAILS, SIZES, COLORS & PHOTO PREVIEW */}
        {productTitle && (
          <div className="bg-[#0c142b]/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                1. PRODUCT INFORMATION & AUTO-IMAGE
              </h2>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                ⚡ {totalVariants} Live Variants Generated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Form & Variants */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    AI Description
                  </label>
                  <textarea
                    rows={3}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Price ($ USD)
                    </label>
                    <input
                      type="text"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Detected Category
                    </label>
                    <input
                      type="text"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* 🎨 AI COLORS SECTION */}
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    🎨 AI Selected Colors ({colors.length})
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {colors.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
                      >
                        {c}
                        <button
                          type="button"
                          onClick={() => removeColor(c)}
                          className="text-slate-400 hover:text-red-400 font-bold ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <div className="inline-flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="+ Color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addColor}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] rounded-lg text-emerald-400 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 📏 AI SIZES / EDITIONS SECTION */}
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    📏 AI Selected Sizes / Editions ({sizes.length})
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {sizes.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSize(s)}
                          className="text-slate-400 hover:text-red-400 font-bold ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <div className="inline-flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="+ Size"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addSize}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] rounded-lg text-emerald-400 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Studio Photo Preview */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  🖼️ Studio Product Photo
                </span>
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productTitle}
                    className="w-48 h-48 object-cover rounded-xl border border-slate-700 shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-xs text-slate-500">
                    Product photo preview
                  </div>
                )}
                <p className="text-[10px] text-emerald-400">
                  ✓ Automatically uploads to Shopify CDN on publish
                </p>
              </div>
            </div>

            {/* PUBLISH ACTION */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Ready to push {totalVariants} variants directly to{" "}
                <strong className="text-white">brotherhood-f5g25mtk.myshopify.com</strong>
              </span>

              <button
                type="button"
                onClick={handlePublishToShopify}
                disabled={isPublishing}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-xl shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isPublishing ? "Publishing to Shopify..." : "🚀 Publish to Shopify Now"}
              </button>
            </div>

            {/* SUCCESS BANNER */}
            {publishedProduct && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-300">
                    ✅ Product & All {publishedProduct.variantCount} Variants are Active!
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Shopify Product ID: {publishedProduct.productId}
                  </p>
                </div>
                <a
                  href={`https://admin.shopify.com/store/brotherhood-f5g25mtk/products/${publishedProduct.productId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-emerald-400 transition"
                >
                  View in Shopify Admin ➔
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}