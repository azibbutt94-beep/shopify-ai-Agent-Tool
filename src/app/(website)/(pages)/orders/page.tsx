"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [data, setData] = useState<any>(null);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId) return;
    setData({
      id: orderId,
      status: "Dispatched & In Transit",
      carrier: "DHL Express",
      tracking: "TRK-9842104-PK",
      item: "CloudStride Running Shoes (Size 10)",
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Order Status & Tracking</h1>
        <p className="text-xs text-slate-400">Look up customer order fulfillments and delivery tracking</p>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID (e.g. #1042)"
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white"
        />
        <button type="submit" className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition">
          Lookup Order
        </button>
      </form>

      {data && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white text-sm">Order {data.id}</span>
            <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg">
              {data.status}
            </span>
          </div>
          <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
            <p><strong>Carrier:</strong> {data.carrier}</p>
            <p><strong>Tracking Number:</strong> {data.tracking}</p>
            <p><strong>Package Content:</strong> {data.item}</p>
          </div>
        </div>
      )}
    </div>
  );
}