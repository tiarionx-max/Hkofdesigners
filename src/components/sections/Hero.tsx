"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── Asset URLs — Figma node 18:829 ─────────────────────────────────── */
const BG_GRID     = "https://www.figma.com/api/mcp/asset/d0135fdd-2abd-4fa1-a58b-2d3415920c64";
// Avatars
const A_LEFT      = "https://www.figma.com/api/mcp/asset/5fd59771-0c40-4136-8731-9d524190fcee";
const A_BLUE      = "https://www.figma.com/api/mcp/asset/84644c53-fafc-41c1-b1c6-4be09a559ce8";
const A_PURPLE    = "https://www.figma.com/api/mcp/asset/2b98a0f5-7eec-4d85-af57-fa1d4e2a5eeb";
const A_YELLOW    = "https://www.figma.com/api/mcp/asset/a16e168e-3f06-478d-ab1e-ce05a23e1411";
// Lines & spirals
const WAVY        = "https://www.figma.com/api/mcp/asset/fdb44a11-d2d7-47a5-8885-3d0aae684a9e";
const SPIRAL_L    = "https://www.figma.com/api/mcp/asset/7f94120d-7e81-441d-aa73-4391147665cf";
const SPIRAL_R    = "https://www.figma.com/api/mcp/asset/a0c18593-aa99-4a4a-822b-8fad781ddc8c";
const DOODLE_L    = "https://www.figma.com/api/mcp/asset/b5bdea44-bd2c-4844-9fa0-7c3762320c21";
const DOODLE_R    = "https://www.figma.com/api/mcp/asset/1dee967b-1d3b-4ab1-a86a-cd82fedffadb";
const ARROW_1     = "https://www.figma.com/api/mcp/asset/cce04fbf-e589-4610-9dd2-660df9d7e394";
const ARROW_2     = "https://www.figma.com/api/mcp/asset/597d339f-b6fd-445f-b9ac-97aa456a0fdc";
const ARROW_3     = "https://www.figma.com/api/mcp/asset/f63db776-de65-4f5f-b877-a48ef8ee6719";
// Icons
const ICON_WEB    = "https://www.figma.com/api/mcp/asset/56b87387-c4ab-4efc-abb7-eefc2505ca1e";
const ICON_AE     = "https://www.figma.com/api/mcp/asset/fbab4b13-10a2-439e-8865-6ed3c9240001";
const ICON_CHAT   = "https://www.figma.com/api/mcp/asset/3e5fac94-e9c7-4e29-b8e6-240dcc8959b7";
const ICON_MUG    = "https://www.figma.com/api/mcp/asset/83f29cbd-6000-4710-a3af-b746e8475754";
const ICON_CHAT2  = "https://www.figma.com/api/mcp/asset/f59539cf-fe33-4d98-8610-13b15486b1f8";
const ICON_MOTION = "https://www.figma.com/api/mcp/asset/6daeafe9-fd15-400f-b839-97d6902e9727";
const ICON_PS     = "https://www.figma.com/api/mcp/asset/775fd730-b96b-44b9-bba7-a0f584b95788";
const ICON_PEN    = "https://www.figma.com/api/mcp/asset/521f5d47-f00d-445b-b611-81a88215b2e3";
const IMG_THUMB   = "https://www.figma.com/api/mcp/asset/2f1fed85-9d5f-46ad-a769-c811dd6daf78";
// Button
const BTN_ARROW   = "https://www.figma.com/api/mcp/asset/513be3b2-5d2c-4ca0-93ad-833fe09f6b0d";
// Ticker stars
const STAR_A      = "https://www.figma.com/api/mcp/asset/6d174dcf-d750-404a-ae0a-c7de6aa44776";
const STAR_B      = "https://www.figma.com/api/mcp/asset/b41db2bc-3073-4248-93b8-9eadedea0fa2";
const STAR_C      = "https://www.figma.com/api/mcp/asset/7413bdba-aee7-4324-a877-8abf0ad1c5cd";
const STAR_D      = "https://www.figma.com/api/mcp/asset/2918c4ca-a5c0-4748-83f8-e03722aa579f";

/* ─── Ticker — 9 items matching Figma ────────────────────────────────── */
const TICKER: { label: string; star: string }[] = [
  { label: "Motion",       star: STAR_A },
  { label: "3D/2D",        star: STAR_A },
  { label: "Illustrations",star: STAR_A },
  { label: "UI/UX",        star: STAR_A },
  { label: "Wireframe",    star: STAR_B },
  { label: "Graphic",      star: STAR_C },
  { label: "Chat",         star: STAR_C },
  { label: "Collaborate",  star: STAR_D },
  { label: "Connect",      star: STAR_D },
];

