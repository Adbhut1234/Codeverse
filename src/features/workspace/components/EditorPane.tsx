"use client";
import React, { useRef } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { Code2, X } from "lucide-react";
import { useWorkspace } from "@/features/workspace/context/WorkspaceContext";
import * as monaco from "monaco-editor";

export function EditorPane() {
  const { 
    files, 
    openFiles,
    activeFileId, 
    setActiveFileId,
    closeFile,
    updateFileContent,
    setCursorPosition,
    setSelectedText,
    setMarkers
  } = useWorkspace();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        lineNumber: e.position.lineNumber,
        column: e.position.column
      });
    });

    editor.onDidChangeCursorSelection((e) => {
      const selection = e.selection;
      if (selection && !selection.isEmpty()) {
        const model = editor.getModel();
        if (model) {
          const text = model.getValueInRange(selection);
          setSelectedText(text);
        }
      } else {
        setSelectedText("");
      }
    });

    monacoInstance.editor.onDidChangeMarkers(([uri]: any[]) => {
      const activeModel = editor.getModel();
      if (!activeModel) return;
      
      // Get markers for the current active file
      const currentMarkers = monacoInstance.editor.getModelMarkers({ resource: activeModel.uri });
      
      const problems = currentMarkers.map((m: any) => ({
        message: m.message,
        severity: m.severity,
        startLineNumber: m.startLineNumber,
        startColumn: m.startColumn,
        endLineNumber: m.endLineNumber,
        endColumn: m.endColumn
      }));
      
      setMarkers(problems);
    });
  };

  const handleEditorChange: OnChange = (value) => {
    if (activeFileId && value !== undefined) {
      updateFileContent(activeFileId, value);
    }
  };

  const activeFile = activeFileId ? files[activeFileId] : null;

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#0D1117] relative select-none font-sans p-1">
      {/* Almost Borderless Container with Subtle Separators */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#161B22] border border-[#30363D]/40 rounded-[10px] overflow-hidden shadow-none">
        {/* VS Code Inspired File Tabs Header */}
        <div className="h-[34px] bg-[#0D1117]/80 border-b border-[#30363D]/40 flex items-center justify-between px-1 shrink-0">
          {/* File Tabs List */}
          <div className="flex items-center gap-0.5 overflow-x-auto h-full font-mono text-[11px] no-scrollbar">
            {openFiles.map((fileId) => {
              const file = files[fileId];
              if (!file) return null;
              const isActive = fileId === activeFileId;

              return (
                <div
                  key={fileId}
                  onClick={() => setActiveFileId(fileId)}
                  className={`group relative flex items-center gap-2 px-3 h-full cursor-pointer transition-all border-r border-[#30363D]/30 shrink-0 ${
                    isActive 
                      ? "bg-[#161B22] text-[#F0F6FC] font-medium border-b-2 border-[#388bfd]" 
                      : "bg-[#0D1117]/40 text-[#8B949E] hover:text-zinc-200 hover:bg-[#161B22]/50"
                  }`}
                >
                  <Code2 size={13} className={isActive ? "text-[#388bfd]" : "text-zinc-500"} />
                  <span className="truncate max-w-[120px]">{file.name}</span>
                  
                  {openFiles.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(fileId);
                      }}
                      className="p-0.5 rounded hover:bg-[#30363D]/60 text-zinc-500 hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Close Tab"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Status Info */}
          <div className="flex items-center gap-3 px-3 text-[10px] font-mono text-zinc-500 shrink-0 font-sans">
            <span>UTF-8</span>
            <span className="uppercase">{activeFile?.language || "python"}</span>
          </div>
        </div>

        {/* Monaco Editor Canvas Area */}
        <div className="flex-1 relative bg-[#0D1117]">
          {activeFile ? (
            <Editor
              height="100%"
              language={activeFile.language}
              theme="vs-dark"
              value={activeFile.content}
              onChange={handleEditorChange}
              onMount={handleEditorMount}
              path={activeFile.name}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', Consolas, 'Courier New', monospace",
                fontLigatures: true,
                lineHeight: 1.6,
                padding: { top: 12, bottom: 12 },
                wordWrap: "on",
                bracketPairColorization: { enabled: true },
                autoIndent: "full",
                autoClosingBrackets: "always",
                folding: true,
                lineNumbers: "on",
                renderLineHighlight: "all",
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on"
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs gap-2 font-sans">
              <Code2 size={28} className="text-zinc-600" />
              <span>Workspace Ready</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}







