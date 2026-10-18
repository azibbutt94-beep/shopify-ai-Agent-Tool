"use client";

import { useState } from "react";

interface Product {
  id: string;
  title: string;
  price: string;
  tag: string;
  stock: string;
  desc: string;
  checkoutUrl: string;
}

 export default function ChatPage() {
  // Store Domain Constants (Har jagah accessible)
  const STORE_DOMAIN =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    "brotherhood-f5g25mtk.myshopify.com";
  const store_Domain = STORE_DOMAIN;

  // Shopify Checkout URL Helper
  const getCheckoutUrl = (variantId?: string | number) => {
    if (!variantId) {
      return `https://${STORE_DOMAIN}/cart`;
    }

    // ID se sirf numbers nikalna
    const cleanId = String(variantId).replace(/\D/g, "");
    return `https://${STORE_DOMAIN}/cart/${cleanId}:1`;
  };

  // Store Catalog
  // Store Catalog
  const storeCatalog: Product[] = [
    {
      id: "prod-1",
      title: "CloudStride Running Shoes",
      price: "$120.00",
      tag: "Footwear",
      stock: "In Stock (42 units)",
      desc: "Ultra-breathable cushioning engineered for marathons and daily training.",
      checkoutUrl: `https://${store_Domain}/cart`,
    },
    {
      id: "prod-2",
      title: "Thermal Waterproof Ski Jacket",
      price: "$189.99",
      tag: "Apparel",
      stock: "In Stock (18 units)",
      desc: "Triple-layer insulated winter jacket with taped seams and windproof lining.",
      checkoutUrl: `https://${STORE_DOMAIN}/cart`,
    },
    {
      id: "prod-3",
      title: "The Draft Snowboard (Carbon)",
      price: "$499.00",
      tag: "Winter Sports",
      stock: "Low Stock (7 units)",
      desc: "Aerospace carbon-core all-mountain board designed for speed and carved turns.",
      checkoutUrl: `https://${STORE_DOMAIN}/cart`,
    },
    {
      id: "prod-4",
      title: "Wireless Active Noise Earbuds",
      price: "$89.99",
      tag: "Audio",
      stock: "In Stock (65 units)",
      desc: "True wireless earbuds with 36-hour battery life and sweat resistance.",
      checkoutUrl: `https://${STORE_DOMAIN}/cart`,
    },
  ];

  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      text: "Hello! 👋 I am your Shopify AI Shopping Assistant. Would you like to see what products we currently have available in our store?",
      showCatalogPrompt: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 1. Show available products list
  function handleShowAvailableProducts() {
    const userMsg = { role: "user", text: "What products do you have available?" };
    const botReply = {
      role: "assistant",
      text: "Here are the top in-demand products currently in stock! Click on any product below to select it:",
      catalogList: storeCatalog,
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
  }

  // 2. Customer selects a specific product from the list
  function handleSelectProduct(prod: Product) {
    const userMsg = { role: "user", text: `I am interested in ${prod.title}` };
    const botReply = {
      role: "assistant",
      text: `Great choice! Here are the full specifications and direct checkout link for ${prod.title}:`,
      product: prod,
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
  }

  // 3. Natural language text input handler
  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    const newMsgs = [...messages, { role: "user", text: query }];
    setMessages(newMsgs);
    setInput("");

    setTimeout(() => {
      const lower = query.toLowerCase();

      // Agar customer pooche ke products kya available hain
      if (
        lower.includes("what") ||
        lower.includes("available") ||
        lower.includes("products") ||
        lower.includes("items") ||
        lower.includes("catalog")
      ) {
        setMessages([
          ...newMsgs,
          {
            role: "assistant",
            text: "Here is our current store inventory ready for immediate fulfillment! Select any item to proceed:",
            catalogList: storeCatalog,
          },
        ]);
        return;
      }

      // Agar kisi specific product ka naam le
      const matched = storeCatalog.find(
        (p) =>
          lower.includes(p.title.toLowerCase()) ||
          lower.includes(p.tag.toLowerCase()) ||
          (lower.includes("shoes") && p.tag === "Footwear") ||
          (lower.includes("jacket") && p.tag === "Apparel") ||
          (lower.includes("snowboard") && p.tag === "Winter Sports")
      );

      if (matched) {
        setMessages([
          ...newMsgs,
          {
            role: "assistant",
            text: `Yes! We found a direct match in our inventory:`,
            product: matched,
          },
        ]);
      } else {
        setMessages([
          ...newMsgs,
          {
            role: "assistant",
            text: "I couldn't find an exact match for that keyword. Here are all items currently available in our store:",
            catalogList: storeCatalog,
          },
        ]);
      }
    }, 400);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white">AI Customer Shopping Assistant</h1>
          <p className="text-xs text-slate-400">Interactive Product Selection & Instant Checkout</p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg flex items-center gap-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Shopify Live
        </span>
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={handleShowAvailableProducts}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
        >
          <span>📋</span> What products do you have available?
        </button>
        <button
          type="button"
          onClick={() => handleSelectProduct(storeCatalog[0])}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-full text-xs transition cursor-pointer"
        >
          👟 Running Shoes
        </button>
        <button
          type="button"
          onClick={() => handleSelectProduct(storeCatalog[1])}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-full text-xs transition cursor-pointer"
        >
          🧥 Ski Jacket
        </button>
        <button
          type="button"
          onClick={() => handleSelectProduct(storeCatalog[2])}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-full text-xs transition cursor-pointer"
        >
          🏂 Snowboard
        </button>
      </div>

      {/* Chat Messages Display Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl h-[500px] p-5 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed space-y-3 ${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-slate-800/95 text-slate-200 border border-slate-700/80 rounded-bl-none"
              }`}
            >
              <p>{m.text}</p>

              {/* Initial prompt button */}
              {m.showCatalogPrompt && (
                <button
                  type="button"
                  onClick={handleShowAvailableProducts}
                  className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-center cursor-pointer shadow"
                >
                  View Available Products List →
                </button>
              )}

              {/* Available Products List / Cards Grid inside Chat */}
              {m.catalogList && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {m.catalogList.map((prod: Product) => (
                    <div
                      key={prod.id}
                      className="bg-slate-950/80 border border-slate-700 p-3 rounded-xl flex flex-col justify-between space-y-2 hover:border-emerald-500/60 transition"
                    >
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-emerald-400 rounded">
                            {prod.tag}
                          </span>
                          <span className="text-emerald-400 font-extrabold text-xs">{prod.price}</span>
                        </div>
                        <h4 className="font-bold text-white text-xs mt-1.5">{prod.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{prod.desc}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectProduct(prod)}
                        className="w-full py-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 font-bold rounded-lg text-[11px] transition cursor-pointer text-center"
                      >
                        Select this Item →
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Single Product Details & Checkout CTA */}
              {m.product && (
                <div className="bg-slate-950/90 border border-emerald-500/50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-emerald-400 rounded">
                        {m.product.tag}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">{m.product.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{m.product.desc}</p>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">● {m.product.stock}</p>
                    </div>
                    <span className="text-emerald-400 font-black text-base">{m.product.price}</span>
                  </div>
<div className="flex gap-2 pt-2 border-t border-slate-800">
  {/* 1. View Details Button (Ab Product ka link ya description show karega) */}
  <button
    type="button"
    onClick={() => {
      alert(
        `📌 Product Details:\n\nTitle: ${m.product.title}\nPrice: ${m.product.price}\nDescription: ${m.product.desc}\nStatus: ${m.product.stock}`
      );
    }}
    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition cursor-pointer"
  >
    View Details
  </button>

  {/* 2. Instant Buy Button (Agar real ID na ho toh safe cart link) */}
  <a
    href={
      m.product.checkoutUrl ||
      getCheckoutUrl(m.product.variantId || m.product.id)
    }
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
  >
    Instant Buy 🛍️
  </a>
</div>
 </div>
   )}
  </div>
  </div>
   ))}
  </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask: 'What products do you have?' or type an item name..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
        >
          Send
        </button>
      </form>

      {/* Order Summary Drawer Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Product & Order Overview</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Selected Item:</span>
                <span className="font-semibold text-white">{selectedProduct.title}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Category:</span>
                <span>{selectedProduct.tag}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Inventory Status:</span>
                <span className="text-emerald-400">{selectedProduct.stock}</span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-2 font-bold text-sm">
                <span>Total Cart Price:</span>
                <span className="text-emerald-400">{selectedProduct.price}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={selectedProduct.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center text-xs transition shadow"
              >
                Proceed to Shopify Checkout →
              </a>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition cursor-pointer"
              >
                Back to Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}