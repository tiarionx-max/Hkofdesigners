"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// ── Figma assets ────────────────────────────────────────────────────────────
const EVENT_IMG  = "https://www.figma.com/api/mcp/asset/158a439f-38b5-426d-828f-ea57eb3f108c";
const ICON_CAL   = "https://www.figma.com/api/mcp/asset/27d42815-8e4c-4c23-9463-1cf58ccc42c3";
const ICON_LOC   = "https://www.figma.com/api/mcp/asset/d912ed26-150e-4883-ba44-6d2b22461145";
const BG_RECT_TR = "https://www.figma.com/api/mcp/asset/b246e3c1-2c68-495c-b54a-ccb73ce652be";
const BG_ELLIPSE = "https://www.figma.com/api/mcp/asset/60fe13fa-f94b-4470-a0a4-00cd6cd74000";
const BG_RECT_BL = "https://www.figma.com/api/mcp/asset/ffe80df4-331d-43f2-bd0b-e5d30b25f00f";
const BG_POLY    = "https://www.figma.com/api/mcp/asset/95d3810c-5a15-41a9-9b56-51ac33f1a1ba";

// ── Event data ───────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "e1",
    title: "PS CC Masterclass",
    description: "1 hour PS CC masterclass with Genius graphics in collaboration with HK of Designers.",
    date: "Nov 14, 2025",
    dayTime: "Friday · 09:00 PM (WAT)",
    location: "Google Meet",
    sublocation: "Remote",
    cta: "RSVP on Luma",
    href: "#",
  },
  {
    id: "e2",
    title: "Brand Identity Workshop",
    description: "Deep-dive into brand systems and visual identity design with leading voices from the HK community.",
    date: "Dec 02, 2025",
    dayTime: "Monday · 07:00 PM (WAT)",
    location: "Google Meet",
    sublocation: "Remote",
    cta: "RSVP on Luma",
    href: "#",
  },
  {
    id: "e3",
    title: "Portfolio Review Night",
    description: "Get honest, constructive feedback on your portfolio from experienced designers across HK.",
    date: "Dec 10, 2025",
    dayTime: "Wednesday · 08:00 PM (WAT)",
    location: "Zoom",
    sublocation: "Remote",
    cta: "RSVP on Luma",
    href: "#",
  },
  {
    id: "e4",
    title: "Motion Design Bootcamp",
    description: "Hands-on session covering motion principles, After Effects, and storytelling through animation.",
    date: "Dec 18, 2025",
    dayTime: "Thursday · 06:00 PM (WAT)",
    location: "Google Meet",
    sublocation: "Remote",
    cta: "RSVP on Luma",
    href: "#",
  },
];

const EASE   = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 280, damping: 30, mass: 0.5 };
const GAP    = 20;

// ── MetaIcon ─────────────────────────────────────────────────────────────────
function MetaIcon({ src }: { src: string }) {
  return (
    <div className="flex-none size-10 bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-[5px] flex items-center justify-center">
      <img src={src} alt="" aria-hidden className="size-5 object-contain" />
    </div>
  );
}

// ── EventCard ─────────────────────────────────────────────────────────────────
function EventCard({ event, priority = false }: { event: typeof EVENTS[0]; priority?: boolean }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const rotateX  = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), SPRING);
  const rotateY  = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), SPRING);
  const spotX    = useMotionValue(50);
  const spotY    = useMotionValue(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top)  / r.height;
    mouseX.set(nx - 0.5);
    mouseY.set(ny - 0.5);
    spotX.set(nx * 100);
    spotY.set(ny * 100);
  };

  const onLeave = () => {
    mouseX.set(0); mouseY.set(0);
    spotX.set(50); spotY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="w-full h-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-[27px] p-[27px] flex flex-col gap-6 cursor-default will-change-transform overflow-hidden relative group hover:border-[rgba(255,255,255,0.22)] transition-colors duration-300"
    >
      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-[27px]"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([sx, sy]: number[]) =>
              `radial-gradient(circle 180px at ${sx}% ${sy}%, rgba(255,251,232,0.06) 0%, transparent 65%)`
          ),
        }}
      />

      {/* Image */}
      <div className="relative aspect-square rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0f0f0f] flex-none">
        <Image
          src={EVENT_IMG}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
          priority={priority}
        />
      </div>

      {/* Text + meta + CTA */}
      <div className="flex flex-col gap-7 flex-1 relative z-20">
        {/* Title + desc */}
        <div className="flex flex-col gap-3">
          <h3
            className="font-medium text-[#fffbe8] leading-[1.2]"
            style={{ fontSize: 22 }}
          >
            {event.title}
          </h3>
          <p
            className="font-normal leading-[1.3]"
            style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}
          >
            {event.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <MetaIcon src={ICON_CAL} />
            <div className="text-[13.5px] text-[rgba(255,255,255,0.7)] leading-[1.3]">
              <p>{event.date}</p>
              <p>{event.dayTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MetaIcon src={ICON_LOC} />
            <div className="text-[13.5px] text-[rgba(255,255,255,0.7)] leading-[1.3]">
              <p>{event.location}</p>
              <p>{event.sublocation}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={event.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: EASE }}
          className="mt-auto inline-flex items-center justify-center self-start px-6 py-2.5 rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[13.5px] font-normal whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          {event.cta}
        </motion.a>
      </div>
    </motion.div>
  );
}

