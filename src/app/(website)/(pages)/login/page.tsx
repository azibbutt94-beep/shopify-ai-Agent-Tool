"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setStatusMsg("Error: Please enter both email and password.");
      return;
    }

    // Check if user was registered in signup
    const existingUserData = localStorage.getItem("user");
    let nameToUse = "Azib";

    if (existingUserData) {
      try {
        const parsed = JSON.parse(existingUserData);
        if (parsed.name) nameToUse = parsed.name;
      } catch {
        // fallback
      }
    } else {
      // If direct login without signup, create a local session
      const inferredName = email.split("@")[0];
      nameToUse = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);
      localStorage.setItem("user", JSON.stringify({ name: nameToUse, email }));
    }

    // Set logged-in flag[cite: 13]
    localStorage.setItem("isLoggedIn", "true");
    setStatusMsg(`Success! Welcome back, ${nameToUse}. Redirecting...`);

    setTimeout(() => {
      router.push("/");
    }, 700);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-2xl mb-1">
            🔐
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Merchant Login
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your Shopify AI suite and store analytics
          </p>
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold text-center border ${
              statusMsg.includes("Success")
                ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/70 border-red-500/40 text-red-300"
            }`}
          >
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="azibbutt94@gmail.com"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-950 cursor-pointer"
          >
            Sign In to Store →
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Need a new merchant account?{" "}
          <Link href="/signup" className="text-emerald-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}