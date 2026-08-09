"use client";
import React from "react";
import { GitBranch, Wifi, Cpu, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { useWorkspace } from "@/features/workspace/context/WorkspaceContext";

export function StatusBar() {
  const { 
    activeFileId, 
    files, 
    cursorPosition, 
    updateFileLanguage,
    isTerminalOpen,
    toggleTerminal,
    isAIPanelOpen,
    toggleAIPanel
  } = useWorkspace();
  
  const activeFile = activeFileId ? files[activeFileId] : null;

  const supportedLanguages = [
    { id: "python", name: "Python 3" },
    { id: "c", name: "C (GCC)" },
    { id: "cpp", name: "C++ (G++)" },
    { id: "java", name: "Java" },
    { id: "javascript", name: "JavaScript" },
    { id: "typescript", name: "TypeScript" },
    { id: "plaintext", name: "Plain Text" },
  ];

  return (
    <footer className="h-6 bg-[#121214] border-t border-zinc-800/80 flex items-center justify-between px-3 fixed bottom-0 left-0 right-0 z-40 select-none text-[10px] font-mono text-zinc-400">
      {/* Left: Branch & Service Connections */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-zinc-300 hover:text-zinc-100 cursor-pointer transition-colors">
          <GitBranch size={12} className="text-primary" />
          <span>main*</span>
        </div>

        <div className="h-3 w-[1px] bg-zinc-800" />

        <div className="flex items-center gap-1 text-emerald-400">
          <Wifi size={11} />
          <span>Execution Engine Connected</span>
        </div>

        <div className="flex items-center gap-1 text-blue-400">
          <Cpu size={11} />
          <span>Gemini Ready</span>
        </div>
      </div>

      {/* Right: Encoding, Cursor Pos, Language & Panel Controls */}
      <div className="flex items-center gap-3">
        {/* Terminal Toggle Button */}
        <button 
          onClick={toggleTerminal}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            isTerminalOpen 
              ? "text-primary bg-zinc-800/90 font-medium" 
              : "hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
          title="Toggle Terminal"
        >
          <Terminal size={11} />
          <span>Terminal</span>
        </button>

        {/* AI Sidepanel Toggle Button */}
        <button 
          onClick={toggleAIPanel}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            isAIPanelOpen 
              ? "text-primary bg-zinc-800/90 font-medium" 
              : "hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
          title="Toggle AI Panel"
        >
          <Sparkles size={11} />
          <span>AI Panel</span>
        </button>

        <div className="h-3 w-[1px] bg-zinc-800" />

        <div>Ln {cursorPosition.lineNumber}, Col {cursorPosition.column}</div>
        
        <div>UTF-8</div>

        {/* Language Selector */}
        {activeFile ? (
          <select 
            value={activeFile.language} 
            onChange={(e) => updateFileLanguage(activeFileId!, e.target.value)}
            className="bg-transparent border-none text-zinc-300 focus:ring-0 outline-none cursor-pointer hover:text-zinc-100 transition-colors font-mono"
          >
            {supportedLanguages.map(lang => (
              <option key={lang.id} value={lang.id} className="bg-zinc-900 text-zinc-200">
                {lang.name}
              </option>
            ))}
          </select>
        ) : (
          <div>Plain Text</div>
        )}

        <CheckCircle2 size={12} className="text-emerald-400" />
      </div>
    </footer>
  );
}