/* ─── Word cycling ────────────────────────────────────────────────────── */
const WORDS = [
  { word: "Every",   color: "#ffb522" },
  { word: "Graphic", color: "#4154f9" },
  { word: "UI/UX",   color: "#af52de" },
  { word: "Motion",  color: "#ffb522" },
  { word: "3D/2D",   color: "#FF3D3D" },
];

/* ─── Canvas reference: 1280 × 800 px ────────────────────────────────── */
const CW = 1280;
const CH = 800;
const px = (v: number) => `${(v / CW) * 100}%`;
const py = (v: number) => `${(v / CH) * 100}%`;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Float loop transition helper ───────────────────────────────────── */
function floatTransition(duration: number, delay = 0) {
  return { duration, repeat: Infinity, ease: "easeInOut" as const, delay };
}

/* ─── Line draw-in: scaleX 0→1 from left ─────────────────────────────── */
const drawVariant = (delay: number) => ({
  initial: { scaleX: 0, opacity: 0 },
  animate: { scaleX: 1, opacity: 1 },
  transition: { duration: 1.1, ease: EASE, delay },
  style: { transformOrigin: "left center" } as React.CSSProperties,
});

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Word cycling
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, [paused]);

  // Scroll parallax on decorative layer
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const layerY       = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const layerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const current = WORDS[wordIdx];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101010]"
      style={{ minHeight: 760 }}
      aria-label="Hero"
    >
      {/* ── Background grid ── */}
      <div className="pointer-events-none absolute inset-0 -translate-x-1/2 left-1/2" style={{ width: 1280, height: 1024 }}>
        <img alt="" src={BG_GRID} className="absolute inset-0 w-full h-full object-fill" />
      </div>
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 80% at 50% 32%, transparent 0%, rgba(16,16,16,0.65) 50%, #101010 100%)",
        }}
      />

      {/* ── Floating decorative layer — avatars, lines & Figma icon scale down on mobile ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 scale-[0.46] sm:scale-[0.62] md:scale-[0.8] lg:scale-100"
        style={{ y: layerY, opacity: layerOpacity, transformOrigin: "50% 0%" }}
        aria-hidden="true"
      >
        {/* ════════ AVATARS ════════ */}

        {/* Left — plain, 100 × 100 */}
        <FloatAvatar src={A_LEFT} size={100} enterDelay={0.4} floatAmp={9} floatDur={4.2} floatDelay={0}
          className="absolute overflow-hidden" style={{ left: px(115), top: py(363) }} />

        {/* Center-left — blue border, 100 × 100 */}
        <FloatAvatar src={A_BLUE} size={100} enterDelay={0.5} floatAmp={7} floatDur={3.8} floatDelay={0.6}
          className="absolute overflow-hidden border border-[#4154f9]" style={{ left: px(347), top: py(563) }} />

        {/* Center-right — purple border, 76 × 76 */}
        <FloatAvatar src={A_PURPLE} size={76} enterDelay={0.48} floatAmp={8} floatDur={4.6} floatDelay={0.3}
          className="absolute overflow-hidden border border-[#8a38f5]" style={{ left: px(920), top: py(565) }} />

        {/* Top-right — yellow border, 76 × 76 */}
        <FloatAvatar src={A_YELLOW} size={76} enterDelay={0.45} floatAmp={10} floatDur={5.0} floatDelay={0.9}
          className="absolute overflow-hidden border border-[#ffb522]" style={{ left: px(1069), top: py(298) }} />

        {/* ════════ LINES — draw-in ════════ */}

        {/* Wavy line — Vector3, 375 × 69 */}
        <motion.div
          className="absolute"
          style={{ left: px(489.39), top: py(578.36), width: 375.5, height: 68.72, transformOrigin: "left center" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.7 }}
        >
          <Image src={WAVY} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Left spiral — Vector1, 87 × 108 */}
        <motion.div
          className="absolute"
          style={{ left: px(211.72), top: py(483.78), width: 87.05, height: 107.78, transformOrigin: "top center" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.55 }}
        >
          <Image src={SPIRAL_L} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Right spiral — Vector5, 55 × 137 */}
        <motion.div
          className="absolute"
          style={{ left: px(1051.34), top: py(427.59), width: 54.54, height: 136.63, transformOrigin: "top center" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
        >
          <Image src={SPIRAL_R} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Left doodle — Vector8, rotate 22.3° */}
        <motion.div
          className="absolute"
          style={{ left: px(93.47), top: py(313.85), width: 38.97, height: 51.6, rotate: "22.3deg" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
        >
          <Image src={DOODLE_L} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Right doodle — Vector7 */}
        <motion.div
          className="absolute"
          style={{ left: px(1140.66), top: py(258.83), width: 38.57, height: 46.28 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
        >
          <Image src={DOODLE_R} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* ════════ ARROWS — pop in ════════ */}

        {/* Arrow 1 — rotate -3.33° */}
        <motion.div
          className="absolute"
          style={{ left: px(296.12), top: py(586.94), width: 11.46, height: 8.77, rotate: "-3.33deg" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut", delay: 1.1 }}
        >
          <Image src={ARROW_1} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Arrow 2 — rotate -57.2° */}
        <motion.div
          className="absolute"
          style={{ left: px(860.72), top: py(624.82), width: 12.81, height: 13.66, rotate: "-57.2deg" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut", delay: 1.2 }}
        >
          <Image src={ARROW_2} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Arrow 3 — rotate -134.57° */}
        <motion.div
          className="absolute"
          style={{ left: px(1089.76), top: py(417.73), width: 13.52, height: 13.56, rotate: "-134.57deg" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut", delay: 1.3 }}
        >
          <Image src={ARROW_3} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Web/Figma icon — visible on all breakpoints, rotate -159.14°, scaleY(-1), opacity 50% */}
        <FloatIcon src={ICON_WEB} size={24} delay={0.75} floatAmp={5} floatDur={3.9} opacity={0.5}
          style={{ left: px(460.03), top: py(572.05), rotate: "-159.14deg", transform: "scaleY(-1)" }} />

        {/* ════════ Remaining tool icons — desktop only ════════ */}
        <div className="hidden lg:block">

          {/* Pen tool — rotate -143.59°, scaleY(-1) */}
          <FloatIcon src={ICON_PEN} size={33} delay={0.7} floatAmp={5} floatDur={4.4}
            style={{ left: px(211.98), top: py(379.89), rotate: "-143.59deg", transform: "scaleY(-1)" }} />

          {/* PS icon — rotate -13.46° */}
          <FloatIcon src={ICON_PS} size={29} delay={0.72} floatAmp={6} floatDur={4.1}
            style={{ left: px(486), top: py(666), rotate: "-13.46deg" }} />

          {/* AE icon — rotate -13.46° */}
          <FloatIcon src={ICON_AE} size={28} delay={0.76} floatAmp={6} floatDur={3.7}
            style={{ left: px(852.83), top: py(542.43), rotate: "-13.46deg" }} />

          {/* Chat icon 1 — rotate -13.46° */}
          <FloatIcon src={ICON_CHAT} size={28} delay={0.77} floatAmp={5} floatDur={4.3}
            style={{ left: px(1027.22), top: py(589.83), rotate: "-13.46deg" }} />

          {/* Design mug — rotate -13.46°, opacity 70% */}
          <FloatIcon src={ICON_MUG} size={28} delay={0.68} floatAmp={7} floatDur={4.8} opacity={0.7}
            style={{ left: px(1043.31), top: py(263.91), rotate: "-13.46deg" }} />

          {/* Chat icon 2 — rotate -13.46°, right=91.97px */}
          <FloatIcon src={ICON_CHAT2} size={28} delay={0.79} floatAmp={6} floatDur={4.0}
            style={{ right: px(91.97), top: `calc(50% - 29px)`, rotate: "-13.46deg" }} />

          {/* Motion play — rotate -13.46° */}
          <FloatIcon src={ICON_MOTION} size={28} delay={0.78} floatAmp={5} floatDur={4.5}
            style={{ left: px(904.47), top: py(647.4), rotate: "-13.46deg" }} />

          {/* Small photo thumbnail — rotate -18°, rounded */}
          <motion.div
            className="absolute overflow-hidden rounded-[4px]"
            style={{ left: px(1038.23), top: py(371.42), width: 23.7, height: 23.7, rotate: "-18deg" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.73 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG_THUMB}
              alt=""
              style={{
                position: "absolute",
                width: "197.67%",
                height: "123.26%",
                left: "-48.84%",
                top: "-11.63%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ paddingTop: 156, paddingBottom: 120 }}>

        {/* "A creative Community" badge */}
        <motion.div
          className="inline-flex items-center justify-center rounded-full mb-[14.6px]"
          style={{
            background: "#121314",
            border: "0.676px solid rgba(255,251,232,0.2)",
            padding: "6.761px 16px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <span className="text-white whitespace-nowrap font-medium" style={{ fontSize: 11.703, lineHeight: 1.3 }}>
            A creative Community
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-semibold text-[#fffbe8] max-w-[730px]"
          style={{
            fontSize: "clamp(36px, 6vw, 73px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
        >
          A Creative Home for{" "}
          <span
            className="cursor-default select-none"
            style={{ display: "inline-flex" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                style={{ color: current.color, display: "inline-block" }}
                initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                {current.word}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          Designer.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="text-[rgba(255,255,255,0.7)] max-w-[730px]"
          style={{ fontSize: "clamp(16px, 2vw, 24.33px)", lineHeight: 1.3, marginTop: 14.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
        >
          Join a vibrant community of Graphic, UI/UX, Motion, and 3D/2D designers,
          where creativity meets collaboration.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          style={{ marginTop: 48.667 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-full"
            style={{ filter: "drop-shadow(6.083px 6.083px 0px black)" }}
            whileHover={{ y: 3, filter: "drop-shadow(3px 3px 0px black)" }}
            whileTap={{ y: 4, filter: "drop-shadow(1px 1px 0px black)" }}
            transition={{ duration: 0.15, ease: EASE }}
            aria-label="Join Community"
          >
            {/* Text pill */}
            <span
              className="flex items-center justify-center bg-[#fffbe8] text-[#0f0f0f] font-medium leading-[1.3] whitespace-nowrap"
              style={{
                height: 54.75,
                paddingInline: 29.2,
                fontSize: 19.467,
                borderRadius: 121.667,
                border: "0.852px solid rgba(0,0,0,0.1)",
              }}
            >
              Join Community
            </span>
            {/* Arrow circle */}
            <span
              className="flex items-center justify-center bg-[#fffbe8]"
              style={{
                width: 54.75,
                height: 54.75,
                borderRadius: 121.667,
                border: "0.852px solid rgba(255,255,255,0)",
                marginLeft: -1,
              }}
            >
              {/* arrow-up-left-01 rotated 180° + scaleY(-1) = points top-right */}
              <span
                className="relative block"
                style={{ width: 24.333, height: 24.333, transform: "rotate(180deg) scaleY(-1)" }}
              >
                <Image src={BTN_ARROW} alt="" fill className="object-contain" unoptimized />
              </span>
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* ── Red ticker band — scrolling marquee ───────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
        style={{ height: 51.324, transform: "rotate(0.35deg)" }}
        aria-hidden="true"
      >
        <div
          className="flex items-center w-max animate-marquee"
          style={{ height: 43.276, backgroundColor: "#ff3b30" }}
        >
          {[...TICKER, ...TICKER].map(({ label, star }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-[6px] whitespace-nowrap"
              style={{ paddingInline: 32 }}
            >
              <span className="relative inline-block shrink-0" style={{ width: 13.848, height: 13.848 }}>
                <Image src={star} alt="" fill className="object-contain" unoptimized />
              </span>
              <span className="text-white font-medium" style={{ fontSize: 17.31, lineHeight: 1.3 }}>
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FloatAvatar — entrance slide + continuous y float ──────────────── */
function FloatAvatar({
  src, size, enterDelay, floatAmp, floatDur, floatDelay, className, style,
}: {
  src: string; size: number; enterDelay: number;
  floatAmp: number; floatDur: number; floatDelay: number;
  className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: enterDelay }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ y: [0, -floatAmp, 0] }}
        transition={floatTransition(floatDur, floatDelay)}
      >
        <Image src={src} alt="Community member" fill className="object-cover" unoptimized />
      </motion.div>
    </motion.div>
  );
}

/* ─── FloatIcon — entrance + continuous float ─────────────────────────── */
function FloatIcon({
  src, size, delay, floatAmp, floatDur, opacity = 1, style,
}: {
  src: string; size: number; delay: number;
  floatAmp: number; floatDur: number; opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ y: [0, -floatAmp, 0] }}
        transition={floatTransition(floatDur, delay + 0.5)}
      >
        <Image src={src} alt="" fill className="object-contain" unoptimized />
      </motion.div>
    </motion.div>
  );
}
