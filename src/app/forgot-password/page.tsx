"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-sm"
        >
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            If an account exists for <span className="text-zinc-300">{email}</span>, we&apos;ve sent a password reset link. Check your inbox and spam folder.
          </p>
          <Link href="/login">
            <button className="text-sm text-[#388bfd] hover:underline font-medium">← Back to login</button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Logo"
            className="h-7 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
          />
          <span className="text-lg font-bold text-white">CodeVerse</span>
        </div>

        <h1 className="text-xl font-bold text-white mb-1 text-center">Reset your password</h1>
        <p className="text-zinc-500 text-sm mb-7 text-center">Enter the email associated with your account and we&apos;ll send a reset link.</p>

        <form className="flex flex-col gap-3.5" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-medium py-2.5 rounded-lg transition-all text-sm mt-1 shadow-lg shadow-emerald-500/10 active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Remember your password?{" "}
          <Link href="/login" className="text-[#388bfd] hover:underline font-medium">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
