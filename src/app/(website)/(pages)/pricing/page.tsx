export default function PricingPage() {
  const plans = [
    { name: "Starter", price: "$19", desc: "For new stores wanting automated AI descriptions.", features: ["50 AI Descriptions / mo", "Basic Customer Chatbot", "Email Support"] },
    { name: "Professional", price: "$49", desc: "For growing stores with high traffic and sales.", features: ["Unlimited AI Descriptions", "Direct Checkout Permalinks", "Real-Time Catalog Sync", "Priority Support"], popular: true },
    { name: "Enterprise", price: "$99", desc: "For high-volume merchants with multi-store setups.", features: ["Multi-Store Management", "Custom Model Fine-tuning", "Dedicated SLA & 24/7 Support"] },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Merchant Subscription Plans</h1>
        <p className="text-xs text-slate-400">Choose a plan to empower your Shopify store with autonomous intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div key={i} className={`bg-slate-900 p-6 rounded-2xl space-y-4 border ${p.popular ? "border-emerald-500 shadow-xl shadow-emerald-950/20" : "border-slate-800"}`}>
            {p.popular && <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">MOST POPULAR</span>}
            <h2 className="text-base font-bold text-white">{p.name}</h2>
            <div className="text-3xl font-black text-white">{p.price}<span className="text-xs text-slate-500">/mo</span></div>
            <p className="text-xs text-slate-400">{p.desc}</p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              {p.features.map((f, fi) => (
                <li key={fi}>✓ {f}</li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${p.popular ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"}`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}