"use client";

import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: string;
  lastOrderDaysAgo: number;
  segment: "VIP Champion" | "Loyal Customer" | "At Risk" | "Lost / Churned";
  strategy: string;
}

export default function CustomersPage() {
  const [filterSegment, setFilterSegment] = useState("All");

  const customers: Customer[] = [
    {
      id: "CUST-101",
      name: "Hamza Tariq",
      email: "hamza.t@example.com",
      ordersCount: 8,
      totalSpent: "$1,240.00",
      lastOrderDaysAgo: 4,
      segment: "VIP Champion",
      strategy: "Offer early access to new product drops & VIP loyalty perks.",
    },
    {
      id: "CUST-102",
      name: "Abdullah",
      email: "Abdullah@example.com",
      ordersCount: 5,
      totalSpent: "$680.00",
      lastOrderDaysAgo: 14,
      segment: "Loyal Customer",
      strategy: "Reward with automated cross-sell discounts on frequently viewed items.",
    },
    {
      id: "CUST-103",
      name: "Usman Mughal",
      email: "Usmanmughal20@example.com",
      ordersCount: 3,
      totalSpent: "$390.00",
      lastOrderDaysAgo: 68,
      segment: "At Risk",
      strategy: "Trigger an AI re-engagement email with an exclusive 15% discount code.",
    },
    {
      id: "CUST-104",
      name: "Noor Fatimah",
      email: "noorfatima200218@example.com",
      ordersCount: 1,
      totalSpent: "$120.00",
      lastOrderDaysAgo: 140,
      segment: "Lost / Churned",
      strategy: "Send 'We miss you' win-back sequence with survey inquiry.",
    },
  ];

  const filtered = filterSegment === "All" ? customers : customers.filter((c) => c.segment === filterSegment);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <span>👥</span> Phase 3: RFM Segmentation
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Customer Segmentation Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Classifying shoppers based on Recency, Frequency, and Monetary value to automate targeted retention strategies.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {["All", "VIP Champion", "Loyal Customer", "At Risk", "Lost / Churned"].map((seg) => (
              <button
                key={seg}
                onClick={() => setFilterSegment(seg)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer border ${
                  filterSegment === seg
                    ? "bg-blue-600 text-white border-blue-500"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Orders</th>
                  <th className="py-3.5 px-4">Total Spent</th>
                  <th className="py-3.5 px-4">Recency</th>
                  <th className="py-3.5 px-4">Segment Tier</th>
                  <th className="py-3.5 px-4">Retention Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white">{c.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{c.email}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{c.ordersCount} orders</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{c.totalSpent}</td>
                    <td className="py-3.5 px-4 text-slate-400">{c.lastOrderDaysAgo} days ago</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                        c.segment === "VIP Champion"
                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                          : c.segment === "Loyal Customer"
                          ? "bg-blue-950/80 text-blue-400 border-blue-800"
                          : c.segment === "At Risk"
                          ? "bg-amber-950/80 text-amber-400 border-amber-800"
                          : "bg-rose-950/80 text-rose-400 border-rose-800"
                      }`}>
                        ● {c.segment}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs leading-relaxed text-[11px]">
                      {c.strategy}
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