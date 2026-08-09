"use client";
import React, { useState } from "react";
import { 
  Files, 
  Search, 
  GitBranch, 
  Blocks, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Folder, 
  FileCode, 
  FileText,
  MoreHorizontal
} from "lucide-react";
import { useWorkspace } from "@/features/workspace/context/WorkspaceContext";

export function Sidebar() {
  const { activeFileId, openFile, files, createFile, deleteFile } = useWorkspace();
  const [activeTab, setActiveTab] = useState<"explorer" | "search" | "git" | "extensions" | "settings">("explorer");
  const [srcOpen, setSrcOpen] = useState(true);

  const handleCreateFile = () => {
    const fileName = prompt("Enter file name (e.g. index.js):", "new_file.py");
    if (fileName) {
      createFile(fileName);
    }
  };

  const handleFileClick = (id: string) => {
    if (!files[id]) {
      openFile(id, {
        name: id,
        language: id.endsWith(".txt") ? "plaintext" : "python",
        content: id === "requirements.txt" ? "fastapi==0.104.1\nuvicorn==0.23.2\npydantic==2.4.2" : "",
        originalContent: id === "requirements.txt" ? "fastapi==0.104.1\nuvicorn==0.23.2\npydantic==2.4.2" : "",
      });
    } else {
      openFile(id);
    }
  };

  const getFileRowClass = (id: string) => {
    const isActive = activeFileId === id;
    return `flex items-center gap-1.5 py-1 px-2.5 rounded-sm cursor-pointer transition-colors text-[11px] font-mono ${
      isActive 
        ? "bg-primary/15 text-primary font-medium border-l-2 border-primary" 
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border-l-2 border-transparent"
    }`;
  };

  return (
    <div className="flex h-full select-none shrink-0 border-r border-zinc-800/80">
      {/* Activity Bar (40px) */}
      <aside className="w-10 bg-[#121214] border-r border-zinc-800/70 flex flex-col items-center py-2 gap-1.5 z-20 shrink-0">
        <button
          onClick={() => setActiveTab("explorer")}
          className={`p-2 rounded-md transition-colors ${
            activeTab === "explorer"
              ? "text-primary bg-zinc-800/80"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
          }`}
          title="Explorer"
        >
          <Files size={16} />
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`p-2 rounded-md transition-colors ${
            activeTab === "search"
              ? "text-primary bg-zinc-800/80"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
          }`}
          title="Search"
        >
          <Search size={16} />
        </button>
        <button
          onClick={() => setActiveTab("git")}
          className={`p-2 rounded-md transition-colors ${
            activeTab === "git"
              ? "text-primary bg-zinc-800/80"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
          }`}
          title="Source Control"
        >
          <GitBranch size={16} />
        </button>
        <button
          onClick={() => setActiveTab("extensions")}
          className={`p-2 rounded-md transition-colors ${
            activeTab === "extensions"
              ? "text-primary bg-zinc-800/80"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
          }`}
          title="Extensions"
        >
          <Blocks size={16} />
        </button>

        <div className="mt-auto">
          <button
            onClick={() => setActiveTab("settings")}
            className={`p-2 rounded-md transition-colors ${
              activeTab === "settings"
                ? "text-primary bg-zinc-800/80"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
            }`}
            title="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </aside>

      {/* Dynamic Pane Content (~192px width) */}
      <aside className="w-48 bg-[#18181b]/95 flex flex-col overflow-y-auto shrink-0 font-mono text-[11px]">
        {/* Pane Header */}
        <div className="h-7 px-3 flex items-center justify-between border-b border-zinc-800/60 bg-[#121214]/60 shrink-0">
          <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
            {activeTab}
          </span>
          <div className="flex items-center gap-1">
            {activeTab === "explorer" && (
              <button onClick={handleCreateFile} className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors" title="New File">
                <Files size={12} />
              </button>
            )}
            <button className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors">
              <MoreHorizontal size={13} />
            </button>
          </div>
        </div>

        {/* Explorer Content */}
        {activeTab === "explorer" && (
          <div className="flex-1 py-1 px-1 overflow-y-auto">
            <div className="flex items-center gap-1 text-[10px] uppercase text-zinc-500 font-semibold px-1 py-1">
              <span>Project Files</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <div 
                onClick={() => setSrcOpen(!srcOpen)}
                className="flex items-center gap-1 py-1 px-2 rounded-sm hover:bg-zinc-800/40 cursor-pointer text-zinc-300 transition-colors"
              >
                {srcOpen ? <ChevronDown size={13} className="text-zinc-500 shrink-0" /> : <ChevronRight size={13} className="text-zinc-500 shrink-0" />}
                <Folder size={13} className="text-blue-400 shrink-0" />
                <span className="truncate">project</span>
              </div>

              {srcOpen && (
                <div className="flex flex-col pl-3 border-l border-zinc-800/60 ml-2 gap-0.5">
                  {Object.values(files).map((file) => {
                    let Icon = FileText;
                    let iconColor = "text-zinc-400";
                    if (file.name.endsWith(".py")) {
                      Icon = FileCode;
                      iconColor = "text-emerald-400";
                    } else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
                      Icon = FileCode;
                      iconColor = "text-yellow-400";
                    }

                    return (
                      <div 
                        key={file.id}
                        className={`group relative flex items-center justify-between ${getFileRowClass(file.id)}`}
                        onClick={() => handleFileClick(file.id)}
                      >
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <Icon size={13} className={`${iconColor} shrink-0`} />
                          <span className="truncate">{file.name}</span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 rounded transition-all shrink-0"
                          title="Delete File"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Placeholder Content for other tabs */}
        {activeTab !== "explorer" && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center gap-2 text-zinc-500 font-sans">
            {activeTab === "search" && <Search size={24} className="text-zinc-600 mb-2" />}
            {activeTab === "git" && <GitBranch size={24} className="text-zinc-600 mb-2" />}
            {activeTab === "extensions" && <Blocks size={24} className="text-zinc-600 mb-2" />}
            {activeTab === "settings" && <Settings size={24} className="text-zinc-600 mb-2" />}
            <p className="text-[12px] font-medium text-zinc-400 capitalize">{activeTab}</p>
            <p className="text-[10px]">This feature is under development.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

