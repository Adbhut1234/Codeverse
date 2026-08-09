"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Bell, 
  User, 
  FolderGit2, 
  TerminalSquare, 
  Blocks, 
  Clock,
  Trash2,
  Code2,
  X,
  Zap,
  Star,
  Sparkles,
  AlertTriangle,
  Loader2,
  Settings,
  CreditCard,
  LogOut,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

import { getWorkspaces, createWorkspace, deleteWorkspace } from "@/app/actions/workspaces";

interface WorkspaceInfo {
  id: string;
  name: string;
  description: string | null;
  language: string;
  updatedAt: Date;
  color: string;
  iconColor: string;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [workspaces, setWorkspaces] = useState<WorkspaceInfo[]>([]);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState("My Workspace");
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Protect route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const loadWorkspaces = async () => {
    if (status !== "authenticated") return;
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (e) {
      console.error("Failed to load workspaces:", e);
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, [status]);

  const handleCreateNew = () => {
    setNewWorkspaceName("My Workspace");
    setIsCreateModalOpen(true);
  };

  const confirmCreate = async () => {
    if (!newWorkspaceName.trim()) return;
    
    const wsState = {
      files: {
        "main.py": {
          id: "main.py", name: "main.py", language: "python",
          content: '# Welcome to ' + newWorkspaceName + '!\nprint("Hello, World!")',
          originalContent: ""
        }
      },
      openFiles: ["main.py"],
      activeFileId: "main.py",
      workspaceName: newWorkspaceName
    };

    try {
      const workspace = await createWorkspace({
        name: newWorkspaceName,
        language: "python",
        content: JSON.stringify(wsState)
      });
      setIsCreateModalOpen(false);
      router.push(`/workspace?id=${workspace.id}`);
    } catch (e) {
      console.error("Failed to create workspace", e);
    }
  };

  const handleDeleteWorkspace = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteWorkspace(deleteTarget);
        await loadWorkspaces();
        setDeleteTarget(null);
      } catch (e) {
        console.error("Failed to delete workspace", e);
      }
    }
  };

  const createFromTemplate = async (templateType: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    let files: any = {};
    let language = "plaintext";
    
    if (templateType === "react") {
      files = {
        "App.js": { id: "App.js", name: "App.js", language: "javascript", content: 'import React from "react";\n\nexport default function App() {\n  return <h1>Hello React!</h1>;\n}', originalContent: "" }
      };
      language = "javascript";
    } else if (templateType === "python") {
      files = {
        "main.py": { id: "main.py", name: "main.py", language: "python", content: 'print("Hello from Python template!")', originalContent: "" }
      };
      language = "python";
    }

    const state = {
      files,
      openFiles: Object.keys(files),
      activeFileId: Object.keys(files)[0],
      workspaceName: `${templateType} Template`
    };
    
    try {
      const workspace = await createWorkspace({
        name: `${templateType} Template`,
        language,
        content: JSON.stringify(state)
      });
      router.push(`/workspace?id=${workspace.id}`);
    } catch (e) {
      console.error("Failed to create workspace from template:", e);
    }
  };

  const createFromImport = async () => {
    if (!importUrl.trim()) return;
    setIsImporting(true);
    setImportError("");
    
    try {
      // Parse GitHub URL: supports https://github.com/owner/repo or https://github.com/owner/repo.git
      const urlClean = importUrl.trim().replace(/\.git$/, "").replace(/\/$/, "");
      const match = urlClean.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      
      if (!match) {
        setImportError("Invalid GitHub URL. Use format: https://github.com/owner/repo");
        setIsImporting(false);
        return;
      }
      
      const [, owner, repo] = match;
      
      // Fetch the repo's file tree from the GitHub API
      const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`);
      let treeData = await treeRes.json();
      
      // If 'main' branch doesn't exist, try 'master'
      if (!treeRes.ok) {
        const masterRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`);
        treeData = await masterRes.json();
        if (!masterRes.ok) {
          setImportError("Could not access this repository. Make sure it's public.");
          setIsImporting(false);
          return;
        }
      }
      
      // Filter for text files only (blobs), skip directories and huge files
      const textExtensions = [".py", ".js", ".ts", ".tsx", ".jsx", ".css", ".html", ".json", ".md", ".txt", ".yml", ".yaml", ".toml", ".cfg", ".ini", ".sh", ".env", ".gitignore", ".c", ".cpp", ".h", ".java", ".rs", ".go", ".rb"];
      const fileBlobs = (treeData.tree || []).filter((item: any) => {
        if (item.type !== "blob") return false;
        // Only include files with known text extensions, or files without extensions (like Makefile, Dockerfile)
        const name = item.path.split("/").pop() || "";
        const hasExt = name.includes(".");
        if (!hasExt) return true; // Makefile, Dockerfile, etc.
        return textExtensions.some(ext => name.endsWith(ext));
      }).slice(0, 30); // Limit to 30 files to avoid localStorage overflow
      
      // Fetch contents of each file (in parallel, max 10 at a time)
      const files: Record<string, any> = {};
      const batches = [];
      for (let i = 0; i < fileBlobs.length; i += 10) {
        batches.push(fileBlobs.slice(i, i + 10));
      }
      
      for (const batch of batches) {
        const results = await Promise.all(
          batch.map(async (blob: any) => {
            try {
              const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${blob.path}`);
              const data = await res.json();
              if (data.content && data.encoding === "base64") {
                return { path: blob.path, content: atob(data.content) };
              }
              return null;
            } catch {
              return null;
            }
          })
        );
        
        for (const result of results) {
          if (result) {
            const fileName = result.path.split("/").pop() || result.path;
            // Auto-detect language from extension
            let language = "plaintext";
            if (fileName.endsWith(".py")) language = "python";
            else if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) language = "javascript";
            else if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) language = "typescript";
            else if (fileName.endsWith(".css")) language = "css";
            else if (fileName.endsWith(".html")) language = "html";
            else if (fileName.endsWith(".json")) language = "json";
            else if (fileName.endsWith(".md")) language = "markdown";
            
            // Use the full path as ID to avoid collisions
            files[result.path] = {
              id: result.path,
              name: result.path,
              language,
              content: result.content,
              originalContent: result.content
            };
          }
        }
      }
      
      if (Object.keys(files).length === 0) {
        setImportError("No importable files found in this repository.");
        setIsImporting(false);
        return;
      }
      
      const openFiles = Object.keys(files).slice(0, 3); // Open first 3 files
      
      const wsState = {
        files,
        openFiles,
        activeFileId: openFiles[0],
        workspaceName: repo
      };
      
      const workspace = await createWorkspace({
        name: repo,
        language: "javascript",
        content: JSON.stringify(wsState)
      });
      
      setIsImportModalOpen(false);
      setImportUrl("");
      setIsImporting(false);
      router.push(`/workspace?id=${workspace.id}`);
      
    } catch (err) {
      console.error("Import failed:", err);
      setImportError("Failed to import. Check the URL and try again.");
      setIsImporting(false);
    }
  };

  const createTutorial = async (tutorialType: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    let files: Record<string, any> = {};

    if (tutorialType === "hello-world") {
      files = {
        "tutorial.py": {
          id: "tutorial.py", name: "tutorial.py", language: "python",
          content: `# 🎉 Welcome to CodeVerse!\n# This is your first tutorial.\n\n# Step 1: Run this file using the ▶ Run button above.\n# You should see "Hello, World!" in the terminal below.\n\nprint("Hello, World!")\n\n# Step 2: Try changing the message and running again!\nname = "CodeVerse"\nprint(f"Welcome to {name}!")\n\n# Step 3: Try some math\nresult = 42 * 2\nprint(f"The answer is: {result}")`,
          originalContent: ""
        }
      };
    } else if (tutorialType === "data-types") {
      files = {
        "data_types.py": {
          id: "data_types.py", name: "data_types.py", language: "python",
          content: `# 📚 Python Data Types Tutorial\n\n# Strings\ngreeting = "Hello"\nname = "World"\nprint(greeting + ", " + name + "!")\n\n# Numbers\nage = 25\npi = 3.14159\nprint(f"Age: {age}, Pi: {pi}")\n\n# Lists\nfruits = ["apple", "banana", "cherry"]\nprint(f"Fruits: {fruits}")\nprint(f"First fruit: {fruits[0]}")\n\n# Dictionaries\nperson = {"name": "Alice", "age": 30, "city": "NYC"}\nprint(f"Person: {person}")\nprint(f"Name: {person['name']}")\n\n# Booleans\nis_coding = True\nprint(f"Is coding fun? {is_coding}")`,
          originalContent: ""
        }
      };
    } else if (tutorialType === "loops") {
      files = {
        "loops.py": {
          id: "loops.py", name: "loops.py", language: "python",
          content: `# 🔄 Loops Tutorial\n\n# For loop with range\nprint("Counting to 5:")\nfor i in range(1, 6):\n    print(f"  {i}")\n\n# For loop with list\ncolors = ["red", "green", "blue"]\nprint("\\nColors:")\nfor color in colors:\n    print(f"  🎨 {color}")\n\n# While loop\nprint("\\nCountdown:")\ncount = 5\nwhile count > 0:\n    print(f"  {count}...")\n    count -= 1\nprint("  🚀 Liftoff!")\n\n# List comprehension\nsquares = [x**2 for x in range(1, 6)]\nprint(f"\\nSquares: {squares}")`,
          originalContent: ""
        }
      };
    }

    const wsState = {
      files,
      openFiles: Object.keys(files),
      activeFileId: Object.keys(files)[0],
      workspaceName: `Tutorial: ${tutorialType}`
    };

    try {
      const workspace = await createWorkspace({
        name: `Tutorial: ${tutorialType}`,
        language: "python",
        content: JSON.stringify(wsState)
      });
      setIsTutorialModalOpen(false);
      router.push(`/workspace?id=${workspace.id}`);
    } catch (e) {
      console.error("Failed to create tutorial", e);
    }
  };

  const filteredWorkspaces = workspaces.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0D1117] text-zinc-200 font-sans selection:bg-[#388bfd]/30 relative overflow-hidden">
      {/* Background ambient light effects */}
      <div className="absolute top-0 left-[20%] w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="h-14 border-b border-[#30363D]/60 bg-[#0D1117]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="CodeVerse Logo"
            className="h-6 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
          />
          <span className="text-lg font-bold text-zinc-100 tracking-tight">CodeVerse</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative flex items-center w-full">
            <Search size={14} className="absolute left-3 text-zinc-500 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-[#161B22] border border-[#30363D]/60 rounded-[8px] pl-9 pr-12 text-[13px] text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all"
              placeholder="Search workspaces..."
              type="text"
            />
            <div className="absolute right-3 flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded border border-[#30363D] bg-[#0D1117] text-[10px] text-zinc-500 font-mono tracking-widest">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/settings?tab=notifications" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <Bell size={18} />
          </Link>
          
          {/* User Menu Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <div 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 overflow-hidden"
            >
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={16} className="text-white" />
              )}
            </div>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#161B22] border border-[#30363D] rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-[#30363D]">
                  <p className="text-sm text-zinc-200 font-medium truncate">{session?.user?.name || "CodeVerse Developer"}</p>
                  <p className="text-xs text-zinc-500 truncate">{session?.user?.email || "developer@codeverse.ai"}</p>
                </div>
                <div className="py-1">
                  <Link href="/settings" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D] transition-colors">
                    <Settings size={14} /> Settings
                  </Link>
                  <Link href="/payment" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-[#21262D] transition-colors">
                    <CreditCard size={14} /> Billing
                  </Link>
                </div>
                <div className="py-1 border-t border-[#30363D]">
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500"
            >
              Welcome back
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg"
            >
              Ready to build something amazing today?
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button onClick={handleCreateNew} className="group flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2.5 rounded-[8px] font-medium transition-all shadow-[0_0_20px_rgba(35,134,54,0.3)] hover:shadow-[0_0_25px_rgba(46,160,67,0.5)] active:scale-95">
              <Plus size={18} />
              <span>New Workspace</span>
            </button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <div 
            onClick={() => setIsImportModalOpen(true)}
            className="relative bg-[#161B22]/60 border border-[#30363D]/60 hover:border-blue-500/50 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors group backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500" />
            <div className="absolute -inset-x-20 -top-20 bottom-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all z-10">
              <FolderGit2 size={20} />
            </div>
            <div className="z-10">
              <h3 className="font-semibold text-zinc-200">Import Repository</h3>
              <p className="text-[12px] text-zinc-500">Clone from GitHub</p>
            </div>
          </div>

          <div 
            onClick={() => setIsTemplateModalOpen(true)}
            className="relative bg-[#161B22]/60 border border-[#30363D]/60 hover:border-purple-500/50 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors group backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-500" />
            <div className="absolute -inset-x-20 -top-20 bottom-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all z-10">
              <Blocks size={20} />
            </div>
            <div className="z-10">
              <h3 className="font-semibold text-zinc-200">Start from Template</h3>
              <p className="text-[12px] text-zinc-500">React, Node, Python & more</p>
            </div>
          </div>

          <div 
            onClick={() => setIsTutorialModalOpen(true)}
            className="relative bg-[#161B22]/60 border border-[#30363D]/60 hover:border-amber-500/50 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors group backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500" />
            <div className="absolute -inset-x-20 -top-20 bottom-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all z-10">
              <Zap size={20} />
            </div>
            <div className="z-10">
              <h3 className="font-semibold text-zinc-200">Interactive Tutorials</h3>
              <p className="text-[12px] text-zinc-500">Learn CodeVerse</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Workspaces */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-200 flex items-center gap-2">
              <Clock size={18} className="text-zinc-500" />
              {searchQuery ? `Results for "${searchQuery}"` : "Recent Workspaces"}
            </h2>
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-sm text-[#388bfd] hover:text-blue-400 transition-colors">
                Clear filter
              </button>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredWorkspaces.length === 0 ? (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-zinc-500 gap-3 border border-dashed border-[#30363D] rounded-xl bg-[#161B22]/30">
                <FolderGit2 size={32} className="text-zinc-600" />
                <p>No workspaces found.</p>
                <button onClick={handleCreateNew} className="text-[#388bfd] text-sm hover:underline">Create one now</button>
              </div>
            ) : (
              filteredWorkspaces.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="group relative bg-[#161B22]/80 border border-[#30363D]/60 rounded-xl overflow-hidden hover:border-zinc-500 transition-all backdrop-blur-md cursor-pointer hover:shadow-xl hover:shadow-black/40 h-full flex flex-col"
                  onClick={() => router.push(`/workspace?id=${project.id}`)}
                >
                {/* Subtle gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="p-6 relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col max-w-[85%]">
                      <h3 className="font-semibold text-lg text-zinc-100 group-hover:text-[#388bfd] transition-colors truncate flex items-center gap-2">
                        {project.name}
                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#388bfd]" />
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 truncate">{project.description}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(project.id);
                      }}
                      className="text-zinc-500 hover:text-red-400 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#21262D] hover:bg-red-500/10 rounded border border-[#30363D] relative z-20"
                      title="Delete Workspace"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 relative z-20">
                    <div className="flex items-center gap-2 text-xs font-medium bg-[#0D1117]/60 px-2.5 py-1 rounded-md border border-[#30363D]/40">
                      <TerminalSquare size={12} className={project.iconColor} />
                      <span className="text-zinc-300">{project.language}</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
          ))
        )}
      </motion.div>
    </div>
  </main>
      {/* Template Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0D1117] border border-[#30363D] rounded-xl w-full max-w-md shadow-2xl p-6 relative">
            <button 
              onClick={() => setIsTemplateModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <Blocks size={20} className="text-purple-400" />
              Choose Template
            </h2>
            <p className="text-sm text-zinc-400 mb-6">Select a starter template to instantly generate a workspace.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => createFromTemplate("react")}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-blue-500/50 hover:bg-[#21262D] transition-colors text-left"
              >
                <Code2 size={24} className="text-blue-400" />
                <div>
                  <div className="font-semibold text-zinc-200">React Dashboard</div>
                  <div className="text-xs text-zinc-500">React + JavaScript</div>
                </div>
              </button>

              <button 
                onClick={() => createFromTemplate("python")}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-emerald-500/50 hover:bg-[#21262D] transition-colors text-left"
              >
                <TerminalSquare size={24} className="text-emerald-400" />
                <div>
                  <div className="font-semibold text-zinc-200">Python Script</div>
                  <div className="text-xs text-zinc-500">Python 3 + Standard Library</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Repository Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0D1117] border border-[#30363D] rounded-xl w-full max-w-md shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            {/* Blue accent bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            
            <div className="p-6">
              <button 
                onClick={() => { setIsImportModalOpen(false); setImportError(""); }}
                className="absolute top-5 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FolderGit2 size={20} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">Import Repository</h2>
                  <p className="text-xs text-zinc-500">Fetches real files from public GitHub repos</p>
                </div>
              </div>
              
              <input
                value={importUrl}
                onChange={(e) => { setImportUrl(e.target.value); setImportError(""); }}
                onKeyDown={(e) => e.key === "Enter" && !isImporting && createFromImport()}
                disabled={isImporting}
                className="w-full h-11 bg-[#161B22] border border-[#30363D] rounded-lg px-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all mb-2 disabled:opacity-50"
                placeholder="https://github.com/owner/repo"
                type="text"
                autoFocus
              />
              
              {importError && (
                <p className="text-xs text-red-400 mb-3 flex items-center gap-1">
                  <AlertTriangle size={12} />
                  {importError}
                </p>
              )}
              
              {!importError && <div className="mb-3" />}

              <button
                onClick={createFromImport}
                disabled={!importUrl.trim() || isImporting}
                className="w-full bg-[#238636] hover:bg-[#2ea043] disabled:opacity-40 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/10"
              >
                {isImporting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Fetching files from GitHub...
                  </>
                ) : (
                  <>
                    <FolderGit2 size={16} />
                    Import Repository
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Interactive Tutorials Modal */}
      {isTutorialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0D1117] border border-[#30363D] rounded-xl w-full max-w-md shadow-2xl p-6 relative">
            <button 
              onClick={() => setIsTutorialModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <Zap size={20} className="text-amber-400" />
              Interactive Tutorials
            </h2>
            <p className="text-sm text-zinc-400 mb-6">Pick a tutorial to learn Python interactively inside CodeVerse.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => createTutorial("hello-world")}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-emerald-500/50 hover:bg-[#21262D] transition-colors text-left"
              >
                <span className="text-2xl">🎉</span>
                <div>
                  <div className="font-semibold text-zinc-200">Hello World</div>
                  <div className="text-xs text-zinc-500">Your first Python program</div>
                </div>
              </button>

              <button 
                onClick={() => createTutorial("data-types")}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-blue-500/50 hover:bg-[#21262D] transition-colors text-left"
              >
                <span className="text-2xl">📚</span>
                <div>
                  <div className="font-semibold text-zinc-200">Data Types</div>
                  <div className="text-xs text-zinc-500">Strings, numbers, lists & dicts</div>
                </div>
              </button>

              <button 
                onClick={() => createTutorial("loops")}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-amber-500/50 hover:bg-[#21262D] transition-colors text-left"
              >
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="font-semibold text-zinc-200">Loops & Iteration</div>
                  <div className="text-xs text-zinc-500">For loops, while loops & comprehensions</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create Workspace Modal ── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0D1117] border border-[#30363D] rounded-xl w-full max-w-sm shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            {/* Gradient accent bar */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
            
            <div className="p-6">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-5 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">New Workspace</h2>
                  <p className="text-xs text-zinc-500">Give your project a name</p>
                </div>
              </div>
              
              <input
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmCreate()}
                autoFocus
                className="w-full h-11 bg-[#161B22] border border-[#30363D] rounded-lg px-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all mb-5"
                placeholder="e.g. My Awesome Project"
                type="text"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 bg-[#21262D] hover:bg-[#30363D] text-zinc-300 py-2.5 rounded-lg font-medium transition-all text-sm border border-[#30363D]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCreate}
                  disabled={!newWorkspaceName.trim()}
                  className="flex-1 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-40 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  <Plus size={16} />
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0D1117] border border-[#30363D] rounded-xl w-full max-w-sm shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            {/* Red accent bar */}
            <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">Delete Workspace</h2>
                  <p className="text-xs text-zinc-500">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 bg-[#161B22] p-3 rounded-lg border border-[#30363D]/60">
                Are you sure you want to permanently delete <strong className="text-zinc-200">{workspaces.find(w => w.id === deleteTarget)?.name || "this workspace"}</strong> and all its files?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 bg-[#21262D] hover:bg-[#30363D] text-zinc-300 py-2.5 rounded-lg font-medium transition-all text-sm border border-[#30363D]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
