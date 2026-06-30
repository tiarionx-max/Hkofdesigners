"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ─── Asset URLs (from Figma node 15:968, valid ~7 days) ──────────
// Navbar bar
const LOGO_MARK_SRC  = "https://www.figma.com/api/mcp/asset/0cd081e0-64b3-4bb4-adf7-91ce4a9abd80";
const LOGO_TEXT_SRC  = "https://www.figma.com/api/mcp/asset/eed8ffff-6ed0-480b-a3ee-985c5ec539a6";
const ARROW_DOWN_SRC = "https://www.figma.com/api/mcp/asset/e3a7f75a-e6c8-4c34-aefd-db336b4de01e";
const MOON_ICON_SRC  = "https://www.figma.com/api/mcp/asset/111b858c-971a-4767-8ab1-4e7b469c32fc";
const SUN_ICON_SRC   = "https://www.figma.com/api/mcp/asset/a0c3dd24-8ce1-4bc3-a6f0-f68fff0a4803";

// Resources panel — category tile icons
const RES_ICONS: Record<string, string> = {
  "AI Tools":      "https://www.figma.com/api/mcp/asset/58edff81-ad5a-41e5-9460-6950526050c9",
  "Books":         "https://www.figma.com/api/mcp/asset/d43ad289-6b5b-410c-9a20-898b6dadc996",
  "Color Tools":   "https://www.figma.com/api/mcp/asset/805e20ba-de51-4cf9-bc91-fb33b9a38e78",
  "Design Tools":  "https://www.figma.com/api/mcp/asset/0dead66c-fe42-461d-bf2e-b6aebb25d370",
  "Icons":         "https://www.figma.com/api/mcp/asset/f4d9f869-30e9-4682-b3d0-27c4382956eb",
  "Illustrations": "https://www.figma.com/api/mcp/asset/b2e1ea1d-6428-47de-984c-705dc30d279c",
  "Inspiration":   "https://www.figma.com/api/mcp/asset/95fd2d0c-92cb-4c69-8dd6-da771dea7f43",
  "Learning":      "https://www.figma.com/api/mcp/asset/cef5154d-03ce-4615-a06a-86a7657f70eb",
  "Podcast":       "https://www.figma.com/api/mcp/asset/48abe14e-0418-40a1-8f77-80b420415cf7",
  "Project":       "https://www.figma.com/api/mcp/asset/326d5c6b-f155-4da2-88a4-d60ed0bec40f",
  "Typography":    "https://www.figma.com/api/mcp/asset/c092356f-16e2-4ab6-8c6b-a18cfc7e5cff",
  "Web/Portfolio": "https://www.figma.com/api/mcp/asset/7b170ef8-b173-47c9-bf88-50c09dbdc5be",
};
const RES_FEATURE_ART = "https://www.figma.com/api/mcp/asset/641626d4-ee51-4566-a3c5-257c9166833d";

// Blog/Events panel
const BLOG_ART_SRC   = "https://www.figma.com/api/mcp/asset/419fdfd2-1f3a-4199-b024-f9ca40d80646";
const EVENTS_ART_SRC = "https://www.figma.com/api/mcp/asset/212f0f77-1e2e-4d82-ba41-cf24a6944070";

// Mobile drawer — alternate art assets (from mobile Figma node 5:665)
const M_BLOG_ART   = "https://www.figma.com/api/mcp/asset/1ce9d618-4056-4328-8d27-1bf6afcea9a5";
const M_EVENTS_ART = "https://www.figma.com/api/mcp/asset/044ce767-3d8e-4329-abc6-d88261d7e671";

// ─── Types & data ─────────────────────────────────────────────────
type NavLink = { label: string; href: string; dropdown?: "resources" | "blogevents" };

const NAV_LINKS: NavLink[] = [
  { label: "Home",        href: "/" },
  { label: "About",       href: "/about" },
  { label: "Resources",   href: "/resources", dropdown: "resources"  },
  { label: "Blog/Events", href: "/events",    dropdown: "blogevents" },
];

