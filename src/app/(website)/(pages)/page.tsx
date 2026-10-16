"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [userName, setUserName] = useState<string>("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authStatus);

    if (authStatus) {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsed = JSON.parse(storedUserData);
          setUserName(parsed.name || "Merchant");
        } catch {
          setUserName("Merchant");
        }
      }
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const highlights = [
    {
      title: "Autonomous Shopping Assistant",
      badge: "Live Chat",
      desc: "Interactive customer shopping consultations with 1-click checkout cart links.",
      href: "/chat",
    },
    {
      title: "AI Copywriter & SEO Engine",
      badge: "Merchant Tool",
      desc: "Automate titles, clean product descriptions, sizing, and inventory tags.",
      href: "/create-product",
    },
    {
      title: "Competitor Market Benchmarking",
      badge: "n8n + VPS",
      desc: "Automated web scraping workflows tracking competitor pricing and margin gaps.",
      href: "/competitors",
    },
    {
      title: "Predictive Demand Forecaster",
      badge: "Forecasting",
      desc: "Time-series extrapolation predicting inventory velocity and expected stockouts.",
      href: "/forecast",
    },
    {
      title: "Autonomous AI Business Advisor",
      badge: "Advisor",
      desc: "Consolidating store data, reviews, and RFM tiers to deliver executive guidance.",
      href: "/advisor",
    },
    {
      title: "RFM Customer Segmentation",
      badge: "Analytics",
      desc: "Classifying shoppers into VIP, Loyal, and At-Risk tiers for targeted retention.",
      href: "/customers",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden py-10 px-6">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* ========================================================= */}
        {/* CASE A: LOGGED IN (Full Dashboard & Management Workspace) */}
        {/* ========================================================= */}
        {isLoggedIn ? (
          <>
            <section className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded-full text-xs font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Workspace
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  Welcome, <span className="text-emerald-400">{userName}</span>!
                </h1>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Your Shopify AI automation workspace is active. Manage products, run competitor benchmarking, and view predictive forecasts.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/catalog"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg cursor-pointer"
                  >
                    Browse Catalog →
                  </Link>
                  <Link
                    href="/chat"
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition-all cursor-pointer"
                  >
                    Launch AI Chatbot
                  </Link>
                </div>
              </div>

              {/* State & Clock Widget for Professor */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl min-w-[220px] text-center space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  System Clock
                </span>
                <p className="text-2xl font-mono font-extrabold text-emerald-400">
                  {currentTime || "--:--:--"}
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setClickCount((c) => c + 1)}
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Test State: {clickCount} Clicks
                  </button>
                </div>
              </div>
            </section>

            {/* Modules Grid */}
            <section className="space-y-4">
              <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Platform Modules & Autonomous Tools</h2>
                  <p className="text-xs text-slate-400">All 4 Phases operational for your store</p>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  ● Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl space-y-3 transition flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-emerald-400 border border-slate-700 rounded">
                        {item.badge}
                      </span>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                    <Link
                      href={item.href}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold pt-2 inline-flex items-center gap-1"
                    >
                      Explore Feature →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* ========================================================= */
          /* CASE B: LOGGED OUT (Clean, Sleek Public Landing Page)      */
          /* ========================================================= */
          <section className="py-16 text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
              Autonomous Commerce Platform
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Next-Gen AI Suite for <span className="text-emerald-400">Shopify Merchants</span>
            </h1>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Automate customer support with live conversational AI, optimize product SEO metadata, track competitor prices via n8n, and predict sales velocity.
            </p>

            <div className="flex justify-center items-center gap-4 pt-4">
              <Link
                href="/login"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-950 cursor-pointer"
              >
                Sign In to Workspace →
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl text-xs border border-slate-800 transition cursor-pointer"
              >
                Create Account
              </Link>
            </div>

            {/* Quick Public Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 text-left">
              <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                <span className="text-xl">🤖</span>
                <h4 className="text-sm font-bold text-white">AI Shopper Agent</h4>
                <p className="text-xs text-slate-400">Direct conversational consultations with 1-click checkout permalinks.</p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                <span className="text-xl">📈</span>
                <h4 className="text-sm font-bold text-white">Demand Forecasting</h4>
                <p className="text-xs text-slate-400">Time-series forecasting identifying inventory run-out dates.</p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                <span className="text-xl">⚡</span>
                <h4 className="text-sm font-bold text-white">Competitor Tracking</h4>
                <p className="text-xs text-slate-400">n8n scraping workers deployed on Hostinger VPS.</p>
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}