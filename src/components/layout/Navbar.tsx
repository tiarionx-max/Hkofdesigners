"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ─── Figma asset URLs (regenerated; valid ~7 days) ──────────────
const LOGO_MARK_SRC  = "https://www.figma.com/api/mcp/asset/78deef8e-c544-4eaf-8f29-109a78f7e54a";
const LOGO_TEXT_SRC  = "https://www.figma.com/api/mcp/asset/060c1e2c-af40-4002-ac1a-29ea2d3167bd";
const ARROW_DOWN_SRC = "https://www.figma.com/api/mcp/asset/46ccab86-d8be-431c-bb48-a1180ad5d814";
const MOON_ICON_SRC  = "https://www.figma.com/api/mcp/asset/201b97b9-b2c3-4485-b734-9eb7920fb060";
const SUN_ICON_SRC   = "https://www.figma.com/api/mcp/asset/2e849da4-539a-4e75-a401-bba7ee2012e9";
const BLOG_ART_SRC    = "https://www.figma.com/api/mcp/asset/1ce9d618-4056-4328-8d27-1bf6afcea9a5";
const EVENTS_ART_SRC  = "https://www.figma.com/api/mcp/asset/044ce767-3d8e-4329-abc6-d88261d7e671";

// ─── Navigation data ────────────────────────────────────────────
type NavChild = { label: string; href: string };
type NavLink  = { label: string; href: string; children?: NavChild[] };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Design Resources", href: "/resources/design" },
      { label: "Playlists",        href: "/resources/playlists" },
      { label: "Playbooks",        href: "/resources/playbooks" },
    ],
  },
  {
    label: "Blog/Events",
    href: "/events",
    children: [
      { label: "Blog",   href: "/blog" },
      { label: "Events", href: "/events" },
    ],
  },
];

// ─── Logo ───────────────────────────────────────────────────────
function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="HK of Designers — home"
      className="flex items-center gap-[6px] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-sm"
    >
      {/* Geometric mark — exact Figma size: 31.452 × 30.288 px */}
      <div className="relative shrink-0" style={{ width: 31, height: 30 }}>
        <Image
          src={LOGO_MARK_SRC}
          alt=""
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>

      {/* "HK of / Designers" text — exact Figma size: 90.578 × 33.862 px */}
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

