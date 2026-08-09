
"use client";
import React from "react";
import { Search, Bell, User, Play, Loader2, Sparkles } from "lucide-react";
import { useWorkspace } from "@/features/workspace/context/WorkspaceContext";
import { motion } from "framer-motion";
import Link from "next/link";

export function Header() {
  const { 
    activeFileId, 
    files, 
    updateFileLanguage,
    runCode,
    isExecuting,
    toggleAIPanel
  } = useWorkspace();
  
  const activeFile = activeFileId ? files[activeFileId] : null;

  const supportedLanguages = [
    { id: "python", name: "Python 3" },
    { id: "c", name: "C (GCC)" },
    { id: "cpp", name: "C++ (G++)" },
    { id: "java", name: "Java 17" },
    { id: "javascript", name: "JavaScript (Node)" },
    { id: "typescript", name: "TypeScript" },
    { id: "plaintext", name: "Plain Text" },
  ];

  return (
    <header className="h-9 bg-[#0D1117] border-b border-[#30363D]/60 px-3 flex items-center justify-between shrink-0 select-none z-30 font-sans text-xs">
      {/* Left: Logo & Language Selector */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="CodeVerse Logo"
            className="h-4 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtKfi3RPAx1c9YLQqjA9VlPE8xa5QUqiL1kMm1VlVHJ4AzPMLoi5iVfi1ui-geJov3eWXToRsgCOuRquMZcS-pMYmal5H1y3KFS6hr3HsnEQvFmpn8cEiEIQKWreCcPRfETuatuLs57_23VvIkIj39paBhPqOIbnGpJ4nAVBRyRm-paIg7XQoxgNpuq4549PWP7iAl7bGmyvfE66MWLA3p7r-KJu7z9lNFUgIdYw7mYTjpROnOPk_FccFoT"
          />
          <span className="hidden sm:inline text-[12px] font-semibold text-zinc-100 tracking-tight">
            CodeVerse
          </span>
        </Link>

        <div className="h-3 w-[1px] bg-[#30363D]/60" />

        {/* Compact Language Selector */}
        {activeFile ? (
          <select
            value={activeFile.language}
            onChange={(e) => updateFileLanguage(activeFileId!, e.target.value)}
            className="bg-[#161B22] border border-[#30363D]/60 text-zinc-200 text-[11px] rounded-[6px] px-2 h-6 focus:ring-0 outline-none cursor-pointer font-sans hover:border-zinc-500 transition-colors"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.id} value={lang.id} className="bg-[#161B22] text-zinc-200">
                {lang.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-zinc-400 text-[11px]">Python 3</span>
        )}

        {/* Compact ▶ Run Button with Framer Motion Scale */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          onClick={runCode}
          disabled={isExecuting || !activeFileId}
          className="flex items-center gap-1 bg-[#238636] hover:bg-[#2ea043] text-white px-2.5 h-6 rounded-[6px] text-[11px] font-medium disabled:opacity-50 transition-colors cursor-pointer shadow-sm"
          title="Run Code (Ctrl + Enter)"
        >
          {isExecuting ? (
            <Loader2 size={10} className="animate-spin" />
          ) : (
            <Play size={10} className="fill-current" />
          )}
          <span>Run</span>
        </motion.button>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4">
        <div className="relative flex items-center w-full">
          <Search size={12} className="absolute left-2.5 text-zinc-500 pointer-events-none" />
          <input
            className="w-full h-6 bg-[#161B22] border border-[#30363D]/60 rounded-[6px] pl-8 pr-10 text-[11px] text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-[#388bfd] transition-all font-sans"
            placeholder="Search commands or files..."
            type="text"
          />
          <kbd className="absolute right-2 text-[9px] font-mono bg-[#21262D] text-zinc-400 border border-[#30363D]/60 rounded px-1 pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Tiny Status Dots, Notifications & Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 text-[11px] text-zinc-400 font-sans">
          <div className="flex items-center gap-1.5" title="Execution Engine Connected">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043]" />
            <span className="text-zinc-300 text-[10px]">Execution Engine Connected</span>
          </div>

          <div className="flex items-center gap-1.5" title="Gemini Ready">
            <span className="w-1.5 h-1.5 rounded-full bg-[#388bfd]" />
            <span className="text-zinc-300 text-[10px]">Gemini Ready</span>
          </div>
        </div>

        <div className="h-3 w-[1px] bg-[#30363D]/60" />

        <button 
          onClick={toggleAIPanel}
          className="md:hidden h-6 w-6 rounded-[6px] flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-[#161B22] transition-colors"
        >
          <Sparkles size={12} className="text-[#388bfd]" />
        </button>

        <button className="h-6 w-6 rounded-[6px] flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-[#161B22] transition-colors">
          <Bell size={12} />
        </button>

        <div className="h-6 w-6 rounded-[6px] bg-[#21262D] border border-[#30363D]/60 flex items-center justify-center cursor-pointer hover:border-zinc-500 transition-colors">
          <User size={12} className="text-zinc-300" />
        </div>
      </div>
    </header>
  );
}






