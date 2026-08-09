"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-on-surface">
      <span className="material-symbols-outlined text-[48px] text-error mb-4">
        error
      </span>
      <h2 className="font-display-lg text-[32px] font-semibold mb-2">
        Something went wrong!
      </h2>
      <p className="font-body-md text-on-surface-variant mb-8 max-w-md text-center">
        {error.message || "An unexpected error occurred while rendering this page."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded font-mono-label text-[14px] transition-all"
        >
          Try again
        </button>
        <Link href="/">
          <button className="border border-outline-variant hover:bg-surface-container-low text-on-surface px-6 py-3 rounded font-mono-label text-[14px] transition-all">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
