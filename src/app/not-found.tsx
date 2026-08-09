import Link from "next/link";

export const metadata = {
  title: "Page Not Found — CodeVerse",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-center px-6">
      <div className="mb-6 flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Logo"
          className="h-8 w-auto opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
        />
      </div>
      <h1 className="text-6xl font-bold text-white mb-3">404</h1>
      <p className="text-zinc-400 text-lg mb-1">Page not found</p>
      <p className="text-zinc-600 text-sm mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
      </p>
      <div className="flex items-center gap-3">
        <Link href="/">
          <button className="bg-[#238636] hover:bg-[#2ea043] text-white font-medium py-2.5 px-5 rounded-lg transition-all text-sm active:scale-[0.98]">
            Go to Homepage
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-[#161B22] hover:bg-[#21262D] text-white font-medium py-2.5 px-5 rounded-lg transition-colors border border-[#30363D] text-sm">
            Open Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
