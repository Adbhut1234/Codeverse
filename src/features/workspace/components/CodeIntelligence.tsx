"use client";
import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Loader2, 
  Send, 
  Trash2, 
  User as UserIcon,
  Bot,
  MessageSquare,
  Bug,
  Zap,
  FlaskConical,
  ArrowRight,
  Copy,
  Check,
  Wrench,
  ZapOff,
  X
} from "lucide-react";
import { useWorkspace } from "@/features/workspace/context/WorkspaceContext";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export function CodeIntelligence() {
  const [prompt, setPrompt] = useState("");
  const [aiPanelWidth, setAiPanelWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  
  const { 
    aiMessages, 
    isGeneratingAI, 
    askAI, 
    clearAIMessages, 
    activeFileId, 
    files,
    selectedText,
    updateFileContent,
    isLiveAssistEnabled,
    toggleLiveAssist,
    isAIPanelOpen,
    setIsAIPanelOpen
  } = useWorkspace();
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyCode = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const recentActions = [
    { label: "Explain Code", intent: "explain" as const, icon: Sparkles },
    { label: "Find Bug", intent: "debug" as const, icon: Bug },
    { label: "Generate Tests", intent: "test_cases" as const, icon: FlaskConical },
    { label: "Fix Code", intent: "fix_code" as const, icon: Wrench },
  ];

  const handleAction = async (intent: "explain" | "debug" | "test_cases" | "fix_code") => {
    const file = activeFileId ? files[activeFileId] : null;
    if (!file) return;

    const response = await askAI(intent, file.content, file.language, selectedText);
    
    if (intent === "fix_code" && response && activeFileId) {
      // Extract code block from markdown
      const codeMatch = response.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
      const extractedCode = codeMatch ? codeMatch[1].trim() : response.trim();
      updateFileContent(activeFileId, extractedCode);
    }
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGeneratingAI) return;
    const file = activeFileId ? files[activeFileId] : null;
    askAI("general", file?.content, file?.language, selectedText, prompt.trim());
    setPrompt("");
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, isGeneratingAI]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = window.innerWidth - moveEvent.clientX;
      if (newWidth >= 220 && newWidth <= 550) {
        setAiPanelWidth(newWidth);
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

  const parseMarkdownCards = (content: string): { title?: string; body: string }[] => {
    const trimmed = content.trim();
    if (!trimmed.includes("## ")) {
      return [{ body: trimmed }];
    }

    const rawParts = trimmed.split(/(?:^|\n)##\s+/).filter((s) => s.trim().length > 0);
    if (rawParts.length === 0) {
      return [{ body: trimmed }];
    }

    return rawParts.map((part) => {
      const trimmedPart = part.trim();
      const firstLineEnd = trimmedPart.indexOf("\n");
      if (firstLineEnd === -1) {
        return { title: trimmedPart, body: "" };
      }
      const title = trimmedPart.substring(0, firstLineEnd).trim();
      const body = trimmedPart.substring(firstLineEnd + 1).trim();
      return { title, body };
    });
  };

  return (
    <>
      {/* Invisible drag overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize select-none" />
      )}

      <aside 
        style={{ width: `${aiPanelWidth}px` }}
        className={`h-full bg-[#0D1117] p-1 flex flex-col shrink-0 font-sans select-none relative transition-transform duration-300 md:translate-x-0 ${
          isAIPanelOpen ? "absolute right-0 z-40 md:relative translate-x-0 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] md:shadow-none" : "absolute right-0 z-40 translate-x-full md:relative md:hidden"
        }`}
      >
        {/* Left Drag Handle (Desktop Only) */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:flex absolute -left-1.5 top-0 bottom-0 w-3 cursor-col-resize hover:bg-[#30363D] group z-30 items-center justify-center transition-colors"
        >
          <div className="h-8 w-1 rounded-full bg-[#30363D]/60 group-hover:bg-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Panel Container */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#161B22] border border-[#30363D]/70 rounded-[10px] overflow-hidden">
          {/* Header Bar */}
          <div className="h-8 px-3 flex items-center justify-between border-b border-[#30363D]/70 bg-[#161B22] shrink-0 font-sans">
            <div className="flex items-center gap-1.5">
              <MessageSquare size={13} className="text-zinc-400" />
              <span className="text-xs font-medium text-zinc-200">
                Assistant
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleLiveAssist}
                className={`flex items-center gap-1 text-[10px] px-2 h-6 rounded-[10px] border transition-colors cursor-pointer ${
                  isLiveAssistEnabled 
                    ? "text-amber-400 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20" 
                    : "text-zinc-500 border-[#30363D] bg-[#21262D] hover:text-zinc-300"
                }`}
                title={isLiveAssistEnabled ? "Live Assist is ON (Auto-replies after run)" : "Live Assist is OFF (Manual only)"}
              >
                {isLiveAssistEnabled ? <Zap size={10} className="fill-amber-400" /> : <ZapOff size={10} />}
                <span>Live Assist</span>
              </button>
              
              {aiMessages.length > 0 && (
                <button 
                  onClick={clearAIMessages} 
                  className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-200 px-2 h-6 rounded-[10px] bg-[#21262D] border border-[#30363D] transition-colors cursor-pointer"
                  title="Clear Chat"
                >
                  <Trash2 size={10} />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}

              {/* Mobile Close Button */}
              <button 
                onClick={() => setIsAIPanelOpen(false)} 
                className="md:hidden flex items-center justify-center text-zinc-400 hover:text-zinc-200 w-6 h-6 rounded-[10px] bg-[#21262D] border border-[#30363D] transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 font-sans bg-[#161B22]">
            {aiMessages.length === 0 ? (
              <div className="flex-1 flex flex-col justify-start pt-3 text-zinc-400 text-xs">
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  How can I help with your code today?
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 font-sans">
                <AnimatePresence>
                  {aiMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={`flex flex-col gap-1 w-full ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="w-full flex items-center justify-between text-[9px] text-zinc-500 font-medium px-1">
                        <div className="flex items-center gap-1">
                          {msg.role === "assistant" ? (
                            <>
                              <Bot size={10} className="text-zinc-400" />
                              <span>Assistant</span>
                            </>
                          ) : (
                            <>
                              <UserIcon size={10} className="text-zinc-400" />
                              <span>You</span>
                            </>
                          )}
                        </div>

                        {/* Copy Response Button */}
                        {msg.role === "assistant" && (
                          <button
                            onClick={() => handleCopyMessage(msg.content, i)}
                            className="flex items-center gap-1 text-[9px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                            title="Copy AI Response"
                          >
                            {copiedIndex === i ? (
                              <>
                                <Check size={10} className="text-[#2ea043]" />
                                <span className="text-[#2ea043]">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {msg.role === "user" ? (
                        <div className="p-2.5 rounded-[10px] text-[11px] leading-relaxed max-w-[250px] bg-[#21262D] text-zinc-100 border border-[#30363D] rounded-tr-none">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="w-full flex flex-col gap-2 font-sans">
                          {parseMarkdownCards(msg.content).map((card, cardIdx) => (
                            <div
                              key={cardIdx}
                              className="bg-[#0D1117] border border-[#30363D]/80 rounded-[8px] p-2.5 flex flex-col gap-1.5 text-[11px] text-zinc-200 shadow-sm"
                            >
                              {card.title && (
                                <div className="text-xs font-semibold text-zinc-100 border-b border-[#30363D]/50 pb-1 flex items-center gap-1.5">
                                  <span>{card.title}</span>
                                </div>
                              )}
                              <div className="leading-relaxed">
                                <ReactMarkdown
                                  components={{
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    code({ inline, className, children, ...props }: any) {
                                      const match = /language-(\w+)/.exec(className || "");
                                      const codeString = String(children).replace(/\n$/, "");
                                      const blockKey = `${i}-${cardIdx}-${codeString.slice(0, 15)}`;
                                      const isCodeCopied = copiedCodeKey === blockKey;

                                      return !inline ? (
                                        <div className="relative my-1.5 rounded-[6px] overflow-hidden border border-[#30363D]">
                                          <div className="bg-[#161B22] text-[9px] text-zinc-400 px-2 py-0.5 border-b border-[#30363D] flex justify-between items-center font-mono">
                                            <span>{match?.[1] || "code"}</span>
                                            <button
                                              onClick={() => handleCopyCode(codeString, blockKey)}
                                              className="flex items-center gap-1 text-[9px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                                              title="Copy Snippet"
                                            >
                                              {isCodeCopied ? (
                                                <Check size={9} className="text-[#2ea043]" />
                                              ) : (
                                                <Copy size={9} />
                                              )}
                                              <span>{isCodeCopied ? "Copied" : "Copy"}</span>
                                            </button>
                                          </div>
                                          <pre className="p-2 bg-[#0D1117] overflow-x-auto font-mono text-[10.5px] text-zinc-200">
                                            <code className={className} {...props}>
                                              {children}
                                            </code>
                                          </pre>
                                        </div>
                                      ) : (
                                        <code className="bg-[#21262D] text-zinc-200 px-1 py-0.5 rounded text-[10px] font-mono" {...props}>
                                          {children}
                                        </code>
                                      );
                                    },
                                    p: ({ children }) => <div className="mb-1 last:mb-0 leading-normal">{children}</div>,
                                    ul: ({ children }) => <ul className="list-disc pl-3.5 mb-1 space-y-0.5 text-zinc-200">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-3.5 mb-1 space-y-0.5 text-zinc-200">{children}</ol>,
                                    li: ({ children }) => <li>{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
                                  }}
                                >
                                  {card.body || card.title || ""}
                                </ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isGeneratingAI && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-1 items-start"
                  >
                    <div className="flex items-center gap-1 text-[9px] text-zinc-500 font-medium px-1">
                      <Bot size={10} className="text-zinc-400" />
                      <span>Assistant</span>
                    </div>
                    <div className="p-2 rounded-[10px] bg-[#21262D] text-zinc-300 rounded-tl-none border border-[#30363D] flex items-center gap-2 text-[11px]">
                      <Loader2 size={12} className="animate-spin text-zinc-400" />
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Recent Actions Section (Lightweight Clickable Rows with Hover Micro-Interaction) */}
          <div className="px-2 py-1.5 border-t border-[#30363D]/60 bg-[#161B22] shrink-0 font-sans">
            <div className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Recent Actions
            </div>
            <div className="flex flex-col gap-0.5">
              {recentActions.map((action, idx) => {
                const IconComp = action.icon;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleAction(action.intent)}
                    disabled={isGeneratingAI}
                    className="w-full flex items-center justify-between px-2 py-1 rounded-[6px] hover:bg-[#21262D] text-left text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <IconComp size={12} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                      <span>{action.label}</span>
                    </div>
                    <ArrowRight size={10} className="text-zinc-600 group-hover:text-zinc-300 transition-colors opacity-0 group-hover:opacity-100" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Chat Input Box */}
          <div className="p-2 border-t border-[#30363D]/70 bg-[#161B22] shrink-0 font-sans">
            <form 
              onSubmit={handleChat}
              className="bg-[#0D1117] focus-within:ring-1 focus-within:ring-[#2ea043] border border-[#30363D] rounded-[10px] p-2 transition-all flex flex-col"
            >
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-[11px] text-zinc-100 resize-none h-12 placeholder:text-zinc-500 outline-none font-sans"
                placeholder="Ask Assistant..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChat(e);
                  }
                }}
                disabled={isGeneratingAI}
              />
              <div className="flex justify-between items-center mt-1 font-sans">
                <span className="text-[9px] text-zinc-500">Shift + Enter for newline</span>
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  type="submit" 
                  disabled={isGeneratingAI || !prompt.trim()}
                  className="bg-[#238636] hover:bg-[#2ea043] text-white px-2.5 h-6 rounded-[8px] text-[11px] font-medium disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                  title="Send Prompt"
                >
                  <span>Send</span>
                  <Send size={10} />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}










