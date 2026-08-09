"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSalesPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !company.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">We&apos;ll be in touch!</h1>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            Thank you, {name}. Our enterprise sales team will reach out to <span className="text-zinc-300">{email}</span> within 24 hours to discuss a custom plan for {company}.
          </p>
          <Link href="/">
            <button className="bg-[#161B22] hover:bg-[#21262D] text-white font-medium py-2.5 px-6 rounded-lg transition-colors border border-[#30363D] text-sm">
              ← Back to CodeVerse
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#09090B]">
      {/* Left: Enterprise Info Panel */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] border-r border-[#27272A] flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-2 w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
            />
            <span className="text-xl font-bold text-white tracking-tight">CodeVerse</span>
          </Link>
          <p className="text-zinc-500 text-sm">Enterprise Solutions</p>
        </div>

        <div className="relative z-10 space-y-6">
          {/* Enterprise Plan Card */}
          <div className="bg-[#161B22]/80 border border-[#30363D]/50 rounded-xl p-6 backdrop-blur-sm">
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Enterprise Plan
            </span>
            <p className="text-zinc-400 text-sm mt-3 mb-4 leading-relaxed">
              Tailored infrastructure, security, and support for organizations that need the best.
            </p>
            <div className="space-y-2.5">
              {[
                "Custom LLM fine-tuning",
                "SSO & advanced security",
                "Dedicated support engineer",
                "On-premise deployment",
                "Unlimited team seats",
                "SLA-backed uptime guarantee",
                "Priority feature requests"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-amber-500 to-orange-500", "from-emerald-500 to-teal-500"].map((gradient, i) => (
                <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-r ${gradient} border-2 border-[#0D1117] flex items-center justify-center`}>
                  <span className="text-white text-[9px] font-bold">{["A", "B", "C", "D"][i]}</span>
                </div>
              ))}
            </div>
            <span className="text-zinc-500 text-xs">Trusted by 50+ enterprise teams</span>
          </div>
        </div>

        <p className="text-zinc-600 text-xs relative z-10">© {new Date().getFullYear()} CodeVerse Inc.</p>
      </div>

      {/* Right: Contact Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[440px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6 justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Logo"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
            />
            <span className="text-lg font-bold text-white">CodeVerse</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Talk to our sales team</h1>
          <p className="text-zinc-500 text-sm mb-7">Tell us about your team and we&apos;ll craft a custom plan.</p>

          <form className="flex flex-col gap-3.5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Work Email <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Company <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
                  placeholder="Acme Inc."
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Team Size</label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#161B22]">Select...</option>
                  <option value="1-10" className="bg-[#161B22]">1–10</option>
                  <option value="11-50" className="bg-[#161B22]">11–50</option>
                  <option value="51-200" className="bg-[#161B22]">51–200</option>
                  <option value="201-1000" className="bg-[#161B22]">201–1,000</option>
                  <option value="1000+" className="bg-[#161B22]">1,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">How can we help?</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all resize-none"
                placeholder="Tell us about your use case, security requirements, or anything else..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-medium py-2.5 rounded-lg transition-all text-sm mt-1 shadow-lg shadow-emerald-500/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send to Sales Team
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-zinc-500">
            Or email us directly at{" "}
            <a href="mailto:sales@codeverse.dev" className="text-[#388bfd] hover:underline font-medium">
              sales@codeverse.dev
            </a>
          </p>

          <div className="mt-4 text-center">
            <Link href="/#pricing" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              ← Back to pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
