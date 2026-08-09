"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const codeLines = [
  { text: "def analyze_data(dataset):", color: "text-[#C678DD]" },
  { text: '    """Process and clean the dataset"""', color: "text-[#6A9955]" },
  { text: "    results = []", color: "text-on-surface" },
  { text: "    for row in dataset:", color: "text-[#C678DD]" },
  { text: "        cleaned = transform(row)", color: "text-on-surface" },
  { text: "        if validate(cleaned):", color: "text-[#C678DD]" },
  { text: "            results.append(cleaned)", color: "text-on-surface" },
  { text: "    return results", color: "text-[#C678DD]" },
];

function TypingCode() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          // Reset after a pause
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono-code text-[13px] leading-[1.8] select-none">
      {codeLines.map((line, i) => (
        <div
          key={i}
          className={`flex transition-all duration-300 ${
            i < visibleLines ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          <span className="text-outline-variant/40 w-8 text-right mr-4 select-none">
            {i + 1}
          </span>
          <span className={line.color}>{line.text}</span>
          {i === visibleLines - 1 && (
            <span className="w-[2px] h-[18px] bg-primary ml-0.5 animate-pulse inline-block" />
          )}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="w-full relative flex flex-col items-center pt-section-gap pb-stack-lg px-margin-mobile lg:px-margin-desktop overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#131315]/50 to-[#09090B] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-[800px] w-full text-center relative z-10 flex flex-col items-center mt-section-gap mb-stack-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded border border-outline-variant/30 bg-surface-container-low mb-stack-md"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono-label text-mono-label text-primary uppercase tracking-widest">
            AI-Native Development Environment
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display-lg text-[56px] md:text-[72px] leading-[1.05] tracking-tight mb-stack-md font-semibold"
        >
          Build software without <br className="hidden md:block" />
          breaking your flow.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-body-lg text-[20px] text-on-surface-variant max-w-2xl mb-stack-lg leading-relaxed"
        >
          Write, compile, debug and understand code with integrated AI
          assistance inside a modern development environment designed for
          elite engineering teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-stack-md"
        >
          <Link href="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded font-mono-label text-[14px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95">
              Start Coding
              <ArrowRight size={18} />
            </button>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-outline-variant hover:bg-surface-container-low text-on-surface px-8 py-4 rounded font-mono-label text-[14px] transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                fillRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 font-mono-code text-[13px] text-on-surface-variant/70"
        >
          <div className="flex items-center gap-2">
            <Code2 size={14} className="text-primary/60" />
            20+ Languages
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary/60" />
            Built-in AI
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-primary/60" />
            Fast Compilation
          </div>
        </motion.div>
      </div>

      {/* Animated Code Editor Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-container-max w-full mt-16 relative z-10"
      >
        <div className="relative w-full rounded-xl border border-outline-variant/40 bg-surface-container p-2 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container via-surface-container-high/20 to-primary/5 opacity-50" />

          {/* Title bar */}
          <div className="w-full h-8 bg-surface-container flex items-center px-4 border-b border-outline-variant/20 rounded-t-lg relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="mx-auto font-mono-label text-[11px] text-on-surface-variant">
              CodeVerse — data_pipeline.py
            </div>
          </div>

          {/* Editor body */}
          <div className="relative z-10 flex">
            {/* Sidebar mock */}
            <div className="w-12 bg-surface-container-low border-r border-outline-variant/20 flex flex-col items-center py-3 gap-3 shrink-0 hidden sm:flex">
              <div className="w-5 h-5 rounded bg-outline-variant/15" />
              <div className="w-5 h-5 rounded bg-outline-variant/15" />
              <div className="w-5 h-5 rounded bg-primary/20" />
              <div className="w-5 h-5 rounded bg-outline-variant/15" />
            </div>

            {/* Code area */}
            <div className="flex-1 p-6 min-h-[280px] bg-surface-container-lowest/30">
              <TypingCode />
            </div>

            {/* AI sidebar mock */}
            <div className="w-48 bg-surface-container-low border-l border-outline-variant/20 p-4 shrink-0 hidden lg:block">
              <div className="font-mono-label text-[10px] text-primary uppercase tracking-widest mb-3 flex items-center gap-1">
                <Sparkles size={10} />
                AI Assistant
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-outline-variant/15 rounded w-full" />
                <div className="h-2 bg-outline-variant/15 rounded w-4/5" />
                <div className="h-2 bg-outline-variant/15 rounded w-3/5" />
                <div className="h-2 bg-primary/20 rounded w-full mt-3" />
                <div className="h-2 bg-primary/20 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
