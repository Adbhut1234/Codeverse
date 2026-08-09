"use client";
import React, { useRef, useEffect, useState } from "react";
import { 
  Terminal as TerminalIcon, 
  Trash2, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Activity, 
  AlertOctagon
} from "lucide-react";
import { useWorkspace } from "@/features/workspace/context/WorkspaceContext";
import { motion } from "framer-motion";

function parseMetrics(content: string) {
  const timeMatch = content.match(/Time:\s*([0-9.a-zA-Z]+)/i);
  const memoryMatch = content.match(/Memory:\s*([0-9.a-zA-Z]+)/i);
  const statusMatch = content.match(/Status:\s*([^|]+)/i);

  return {
    time: timeMatch ? timeMatch[1] : "0.005 s",
    memory: memoryMatch ? memoryMatch[1] : "32180 KB",
    status: statusMatch ? statusMatch[1].trim() : "Accepted"
  };
}

export function TerminalPane() {
  const { 
    terminalHistory, 
    stdin, 
    setStdin, 
    clearTerminal, 
    appendTerminal,
    runCode,
    isExecuting,
    isTerminalOpen,
    toggleTerminal,
    files,
    markers
  } = useWorkspace();
  
  const [activeTab, setActiveTab] = useState<"terminal" | "problems" | "output">("terminal");
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalHeight, setTerminalHeight] = useState(220);
  const [isDragging, setIsDragging] = useState(false);
  const [cmdInput, setCmdInput] = useState("");

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Keyboard shortcut Ctrl + ` or Ctrl + J to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "j" || e.key === "J")) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTerminal]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = window.innerHeight - moveEvent.clientY - 20;
      if (newHeight >= 80 && newHeight <= window.innerHeight - 100) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleCommand = (cmd: string) => {
    appendTerminal({ type: "command", content: `➜ ${cmd}` });
    
    if (cmd === "clear") {
      clearTerminal();
    } else if (cmd === "run") {
      runCode();
    } else if (cmd === "ls") {
      appendTerminal({ type: "stdout", content: Object.keys(files).join("  ") });
    } else if (cmd === "pwd") {
      appendTerminal({ type: "stdout", content: "/home/workspace" });
    } else if (cmd === "whoami") {
      appendTerminal({ type: "stdout", content: "codeverse_user" });
    } else if (cmd.startsWith("echo ")) {
      appendTerminal({ type: "stdout", content: cmd.substring(5) });
    } else if (cmd.startsWith("cat ")) {
      const fileName = cmd.substring(4).trim();
      if (files[fileName]) {
        appendTerminal({ type: "stdout", content: files[fileName].content });
      } else {
        appendTerminal({ type: "stderr", content: `cat: ${fileName}: No such file or directory` });
      }
    } else {
      appendTerminal({ type: "stderr", content: `Command not found: ${cmd}\nAvailable commands: run, clear, ls, pwd, whoami, cat <file>, echo` });
    }
  };

  const metricsLogs = terminalHistory.filter((l) => l.type === "metrics" || l.type === "system");
  const problemLogs = terminalHistory.filter((l) => l.type === "compile_error" || l.type === "stderr");

  return (
    <>
      {/* Invisible drag overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-row-resize select-none" />
      )}

      <div 
        style={{ height: isTerminalOpen ? `${terminalHeight}px` : "0px" }}
        className={`w-full bg-[#0D1117] flex flex-col relative shrink-0 select-none font-sans p-1 pt-0 ${
          isDragging ? "" : "transition-all duration-200"
        } ${
          isTerminalOpen ? "opacity-100" : "opacity-0 overflow-hidden border-none"
        }`}
      >
        {/* Top Resize Drag Handle */}
        <div 
          onMouseDown={handleMouseDown}
          className="absolute -top-1 left-0 right-0 h-2 cursor-row-resize hover:bg-[#388bfd]/40 group z-30 flex items-center justify-center transition-colors"
        >
          <div className="w-8 h-0.5 rounded-full bg-[#30363D] group-hover:bg-[#388bfd] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Full-width Terminal Container with Rounded Top Corners */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#161B22] border border-[#30363D]/40 rounded-t-[10px] rounded-b-[10px] overflow-hidden font-sans">
          {/* Header Bar with 3 Clean Tabs */}
          <div className="h-9 px-3 flex items-center justify-between bg-[#161B22] border-b border-[#30363D]/40 shrink-0 font-sans">
            <div className="flex items-center gap-1 text-[11px]">
              {/* Terminal Tab */}
              <button 
                onClick={() => setActiveTab("terminal")}
                className={`flex items-center gap-1.5 px-3 h-7 rounded-[8px] transition-colors cursor-pointer font-sans ${
                  activeTab === "terminal" 
                    ? "bg-[#21262D] text-zinc-100 font-medium border border-[#30363D]" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D]/40"
                }`}
              >
                <TerminalIcon size={12} className={activeTab === "terminal" ? "text-[#388bfd]" : ""} />
                <span>Terminal</span>
              </button>

              {/* Output Tab */}
              <button 
                onClick={() => setActiveTab("output")}
                className={`flex items-center gap-1.5 px-3 h-7 rounded-[8px] transition-colors cursor-pointer font-sans ${
                  activeTab === "output" 
                    ? "bg-[#21262D] text-zinc-100 font-medium border border-[#30363D]" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D]/40"
                }`}
              >
                <Activity size={12} className={activeTab === "output" ? "text-[#2ea043]" : ""} />
                <span>Output</span>
              </button>

              {/* Problems Tab */}
              <button 
                onClick={() => setActiveTab("problems")}
                className={`flex items-center gap-1.5 px-3 h-7 rounded-[8px] transition-colors cursor-pointer font-sans ${
                  activeTab === "problems" 
                    ? "bg-[#21262D] text-zinc-100 font-medium border border-[#30363D]" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D]/40"
                }`}
              >
                <AlertOctagon size={12} className={activeTab === "problems" ? "text-amber-400" : ""} />
                <span>Problems</span>
                {(markers.length + problemLogs.length) > 0 && (
                  <div className="bg-amber-500/20 text-amber-400 px-1.5 rounded-full text-[9px] font-bold ml-0.5">
                    {markers.length + problemLogs.length}
                  </div>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* STDIN Input Field */}
              {activeTab === "terminal" && (
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[10px] text-zinc-500 font-medium uppercase font-sans">STDIN</span>
                  <input 
                    type="text"
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Standard input..."
                    className="bg-[#0D1117] border border-[#30363D] rounded-[8px] px-2.5 py-1 text-[11px] text-zinc-200 w-44 focus:outline-none focus:border-[#388bfd] transition-colors font-mono"
                    disabled={isExecuting}
                  />
                </div>
              )}

              <div className="h-3.5 w-[1px] bg-[#30363D]" />

              <button 
                onClick={clearTerminal}
                className="h-6 w-6 rounded-[6px] flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D] transition-colors"
                title="Clear Logs"
              >
                <Trash2 size={12} />
              </button>

              <button 
                onClick={toggleTerminal}
                className="h-6 w-6 rounded-[6px] flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D] transition-colors"
                title="Close Terminal"
              >
                <X size={13} />
              </button>
            </div>
          </div>
          
          {/* Tab Content View Area */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-auto p-4 text-xs text-zinc-200 leading-relaxed font-mono selection:bg-[#388bfd]/30 bg-[#0D1117]"
          >
            {activeTab === "terminal" && (
              <div className="flex flex-col gap-2.5">
                {terminalHistory.map((log) => {
                  if (log.type === "command") {
                    return (
                      <div key={log.id} className="flex items-center gap-2 text-zinc-400 my-0.5">
                        <span className="text-[#388bfd] font-bold">➜</span>
                        <span className="font-mono text-zinc-200 font-medium">{log.content.replace("➜ ", "")}</span>
                      </div>
                    );
                  }
                  if (log.type === "stdout") {
                    return (
                      <div key={log.id} className="text-zinc-100 whitespace-pre-wrap font-mono my-0.5 bg-[#161B22]/40 p-2.5 rounded-[8px] border border-[#30363D]/30">
                        {log.content}
                      </div>
                    );
                  }
                  if (log.type === "stderr") {
                    return (
                      <div key={log.id} className="text-rose-300 bg-rose-950/20 border border-rose-500/40 p-3 rounded-[8px] my-1 font-mono whitespace-pre-wrap flex items-start gap-2">
                        <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                        <span>{log.content}</span>
                      </div>
                    );
                  }
                  if (log.type === "compile_error") {
                    return (
                      <motion.div 
                        key={log.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="border border-rose-500/40 bg-rose-950/20 text-rose-300 rounded-[8px] p-3 my-1.5 font-mono text-xs whitespace-pre-wrap"
                      >
                        <div className="flex items-center gap-2 font-semibold text-rose-300 mb-1.5">
                          <AlertCircle size={14} className="text-rose-400" />
                          <span>Compilation Error</span>
                        </div>
                        <code>{log.content}</code>
                      </motion.div>
                    );
                  }
                  if (log.type === "metrics") {
                    return null;
                  }
                  return (
                    <div key={log.id} className="text-zinc-500 text-[11px] my-0.5">
                      {log.content}
                    </div>
                  );
                })}

                {isExecuting ? (
                  <div className="flex items-center gap-2 text-[#388bfd] my-2 text-xs font-mono animate-pulse">
                    <Loader2 size={13} className="animate-spin" />
                    <span>Running code...</span>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (cmdInput.trim()) {
                       handleCommand(cmdInput.trim());
                       setCmdInput("");
                    }
                  }} className="flex items-center gap-2 text-zinc-400 my-0.5 mt-2">
                    <span className="text-[#388bfd] font-bold">➜</span>
                    <input 
                      type="text" 
                      value={cmdInput}
                      onChange={(e) => setCmdInput(e.target.value)}
                      className="bg-transparent border-none outline-none text-zinc-200 font-mono flex-1 w-full"
                      placeholder="CodeVerse ~ $ (type 'run', 'ls', 'clear')"
                      autoFocus
                    />
                  </form>
                )}
              </div>
            )}

            {activeTab === "output" && (
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="text-[10px] text-zinc-500 font-sans uppercase font-medium tracking-wider">
                  Execution Metrics & Cards
                </div>
                {metricsLogs.length === 0 ? (
                  <div className="text-zinc-500 italic text-xs">No execution metrics recorded. Click ▶ Run to execute.</div>
                ) : (
                  metricsLogs.map((log) => {
                    const metrics = parseMetrics(log.content);
                    return (
                      <div key={log.id} className="bg-[#161B22] border border-[#30363D] rounded-[10px] p-3 font-mono">
                        <div className="flex items-center gap-2 text-[#2ea043] font-semibold text-xs mb-2">
                          <CheckCircle2 size={14} />
                          <span>✓ Execution Completed</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-zinc-300 text-[11px] bg-[#0D1117] p-2.5 rounded-[8px] border border-[#30363D]/60 font-mono">
                          <div>
                            <div className="text-[10px] text-zinc-500 font-sans uppercase">Time</div>
                            <div className="font-semibold text-zinc-100">{metrics.time}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-zinc-500 font-sans uppercase">Memory</div>
                            <div className="font-semibold text-zinc-100">{metrics.memory}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-zinc-500 font-sans uppercase">Status</div>
                            <div className="font-semibold text-[#2ea043]">{metrics.status}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === "problems" && (
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="text-[10px] text-zinc-500 font-sans uppercase font-medium tracking-wider">
                  Diagnostics & Errors
                </div>
                {markers.length === 0 && problemLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2 py-6 font-sans">
                    <CheckCircle2 size={24} className="text-[#2ea043]" />
                    <span className="text-xs text-zinc-400 font-medium">No syntax problems or diagnostic warnings</span>
                  </div>
                ) : (
                  <>
                    {markers.map((marker, i) => (
                      <div key={`marker-${i}`} className="border border-amber-500/30 bg-amber-950/10 text-amber-300 rounded-[8px] p-3 my-1.5 font-mono text-xs whitespace-pre-wrap">
                        <div className="flex items-center gap-2 font-semibold text-amber-400 mb-1.5">
                          <AlertOctagon size={14} />
                          <span>Line {marker.startLineNumber}, Column {marker.startColumn}</span>
                        </div>
                        <code>{marker.message}</code>
                      </div>
                    ))}
                    {problemLogs.map((log) => {
                      if (log.type === "compile_error") {
                        return (
                          <div key={log.id} className="border border-rose-500/40 bg-rose-950/20 text-rose-300 rounded-[8px] p-3 my-1.5 font-mono text-xs whitespace-pre-wrap">
                            <div className="flex items-center gap-2 font-semibold text-rose-300 mb-1.5">
                              <AlertCircle size={14} className="text-rose-400" />
                              <span>Compilation Error</span>
                            </div>
                            <code>{log.content}</code>
                          </div>
                        );
                      }
                      if (log.type === "stderr") {
                        return (
                          <div key={log.id} className="text-rose-300 bg-rose-950/20 border border-rose-500/40 p-3 rounded-[8px] my-1 font-mono whitespace-pre-wrap flex items-start gap-2">
                            <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                            <span>{log.content}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
