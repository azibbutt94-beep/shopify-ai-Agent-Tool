"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkAdmin = () => {
      const admin = localStorage.getItem("is_admin") === "true";
      setIsAdmin(admin);
    };

    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

  // 1. Customer-Facing Feature (Har kisi ke liye open)
  const customerModule = {
    badge: "Live Chat Shopping",
    title: "Autonomous Shopping Assistant",
    desc: "Interactive customer shopping consultations with instant product discovery, AI recommendations, and 1-click checkout cart links.",
    href: "/ai-chatbot",
    btnText: "Start Shopping with AI ➔",
  };

  // 2. Admin-Only Merchant Tools (Sirf Store Owner / Admin ke liye)
  const adminModules = [
    {
      badge: "Merchant Tool",
      title: "AI Copywriter & SEO Engine",
      desc: "Automate titles, clean product descriptions, sizing, and inventory tags.",
      href: "/create-product",
    },
    {
      badge: "n8n + VPS",
      title: "Competitor Market Benchmarking",
      desc: "Automated web scraping workflows tracking competitor pricing and margin gaps.",
      href: "/competitors",
    },
    {
      badge: "Forecasting",
      title: "Predictive Demand Forecaster",
      desc: "Time-series extrapolation predicting inventory velocity and expected stockouts.",
      href: "/forecast",
    },
    {
      badge: "Advisor",
      title: "Autonomous AI Business Advisor",
      desc: "Consolidating store data, reviews, and RFM tiers to deliver executive guidance.",
      href: "/advisor",
    },
    {
      badge: "Analytics",
      title: "RFM Customer Segmentation",
      desc: "Classifying shoppers into VIP, Loyal, and At-Risk tiers for targeted retention.",
      href: "/customers",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Platform Modules & Autonomous Tools
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              All 4 Phases operational for your store
            </p>
          </div>

          {!isAdmin && isMounted && (
            <Link
              href="/login"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl transition"
            >
              Merchant? Login as Admin ➔
            </Link>
          )}
        </div>

        {/* 1. VISITOR / CUSTOMER SECTION (Shopping Assistant Card) */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0c142b] border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                {customerModule.badge}
              </span>
              <h2 className="text-2xl font-bold text-white">
                {customerModule.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {customerModule.desc}
              </p>
              <div className="pt-2">
                <Link
                  href={customerModule.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  {customerModule.btnText}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MERCHANT / ADMIN ONLY TOOLS */}
        {isMounted && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Store Operations & Merchant Engine
              </h2>
              {!isAdmin && (
                <span className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  🔒 Locked for Customers
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminModules.map((m, idx) => (
                <div
                  key={idx}
                  className={`bg-[#0c142b]/80 border rounded-2xl p-6 space-y-4 transition flex flex-col justify-between ${
                    isAdmin
                      ? "border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 shadow-xl"
                      : "border-slate-800/60 opacity-60 bg-slate-950/40"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-blue-400 border border-slate-700">
                      {m.badge}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    {isAdmin ? (
                      <Link
                        href={m.href}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition inline-flex items-center gap-1"
                      >
                        Explore Feature ➔
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition inline-flex items-center gap-1.5"
                      >
                        <span>🔒</span> Admin Access Required (Login)
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}