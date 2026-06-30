"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Events",    href: "/events" },
  { label: "Join Us",   href: "#" },
];

const WORDS = [
  { word: "Every",        color: "#ff3b30" },
  { word: "Motion",       color: "#ffb522" },
  { word: "UI/UX",        color: "#af52de" },
  { word: "Branding",     color: "#4154f9" },
  { word: "3D",           color: "#FF3D3D" },
  { word: "Product",      color: "#00D084" },
  { word: "Illustration", color: "#ffb522" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// ── CyclingWord — same blur+fade+y animation as the hero ─────────────────────
function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const { word, color } = WORDS[index];

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={word}
        style={{ color, display: "inline-block" }}
        initial={{ opacity: 0, y: 12,  filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0,   filter: "blur(0px)" }}
        exit={{    opacity: 0, y: -12, filter: "blur(5px)" }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        {word}
      </motion.span>
    </AnimatePresence>
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
        <div className="relative py-10 md:py-14 flex items-center justify-center gap-[clamp(16px,3vw,52px)]">

          {/* Geometric mark — 2×2 grid of CSS shapes */}
          <div className="grid grid-cols-2 gap-[clamp(4px,0.6vw,8px)] flex-none self-center" aria-hidden>
            {/* Red square */}
            <div className="rounded-[clamp(4px,0.5vw,7px)]"
              style={{ width: "clamp(28px,4.5vw,60px)", height: "clamp(28px,4.5vw,60px)", background: "#FF3D3D" }} />
            {/* Purple circle */}
            <div className="rounded-full border-[clamp(3px,0.5vw,6px)]"
              style={{ width: "clamp(28px,4.5vw,60px)", height: "clamp(28px,4.5vw,60px)", borderColor: "#8B5CF6" }} />
            {/* Blue arch */}
            <div className="rounded-t-full"
              style={{ width: "clamp(28px,4.5vw,60px)", height: "clamp(14px,2.25vw,30px)", marginTop: "clamp(14px,2.25vw,30px)", background: "#4169FF" }} />
            {/* Gold triangle */}
            <div className="flex items-end justify-center">
              <div style={{
                width: 0, height: 0,
                borderLeft:   "clamp(14px,2.25vw,30px) solid transparent",
                borderRight:  "clamp(14px,2.25vw,30px) solid transparent",
                borderBottom: "clamp(24px,3.9vw,52px) solid #ffb522",
              }} />
            </div>
          </div>

          {/* Wordmark — clean text, no image dependency */}
          <h2
            className="font-semibold text-[#fffbe8] leading-[0.92] tracking-tight select-none"
            style={{ fontSize: "clamp(52px,9.5vw,122px)" }}
          >
            HK of<br />Designers
          </h2>
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
