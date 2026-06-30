"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

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

// Combined logo PNG — shapes mark + wordmark as one asset from Figma node 62:924.
// Replace src with "/hk-logo-full.png" once saved to /public/.
const HK_LOGO_SRC = "https://www.figma.com/api/mcp/asset/0edc94d6-06f4-4d50-b172-5c7cbdb5213f";
const HK_LOGO_LOCAL = "/hk-logo-full.png";

// ── CyclingWord ───────────────────────────────────────────────────────────────
function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2800);
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

// ── Social icons ──────────────────────────────────────────────────────────────
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
  { label: "X (Twitter)", href: "https://x.com",        icon: <IconX /> },
  { label: "Instagram",   href: "https://instagram.com", icon: <IconInstagram /> },
  { label: "TikTok",      href: "https://tiktok.com",    icon: <IconTiktok /> },
];

// ── HK Logo — combined PNG (shapes + wordmark as one image) ───────────────────
function HKLogo() {
  const [src, setSrc] = useState(HK_LOGO_LOCAL);

  useEffect(() => {
    fetch(HK_LOGO_LOCAL, { method: "HEAD" })
      .then(r => { if (!r.ok) setSrc(HK_LOGO_SRC); })
      .catch(() => setSrc(HK_LOGO_SRC));
  }, []);

  return (
    <div className="w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="HK of Designers"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
          objectPosition: "left center",
        }}
        onError={() => { if (src !== HK_LOGO_SRC) setSrc(HK_LOGO_SRC); }}
      />
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const spotBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(circle 560px at ${x}% ${y}%, rgba(255,251,232,0.05) 0%, transparent 65%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#111] overflow-hidden relative"
    >

      {/* ── Cursor spotlight ──────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotBg, zIndex: 1 }}
      />

      {/* ── Atmospheric gradient orbs ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <style>{`
          @keyframes orb1 {
            0%,100% { transform: translate(0%, 0%)   scale(1);    }
            40%     { transform: translate(12%, -8%)  scale(1.08); }
            70%     { transform: translate(-6%, 6%)   scale(0.95); }
          }
          @keyframes orb2 {
            0%,100% { transform: translate(0%, 0%)   scale(1);    }
            35%     { transform: translate(-10%, 5%)  scale(1.06); }
            65%     { transform: translate(8%, -4%)   scale(0.97); }
          }
          @keyframes orb3 {
            0%,100% { transform: translate(0%, 0%)   scale(1);    }
            50%     { transform: translate(5%, -10%)  scale(1.04); }
          }
        `}</style>

        <div style={{
          position: "absolute", width: 700, height: 500,
          left: "-15%", top: "-20%",
          background: "radial-gradient(circle, rgba(65,84,249,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb1 14s ease-in-out infinite",
          willChange: "transform",
        }} />
        <div style={{
          position: "absolute", width: 600, height: 480,
          right: "-10%", top: "-10%",
          background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "orb2 18s ease-in-out infinite",
          willChange: "transform",
        }} />
        <div style={{
          position: "absolute", width: 550, height: 400,
          left: "30%", bottom: "-20%",
          background: "radial-gradient(circle, rgba(255,181,34,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb3 22s ease-in-out infinite",
          willChange: "transform",
        }} />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 lg:px-8">

        {/* Top rule */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />

        {/* Top bar — tagline + nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-[clamp(20px,2.2vw,28px)]">
          <p className="font-semibold text-[#fffbe8] text-[clamp(15px,1.8vw,25px)] leading-[1.3] whitespace-nowrap">
            A Creative Home for{" "}<CyclingWord />{" "}Designer.
          </p>
          <nav className="flex flex-wrap gap-x-[clamp(14px,1.8vw,27px)] gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map(link => (
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

        {/* Rule below top bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />

        {/* ── Logo hero — full-width combined PNG ───────────────────────────── */}
        <div className="py-[clamp(24px,3vw,40px)]">
          <HKLogo />
        </div>

        {/* Rule above bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />

        {/* Bottom bar — copyright + socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-[clamp(16px,1.8vw,24px)]">
          <p className="text-[clamp(12px,1.1vw,17px)] text-[#fffbe8] font-normal leading-[1.3]">
            © 2026 HK of Designers. All rights reserved
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(s => (
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

        {/* Bottom rule */}
        <div className="border-t border-[rgba(255,255,255,0.08)]" />
      </div>
    </footer>
  );
}
