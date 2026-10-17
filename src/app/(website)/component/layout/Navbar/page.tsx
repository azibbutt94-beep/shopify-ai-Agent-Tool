"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authStatus);

    if (authStatus) {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsed = JSON.parse(storedUserData);
          setUserName(parsed.name || "Merchant");
        } catch {
          setUserName("Merchant");
        }
      }
    } else {
      setUserName("");
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/login");
  };

  // Public Links (Hamesha dikhenge)
  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  // AI Seller Suite Links (SIRF Login ke baad unlock honge!)
  const sellerToolLinks = [
    { href: "/catalog", label: "📦 Catalog" },
    { href: "/chat", label: "💬 AI Chatbot" },
    { href: "/orders", label: "🚚 Orders" },
    { href: "/create-product", label: "➕ Create Product" },
    { href: "/analytics", label: "📊 Analytics" },
    { href: "/reviews", label: "⭐ Reviews AI" },
    { href: "/customers", label: "👥 Customers RFM" },
    { href: "/competitors", label: "🕷️ Competitors n8n" },
    { href: "/forecast", label: "📈 Sales Forecast" },
    { href: "/advisor", label: "🧠 AI Advisor" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Bar: Logo + Public Links + Auth Controls */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 border-b border-slate-800/60">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl p-1 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-emerald-500/50 transition">
            🛍️
          </span>
          <span className="font-extrabold text-white text-lg tracking-tight">
            Shopify<span className="text-emerald-400">AI</span>
          </span>
        </Link>

        {/* Public Navigation */}
        <nav className="flex items-center gap-6 text-sm font-semibold">
          {publicLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-emerald-400 font-bold border-b-2 border-emerald-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Corner: Auth Pill */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200">
                Hi, <span className="text-emerald-400 font-bold">{userName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="ml-1 text-[11px] font-bold px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <Link
                href="/login"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-lg border border-slate-800 transition"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition shadow shadow-emerald-950"
              >
                register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 🔒 Bottom Toolbar: SIRF LOGIN HONE PAR SHOW HOGA */}
      {isLoggedIn && (
        <div className="bg-slate-900/80 px-6 py-2 overflow-x-auto scrollbar-none border-t border-slate-800/40 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium">
            
            <div className="flex items-center gap-1.5 flex-nowrap">
              {sellerToolLinks.map((tool) => {
                const isActive = pathname === tool.href;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-bold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border-transparent"
                    }`}
                  >
                    {tool.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}