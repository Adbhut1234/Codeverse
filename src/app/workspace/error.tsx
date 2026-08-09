"use client";

import { useEffect } from "react";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-surface w-full h-full text-on-surface">
      <div className="bg-surface-container border border-error/50 p-8 rounded-lg max-w-lg w-full flex flex-col items-center text-center shadow-xl">
        <span className="material-symbols-outlined text-[48px] text-error mb-4">
          warning
        </span>
        <h2 className="font-headline-md text-[24px] mb-2">
          Workspace Error
        </h2>
        <p className="font-body-md text-on-surface-variant mb-6">
          The IDE encountered a fatal error and could not load the workspace component.
        </p>
        <div className="w-full bg-[#09090B] p-4 rounded font-mono-code text-[12px] text-error text-left mb-6 overflow-auto max-h-32 border border-outline-variant/30">
          {error.message}
        </div>
        <button
          onClick={() => reset()}
          className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2 rounded font-mono-label text-[14px] transition-all w-full"
        >
          Restart Workspace
        </button>
      </div>
    </div>
  );
}
