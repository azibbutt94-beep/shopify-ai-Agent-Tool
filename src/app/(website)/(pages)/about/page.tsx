export default function AboutPage() {
  const stack = [
    { title: "Frontend Framework", detail: "Next.js 16 (App Router), React 19, TypeScript" },
    { title: "Styling & Layout", detail: "Tailwind CSS v4 (SaaS Slate-950 Aesthetic)" },
    { title: "AI Model Layer", detail: "Google Gemini API with Function/Tool Declarations" },
    { title: "E-Commerce Core", detail: "Shopify Admin GraphQL API & Cart Permalinks" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-5">
        <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-800 rounded">
          Academic Overview
        </span>
        <h1 className="text-3xl font-extrabold text-white">About This Project</h1>
        <p className="text-xs text-slate-400 max-w-2xl">
          An enterprise-grade autonomous store management suite designed to connect large language models with modern headless e-commerce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stack.map((s, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-1">
            <p className="text-xs text-emerald-400 font-semibold">{s.title}</p>
            <p className="text-sm font-bold text-white">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-white">Core Architectural Flow</h2>
        <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
          <li>Shopper interacts via natural language in the Customer Shopping Assistant.</li>
          <li>System routes query through Gemini with tool-calling schemas for inventory searches.</li>
          <li>GraphQL queries pull live variants, prices, and stock numbers.</li>
          <li>Assistant generates direct 1-click cart permalinks leading straight to checkout.</li>
        </ol>
      </div>
    </div>
  );
}