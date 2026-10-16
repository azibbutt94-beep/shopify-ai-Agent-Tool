"use client";

import { useState } from "react";

interface SentimentResult {
  sentiment: "Positive" | "Neutral" | "Negative";
  score: number; // percentage
  pros: string[];
  cons: string[];
  aiRecommendation: string;
}

export default function ReviewsPage() {
  const [selectedProduct, setSelectedProduct] = useState("Thermal Waterproof Ski Jacket");
  const [reviewInput, setReviewInput] = useState(
    "The jacket kept me completely dry during heavy snowfall, and the zips are top quality. However, the sizing runs a bit small around the shoulders, and delivery took 2 days longer than expected."
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>({
    sentiment: "Positive",
    score: 78,
    pros: ["Exceptional waterproof quality", "High-durability zips & lining"],
    cons: ["Tight shoulder fit / sizing runs small", "Slight shipping delay"],
    aiRecommendation:
      "Update product description to advise customers to 'size up' if wearing heavy layers, and check logistics for courier SLA delays.",
  });

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewInput.trim()) return;

    setAnalyzing(true);

    // AI Analysis simulation with natural heuristic fallback
    setTimeout(() => {
      const lower = reviewInput.toLowerCase();
      let sentiment: "Positive" | "Neutral" | "Negative" = "Positive";
      let score = 85;

      if (lower.includes("bad") || lower.includes("terrible") || lower.includes("poor") || lower.includes("worst")) {
        sentiment = "Negative";
        score = 28;
      } else if (lower.includes("small") || lower.includes("slow") || lower.includes("however") || lower.includes("okay")) {
        sentiment = "Neutral";
        score = 62;
      }

      setResult({
        sentiment,
        score,
        pros: ["Great fabric texture", "Sturdy packaging & construction"],
        cons: ["Requires clearer sizing chart", "Delivery expectations need alignment"],
        aiRecommendation:
          "Highlight detailed chest/shoulder measurements in the sizing guide to minimize return rates.",
      });
      setAnalyzing(false);
    }, 600);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <span>⭐</span> Phase 3: AI Intelligence
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Customer Review & Sentiment Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Feed customer feedback into Gemini to compute satisfaction scores, identify defects, and receive actionable business recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              1. Review Input & Target Product
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Select Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option>Thermal Waterproof Ski Jacket</option>
                <option>CloudStride Running Shoes</option>
                <option>The Draft Snowboard (Carbon)</option>
                <option>Wireless Active Noise Earbuds</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Customer Review / Feedback Text
              </label>
              <textarea
                rows={6}
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder="Paste customer reviews, feedback emails, or comment threads here..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {analyzing ? "Gemini Evaluating Sentiment..." : "✨ Run AI Sentiment Analysis"}
            </button>
          </div>

          {/* AI Sentiment Diagnostics */}
          <div className="space-y-6">
            {result && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Overall Sentiment</span>
                    <h3 className={`text-xl font-extrabold ${
                      result.sentiment === "Positive" ? "text-emerald-400" : result.sentiment === "Neutral" ? "text-amber-400" : "text-rose-400"
                    }`}>
                      {result.sentiment} ({result.score}% Satisfaction)
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl">
                      {result.sentiment === "Positive" ? "😊" : result.sentiment === "Neutral" ? "😐" : "😡"}
                    </span>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/70 border border-emerald-900/40 p-4 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400">👍 Positive Highlights</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {result.pros.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/70 border border-rose-900/40 p-4 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-rose-400">👎 Critical Pain Points</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {result.cons.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400">✗</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Seller Advisory */}
                <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-xl space-y-2">
                  <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
                    <span>💡</span> Gemini Seller Recommendation
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.aiRecommendation}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}