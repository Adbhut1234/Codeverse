"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CompilerService } from "@/features/workspace/services/compiler.service";
import { useAI } from "@/features/workspace/hooks/useAI";
import { AIMessage, AIIntent } from "@/features/workspace/types/ai";
import { getWorkspaceContent, updateWorkspace } from "@/app/actions/workspaces";

export interface FileData {
  id: string;
  name: string;
  language: string;
  content: string;
  originalContent: string;
}

export interface IDEProblem {
  message: string;
  severity: number;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

export interface TerminalOutput {
  id: string;
  type: "command" | "stdout" | "stderr" | "compile_error" | "system" | "metrics";
  content: string;
}

interface WorkspaceState {
  files: Record<string, FileData>;
  openFiles: string[];
  activeFileId: string | null;
  cursorPosition: { lineNumber: number; column: number };
  selectedText: string;
  terminalHistory: TerminalOutput[];
  stdin: string;
  isExecuting: boolean;
  isTerminalOpen: boolean;
  isAIPanelOpen: boolean;
  isLiveAssistEnabled: boolean;
  markers: IDEProblem[];
  workspaceName?: string;
  lastEdited?: number;
}

interface WorkspaceContextProps extends WorkspaceState {
  openFile: (id: string, initialData?: Partial<FileData>) => void;
  closeFile: (id: string) => void;
  createFile: (name: string, content?: string) => void;
  deleteFile: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  updateFileLanguage: (id: string, language: string) => void;
  setActiveFileId: (id: string) => void;
  setCursorPosition: (pos: { lineNumber: number; column: number }) => void;
  setSelectedText: (text: string) => void;
  setStdin: (val: string) => void;
  clearTerminal: () => void;
  appendTerminal: (output: Omit<TerminalOutput, "id">) => void;
  runCode: () => Promise<void>;
  toggleTerminal: () => void;
  setIsTerminalOpen: (open: boolean) => void;
  toggleAIPanel: () => void;
  setIsAIPanelOpen: (open: boolean) => void;
  toggleLiveAssist: () => void;
  setMarkers: (markers: IDEProblem[]) => void;
  
