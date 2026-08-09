"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Loading from "../loading";

function PaymentForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "pro";
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const planInfo = {
    pro: { name: "Pro", price: "$20", period: "/month", features: ["Advanced AI debugging", "Unlimited AI queries", "Private workspace", "Cloud compute instances"] },
    enterprise: { name: "Enterprise", price: "Custom", period: "", features: ["Custom LLM fine-tuning", "SSO & advanced security", "Dedicated support", "On-premise deployment"] },
  };

  const currentPlan = planInfo[plan as keyof typeof planInfo] || planInfo.pro;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="min-h-screen flex bg-[#09090B]">
      {/* Left: Order Summary */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] border-r border-[#27272A] flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        
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
        </div>

        <div className="relative z-10 space-y-6">
          {/* Plan Card */}
          <div className="bg-[#161B22]/80 border border-[#30363D]/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {currentPlan.name} Plan
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{currentPlan.price}</span>
                  {currentPlan.period && <span className="text-zinc-500 text-sm">{currentPlan.period}</span>}
                </div>
              </div>
            </div>

            <div className="border-t border-[#30363D]/40 pt-4 space-y-2.5">
              {currentPlan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              SSL Encrypted
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              PCI Compliant
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              Cancel Anytime
            </div>
          </div>
        </div>

        <p className="text-zinc-600 text-xs relative z-10">Payments processed securely. Cancel anytime.</p>
      </div>

      {/* Right: Payment Form */}
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

          {/* Mobile plan summary */}
          <div className="lg:hidden bg-[#161B22] border border-[#30363D] rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">{currentPlan.name} Plan</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">{currentPlan.price}</span>
                {currentPlan.period && <span className="text-zinc-500 text-xs">{currentPlan.period}</span>}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Payment Details</h1>
          <p className="text-zinc-500 text-sm mb-7">Complete your upgrade to {currentPlan.name}.</p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Cardholder Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
                placeholder="Name on card"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all pr-16"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <svg className="h-5" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#1A1F71"/><path d="M15 17.5l2.5-11h3l-2.5 11h-3zm10.5-11l-2.8 7.6-.3-1.6-1-5.1s-.1-.9-1.2-.9h-4.7l-.1.3s1.4.3 3 1.3l2.5 9.4h3.1l4.7-11h-3.2zm-14.2 0l-3 11h-3l-1.5-8.8c2.1 1.1 4 3.3 4.6 4.8l.3 1.5 2.6-7.5h3z" fill="white"/></svg>
                  <svg className="h-5" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 7a7 7 0 000 10 7 7 0 000-10z" fill="#FF5F00"/></svg>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Expiry Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            {/* Order summary line */}
            <div className="border-t border-[#27272A] pt-4 mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">{currentPlan.name} Plan</span>
                <span className="text-zinc-300">{currentPlan.price}{currentPlan.period}</span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t border-[#27272A] pt-2">
                <span className="text-white">Total due today</span>
                <span className="text-white">{currentPlan.price === "Custom" ? "Contact us" : currentPlan.price}</span>
              </div>
            </div>

            <Link href="/dashboard">
              <button
                type="button"
                className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-medium py-3 rounded-lg transition-all text-sm mt-1 shadow-lg shadow-emerald-500/10 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                {currentPlan.price === "Custom" ? "Contact Sales" : `Pay ${currentPlan.price}`}
              </button>
            </Link>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              ← Cancel and return to CodeVerse
            </Link>
          </div>

          {/* Mobile trust badges */}
          <div className="lg:hidden flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              SSL Encrypted
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              PCI Compliant
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentForm />
    </Suspense>
  );
}
