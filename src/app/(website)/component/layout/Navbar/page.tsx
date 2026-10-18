"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // User & Auth State
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  const syncAuthState = () => {
    try {
      const logged = localStorage.getItem("is_logged_in") === "true";
      const admin = localStorage.getItem("is_admin") === "true";
      const name = localStorage.getItem("user_name") || "";

      setIsLoggedIn(logged);
      setIsAdmin(admin);
      setUserName(name);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    setIsMounted(true);
    syncAuthState();

    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("user_name");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    window.location.href = "/login";
  };

  // Admin Tools (Sirf Admin ko dikhenge)
  const adminTabs = [
    { name: "Catalog", href: "/catalog", icon: "📦" },
    { name: "Orders", href: "/orders", icon: "🛍️" },
    { name: "+ Create Product", href: "/create-product", icon: "✨", highlight: true },
    { name: "Analytics", href: "/analytics", icon: "📊" },
    { name: "Reviews AI", href: "/reviews", icon: "⭐" },
    { name: "Customers RFM", href: "/customers", icon: "👥" },
    { name: "Competitors n8n", href: "/competitors", icon: "🤖" },
    { name: "Sales Forecast", href: "/forecast", icon: "📈" },
    { name: "AI Advisor", href: "/advisor", icon: "🧠" },
  ];

  return (
    <header className="border-b border-slate-800/80 bg-[#070b19]/95 backdrop-blur-md sticky top-0 z-50">
      {/* 1. MAIN TOP NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md group-hover:scale-105 transition-transform">
            🛍️
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Shopify<span className="text-emerald-400">AI</span>
          </span>
        </Link>

        {/* Public Links (Visible to customer) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-emerald-400 transition">
            About
          </Link>
          <Link href="/pricing" className="hover:text-emerald-400 transition">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">
            Contact
          </Link>
          {/* Customer yahin se direct AI Chatbot se order karega */}
          <Link
            href="/ai-chatbot"
            className="text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
          >
            <span>🤖</span> AI Chatbot
          </Link>
        </nav>

        {/* User Status / Login Button */}
        <div className="flex items-center gap-3">
          {isMounted && isLoggedIn ? (
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-400">
                Hi, {userName || (isAdmin ? "Admin" : "Customer")}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition pl-2 border-l border-slate-800 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 2. ADMIN-ONLY TOOLS BAR (Customer ko yeh patti nazar hi nahi aayegi) */}
      {isMounted && isAdmin && (
        <div className="border-t border-slate-800/60 bg-slate-950/60 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 min-w-max">
            {adminTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    tab.highlight
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold shadow-sm"
                      : isActive
                      ? "bg-slate-800 text-white font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="text-xs">{tab.icon}</span>
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}