  // AI Context
  aiMessages: AIMessage[];
  isGeneratingAI: boolean;
  askAI: (intent: AIIntent, fileContent?: string, language?: string, selectedText?: string, userPrompt?: string, metadata?: Record<string, unknown>) => Promise<string | void>;
  clearAIMessages: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(
  undefined
);

const DEFAULT_FILES: Record<string, FileData> = {
  "main.py": {
    id: "main.py",
    name: "main.py",
    language: "python",
    content: `import os\n\ndef main():\n    name = input("Enter your name: ")\n    print(f"Hello, {name}!")\n\nif __name__ == "__main__":\n    main()`,
    originalContent: `import os\n\ndef main():\n    name = input("Enter your name: ")\n    print(f"Hello, {name}!")\n\nif __name__ == "__main__":\n    main()`,
  },
  "utils.py": {
    id: "utils.py",
    name: "utils.py",
    language: "python",
    content: `def add(a, b):\n    return a + b`,
    originalContent: `def add(a, b):\n    return a + b`,
  },
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<WorkspaceState>({
    files: DEFAULT_FILES,
    openFiles: ["main.py", "utils.py"],
    activeFileId: "main.py",
    cursorPosition: { lineNumber: 1, column: 1 },
    selectedText: "",
    terminalHistory: [
      { id: "init", type: "system", content: "CodeVerse Terminal ready. Waiting for execution..." }
    ],
    stdin: "CodeVerse User",
    isExecuting: false,
    isTerminalOpen: false,
    isAIPanelOpen: false,
    isLiveAssistEnabled: true,
    markers: [],
  });

  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize AI hook
  const { messages: aiMessages, isGenerating: isGeneratingAI, askAI: rawAskAI, clearMessages: clearAIMessages } = useAI();

  const toggleTerminal = () => {
    setState((prev) => ({ ...prev, isTerminalOpen: !prev.isTerminalOpen }));
  };

  const setIsTerminalOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, isTerminalOpen: open }));
  };

  const toggleAIPanel = () => {
    setState((prev) => ({ ...prev, isAIPanelOpen: !prev.isAIPanelOpen }));
  };

  const setIsAIPanelOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, isAIPanelOpen: open }));
  };

  const toggleLiveAssist = () => {
    setState((prev) => ({ ...prev, isLiveAssistEnabled: !prev.isLiveAssistEnabled }));
  };

  const setSelectedText = (text: string) => {
    setState((prev) => ({ ...prev, selectedText: text }));
  };

  const askAI: typeof rawAskAI = async (...args) => {
    setIsAIPanelOpen(true);
    return rawAskAI(...args);
  };

  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("id");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!workspaceId) return;

    const loadWorkspace = async () => {
      try {
        const dbWorkspace = await getWorkspaceContent(workspaceId);
        const parsed = JSON.parse(dbWorkspace.content);
        if (parsed && parsed.files) {
          setState((prev) => ({
            ...prev,
            files: parsed.files,
            openFiles: parsed.openFiles,
            activeFileId: parsed.activeFileId,
            cursorPosition: parsed.cursorPosition || prev.cursorPosition,
            stdin: parsed.stdin || prev.stdin,
            terminalHistory: parsed.terminalHistory || prev.terminalHistory,
            workspaceName: dbWorkspace.name,
          }));
        }
      } catch (e) {
        console.error("Failed to load workspace from DB", e);
      }
      setIsLoaded(true);
    };

    loadWorkspace();
  }, [workspaceId]);

  useEffect(() => {
    if (isLoaded && workspaceId) {
      // Don't save transient UI states
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isExecuting, isTerminalOpen, isAIPanelOpen, markers, ...savableState } = state;
      
      const stateToSave = {
        ...savableState,
        workspaceName: savableState.workspaceName || "My Workspace"
      };

      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        updateWorkspace(workspaceId, JSON.stringify(stateToSave), savableState.workspaceName)
          .catch(e => console.error("Failed to save workspace to DB", e));
      }, 1000); // 1s debounce
    }
  }, [state, isLoaded, workspaceId]);

  const openFile = (id: string, initialData?: Partial<FileData>) => {
    setState((prev) => {
      const newFiles = { ...prev.files };
      if (!newFiles[id] && initialData) {
        newFiles[id] = {
          id,
          name: initialData.name || id,
          language: initialData.language || "plaintext",
          content: initialData.content || "",
          originalContent: initialData.originalContent || "",
        };
      }
      return {
        ...prev,
        files: newFiles,
        openFiles: prev.openFiles.includes(id)
          ? prev.openFiles
          : [...prev.openFiles, id],
        activeFileId: id,
      };
    });
  };

  const closeFile = (id: string) => {
    setState((prev) => {
      const newOpenFiles = prev.openFiles.filter((f) => f !== id);
      let newActiveId = prev.activeFileId;
      if (prev.activeFileId === id) {
        const idx = prev.openFiles.indexOf(id);
        if (newOpenFiles.length > 0) {
          newActiveId =
            newOpenFiles[idx] || newOpenFiles[newOpenFiles.length - 1];
        } else {
          newActiveId = null;
        }
      }
      return { ...prev, openFiles: newOpenFiles, activeFileId: newActiveId };
    });
  };

  const createFile = (name: string, content: string = "") => {
    // Generate a simple ID based on name, making sure it's unique
    let id = name;
    let counter = 1;
    while (state.files[id]) {
      id = `${name.split('.')[0]}_${counter}.${name.split('.')[1] || ''}`;
      counter++;
    }
    
    // Auto-detect language
    let language = "plaintext";
    if (name.endsWith(".py")) language = "python";
    else if (name.endsWith(".js")) language = "javascript";
    else if (name.endsWith(".ts") || name.endsWith(".tsx")) language = "typescript";
    else if (name.endsWith(".css")) language = "css";
    else if (name.endsWith(".html")) language = "html";
    else if (name.endsWith(".json")) language = "json";
    
    const newFile: FileData = {
      id,
      name: id,
      language,
      content,
      originalContent: content
    };

    setState(prev => ({
      ...prev,
      files: { ...prev.files, [id]: newFile }
    }));
    
    // Automatically open the new file
    openFile(id, newFile);
  };

  const deleteFile = (id: string) => {
    setState(prev => {
      const newFiles = { ...prev.files };
      delete newFiles[id];
      
      const newOpenFiles = prev.openFiles.filter((f) => f !== id);
      
      return {
        ...prev,
        files: newFiles,
        openFiles: newOpenFiles,
        activeFileId: prev.activeFileId === id ? newOpenFiles[0] || null : prev.activeFileId,
      };
    });
  };

  const updateFileContent = (id: string, content: string) => {
    setState((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [id]: {
          ...prev.files[id],
          content,
        },
      },
    }));
  };

  const updateFileLanguage = (id: string, language: string) => {
    setState((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [id]: {
          ...prev.files[id],
          language,
        },
      },
    }));
  };

  const setActiveFileId = (id: string) => {
    setState((prev) => ({ ...prev, activeFileId: id }));
  };

  const setCursorPosition = (pos: { lineNumber: number; column: number }) => {
    setState((prev) => ({ ...prev, cursorPosition: pos }));
  };

  const setStdin = (val: string) => {
    setState((prev) => ({ ...prev, stdin: val }));
  };

  const clearTerminal = () => {
    setState((prev) => ({ ...prev, terminalHistory: [] }));
  };

  const appendTerminal = (output: Omit<TerminalOutput, "id">) => {
    setState((prev) => ({
      ...prev,
      terminalHistory: [
        ...prev.terminalHistory,
        { ...output, id: Math.random().toString(36).substring(7) }
      ]
    }));
  };

  const setMarkers = (markers: IDEProblem[]) => {
    setState((prev) => ({ ...prev, markers }));
  };

  const runCode = async () => {
    if (state.isExecuting || !state.activeFileId) return;

    const file = state.files[state.activeFileId];
    if (!file) return;

    // Auto expand terminal when running code
    setState((prev) => ({ ...prev, isExecuting: true, isTerminalOpen: true }));
    
    appendTerminal({
      type: "command",
      content: `➜ project run ${file.name}`
    });

    try {
      const result = await CompilerService.execute(file.content, file.language, state.stdin);
      
      if (result.compile_output) {
        appendTerminal({ type: "compile_error", content: result.compile_output });
      }
      
      if (result.stdout) {
        appendTerminal({ type: "stdout", content: result.stdout });
      }
      
      if (result.stderr) {
        appendTerminal({ type: "stderr", content: result.stderr });
      }

      if (result.message) {
         appendTerminal({ type: "system", content: result.message });
      }

      // Add metrics
      const metrics = `✓ Execution completed | Time: ${result.time || 0}s | Memory: ${result.memory || 0}KB | Status: ${result.status.description}`;
      appendTerminal({ type: "metrics", content: metrics });
      
      // Automatically trigger Smart AI Execution Analysis if enabled
      if (state.isLiveAssistEnabled) {
        askAI(
          "execution_analysis",
          file.content,
          file.language,
          "",
          "",
          {
            compile_output: result.compile_output,
            stdout: result.stdout,
            stderr: result.stderr,
            status: result.status,
            time: result.time,
            memory: result.memory,
          }
        );
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      appendTerminal({ type: "stderr", content: `[Execution Error]: ${errMsg}` });

      // Trigger Smart AI Execution Analysis for runtime / system failure if enabled
      if (state.isLiveAssistEnabled) {
        askAI(
          "execution_analysis",
          file.content,
          file.language,
          "",
          "",
          {
            stderr: errMsg,
            status: { id: 13, description: "Internal Execution Error" },
          }
        );
      }
    } finally {
      setState((prev) => ({ ...prev, isExecuting: false }));
    }
  };

  if (!isLoaded) {
    return null; // or a loader
  }

  return (
    <WorkspaceContext.Provider
      value={{
        ...state,
        openFile,
        closeFile,
        createFile,
        deleteFile,
        updateFileContent,
        updateFileLanguage,
        setActiveFileId,
        setCursorPosition,
        setSelectedText,
        setStdin,
        clearTerminal,
        appendTerminal,
        runCode,
        toggleTerminal,
        setIsTerminalOpen,
        toggleAIPanel,
        setIsAIPanelOpen,
        toggleLiveAssist,
        setMarkers,
        aiMessages,
        isGeneratingAI,
        askAI,
        clearAIMessages
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};

