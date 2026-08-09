"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#capabilities" },
    { label: "Languages", href: "#languages" },
    { label: "AI", href: "#ai" },
    { label: "Pricing", href: "#pricing" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#09090B]/80 backdrop-blur-md border-b border-[#23262D]">
      <div className="h-16 max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-stack-md cursor-pointer bg-transparent border-none p-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w"
          />
          <span className="font-headline-md text-headline-md tracking-tight text-on-surface hover:text-primary transition-colors">
            CodeVerse
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-gutter">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-stack-md">
          <Link
            className="hidden md:inline font-mono-label text-mono-label text-on-surface-variant hover:text-on-surface mr-4 transition-colors"
            href="/login"
          >
            Log In
          </Link>
          <Link href="/signup">
            <button className="hidden sm:block bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-stack-md py-unit rounded-lg font-mono-label text-mono-label transition-all">
              Start Coding
            </button>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090B]/95 backdrop-blur-lg border-t border-[#23262D] px-margin-mobile py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left font-body-md text-on-surface-variant hover:text-on-surface transition-colors py-2 bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-[#23262D] pt-4 flex flex-col gap-3">
            <Link href="/login" className="text-on-surface-variant hover:text-on-surface font-mono-label text-mono-label">
              Log In
            </Link>
            <Link href="/signup">
              <button className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-4 py-3 rounded-lg font-mono-label text-mono-label transition-all">
                Start Coding
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
