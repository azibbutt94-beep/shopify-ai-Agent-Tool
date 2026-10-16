import Link from "next/link";

export default function ServicesPage() {
  const services = [
    { title: "Autonomous Shopping Assistant", desc: "Live shopper Q&A with real-time stock lookup and checkout URLs.", href: "/chat", tag: "Conversions" },
    { title: "AI Copywriter & SEO Generator", desc: "Generate search-optimized titles, HTML descriptions, and tags.", href: "/update-product", tag: "Marketing" },
    { title: "1-Click Product Creator", desc: "Instantly draft and publish new catalog items to Shopify inventory.", href: "/create-product", tag: "Catalog" },
    { title: "Automated Order Tracking", desc: "Self-service order status, carrier info, and tracking code lookup.", href: "/orders", tag: "Support" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white">Platform Services</h1>
        <p className="text-xs text-slate-400">Integrated autonomous tools designed for e-commerce automation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-emerald-400 border border-slate-700 rounded">
                {s.tag}
              </span>
              <h2 className="text-base font-bold text-white">{s.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
            <Link href={s.href} className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
              Open Service →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}