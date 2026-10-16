export default function CatalogPage() {
  const products = [
    { title: "CloudStride Running Shoes", price: "$120.00", tag: "Footwear", stock: "In Stock (42)" },
    { title: "Thermal Waterproof Ski Jacket", price: "$189.99", tag: "Apparel", stock: "In Stock (18)" },
    { title: "The Draft Snowboard (Carbon)", price: "$499.00", tag: "Winter Sports", stock: "In Stock (7)" },
    { title: "Wireless Active Noise Earbuds", price: "$89.99", tag: "Audio", stock: "In Stock (65)" },
    { title: "Polarized UV Winter Goggles", price: "$59.00", tag: "Accessories", stock: "In Stock (29)" },
    { title: "Smart GPS Fitness Tracker", price: "$149.00", tag: "Wearables", stock: "Low Stock (3)" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="border-b border-slate-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Store Catalog</h1>
          <p className="text-xs text-slate-400">Inventory synchronized with e-commerce core</p>
        </div>
        <span className="text-xs text-slate-500 font-mono">Showing {products.length} Products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                {p.tag}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">{p.stock}</span>
            </div>
            <h2 className="text-sm font-bold text-white">{p.title}</h2>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-emerald-400 font-extrabold text-sm">{p.price}</span>
              <span className="text-[11px] text-blue-400">Active Listing</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}