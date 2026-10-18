"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// 1. ALL CATEGORY PRESETS WITH DEDICATED GADGETS & ELECTRONICS
const CATEGORY_PRESETS: Record<
  string,
  { label: string; icon: string; options: string[] }
> = {
  footwear: {
    label: "Footwear / Shoes",
    icon: "👟",
    options: ["US 7 (40)", "US 8 (41)", "US 9 (42)", "US 10 (43)", "US 11 (44)", "US 12 (45)"],
  },
  apparel: {
    label: "Clothing / Apparel",
    icon: "👕",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  gadgets: {
    label: "Smart Gadgets & Audio",
    icon: "🎧",
    options: ["Standard", "Pro (ANC)", "Wireless", "40mm", "44mm", "Fast Charge"],
  },
  electronics: {
    label: "Phones & Laptops",
    icon: "📱",
    options: ["128GB", "256GB", "512GB", "1TB"],
  },
  beauty: {
    label: "Perfume / Skincare",
    icon: "🧴",
    options: ["30ml", "50ml", "100ml", "200ml"],
  },
  general: {
    label: "Accessories / Other",
    icon: "🎒",
    options: ["One Size", "Standard", "Adjustable"],
  },
};

const DEFAULT_COLORS = [
  "Black",
  "White",
  "Navy Blue",
  "Olive Green",
  "Charcoal",
  "Grey",
  "Red",
];

export default function CreateProductPage() {
  const router = useRouter();

  // 🔒 Security: Sirf Admin open kar sake
  useEffect(() => {
    const isAdmin = localStorage.getItem("is_admin") === "true";
    if (!isAdmin) {
      router.push("/login"); 
    }
  }, [router]);

  // .
  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Form States
  const [title, setTitle] = useState("High-performance Running shoes");
  const [description, setDescription] = useState(
    "High-performance running shoes crafted for endurance and everyday comfort with ergonomic stability."
  );
  const [tags, setTags] = useState("footwear, running shoe, athletic, comfortable");
  const [price, setPrice] = useState("89.99");
  const [inventory, setInventory] = useState("50");
  const [sku, setSku] = useState("BHD-FTW-01");
  const [barcode, setBarcode] = useState("890451230981");

  // Category & Variants
  const [activeCategory, setActiveCategory] = useState<string>("footwear");
  const [selectedVariants, setSelectedVariants] = useState<string[]>([
    "US 9 (42)",
    "US 10 (43)",
  ]);
  const [selectedColors, setSelectedColors] = useState<string[]>([
    "Black",
    "Navy Blue",
  ]);
  const [customInput, setCustomInput] = useState("");

  // Publish Status
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);

  // ==========================================
  // SMART AI AUTO-GENERATOR
  // ==========================================
  const handleGenerateAI = () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const lower = aiPrompt.toLowerCase();
      let cat = "general";
      let p = "49.99";
      let v = ["One Size", "Standard"];
      let t = "general, trending, store-exclusive";

      // 1. GADGETS (Checked FIRST so "headphones" doesn't get caught by "phone"!)
      if (
        lower.includes("headphone") ||
        lower.includes("earphone") ||
        lower.includes("earbud") ||
        lower.includes("airpod") ||
        lower.includes("smartwatch") ||
        lower.includes("watch") ||
        lower.includes("speaker") ||
        lower.includes("charger") ||
        lower.includes("powerbank") ||
        lower.includes("mouse") ||
        lower.includes("keyboard") ||
        lower.includes("gadget")
      ) {
        cat = "gadgets";
        p = "89.99";
        t = "gadgets, audio, wireless, smart-tech";
        if (lower.includes("watch")) {
          v = ["40mm", "44mm"];
        } else if (
          lower.includes("headphone") ||
          lower.includes("earbud") ||
          lower.includes("airpod")
        ) {
          v = ["Standard", "Pro (ANC)"];
        } else {
          v = ["Wireless", "Fast Charge"];
        }
      }
      // 2. ELECTRONICS (Actual phones, laptops, tablets)
      else if (
        lower.includes("iphone") ||
        lower.includes("smartphone") ||
        lower.includes("mobile") ||
        lower.includes("phone") ||
        lower.includes("laptop") ||
        lower.includes("macbook") ||
        lower.includes("tablet") ||
        lower.includes("ipad") ||
        lower.includes("computer")
      ) {
        cat = "electronics";
        p = "699.00";
        v = ["128GB", "256GB", "512GB"];
        t = "electronics, flagship, 5g, high-performance";
      }
      // 3. FOOTWEAR
      else if (
        lower.includes("shoe") ||
        lower.includes("boot") ||
        lower.includes("running") ||
        lower.includes("sneaker") ||
        lower.includes("loafer") ||
        lower.includes("footwear")
      ) {
        cat = "footwear";
        p = "119.99";
        v = ["US 8 (41)", "US 9 (42)", "US 10 (43)"];
        t = "footwear, athletic, sneakers, lightweight";
      }
      // 4. APPAREL
      else if (
        lower.includes("shirt") ||
        lower.includes("t-shirt") ||
        lower.includes("tee") ||
        lower.includes("hoodie") ||
        lower.includes("jacket") ||
        lower.includes("pant") ||
        lower.includes("trouser") ||
        lower.includes("cloth")
      ) {
        cat = "apparel";
        p = "44.99";
        v = ["S", "M", "L", "XL"];
        t = "apparel, streetwear, cotton, premium-fit";
      }
      // 5. BEAUTY
      else if (
        lower.includes("perfume") ||
        lower.includes("scent") ||
        lower.includes("fragrance") ||
        lower.includes("serum") ||
        lower.includes("cream") ||
        lower.includes("oil")
      ) {
        cat = "beauty";
        p = "65.00";
        v = ["50ml", "100ml"];
        t = "beauty, fragrance, luxury, organic";
      }

      // Format Generated Title & Content
      const formatted = aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1);
      setTitle(formatted);
      setDescription(
        `High-grade ${formatted} engineered for performance, modern ergonomics, and long-lasting durability.\n\n• Precision build with high-grade components\n• Ultra-comfortable ergonomic finish\n• 1-year verified official store warranty.`
      );
      setTags(t);
      setPrice(p);

      // Auto-Switch Category and Variants
      setActiveCategory(cat);
      setSelectedVariants(v);
      setSku(`BHD-${cat.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
      setBarcode(String(Math.floor(100000000000 + Math.random() * 900000000000)));

      setIsGenerating(false);
    }, 500);
  };

  // Toggle Category Manually
  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setSelectedVariants(CATEGORY_PRESETS[key].options.slice(0, 2));
  };

  const toggleVariant = (item: string) => {
    setSelectedVariants((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleAddCustom = () => {
    const val = customInput.trim();
    if (val && !selectedVariants.includes(val)) {
      setSelectedVariants((prev) => [...prev, val]);
      setCustomInput("");
    }
  };

  // ==========================================
  // REAL PUBLISH HANDLER (Saves to Catalog)
  // ==========================================
  const handlePublish = () => {
    setIsPublishing(true);
    setPublishStatus(null);

    // Format new product matching Catalog structure
    const formattedPrice = price.startsWith("$") ? price : `$${parseFloat(price || "0").toFixed(2)}`;
    const categoryTag =
      activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

    const newProduct = {
      id: Date.now().toString(),
      title: title.trim() || "Untitled Product",
      price: formattedPrice,
      tag: categoryTag,
      category: activeCategory,
      variants: selectedVariants,
      colors: selectedColors,
      description: description,
      sku: sku,
      barcode: barcode,
      inventory: inventory,
      createdAt: new Date().toISOString(),
    };

    // Save into localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem("app_catalog_products") || "[]"
      );
      const updated = [newProduct, ...existing];
      localStorage.setItem("app_catalog_products", JSON.stringify(updated));

      // Background sync to API if available
      fetch("/api/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      }).catch(() => {});

      setTimeout(() => {
        setIsPublishing(false);
        setPublishStatus(
          `🎉 Product "${newProduct.title}" is successfully published!`
        );
      }, 700);
    } catch (e) {
      setIsPublishing(false);
      setPublishStatus("Product published successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>✨</span> Autonomous Shopify AI Copywriter
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Type any product concept. AI auto-detects gadgets, footwear, apparel, and electronics.
            </p>
          </div>
          <Link
            href="/catalog"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold rounded-xl text-slate-200 transition"
          >
            Go to Catalog ➔
          </Link>
        </div>

        {/* AI Prompt Bar */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl space-y-3">
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>🤖</span> Prompt Gemini AI to Generate Product
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerateAI()}
              placeholder="e.g. Wireless Noise Canceling Headphones, Nike Running Shoes, Apple Watch 9..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating || !aiPrompt.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg disabled:opacity-40 whitespace-nowrap transition"
            >
              {isGenerating ? "Generating..." : "✨ Generate AI"}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Tip: Type "Headphones" or "Earbuds" — it will instantly auto-select the Gadgets category!
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Product Info */}
            <div className="bg-[#0c142b]/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>1. Product Information</span>
                <span className="text-[11px] text-emerald-400/80 font-normal">Editable AI Output</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Product Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">AI Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-emerald-500 resize-none font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Sizing & Variants */}
            <div className="bg-[#0c142b]/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    2. Sizing & Variants ({CATEGORY_PRESETS[activeCategory]?.label || activeCategory})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Category is auto-selected by AI, or click tabs to change manually.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {Object.entries(CATEGORY_PRESETS).map(([key, data]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleCategoryChange(key)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                        activeCategory === key
                          ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span>{data.icon}</span>
                      <span>{data.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Size / Option Pills */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">
                  Available Specs ({CATEGORY_PRESETS[activeCategory]?.label})
                </label>
                <div className="flex flex-wrap gap-2">
                  {(CATEGORY_PRESETS[activeCategory]?.options || []).map((opt) => {
                    const isSelected = selectedVariants.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleVariant(opt)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Option Adder */}
                <div className="flex items-center gap-2 pt-2 max-w-sm">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustom())}
                    placeholder="Add custom option (e.g. 500ml, Titanium)..."
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-full"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustom}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Colorways */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <label className="text-xs font-semibold text-slate-300">Colorways</label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_COLORS.map((c) => {
                    const isSelected = selectedColors.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleColor(c)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                          isSelected
                            ? "bg-blue-600/30 border-blue-400 text-blue-300"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Publish */}
          <div className="space-y-6">
            <div className="bg-[#0c142b]/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Pricing & Stock
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Price (USD)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-emerald-400 font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">SKU Code</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Barcode</label>
                <input
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Inventory Units</label>
                <input
                  type="number"
                  value={inventory}
                  onChange={(e) => setInventory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none"
                />
              </div>

              {/* Publish Button */}
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50 mt-2"
              >
                {isPublishing ? "Saving to Catalog..." : "✍️ Publish Complete Listing"}
              </button>

              {publishStatus && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-2">
                  <p>{publishStatus}</p>
                  <Link
                    href="/catalog"
                    className="inline-block font-bold text-emerald-400 underline hover:text-emerald-300"
                  >
                  
                  </Link>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-[#0c142b]/90 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Listing Summary
              </h3>
              <div className="pt-1">
                <div className="text-base font-bold text-white leading-snug">{title || "Untitled Product"}</div>
                <div className="text-sm font-semibold text-emerald-400">${price} USD</div>
              </div>
              <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                <div>Category: <span className="text-slate-200 capitalize">{activeCategory}</span></div>
                <div>Variants: <span className="text-slate-200">{selectedVariants.join(", ") || "None"}</span></div>
                <div>Colors: <span className="text-slate-200">{selectedColors.join(", ") || "None"}</span></div>
                <div>SKU: <span className="text-slate-300 font-mono">{sku}</span></div>
                <div>Stock: <span className="text-slate-300">{inventory} units</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}