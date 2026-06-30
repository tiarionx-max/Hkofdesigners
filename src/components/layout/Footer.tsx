"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ── Figma assets ─────────────────────────────────────────────────────────────
const HK_SHAPES   = "https://www.figma.com/api/mcp/asset/d8a7ee3d-9902-4479-89a4-a271b5762ad7";
const HK_TEXT     = "https://www.figma.com/api/mcp/asset/e5925246-f34f-4c43-aef9-139ece0d13e2";
const GLOW_1      = "https://www.figma.com/api/mcp/asset/9e14ed79-873e-42f1-b1b1-c5d3a7f4e1f8";
const GLOW_2      = "https://www.figma.com/api/mcp/asset/8104eea3-fffe-4301-9a79-9effda975c08";
const GLOW_3      = "https://www.figma.com/api/mcp/asset/e19d11b8-9d86-46c6-9af2-83a3b0998b75";
const GLOW_4      = "https://www.figma.com/api/mcp/asset/094fc551-0bf8-45cc-af16-37cdc3ea7e98";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Events",    href: "/events" },
  { label: "Join Us",   href: "#" },
];

const WORDS = ["Every", "Motion", "UI/UX", "Branding", "3D", "Product", "Illustration"];

const EASE = [0.22, 1, 0.36, 1] as const;

// ── CyclingWord ───────────────────────────────────────────────────────────────
function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-block align-baseline overflow-hidden"
      style={{ minWidth: "5ch" }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Height anchor — keeps layout stable */}
      <span className="invisible select-none" aria-hidden>Every</span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[index]}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y: "-110%", opacity: 0 }}
          transition={{ duration: 0.52, ease: EASE }}
          className="absolute inset-0 flex items-center"
          style={{ color: "#ffb522" }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Social icons (inline SVG so they never expire) ────────────────────────────
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconTiktok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "X (Twitter)", href: "https://x.com",         icon: <IconX /> },
  { label: "Instagram",   href: "https://instagram.com",  icon: <IconInstagram /> },
  { label: "TikTok",      href: "https://tiktok.com",     icon: <IconTiktok /> },
];

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-[#111] overflow-hidden">
      {/* ── Top content box ──────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-0">

        {/* Horizontal rule top */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />

        {/* Top bar — tagline + nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-7 px-0 lg:px-0">
          {/* Tagline with cycling word */}
          <p className="font-semibold text-[#fffbe8] text-[clamp(16px,1.8vw,25px)] leading-[1.3] whitespace-nowrap">
            A Creative Home for{" "}
            <CyclingWord />
            {" "}Designer.
          </p>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-[#fffbe8] text-[clamp(13px,1.2vw,17px)] hover:opacity-60 transition-opacity duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Horizontal rule below top bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />

        {/* ── Hero logo area ──────────────────────────────────────────────── */}
        <div className="relative py-10 md:py-12">
          {/* Glow blobs — bottom of hero */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex pointer-events-none select-none" style={{ gap: 0, zIndex: 0 }}>
            {[GLOW_2, GLOW_1, GLOW_3, GLOW_4].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden
                className="w-[200px] md:w-[280px] lg:w-[340px] opacity-80"
                style={{ marginLeft: i > 0 ? -60 : 0 }}
              />
            ))}
          </div>

          {/* Logo: shapes + wordmark */}
          <div
            className="relative z-10 flex items-center justify-center gap-[3%]"
          >
            <img
              src={HK_SHAPES}
              alt=""
              aria-hidden
              className="w-[18%] max-w-[220px] min-w-[80px] object-contain"
            />
            <img
              src={HK_TEXT}
              alt="HK of Designers"
              className="w-[56%] max-w-[760px] min-w-[200px] object-contain"
            />
          </div>
        </div>

        {/* Horizontal rule above bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />

        {/* ── Bottom bar — copyright + socials ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          <p className="text-[clamp(12px,1.1vw,17px)] text-[#fffbe8] font-normal leading-[1.3] opacity-90">
            © 2026 HK of Designers. All rights reserved
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-[#fffbe8] hover:opacity-60 transition-opacity duration-200"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />
      </div>
    </footer>
  );
}