const RESOURCE_ITEMS = [
  "AI Tools", "Books", "Color Tools", "Design Tools",
  "Icons", "Illustrations", "Inspiration", "Learning",
  "Podcast", "Project", "Typography", "Web/Portfolio",
] as const;

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Per-link hover/active indicators (from Figma node 17:581) ───
const LINK_INDICATORS: Record<string, { color: string; shape: "bar" | "dome" | "peak" }> = {
  "Home":        { color: "#FF3D3D", shape: "bar"  },
  "About":       { color: "#af52de", shape: "dome" },
  "Resources":   { color: "#4154f9", shape: "dome" },
  "Blog/Events": { color: "#ffb522", shape: "peak" },
};

function NavIndicator({ label }: { label: string }) {
  const cfg = LINK_INDICATORS[label] ?? { color: "#FF3D3D", shape: "bar" as const };
  if (cfg.shape === "bar") {
    return (
      <span
        className="block w-full rounded-sm"
        style={{ height: 3, backgroundColor: cfg.color }}
      />
    );
  }
  if (cfg.shape === "dome") {
    return (
      <svg width="100%" height="10" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="50" cy="10" rx="48" ry="10" fill={cfg.color} />
      </svg>
    );
  }
  return (
    <svg width="100%" height="10" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="50,0 2,10 98,10" fill={cfg.color} />
    </svg>
  );
}

// ─── Shared panel animation ───────────────────────────────────────
const panelVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1    },
};
const panelTransition = { duration: 0.2, ease: EASE };

// ─── Logo ─────────────────────────────────────────────────────────
function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="HK of Designers — home"
      className="flex items-center gap-[6px] shrink-0 outline-none
                 focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-sm"
    >
      <div className="relative shrink-0" style={{ width: 31, height: 30 }}>
        <Image src={LOGO_MARK_SRC} alt="" fill className="object-contain" unoptimized priority />
      </div>
      {!compact && (
        <div className="relative shrink-0" style={{ width: 91, height: 34 }}>
          <Image
            src={LOGO_TEXT_SRC}
            alt="HK of Designers"
            fill
            className="object-contain object-left"
            unoptimized
            priority
          />
        </div>
      )}
    </Link>
  );
}

