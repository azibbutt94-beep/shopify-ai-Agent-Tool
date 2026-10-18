"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // CONFIG: YOUR ADMIN EMAILS
  // ==========================================
  const ADMIN_EMAILS = [
    "azibbutt94@gmail.com",
    "azib@gmail.com",
    "admin@shopifyai.com",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // 1. Calculate Display Name
      const rawDerivedName = email.split("@")[0] || "User";
      const finalName =
        name.trim() ||
        rawDerivedName.charAt(0).toUpperCase() + rawDerivedName.slice(1);

      // 2. Check if this is the ADMIN logging in
      const lowerEmail = email.toLowerCase().trim();
      const isAdminUser =
        ADMIN_EMAILS.includes(lowerEmail) ||
        lowerEmail.includes("admin") ||
        lowerEmail.includes("azib");

      // 3. Save Session to localStorage
      localStorage.setItem("is_logged_in", "true");
      localStorage.setItem("is_admin", isAdminUser ? "true" : "false");
      localStorage.setItem("user_name", finalName);

      // Dispatch storage event so layout updates immediately
      window.dispatchEvent(new Event("storage"));

      setIsLoading(false);

      // 4. Smart Redirect
      if (isAdminUser) {
        // Admin gets redirected to Create Product / Merchant Dashboard
        window.location.href = "/create-product";
      } else {
        // Normal visitor gets redirected to AI Chatbot (to shop & order)
        window.location.href = "/ai-chatbot";
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#0c142b]/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand / Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 items-center justify-center text-xl shadow-lg mb-1">
            🛍️
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome to Shopify<span className="text-emerald-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your dashboard or shop via AI Chatbot
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Optional Display Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Your Name <span className="text-slate-500 text-[11px]">(Shows in "Hi, [Name]")</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Your First Name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Email Address <span className="text-emerald-400">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Password <span className="text-emerald-400">*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50 mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In to Account"}
          </button>
        </form>

        {/* Roles Hint Box */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-[11px] text-slate-400 space-y-1.5">
          <div className="font-bold text-slate-300 flex items-center gap-1.5">
            <span>ℹ️</span> How it works:
          </div>
          
      
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-400 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}