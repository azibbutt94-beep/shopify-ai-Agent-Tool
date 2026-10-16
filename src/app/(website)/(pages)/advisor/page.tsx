"use client";

import { useState } from "react";

export default function AdvisorPage() {
  const [generating, setGenerating] = useState(false);
  const [advisorState, setAdvisorState] = useState({
    healthScore: 88,
    summary:
      "Store operations are stable with strong top-line conversion (4.8%). However, urgent supply chain bottlenecks on Winter Sports gear require immediate purchase orders to prevent $16,000+ in lost Q4 sales.",
    actions: [
      {
        priority: "P0 — Critical",
        title: "Immediate Restock: Carbon Snowboards",
        reason: "Current inventory (7 units) will be depleted within 9 days based on search velocity.",
        estimatedImpact: "+$7,984.00 protected revenue",
      },
      {
        priority: "P1 — High",
        title: "Competitor Price Arbitrage: Ski Jacket",
        reason: "Our price ($189.99) is $29 below market average. Recommended price bump to $199.99 preserves margin without losing volume.",
        estimatedImpact: "+$450.00 extra profit margin",
      },
      {
        priority: "P2 — Medium",
        title: "Re-Engage 48 At-Risk Shoppers",
        reason: "Customer segmentation identified 48 shoppers inactive for 60+ days with high average historic cart values.",
        estimatedImpact: "+12% win-back conversion rate",
      },
    ],
  });

  function handleRefreshAnalysis() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 800);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
              <span>🧠</span> Capstone: Autonomous Business Advisor
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Autonomous AI Store Advisor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Consolidating inventory, competitor intelligence, RFM customer tiers, and Gemini reasoning to deliver executive guidance.
            </p>
          </div>

          <button
            onClick={handleRefreshAnalysis}
            disabled={generating}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-lg cursor-pointer"
          >
            {generating ? "Synthesizing Store Data..." : "🔄 Re-Synthesize Advisor Data"}
          </button>
        </div>

        {/* Health Score Overview */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold px-3 py-1 bg-purple-950 text-purple-400 border border-purple-800 rounded-full uppercase">
              Overall Store Health Index
            </span>
            <h2 className="text-2xl font-bold text-white">Executive Synthesis Report</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{advisorState.summary}</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center min-w-[180px]">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Health Rating</span>
            <p className="text-4xl font-black text-emerald-400 font-mono mt-1">{advisorState.healthScore}/100</p>
            <span className="text-[11px] text-emerald-400 font-semibold block pt-1">Grade: A (Optimal)</span>
          </div>
        </div>

        {/* Actionable Executive Playbook */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            Recommended Action Items
          </h3>

          <div className="space-y-4">
            {advisorState.actions.map((act, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl space-y-3 transition">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                    act.priority.includes("Critical")
                      ? "bg-rose-950 text-rose-400 border-rose-800"
                      : act.priority.includes("High")
                      ? "bg-amber-950 text-amber-400 border-amber-800"
                      : "bg-blue-950 text-blue-400 border-blue-800"
                  }`}>
                    {act.priority}
                  </span>
                  <span className="text-emerald-400 font-mono font-bold text-xs bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                    Impact: {act.estimatedImpact}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">{act.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{act.reason}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