// ─── Resources mega-panel ─────────────────────────────────────────
// Positioned absolute inside .container-hk (position:relative), top=76px (68px nav + 8px gap)
function ResourcesPanel({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-[76px] left-0 right-0 z-50 origin-top"
    >
      <div
        className="bg-[#181818] border-[0.7px] border-[rgba(255,255,255,0.1)]
                   rounded-[24px] p-6 flex gap-6 items-stretch
                   shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      >
        {/* 12-item tile grid */}
        <div className="flex flex-wrap gap-4 flex-1 min-w-0 content-start">
          {RESOURCE_ITEMS.map((name) => (
            <Link
              key={name}
              href={`/resources/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group flex flex-col gap-3 items-center justify-center
                         p-3 rounded-[12px] w-[calc(25%-12px)] min-w-[100px]
                         bg-[#181818] border-[0.7px] border-[rgba(255,255,255,0.1)]
                         hover:border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.04)]
                         transition-all duration-150 outline-none
                         focus-visible:border-[rgba(255,255,255,0.4)]"
            >
              <div className="relative shrink-0 w-6 h-6">
                <Image
                  src={RES_ICONS[name] ?? ""}
                  alt=""
                  fill
                  className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-150"
                  unoptimized
                />
              </div>
              <span className="text-[13px] text-[rgba(255,255,255,0.65)] group-hover:text-[#fffbe8]
                               text-center whitespace-nowrap transition-colors duration-150 leading-snug">
                {name}
              </span>
            </Link>
          ))}
        </div>

        {/* Feature card */}
        <div className="relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                        rounded-[12px] overflow-hidden shrink-0 w-[280px]">
          {/* Illustration */}
          <div className="absolute bottom-3 left-5 w-[248px] h-[108px]" aria-hidden="true">
            <Image
              src={RES_FEATURE_ART}
              alt=""
              fill
              className="object-contain object-left-bottom"
              unoptimized
            />
          </div>
          {/* Text */}
          <div className="relative z-10 absolute top-6 left-7 flex flex-col gap-3 w-[220px]">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] text-[#ffb522]">Resources</span>
              <span className="text-[20px] font-medium text-[#fffbe8] leading-snug">
                Tools for Every Designer.
              </span>
              <span className="text-[12px] text-[rgba(255,255,255,0.7)] leading-relaxed">
                Access curated resources handpicked by HK Design to help you create smarter and faster.
              </span>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center w-fit h-6 px-3 rounded-full
                         bg-[#fffbe8] text-[#0f0f0f] text-[10px] font-medium
                         shadow-[5px_5px_0px_0px_#000]
                         hover:shadow-[3px_3px_0px_0px_#000]
                         hover:translate-x-[2px] hover:translate-y-[2px]
                         transition-all duration-150 outline-none shrink-0"
            >
              Browse All Resources
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Blog / Events mega-panel ─────────────────────────────────────
function BlogEventsPanel({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-[76px] right-0 z-50 w-[564px] origin-top"
    >
      <div
        className="bg-[#181818] border-[0.7px] border-[rgba(255,255,255,0.1)]
                   rounded-[24px] p-6 flex gap-6
                   shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      >
        {/* Blog card */}
        <Link
          href="/blog"
          className="group relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                     rounded-[16px] overflow-hidden flex-1 h-[307px] flex flex-col gap-5 p-[26px]
                     hover:border-[rgba(255,255,255,0.28)] transition-colors duration-150 outline-none"
        >
          <div className="flex flex-col gap-1.5 relative z-10">
            <span className="text-[12px] text-[#4154f9]">Blog (Medium)</span>
            <span className="text-[20px] font-medium text-[#fffbe8] leading-snug">
              Read. Learn. Design.
            </span>
            <span className="text-[12px] text-[rgba(255,255,255,0.7)] leading-snug">
              Explore design stories and insights from the HK community on X article
            </span>
          </div>
          <span className="relative z-10 inline-flex items-center justify-center w-fit h-6 px-3
                           rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[10px] font-medium
                           shadow-[5px_5px_0px_0px_#000] group-hover:shadow-[3px_3px_0px_0px_#000]
                           group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                           transition-all duration-150">
            Read on X article
          </span>
          {/* Art */}
          <div
            className="absolute -bottom-10 right-0 w-[190px] h-[126px]
                       -scale-y-100 rotate-[-171.45deg] pointer-events-none"
            aria-hidden="true"
          >
            <Image src={BLOG_ART_SRC} alt="" fill className="object-contain" unoptimized />
          </div>
        </Link>

        {/* Events card */}
        <Link
          href="/events"
          className="group relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                     rounded-[16px] overflow-hidden flex-1 h-[307px] flex flex-col gap-5 p-[26px]
                     hover:border-[rgba(255,255,255,0.28)] transition-colors duration-150 outline-none"
        >
          <div className="flex flex-col gap-1.5 relative z-10">
            <span className="text-[12px] text-[#af52de]">Events</span>
            <span className="text-[20px] font-medium text-[#fffbe8] leading-snug">
              Design Happens Here.
            </span>
            <span className="text-[12px] text-[rgba(255,255,255,0.7)] leading-snug">
              Discover upcoming events, workshops, and meetups curated for every designer.
            </span>
          </div>
          <span className="relative z-10 inline-flex items-center justify-center w-fit h-6 px-3
                           rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[10px] font-medium
                           shadow-[5px_5px_0px_0px_#000] group-hover:shadow-[3px_3px_0px_0px_#000]
                           group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                           transition-all duration-150">
            Explore Events
          </span>
          {/* Art */}
          <div
            className="absolute bottom-0 right-2 w-[130px] h-[168px]
                       rotate-[-8.34deg] pointer-events-none"
            aria-hidden="true"
          >
            <Image src={EVENTS_ART_SRC} alt="" fill className="object-contain" unoptimized />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Desktop nav item ─────────────────────────────────────────────
function NavItem({
  link,
  isActive,
  isOpen,
  onOpen,
  onClose,
}: {
  link: NavLink;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const showIndicator = isActive || isHovered;

  return (
    <div
      className="relative"
      onMouseEnter={() => { setIsHovered(true); link.dropdown && onOpen(); }}
      onMouseLeave={() => { setIsHovered(false); link.dropdown && onClose(); }}
    >
      <Link
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        onFocus={() => link.dropdown && onOpen()}
        onBlur={() => link.dropdown && onClose()}
        className={`
          relative flex flex-col items-center gap-[4px]
          h-[34px] px-[10px] pt-[3.5px] pb-0 overflow-clip
          text-[13.5px] font-normal leading-[1.3] whitespace-nowrap
          transition-colors duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-sm
          ${isActive
            ? "text-[#fffbe8]"
            : isHovered
              ? "text-[rgba(255,251,232,0.9)]"
              : "text-[rgba(255,251,232,0.7)]"}
        `}
      >
        <span className="flex items-center gap-[5px]">
          {link.label}
          {link.dropdown && (
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="relative shrink-0"
              style={{ width: 20, height: 20 }}
            >
              <Image src={ARROW_DOWN_SRC} alt="" fill className="object-contain" unoptimized />
            </motion.span>
          )}
        </span>

        <AnimatePresence>
          {showIndicator && (
            <motion.span
              key="indicator"
              initial={{ opacity: 0, scaleX: 0.5, scaleY: 0.3 }}
              animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleX: 0.5, scaleY: 0.3 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="shrink-0 w-full origin-bottom"
              aria-hidden="true"
            >
              <NavIndicator label={link.label} />
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
}

// ─── Theme toggle ─────────────────────────────────────────────────
function ThemeToggle() {
  const [dark, setDark] = useState(true);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center gap-[10px] h-[34px] p-[5px] shrink-0
                 bg-[#0f0f0f] border border-[rgba(255,255,255,0.1)]
                 rounded-full cursor-pointer outline-none
                 focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40
                 transition-colors duration-200"
    >
      {/* Moon */}
      <span
        className={`relative flex items-center justify-center rounded-full shrink-0 transition-all duration-200
          ${dark ? "bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]" : ""}`}
        style={{ width: 25, height: 25 }}
        aria-hidden="true"
      >
        <span className="relative" style={{ width: 17, height: 17 }}>
          <Image src={MOON_ICON_SRC} alt="" fill className="object-contain" unoptimized />
        </span>
      </span>
      {/* Sun */}
      <span
        className={`relative flex items-center justify-center rounded-full shrink-0 transition-all duration-200
          ${!dark ? "bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]" : ""}`}
        style={{ width: 25, height: 25 }}
        aria-hidden="true"
      >
        <span className="relative" style={{ width: 17, height: 17 }}>
          <Image src={SUN_ICON_SRC} alt="" fill className="object-contain" unoptimized />
        </span>
      </span>
    </button>
  );
}

// ─── CTA button ───────────────────────────────────────────────────
function CTAButton() {
  return (
    <motion.a
      href="#"
      whileHover={{ x: 2, y: 2, boxShadow: "2px 2px 0px 0px #000" }}
      whileTap={{ x: 3, y: 3, boxShadow: "1px 1px 0px 0px #000" }}
      transition={{ duration: 0.1 }}
      className="flex items-center justify-center shrink-0
                 h-[34px] px-5 rounded-full
                 bg-[#fffbe8] border border-black/10
                 text-[13.5px] font-medium text-[#0f0f0f] whitespace-nowrap
                 outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/50
                 cursor-pointer select-none"
      style={{ boxShadow: "4px 4px 0px 0px #000" }}
    >
      Join Community
    </motion.a>
  );
}

// ─── Hamburger button ─────────────────────────────────────────────
function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative flex items-center justify-center w-9 h-9 rounded-full
                 text-[#fffbe8] bg-[rgba(255,255,255,0.06)]
                 hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-150
                 outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 shrink-0"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={open ? "close" : "open"}
          initial={{ opacity: 0, rotate: open ? -90 : 90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────
function MobileDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const [blogEventsOpen, setBlogEventsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { if (!open) setBlogEventsOpen(false); }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[#0f0f0f] overflow-y-auto"
        >
          <div className="min-h-full flex flex-col px-6 py-6 max-w-[430px] mx-auto">

            {/* Header — logo + close */}
            <div className="flex items-center justify-between shrink-0">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center w-[34px] h-[34px] rounded-[6px]
                           text-[#fffbe8] hover:bg-white/[0.06] transition-colors duration-150
                           outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" className="flex flex-col gap-5 mt-16">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                const isBlogEvents = link.dropdown === "blogevents";

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    {isBlogEvents ? (
                      <>
                        <button
                          onClick={() => setBlogEventsOpen((p) => !p)}
                          aria-expanded={blogEventsOpen}
                          className="w-full flex items-center justify-between
                                     text-[16px] font-normal
                                     text-[rgba(255,255,255,0.7)] hover:text-[#fffbe8]
                                     transition-colors duration-150 outline-none"
                        >
                          <span>{link.label}</span>
                          <motion.span
                            animate={{ rotate: blogEventsOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative shrink-0"
                            style={{ width: 24, height: 24 }}
                          >
                            <Image src={ARROW_DOWN_SRC} alt="" fill className="object-contain" unoptimized />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {blogEventsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-6 mt-6 bg-[#181818] border-[0.7px] border-[rgba(255,255,255,0.1)] rounded-[24px] p-6">
                                {/* Blog card */}
                                <Link href="/blog" onClick={onClose}
                                  className="relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                                             rounded-[16px] overflow-hidden p-[26px] flex flex-col gap-5
                                             hover:border-[rgba(255,255,255,0.28)] transition-colors duration-150">
                                  <div className="flex flex-col gap-1.5 relative z-10">
                                    <span className="text-[12px] text-[#4154f9]">Blog (Medium)</span>
                                    <span className="text-[20px] font-medium text-[#fffbe8]">Read. Learn. Design.</span>
                                    <span className="text-[12px] text-[rgba(255,255,255,0.7)] leading-snug">
                                      Explore design stories and insights from the HK community on X article
                                    </span>
                                  </div>
                                  <span className="relative z-10 inline-flex items-center justify-center w-fit px-3 py-2.5 rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[10px] font-medium shadow-[5px_5px_0px_0px_#000]">
                                    Read on X article
                                  </span>
                                  <div className="absolute -bottom-10 right-0 w-[190px] h-[126px] -scale-y-100 rotate-[-171.45deg] pointer-events-none" aria-hidden="true">
                                    <Image src={M_BLOG_ART} alt="" fill className="object-contain" unoptimized />
                                  </div>
                                </Link>

                                {/* Events card */}
                                <Link href="/events" onClick={onClose}
                                  className="relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                                             rounded-[16px] overflow-hidden p-[26px] flex flex-col gap-5
                                             hover:border-[rgba(255,255,255,0.28)] transition-colors duration-150">
                                  <div className="flex flex-col gap-1.5 relative z-10">
                                    <span className="text-[12px] text-[#af52de]">Events</span>
                                    <span className="text-[20px] font-medium text-[#fffbe8]">Design Happens Here.</span>
                                    <span className="text-[12px] text-[rgba(255,255,255,0.7)] leading-snug">
                                      Discover upcoming events, workshops, and meetups curated for every designer.
                                    </span>
                                  </div>
                                  <span className="relative z-10 inline-flex items-center justify-center w-fit px-3 py-2.5 rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[10px] font-medium shadow-[5px_5px_0px_0px_#000]">
                                    Explore Events
                                  </span>
                                  <div className="absolute bottom-0 right-2 w-[104px] h-[136px] rotate-[-8.34deg] pointer-events-none" aria-hidden="true">
                                    <Image src={M_EVENTS_ART} alt="" fill className="object-contain" unoptimized />
                                  </div>
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex flex-col gap-[5px] text-[16px] font-normal
                                    transition-colors duration-150 outline-none
                                    ${isActive
                                      ? "text-[#fffbe8]"
                                      : "text-[rgba(255,255,255,0.7)] hover:text-[#fffbe8]"}`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span
                            className="h-[3px] w-full rounded-full"
                            style={{ background: "linear-gradient(90deg,#FF3D3D 0%,#FF6B4A 100%)" }}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex-1 min-h-10" />

            {/* Theme row */}
            <div className="flex items-center justify-between mt-6 shrink-0">
              <span className="text-[16px] text-[rgba(255,255,255,0.7)]">Theme</span>
              <ThemeToggle />
            </div>

            {/* Join Community CTA */}
            <a
              href="#"
              onClick={onClose}
              className="mt-6 mb-2 flex items-center justify-center w-full h-[50px] rounded-full shrink-0
                         bg-[#fffbe8] text-[#0f0f0f] text-[16px] font-medium
                         border border-black/10 shadow-[5px_5px_0px_0px_#000]
                         hover:shadow-[3px_3px_0px_0px_#000]
                         hover:translate-x-[2px] hover:translate-y-[2px]
                         transition-all duration-150 outline-none"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  // Which desktop dropdown is open: "resources" | "blogevents" | null
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const panelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced open/close so moving between nav item → panel stays open
  const openPanel = (id: string) => {
    if (panelTimer.current) clearTimeout(panelTimer.current);
    setActivePanel(id);
  };
  const closePanel = () => {
    panelTimer.current = setTimeout(() => setActivePanel(null), 130);
  };
  const keepPanel = () => {
    if (panelTimer.current) clearTimeout(panelTimer.current);
  };

  useEffect(() => () => { if (panelTimer.current) clearTimeout(panelTimer.current); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setActivePanel(null);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ease-out
        ${scrolled ? "pt-3" : "pt-5"}`}
    >
      <div className="container-hk relative">

        {/* ══════════════════════════════════════════
            DESKTOP NAV  (md and above)
            Exact Figma: h-67.72px, px-44.27px, #181818, border 0.593px, rounded-[84.656px]
        ══════════════════════════════════════════ */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center
                     h-[68px] px-[44px]
                     bg-[#181818] backdrop-blur-md
                     border-[0.6px] border-[rgba(255,255,255,0.1)]
                     rounded-full transition-[border-color] duration-300"
        >
          {/* Left — Logo */}
          <Logo />

          {/* Center — Nav links */}
          <div className="flex-1 flex items-center justify-center gap-[3.5px]" role="list">
            {NAV_LINKS.map((link) => (
              <div key={link.label} role="listitem">
                <NavItem
                  link={link}
                  isActive={pathname === link.href}
                  isOpen={activePanel === link.dropdown}
                  onOpen={() => link.dropdown && openPanel(link.dropdown)}
                  onClose={closePanel}
                />
              </div>
            ))}
          </div>

          {/* Right — Theme toggle + CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <CTAButton />
          </div>
        </nav>

        {/* Mega-panel overlays — rendered inside container-hk so they share same reference */}
        <AnimatePresence>
          {activePanel === "resources" && (
            <ResourcesPanel
              key="resources-panel"
              onMouseEnter={keepPanel}
              onMouseLeave={closePanel}
            />
          )}
          {activePanel === "blogevents" && (
            <BlogEventsPanel
              key="blogevents-panel"
              onMouseEnter={keepPanel}
              onMouseLeave={closePanel}
            />
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════
            MOBILE NAV  (below md)
        ══════════════════════════════════════════ */}
        <div
          className="md:hidden flex items-center justify-between
                     h-[58px] px-4
                     bg-[#181818] backdrop-blur-md
                     border-[0.6px] border-[rgba(255,255,255,0.1)]
                     rounded-full"
        >
          {/* Logo — mark+text on sm, mark-only on xs */}
          <div className="flex items-center gap-[6px]">
            <div className="relative shrink-0" style={{ width: 31, height: 30 }}>
              <Image src={LOGO_MARK_SRC} alt="" fill className="object-contain" unoptimized priority />
            </div>
            <div className="relative hidden sm:block shrink-0" style={{ width: 91, height: 34 }}>
              <Image
                src={LOGO_TEXT_SRC}
                alt="HK of Designers"
                fill
                className="object-contain object-left"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Right — compact CTA (sm+) + hamburger */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              className="hidden sm:flex items-center justify-center
                         h-[34px] px-4 rounded-full shrink-0
                         bg-[#fffbe8] border border-black/10
                         text-[12.5px] font-medium text-[#0f0f0f] whitespace-nowrap
                         shadow-[3px_3px_0px_0px_#000]"
            >
              Join Community
            </a>
            <HamburgerButton
              open={mobileOpen}
              onClick={() => setMobileOpen((p) => !p)}
            />
          </div>
        </div>

        {/* Mobile full-screen drawer */}
        <MobileDrawer
          open={mobileOpen}
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}
