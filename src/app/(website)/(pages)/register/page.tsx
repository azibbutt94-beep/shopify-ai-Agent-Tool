"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [msg, setMsg] = useState("");

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMsg(`Account created for ${name}! Your store (${store}) is connected.`);
  }

  return (
    <div className="max-w-md mx-auto px-6 py-10 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Create Merchant Account</h1>
        <p className="text-xs text-slate-400">Connect your storefront to the AI automation suite</p>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl text-center">
          {msg}
        </div>
      )}

      <form onSubmit={handleRegister} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">Owner Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            placeholder="Azib"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">Store Domain</label>
          <input
            required
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            placeholder="my-store.myshopify.com"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">Password</label>
          <input
            required
            type="password"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition">
          Register Store
        </button>
      </form>
    </div>
  );
}