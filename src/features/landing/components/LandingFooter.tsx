import Link from "next/link";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/20 py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-stack-lg">
        <div className="max-w-xs">
          <div className="flex items-center gap-stack-sm mb-stack-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Logo"
              className="h-6 w-auto opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
            />
            <span className="font-headline-md text-body-lg text-on-surface">
              CodeVerse
            </span>
          </div>
          <p className="text-on-surface-variant font-body-md text-body-md">
            The next-generation cloud development platform for elite engineering
            teams.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-section-gap">
          <div className="flex flex-col gap-stack-sm">
            <span className="font-mono-label text-mono-label text-on-surface uppercase tracking-widest mb-stack-sm">
              Platform
            </span>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="#capabilities"
            >
              Features
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="#languages"
            >
              Languages
            </Link>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <span className="font-mono-label text-mono-label text-on-surface uppercase tracking-widest mb-stack-sm">
              Resources
            </span>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="/signup"
            >
              Get Started
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="/contact-sales"
            >
              Contact Sales
            </Link>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <span className="font-mono-label text-mono-label text-on-surface uppercase tracking-widest mb-stack-sm">
              Legal
            </span>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-body-md"
              href="/privacy"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mt-section-gap pt-stack-lg border-t border-outline-variant/10 flex justify-between items-center text-on-surface-variant text-mono-label">
        <p>© {currentYear} CodeVerse Inc. Built for developers.</p>
        <div className="flex gap-stack-md">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-on-surface-variant hover:text-primary transition-colors">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter / X" className="text-on-surface-variant hover:text-primary transition-colors">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
