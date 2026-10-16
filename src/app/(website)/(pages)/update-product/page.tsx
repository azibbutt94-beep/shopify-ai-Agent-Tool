"use client";

import { useState } from "react";

export default function UpdateProductPage() {
  const [selected, setSelected] = useState("The Draft Snowboard");
  const [tone, setTone] = useState("Luxury & Elegant");
  const [output, setOutput] = useState("");
  const [msg, setMsg] = useState("");

  function handleOptimize() {
    setMsg("Optimizing listing copy...");
    setTimeout(() => {
      setOutput(`Elevate your winter journey with ${selected}. Designed with aerospace-grade precision and artisanal craftsmanship.`);
      setMsg("Success! Copy re-written.");
    }, 400);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Update Product Copy</h1>
        <p className="text-xs text-slate-400">Select an existing inventory item and re-write marketing copy</p>
      </div>

      {msg && <div className="p-3 bg-emerald-950 text-emerald-300 text-xs rounded-xl border border-emerald-800">{msg}</div>}

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Select Store Item</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
          >
            <option>The Draft Snowboard</option>
            <option>Thermal Waterproof Ski Jacket</option>
            <option>CloudStride Running Shoes</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Target Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
          >
            <option>Luxury & Elegant</option>
            <option>High-Energy & Bold</option>
            <option>Minimalist & Technical</option>
          </select>
        </div>

        <button onClick={handleOptimize} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition">
          ✨ Re-Write Copy
        </button>

        {output && (
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Optimized Listing:</span>
            <p className="text-xs text-slate-200">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}