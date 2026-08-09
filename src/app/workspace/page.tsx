import { Header } from "@/features/workspace/components/Header";
import { EditorPane } from "@/features/workspace/components/EditorPane";
import { TerminalPane } from "@/features/workspace/components/TerminalPane";
import { CodeIntelligence } from "@/features/workspace/components/CodeIntelligence";
import { WorkspaceProvider } from "@/features/workspace/context/WorkspaceContext";

import React, { Suspense } from "react";

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#0D1117] flex items-center justify-center text-zinc-500 font-mono text-sm">Loading Workspace...</div>}>
      <WorkspaceProvider>
        <div className="flex flex-col h-screen w-screen bg-[#0D1117] overflow-hidden select-none">
          {/* Single Top Navbar (44px / h-11) */}
          <Header />

          {/* 75% / 25% Professional Workspace Layout Row */}
          <div className="flex flex-1 overflow-hidden relative">
            {/* Main Editor + Bottom Terminal Column (~75% Width) */}
            <main className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#0D1117] relative overflow-hidden">
              <EditorPane />
              <TerminalPane />
            </main>

            {/* Assistant Sidebar (~25% Width / 300px) */}
            <CodeIntelligence />
          </div>
        </div>
      </WorkspaceProvider>
    </Suspense>
  );
}



