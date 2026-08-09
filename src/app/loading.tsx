"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#09090B]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-[#30363D] border-t-[#388bfd]"
          />
          {/* Inner pulsing logo */}
          <motion.img
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
            alt="CodeVerse"
            className="w-8 h-8 object-contain"
          />
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-medium ml-2">
          <span>Initializing Workspace</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], ease: "linear" }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], ease: "linear", delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], ease: "linear", delay: 0.4 }}
          >
            .
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
