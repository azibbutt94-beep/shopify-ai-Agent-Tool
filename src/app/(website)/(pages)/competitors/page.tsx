"use client";

import { useState } from "react";

interface CompetitorProduct {
  id: string;
  ourProduct: string;
  ourPrice: number;
  competitorStore: string;
  competitorPrice: number;
  difference: number;
  status: "Underpriced" | "Optimal" | "Overpriced";
  n8nStatus: "Synced via VPS" | "Idle";
}

export default function CompetitorsPage() {
  const [scraping, setScraping] = useState(false);
  const [lastScraped, setLastScraped] = useState("Today at 10:45 AM");

  const [competitors, setCompetitors] = useState<CompetitorProduct[]>([
    {
      id: "COMP-01",
      ourProduct: "Thermal Waterproof Ski Jacket",
      ourPrice: 189.99,
      competitorStore: "AlpinePeak Outdoor",
      competitorPrice: 219.0,
      difference: -29.01,
      status: "Underpriced",
      n8nStatus: "Synced via VPS",
    },
    {
      id: "COMP-02",
      ourProduct: "CloudStride Running Shoes",
      ourPrice: 120.0,
      competitorStore: "StrideRunner Pro",
      competitorPrice: 119.5,
      difference: 0.5,
      status: "Optimal",
      n8nStatus: "Synced via VPS",
    },
    {
      id: "COMP-03",
      ourProduct: "The Draft Snowboard (Carbon)",
      ourPrice: 499.0,
      competitorStore: "SnowCraft Outfitters",
      competitorPrice: 469.0,
      difference: 30.0,
      status: "Overpriced",
      n8nStatus: "Synced via VPS",
    },
    {
      id: "COMP-04",
      ourProduct: "Wireless Active Noise Earbuds",
      ourPrice: 89.99,
      competitorStore: "AuraSound Tech",
      competitorPrice: 99.0,
      difference: -9.01,
      status: "Underpriced",
      n8nStatus: "Synced via VPS",
    },
  ]);

  function triggerN8nScraper() {
    setScraping(true);
    // Simulate n8n webhook request to Hostinger VPS
    setTimeout(() => {
      setLastScraped("Just now (via Hostinger VPS Webhook)");
      setScraping(false);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <span>🕷️</span> Phase 4: n8n + Hostinger VPS Scraper
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Competitor Market Benchmarking
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated web scraping workflows tracking competitor pricing and margin gaps across e-commerce storefronts.
            </p>
          </div>

          <button
            onClick={triggerN8nScraper}
            disabled={scraping}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-lg flex items-center gap-2 cursor-pointer"
          >
            {scraping ? "Triggering n8n Scraper..." : "⚡ Run VPS Price Scraper"}
          </button>
        </div>

        {/* Sync Info Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <span><strong>Hostinger VPS Node:</strong> <code className="text-emerald-400 font-mono">vps-n8n-worker-01.local</code></span>
          <span><strong>Last Synchronized:</strong> <span className="text-white font-medium">{lastScraped}</span></span>
        </div>

        {/* Competitor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitors.map((c) => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-sm">{c.ourProduct}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Competitor: <span className="text-indigo-400 font-medium">{c.competitorStore}</span></p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  c.status === "Underpriced"
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                    : c.status === "Optimal"
                    ? "bg-blue-950 text-blue-400 border-blue-800"
                    : "bg-rose-950 text-rose-400 border-rose-800"
                }`}>
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-3 rounded-xl text-center border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Our Price</span>
                  <span className="text-emerald-400 font-mono font-bold">${c.ourPrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Market Price</span>
                  <span className="text-slate-300 font-mono font-bold">${c.competitorPrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Difference</span>
                  <span className={`font-mono font-bold ${c.difference < 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {c.difference < 0 ? `-$${Math.abs(c.difference).toFixed(2)}` : `+$${c.difference.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {c.status === "Underpriced"
                  ? "We hold a pricing advantage of 13% over this competitor. Opportunity to raise price slightly without hurting conversion."
                  : c.status === "Overpriced"
                  ? "Competitor is offering this $30 lower. Consider launching a 5% promotional discount or bundle."
                  : "Our price is within 1% parity of market averages. Safe positioning."}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}