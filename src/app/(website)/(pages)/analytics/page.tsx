export default function AnalyticsPage() {
  const cards = [
    { label: "AI Conversations Handled", value: "312", delta: "+34% this week" },
    { label: "1-Click Cart Permalinks Generated", value: "148", delta: "+21%" },
    { label: "Conversion Rate via Chatbot", value: "4.8%", delta: "Above Industry Avg" },
    { label: "Catalog Sync Accuracy", value: "100%", delta: "GraphQL Operational" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Commerce Analytics</h1>
        <p className="text-xs text-slate-400">Autonomous interaction statistics and shopper conversions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <p className="text-xs text-slate-400">{c.label}</p>
            <p className="text-2xl font-extrabold text-white">{c.value}</p>
            <p className="text-[11px] text-emerald-400 font-semibold">{c.delta}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white">Top Searched Products by Shoppers</h2>
        <div className="text-xs text-slate-400 space-y-2">
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span>1. Thermal Waterproof Ski Jacket</span>
            <span className="text-white font-mono">68 Queries</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span>2. CloudStride Running Shoes</span>
            <span className="text-white font-mono">49 Queries</span>
          </div>
          <div className="flex justify-between py-1">
            <span>3. The Draft Snowboard</span>
            <span className="text-white font-mono">31 Queries</span>
          </div>
        </div>
      </div>
    </div>
  );
}