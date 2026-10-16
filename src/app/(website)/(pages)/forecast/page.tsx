"use client";

import { useState } from "react";

export default function ForecastPage() {
  const [timeframe, setTimeframe] = useState("Next 30 Days");

  const forecasts = [
    {
      product: "Thermal Waterproof Ski Jacket",
      currentStock: 18,
      predictedDemand: 45,
      stockoutDays: 12,
      riskLevel: "High Risk",
      projectedRevenue: "$8,549.55",
      action: "Reorder 35 units immediately from supplier.",
    },
    {
      product: "The Draft Snowboard (Carbon)",
      currentStock: 7,
      predictedDemand: 16,
      stockoutDays: 9,
      riskLevel: "Critical Risk",
      projectedRevenue: "$7,984.00",
      action: "Low inventory threshold hit. Stockout expected before weekend rush.",
    },
    {
      product: "CloudStride Running Shoes",
      currentStock: 42,
      predictedDemand: 38,
      stockoutDays: 34,
      riskLevel: "Optimal Buffer",
      projectedRevenue: "$4,560.00",
      action: "Adequate stock coverage for current quarter.",
    },
    {
      product: "Wireless Active Noise Earbuds",
      currentStock: 65,
      predictedDemand: 28,
      stockoutDays: 70,
      riskLevel: "Overstocked",
      projectedRevenue: "$2,519.72",
      action: "Bundle with running shoes to increase inventory turnover.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <span>📈</span> Phase 4: Demand Forecasting
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Predictive Sales & Stockout Forecaster
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Time-series extrapolation predicting inventory velocity, expected stockouts, and revenue pipeline.
            </p>
          </div>

          <div className="flex gap-2 text-xs">
            {["Next 14 Days", "Next 30 Days", "Next 90 Days"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer border ${
                  timeframe === tf
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Overview KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Projected Revenue ({timeframe})</span>
            <p className="text-2xl font-black text-emerald-400">$23,613.27</p>
            <p className="text-[11px] text-slate-400">+18% growth trajectory</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Imminent Stockouts</span>
            <p className="text-2xl font-black text-rose-400">2 Products</p>
            <p className="text-[11px] text-rose-400/80">Stockout expected within 12 days</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Model Confidence</span>
            <p className="text-2xl font-black text-blue-400">92.4%</p>
            <p className="text-[11px] text-slate-400">Based on historical order logs</p>
          </div>
        </div>

        {/* Predictive Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Current Stock</th>
                  <th className="py-3.5 px-4">Projected Demand</th>
                  <th className="py-3.5 px-4">Est. Stockout</th>
                  <th className="py-3.5 px-4">Risk Status</th>
                  <th className="py-3.5 px-4">Automated Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {forecasts.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">{f.product}</td>
                    <td className="py-3.5 px-4 font-mono">{f.currentStock} units</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">{f.predictedDemand} units</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{f.stockoutDays} days</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                        f.riskLevel === "Critical Risk"
                          ? "bg-rose-950 text-rose-400 border-rose-800"
                          : f.riskLevel === "High Risk"
                          ? "bg-amber-950 text-amber-400 border-amber-800"
                          : f.riskLevel === "Optimal Buffer"
                          ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                          : "bg-blue-950 text-blue-400 border-blue-800"
                      }`}>
                        ● {f.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs leading-relaxed">
                      {f.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}