// ── NavButton ─────────────────────────────────────────────────────────────────
function NavButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      transition={{ duration: 0.15 }}
      aria-label={label}
      className="size-[38px] rounded-full bg-white flex items-center justify-center transition-colors duration-200 hover:bg-[#fffbe8] disabled:opacity-25 disabled:cursor-not-allowed flex-none"
    >
      {children}
    </motion.button>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Events() {
  const [index,    setIndex]    = useState(0);
  const [perView,  setPerView]  = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, EVENTS.length - perView);

  // Recalculate on mount + resize
  useEffect(() => {
    const calc = () => {
      const pv = window.innerWidth >= 640 ? 2 : 1;
      setPerView(pv);
      if (containerRef.current) {
        const cw = containerRef.current.offsetWidth;
        setCardWidth((cw - GAP * (pv - 1)) / pv);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Clamp index when perView changes
  useEffect(() => {
    setIndex(i => Math.min(i, Math.max(0, EVENTS.length - perView)));
  }, [perView]);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(maxIndex, i + 1));

  const trackX = -(index * (cardWidth + GAP));

  return (
    <section className="relative bg-[#0f0f0f] py-20 md:py-28 border-t border-[rgba(255,255,255,0.06)] overflow-hidden">

      {/* ── Decorative background shapes ────────────────────────────────── */}
      <img
        src={BG_RECT_TR} alt="" aria-hidden
        className="absolute top-0 right-0 w-[276px] pointer-events-none select-none"
      />
      <img
        src={BG_ELLIPSE} alt="" aria-hidden
        className="absolute top-[58px] left-1/2 -translate-x-1/2 w-[352px] opacity-70 pointer-events-none select-none"
      />
      <img
        src={BG_RECT_BL} alt="" aria-hidden
        className="absolute bottom-0 left-0 w-[270px] rotate-90 pointer-events-none select-none origin-bottom-left"
      />
      <img
        src={BG_POLY} alt="" aria-hidden
        className="absolute bottom-0 left-[40%] w-[303px] pointer-events-none select-none"
      />

      {/* Frosted glass overlay (matches Figma backdrop-blur panel) */}
      <div className="absolute inset-0 backdrop-blur-[120px] bg-[rgba(245,245,245,0.03)] pointer-events-none" />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-8">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center justify-between gap-4 mb-10"
        >
          <h2
            className="font-semibold text-white leading-[1.2]"
            style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
          >
            What&apos;s Happening Next
          </h2>

          <div className="flex items-center gap-2 flex-none">
            <a
              href="/events"
              className="hidden sm:inline-flex h-[38px] items-center justify-center px-5 rounded-full bg-white text-black text-[13.5px] font-semibold whitespace-nowrap hover:bg-[#fffbe8] transition-colors duration-200"
            >
              See All Events
            </a>
            <NavButton onClick={prev} disabled={index === 0} label="Previous events">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </NavButton>
            <NavButton onClick={next} disabled={index >= maxIndex} label="Next events">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NavButton>
          </div>
        </motion.div>

        {/* Carousel track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              animate={{ x: trackX }}
              transition={{ type: "spring", stiffness: 220, damping: 32, mass: 0.8 }}
              drag="x"
              dragConstraints={{ left: -(maxIndex * (cardWidth + GAP)), right: 0 }}
              dragElastic={0.06}
              onDragEnd={(_, info) => {
                const threshold = cardWidth * 0.25;
                if (info.offset.x < -threshold && index < maxIndex) next();
                else if (info.offset.x > threshold && index > 0) prev();
              }}
              style={{ gap: GAP, touchAction: "pan-y" }}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {EVENTS.map((event, i) => (
                <div
                  key={event.id}
                  style={{ flex: `0 0 ${cardWidth}px` }}
                  className="min-w-0"
                >
                  <EventCard event={event} priority={i < 3} />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              animate={{
                width:   i === index ? 24 : 8,
                opacity: i === index ? 1 : 0.3,
              }}
              transition={{ duration: 0.3, ease: EASE }}
              className="h-2 rounded-full bg-[#fffbe8]"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile "See All" link */}
        <div className="sm:hidden flex justify-center mt-6">
          <a
            href="/events"
            className="inline-flex h-[38px] items-center justify-center px-5 rounded-full bg-white text-black text-[13.5px] font-semibold whitespace-nowrap hover:bg-[#fffbe8] transition-colors duration-200"
          >
            See All Events
          </a>
        </div>
      </div>
    </section>
  );
}
