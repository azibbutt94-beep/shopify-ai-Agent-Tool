"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Support & Contact</h1>
        <p className="text-xs text-slate-400">Get in touch with the AI platform engineering team</p>
      </div>

      {submitted ? (
        <div className="p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs">
          Thank you! Your message has been received by our technical support team.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Your Full Name</label>
            <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" placeholder="Azib Butt" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Email Address</label>
            <input required type="email" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" placeholder="azib@example.com" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Inquiry / Message</label>
            <textarea required rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" placeholder="Describe your store setup or question..." />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}