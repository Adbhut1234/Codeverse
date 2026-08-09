"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export function SupportedLanguages() {
  const languages = [
    "Python",
    "Rust",
    "TypeScript",
    "Go",
    "C++",
    "Java",
    "JavaScript",
    "C#",
    "PHP",
    "Ruby",
  ];

  return (
    <section
      id="languages"
      className="w-full py-section-gap border-t border-outline-variant/10 bg-[#09090B] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mb-12"
      >
        <div className="font-mono-label text-[13px] text-outline uppercase tracking-widest text-center">
          Supported Runtimes & Languages
        </div>
      </motion.div>
      <div className="relative w-full flex overflow-x-hidden group">
        <style>{`
          .animate-marquee { animation: marquee 30s linear infinite; }
          .animate-marquee2 { animation: marquee2 30s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
          @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
        `}</style>
        <div className="animate-marquee flex gap-4 whitespace-nowrap px-4 w-max">
          {languages.map((lang, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-6 py-3 border border-outline-variant/20 rounded bg-surface-container-low font-mono-code text-[14px]"
            >
              <Code2 size={16} className="text-outline" />
              {lang}
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 flex gap-4 whitespace-nowrap px-4 w-max ml-[100%]">
          {languages.map((lang, idx) => (
            <div
              key={`copy-${idx}`}
              className="inline-flex items-center gap-3 px-6 py-3 border border-outline-variant/20 rounded bg-surface-container-low font-mono-code text-[14px]"
            >
              <Code2 size={16} className="text-outline" />
              {lang}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
