"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// 1. Initial Default Store Products
const INITIAL_PRODUCTS = [
  { title: "CloudStride Running Shoes", price: "$120.00", tag: "Footwear" },
  { title: "Thermal Waterproof Ski Jacket", price: "$189.99", tag: "Apparel" },
  { title: "The Draft Snowboard (Carbon)", price: "$499.00", tag: "Winter" },
  { title: "Wireless Active Noise Earbuds", price: "$89.99", tag: "Gadgets" },
  { title: "Polarized UV Winter Goggles", price: "$59.00", tag: "Accessory" },
  { title: "Smart GPS Fitness Tracker", price: "$149.00", tag: "Wearables" },
];

export default function CatalogPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // 2. Load all newly created products from localStorage on page mount & focus
  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedData = localStorage.getItem("app_catalog_products");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Standardize format
            const customItems = parsed.map((item: any) => ({
              title: item.title || "Custom Product",
              price: item.price
                ? String(item.price).startsWith("$")
                  ? item.price
                  : `$${item.price}`
                : "$49.99",
              tag: item.tag || (item.category ? item.category.toUpperCase() : "GENERAL"),
              isNew: true,
            }));

            // Combine newly created items on top without duplicating
            setProducts((prev) => {
              const prevTitles = prev.map((p) => p.title);
              const uniqueCustom = customItems.filter(
                (item: any) => !prevTitles.includes(item.title)
              );
              return [...uniqueCustom, ...prev];
            });
          }
        }
      } catch (err) {
        console.error("Error reading catalog from localStorage:", err);
      }
    };

    loadProducts();

    // Listen for storage changes across tabs/windows
    window.addEventListener("storage", loadProducts);
    return () => window.removeEventListener("storage", loadProducts);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Live Store Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Inventory synchronized with e-commerce store catalog
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/create-product"
            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1 shadow-md"
          >
            <span>+</span> Create Product
          </Link>
          <span className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            Showing {products.length} items
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p: any, idx: number) => (
          <div
            key={idx}
            className={`bg-slate-900/90 border p-5 rounded-2xl space-y-3 transition shadow-lg ${
              p.isNew
                ? "border-emerald-500/50 hover:border-emerald-400 relative"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            {p.isNew && (
              <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                New
              </span>
            )}

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800/80 text-emerald-400 rounded-md border border-slate-700">
                {p.tag}
              </span>
              <span className="text-sm font-bold text-emerald-400">{p.price}</span>
            </div>

            <h3 className="text-base font-bold text-slate-100 leading-snug">
              {p.title}
            </h3>

            <p className="text-xs text-slate-400">
              In Stock • Available in store
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}