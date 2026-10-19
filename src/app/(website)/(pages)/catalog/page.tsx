"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  body_html: string;
  product_type: string;
  variants: Array<{
    id: number;
    price: string;
    title: string;
  }>;
  images: Array<{
    id: number;
    src: string;
  }>;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLiveProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();

      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setError(data.error || "Failed to load live catalog");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Live Store Catalog
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Synchronized directly with{" "}
              <span className="text-emerald-400 font-medium">
                brotherhood-f5g25mtk.myshopify.com
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLiveProducts}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              🔄 Refresh
            </button>
            <Link
              href="/create-product"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              + Create AI Product
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Fetching live products from Shopify...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-2xl text-xs text-red-300 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
            <p className="text-sm text-slate-300 font-semibold">
              No products found on Shopify yet.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Use the Create Product tool to generate and publish your first product!
            </p>
          </div>
        )}

        {/* Live Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const imageSrc =
  p.images?.[0]?.src ||
  `https://image.pollinations.ai/prompt/${encodeURIComponent(
    p.title + " commercial studio product photography, clean white background"
  )}?width=600&height=600&nologo=true`;
              const price = p.variants?.[0]?.price || "0.00";
              const category = p.product_type || "General";

              return (
                <div
                  key={p.id}
                  className="bg-[#0c142b]/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category Badge & Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 uppercase tracking-wider">
                        {category}
                      </span>
                      <span className="text-base font-black text-emerald-400">
                        ${price}
                      </span>
                    </div>

                    {/* Product Photo */}
                    <div className="w-full h-44 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
                      <img
                        src={imageSrc}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Title */}
                    <div>
                      <h3 className="font-bold text-sm text-white line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ● In Stock • Available in store
                      </p>
                    </div>
                  </div>

                  {/* Variants Count & Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {p.variants?.length || 1} Variant
                      {(p.variants?.length || 1) > 1 ? "s" : ""}
                    </span>
                    <a
                      href={`https://admin.shopify.com/store/brotherhood-f5g25mtk/products/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition"
                    >
                      Shopify View ➔
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}