"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Design Resources", href: "/resources/design" },
      { label: "Playlists", href: "/resources/playlists" },
      { label: "Playbooks", href: "/resources/playbooks" },
    ],
  },
  {
    label: "Blog/Events",
    href: "/events",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
    ],
  },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div className="container-hk">
        {/* Desktop pill nav */}
        <nav
          className="hidden md:flex items-center justify-between h-[56px] px-5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#181818]/95 backdrop-blur-md"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="HK of Designers home">
            <HKLogo />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13.5px] font-normal transition-colors ${
                    link.label === "Home"
                      ? "text-[#fffbe8]"
                      : "text-[rgba(255,251,232,0.65)] hover:text-[#fffbe8]"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={`transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[160px] bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-2xl p-1.5 shadow-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-[13px] text-[rgba(255,251,232,0.7)] hover:text-[#fffbe8] hover:bg-white/5 rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button href="#" size="sm" variant="primary">
              Join Community
            </Button>
          </div>
        </nav>

        {/* Mobile nav bar */}
        <div className="md:hidden flex items-center justify-between h-[52px] px-5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#181818]/95 backdrop-blur-md">
          <Link href="/" aria-label="HK of Designers home">
            <HKLogo compact />
          </Link>
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="text-[#fffbe8] p-1"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#181818]/98 backdrop-blur-md p-4 space-y-1"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-[15px] text-[rgba(255,251,232,0.8)] hover:text-[#fffbe8] rounded-xl hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button href="#" size="md" variant="primary" className="w-full justify-center">
                  Join Community
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function HKLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {/* Geometric mark */}
      <div className="flex items-center gap-[3px]">
        <span className="block w-[14px] h-[14px] rounded-sm bg-[#FF3D3D]" />
        <span className="block w-[14px] h-[14px] rounded-full bg-[#FF8C00]" />
        <span
          className="block w-0 h-0"
          style={{
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "14px solid #4169FF",
          }}
        />
      </div>
      {!compact && (
        <div className="leading-none">
          <span className="block text-[11px] font-medium text-[#fffbe8]">HK of</span>
          <span className="block text-[11px] font-semibold text-[#fffbe8]">Designers</span>
        </div>
      )}
    </div>
  );
}