// ─── Dropdown panel ─────────────────────────────────────────────
function DropdownPanel({ items }: { items: NavChild[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50
                 min-w-[176px] bg-[#181818] border border-[rgba(255,255,255,0.1)]
                 rounded-[18px] py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                 origin-top"
    >
      {items.map((child) => (
        <Link
          key={child.label}
          href={child.href}
          className="block px-4 py-[10px] text-[13px] leading-tight
                     text-[rgba(255,251,232,0.65)] hover:text-[#fffbe8]
                     hover:bg-white/[0.05] rounded-[10px] mx-1
                     transition-colors duration-150 outline-none
                     focus-visible:text-[#fffbe8] focus-visible:bg-white/[0.05]"
        >
          {child.label}
        </Link>
      ))}
    </motion.div>
  );
}

// ─── Desktop nav item ───────────────────────────────────────────
function NavItem({
  link,
  isActive,
}: {
  link: NavLink;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const textColor = isActive
    ? "text-[#fffbe8]"
    : "text-[rgba(255,251,232,0.7)] hover:text-[#fffbe8]";

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => link.children && setOpen(true)}
      onMouseLeave={() => link.children && setOpen(false)}
    >
      <Link
        href={link.href}
        /* Exact Figma: h-[33.862px] px-[10.159px] py-[3.386px] gap-[4.233px] */
        className={`
          relative flex flex-col items-center gap-[4px]
          h-[34px] px-[10px] pt-[3.5px] pb-0 overflow-clip
          text-[13.5px] font-normal leading-[1.3] whitespace-nowrap
          transition-colors duration-150 outline-none
          focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-sm
          ${textColor}
        `}
        aria-current={isActive ? "page" : undefined}
      >
        {/* Link text */}
        <span className="flex items-center gap-[5px]">
          {link.label}
          {link.children && (
            /* Exact Figma: 20.317 × 20.317 px arrow icon */
            <span
              className="relative shrink-0 transition-transform duration-200"
              style={{
                width: 20,
                height: 20,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <Image
                src={ARROW_DOWN_SRC}
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </span>
          )}
        </span>

        {/* Active indicator — Figma: h-[10.159px] w-full (red underline bar) */}
        {isActive && (
          <span
            className="shrink-0 w-full rounded-full"
            style={{
              height: 3,
              background:
                "linear-gradient(90deg,#FF3D3D 0%,#FF6B4A 100%)",
            }}
            aria-hidden="true"
          />
        )}
      </Link>

      <AnimatePresence>
        {link.children && open && <DropdownPanel items={link.children} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Theme toggle ───────────────────────────────────────────────
function ThemeToggle() {
  const [dark, setDark] = useState(true);

  return (
    /* Figma: h-[33.862px] p-[5.079px] gap-[10.159px] bg-[#0f0f0f]
              border-[0.847px] border-white/10 rounded-[100px]          */
    <button
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center gap-[10px] h-[34px] p-[5px] shrink-0
                 bg-[#0f0f0f] border border-[rgba(255,255,255,0.1)]
                 rounded-full cursor-pointer outline-none
                 focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40
                 transition-colors duration-200"
    >
      {/* Moon pill — Figma: 25.397 × 25.397 px circle */}
      <span
        className={`
          relative flex items-center justify-center rounded-full shrink-0 transition-colors duration-200
          ${dark
            ? "bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]"
            : "bg-transparent"
          }
        `}
        style={{ width: 25, height: 25 }}
        aria-hidden="true"
      >
        {/* Figma: icon 16.931 × 16.931 px */}
        <span className="relative" style={{ width: 17, height: 17 }}>
          <Image src={MOON_ICON_SRC} alt="" fill className="object-contain" unoptimized />
        </span>
      </span>

      {/* Sun pill */}
      <span
        className={`
          relative flex items-center justify-center rounded-full shrink-0 transition-colors duration-200
          ${!dark
            ? "bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]"
            : "bg-transparent"
          }
        `}
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

// ─── CTA button ─────────────────────────────────────────────────
function CTAButton() {
  return (
    /* Figma: h-[33.862px] px-[20.317px] py-[8.466px] bg-[#fffbe8]
              border-[0.847px] rgba(0,0,0,0.1)
              drop-shadow-[4.233px_4.233px_0px_black]
              rounded-[84.656px]                                        */
    <motion.a
      href="#"
      whileHover={{ x: 2, y: 2, boxShadow: "2px 2px 0px 0px #000" }}
      whileTap={{ x: 3, y: 3, boxShadow: "1px 1px 0px 0px #000" }}
      transition={{ duration: 0.1 }}
      className="flex items-center justify-center shrink-0
                 h-[34px] px-5 rounded-full
                 bg-[#fffbe8] border border-black/10
                 text-[13.5px] font-medium text-[#0f0f0f] leading-[1.3] whitespace-nowrap
                 outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/50
                 cursor-pointer select-none"
      style={{ boxShadow: "4px 4px 0px 0px #000" }}
    >
      Join Community
    </motion.a>
  );
}

// ─── Mobile menu button ─────────────────────────────────────────
function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative flex items-center justify-center w-9 h-9 rounded-full
                 text-[#fffbe8] bg-[rgba(255,255,255,0.06)]
                 hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-150
                 outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40
                 shrink-0"
    >
      <motion.span
        key={open ? "close" : "menu"}
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
    </button>
  );
}

// ─── Mobile drawer (full-screen overlay) ─────────────────────────
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

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Collapse the Blog/Events accordion whenever the drawer closes
  useEffect(() => {
    if (!open) setBlogEventsOpen(false);
  }, [open]);

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
                const isBlogEvents = link.label === "Blog/Events";

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
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-6 mt-6 bg-[#181818] border-[0.7px] border-[rgba(255,255,255,0.1)] rounded-[24px] p-6">
                                {/* Blog (Medium) card */}
                                <Link
                                  href="/blog"
                                  onClick={onClose}
                                  className="relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                                             rounded-[16px] overflow-hidden p-[26px] flex flex-col gap-5"
                                >
                                  <div className="flex flex-col gap-1.5 relative z-10">
                                    <span className="text-[12px] text-[#4154f9]">Blog (Medium)</span>
                                    <span className="text-[20px] font-medium text-[#fffbe8]">Read. Learn. Design.</span>
                                    <span className="text-[12px] text-[rgba(255,255,255,0.7)] leading-snug">
                                      Explore design stories and insights from the HK community on Medium.
                                    </span>
                                  </div>
                                  <span className="relative z-10 inline-flex items-center justify-center w-fit px-3 py-2.5 rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[10px] font-medium shadow-[5px_5px_0px_0px_#000]">
                                    Read on Medium
                                  </span>
                                  <div className="absolute -bottom-10 -right-4 w-[170px] h-[112px] opacity-90" aria-hidden="true">
                                    <Image src={BLOG_ART_SRC} alt="" fill className="object-contain" unoptimized />
                                  </div>
                                </Link>

                                {/* Events card */}
                                <Link
                                  href="/events"
                                  onClick={onClose}
                                  className="relative bg-[#0f0f0f] border-[0.7px] border-[rgba(255,255,255,0.1)]
                                             rounded-[16px] overflow-hidden p-[26px] flex flex-col gap-5"
                                >
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
                                  <div className="absolute bottom-0 right-3 w-[104px] h-[136px] opacity-90" aria-hidden="true">
                                    <Image src={EVENTS_ART_SRC} alt="" fill className="object-contain" unoptimized />
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
                        className={`flex flex-col gap-[5px] text-[16px] font-normal transition-colors duration-150 outline-none
                          ${isActive ? "text-[#fffbe8]" : "text-[rgba(255,255,255,0.7)] hover:text-[#fffbe8]"}`}
                        aria-current={isActive ? "page" : undefined}
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

            {/* Spacer pushes theme + CTA to the bottom */}
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
              className="mt-6 mb-2 flex items-center justify-center w-full h-[50px] rounded-full
                         bg-[#fffbe8] text-[#0f0f0f] text-[16px] font-medium
                         border border-black/10
                         shadow-[5px_5px_0px_0px_#000]
                         hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                         transition-all duration-150 outline-none
                         focus-visible:ring-2 focus-visible:ring-[#0f0f0f]/30 shrink-0"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection → tighten top padding
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-[padding] duration-300 ease-out
        ${scrolled ? "pt-3" : "pt-5"}
      `}
    >
      {/* ── Container ── */}
      <div className="container-hk relative">

        {/* ════════════════════════════════════════════════
            DESKTOP NAV (md and above)
            Exact Figma: h-[67.72px] px-[44.27px] bg-[#181818]
            border-[0.593px] rgba(255,255,255,0.1) rounded-[84.656px]
        ═════════════════════════════════════════════════ */}
        <nav
          aria-label="Main navigation"
          className="
            hidden md:flex items-center
            h-[68px] px-[44px]
            bg-[#181818] backdrop-blur-md
            border-[0.6px] border-[rgba(255,255,255,0.1)]
            rounded-full
            transition-[border-color,background-color] duration-300
          "
        >
          {/* Left — Logo */}
          <Logo />

          {/* Center — Nav links (flex-1 + justify-center replicates Figma's 50% centering) */}
          <div
            className="flex-1 flex items-center justify-center gap-[3.5px]"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <div key={link.label} role="listitem">
                <NavItem
                  link={link}
                  isActive={pathname === link.href}
                />
              </div>
            ))}
          </div>

          {/* Right — Theme toggle + CTA
              Figma: theme at left:844.27px, CTA at left:928.93px
              Gap between: 928.93 - (844.27 + 33.862) ≈ 50.8px → ~48px in practice */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <CTAButton />
          </div>
        </nav>

        {/* ════════════════════════════════════════════════
            MOBILE NAV (below md)
        ═════════════════════════════════════════════════ */}
        <div
          className="
            md:hidden flex items-center justify-between
            h-[58px] px-4
            bg-[#181818] backdrop-blur-md
            border-[0.6px] border-[rgba(255,255,255,0.1)]
            rounded-full
          "
        >
          {/* Logo — show mark + text on sm, mark-only on xs */}
          <div className="flex items-center gap-[6px]">
            {/* Always show the mark */}
            <div className="relative shrink-0" style={{ width: 31, height: 30 }}>
              <Image
                src={LOGO_MARK_SRC}
                alt=""
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            {/* Show text on sm+ */}
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

          {/* Right: CTA (hidden xs) + hamburger */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              className="
                hidden sm:flex items-center justify-center
                h-[34px] px-4 rounded-full shrink-0
                bg-[#fffbe8] border border-black/10
                text-[12.5px] font-medium text-[#0f0f0f] whitespace-nowrap
                shadow-[3px_3px_0px_0px_#000]
              "
            >
              Join Community
            </a>
            <HamburgerButton
              open={mobileOpen}
              onClick={() => setMobileOpen((p) => !p)}
            />
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        <MobileDrawer
          open={mobileOpen}
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}
