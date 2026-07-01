"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── Asset URLs — Figma node 18:829 (refreshed) ─────────────────────── */
const BG_GRID     = "https://www.figma.com/api/mcp/asset/d0135fdd-2abd-4fa1-a58b-2d3415920c64";
// Avatars
const A_LEFT      = "https://www.figma.com/api/mcp/asset/1e6d4afc-5478-4dfe-8e94-f16dd31c880c";
const A_BLUE      = "https://www.figma.com/api/mcp/asset/98835399-2e0c-4133-9ccc-1a161a66320c";
const A_PURPLE    = "https://www.figma.com/api/mcp/asset/7fda68da-2c6a-47b3-a681-e697da89620c";
const A_YELLOW    = "https://www.figma.com/api/mcp/asset/cae77b8a-556e-4a04-9780-cb8eecfd93ea";
// Lines & spirals
const WAVY        = "https://www.figma.com/api/mcp/asset/a91bb75e-20da-43f4-8419-630c9369e834";
const SPIRAL_L    = "https://www.figma.com/api/mcp/asset/c470410a-e503-4cab-aa1e-b2df6378f2d5";
const SPIRAL_R    = "https://www.figma.com/api/mcp/asset/abc35289-b4c7-4ca4-94fa-07ec516344b7";
const DOODLE_L    = "https://www.figma.com/api/mcp/asset/1b18bd3c-142c-4d31-9346-6f0cb6d9000a";
const DOODLE_R    = "https://www.figma.com/api/mcp/asset/a5a68745-72f4-4890-b715-5f2cbaf35637";
const ARROW_1     = "https://www.figma.com/api/mcp/asset/87d70c98-77fd-4b39-be35-d946bc4f8cef";
const ARROW_2     = "https://www.figma.com/api/mcp/asset/5c2301b6-3d04-4d03-907a-c55e6cd4fb60";
const ARROW_3     = "https://www.figma.com/api/mcp/asset/108cf786-4798-4f0c-a9aa-2e68710fe745";
// Icons
const ICON_WEB    = "https://www.figma.com/api/mcp/asset/ebfb9278-8b5c-4522-a52a-b145c122b683";
const ICON_AE     = "https://www.figma.com/api/mcp/asset/5527797e-6515-441f-b63d-20a12bc2ba78";
const ICON_CHAT   = "https://www.figma.com/api/mcp/asset/5557c9a5-4a74-4ce0-8fca-bf648771f9a3";
const ICON_MUG    = "https://www.figma.com/api/mcp/asset/1e8f9a5f-32b7-4ef6-a2e0-f246b206af37";
const ICON_CHAT2  = "https://www.figma.com/api/mcp/asset/86446d99-1049-4ec0-8648-6b931d6dd1d2";
const ICON_MOTION = "https://www.figma.com/api/mcp/asset/70bcc5c1-f548-479a-aa0b-9fea5f39b71b";
const ICON_PS     = "https://www.figma.com/api/mcp/asset/f1f29244-48cf-4bfa-aec8-e7cdcef88ac8";
const ICON_PEN    = "https://www.figma.com/api/mcp/asset/2b012ebd-2bce-478e-afd8-901dd2892fec";
const IMG_THUMB   = "https://www.figma.com/api/mcp/asset/7d801bbc-4a04-48de-bc73-2805290456e1";
// Small red squiggle accent — near left avatar (node 83:663)
const SQUIGGLE_RED = "https://www.figma.com/api/mcp/asset/e3417143-e784-4b88-86f3-6fcd9b7ee066";
// Button
const BTN_ARROW   = "https://www.figma.com/api/mcp/asset/5de3652c-f8ac-4f81-ba2b-0c27ef85cfd9";
// Ticker stars
const STAR_A      = "https://www.figma.com/api/mcp/asset/fff78f98-9ea6-4c29-a3ee-a88474713022";
const STAR_B      = "https://www.figma.com/api/mcp/asset/b0b82ac9-5f9d-41cb-b768-fc1ae06d6c78";
const STAR_C      = "https://www.figma.com/api/mcp/asset/9fb7e95a-a3f3-4933-9b3b-c749aa7cbe57";
const STAR_D      = "https://www.figma.com/api/mcp/asset/2ec005d6-be7d-42fe-bc95-20cd84411699";

/* ─── Mobile decorative cluster — Figma node 88:1164 (430px frame) ────── */
const M_A_TOPLEFT     = "https://www.figma.com/api/mcp/asset/cae491a3-0c41-4596-9069-154ad2e11774";
const M_A_BOTTOMLEFT  = "https://www.figma.com/api/mcp/asset/ce04eb29-3cc4-4ce6-bdd7-4103718984db";
const M_A_TOPRIGHT    = "https://www.figma.com/api/mcp/asset/bb92f174-3e74-43f7-b0af-17c37b3a1ed2";
const M_A_BOTTOMRIGHT = "https://www.figma.com/api/mcp/asset/430662d9-4d44-4154-a9ec-8318c45d6038";
const M_THUMB         = "https://www.figma.com/api/mcp/asset/0f8b770b-2607-41b7-bcd3-014dccc3bea8";
const M_SQUIGGLE_RED  = "https://www.figma.com/api/mcp/asset/8c72e347-1451-4541-b45b-31cd360c56cd";
const M_SPIRAL_1      = "https://www.figma.com/api/mcp/asset/ca45d9e2-9fb0-471f-a603-4bace7f6d9d1";
const M_WAVY          = "https://www.figma.com/api/mcp/asset/2c2bb757-fba9-485d-a21c-8d696cc9b0f5";
const M_SPIRAL_2      = "https://www.figma.com/api/mcp/asset/d33e9a66-d8a0-4b0e-8ad5-1e2d497121c9";
const M_ICON_PS       = "https://www.figma.com/api/mcp/asset/7be5a815-6bb4-4c2a-8cd3-bccb3fb11bc1";
const M_ICON_AE       = "https://www.figma.com/api/mcp/asset/7f6d524b-2351-4766-8fc9-9e85f0245623";
const M_ICON_WEB      = "https://www.figma.com/api/mcp/asset/91ef2d0e-a0d0-4269-b0a1-f0aae0000390";
const M_ARROW         = "https://www.figma.com/api/mcp/asset/7443c145-0190-4cd2-af78-d02dcb6b29fd";

/* ─── Mobile canvas reference: 375 × 221 px (decorative cluster bbox) ─── */
const MW = 375;
const MH = 221;
const mx = (v: number) => `${(v / MW) * 100}%`;
const my = (v: number) => `${(v / MH) * 100}%`;

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

      {/* ── Floating decorative layer (desktop only — mobile has its own MobileDecor cluster) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ y: layerY, opacity: layerOpacity }}
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

        {/* Small red squiggle accent — top-left of left avatar */}
        <motion.div
          className="absolute"
          style={{ left: px(142), top: py(493), width: 23.401, height: 23.401, rotate: "-13.92deg" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        >
          <Image src={SQUIGGLE_RED} alt="" fill className="object-contain" unoptimized />
        </motion.div>

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

        {/* ════════ Tool icons — desktop only (mobile has its own compact cluster) ════════ */}
        <div className="hidden lg:block">

          {/* Web/Figma icon — rotate -159.14°, scaleY(-1), opacity 50% */}
          <FloatIcon src={ICON_WEB} size={24} delay={0.75} floatAmp={5} floatDur={3.9} opacity={0.5}
            style={{ left: px(460.03), top: py(572.05), rotate: "-159.14deg", transform: "scaleY(-1)" }} />

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
          className="font-semibold text-[#fffbe8] w-full max-w-[730px] text-[clamp(38px,14vw,60px)] sm:text-[64px] lg:text-[70px] xl:text-[73px]"
          style={{
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
          className="text-[rgba(255,255,255,0.7)] w-full max-w-[730px] text-[18px] sm:text-[20px] lg:text-[22px] xl:text-[24.33px]"
          style={{ lineHeight: 1.3, marginTop: 14.6 }}
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
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-full
                       drop-shadow-[5px_5px_0px_black] md:drop-shadow-[6.083px_6.083px_0px_black]"
            whileHover={{ y: 3, filter: "drop-shadow(3px 3px 0px black)" }}
            whileTap={{ y: 4, filter: "drop-shadow(1px 1px 0px black)" }}
            transition={{ duration: 0.15, ease: EASE }}
            aria-label="Join Community"
          >
            {/* Text pill */}
            <span
              className="flex items-center justify-center bg-[#fffbe8] text-[#0f0f0f] font-medium leading-[1.3] whitespace-nowrap
                         h-[45px] md:h-[54.75px] px-[24px] md:px-[29.2px] text-[16px] md:text-[19.467px] rounded-[100px] md:rounded-[121.667px]"
              style={{ border: "0.852px solid rgba(0,0,0,0.1)" }}
            >
              Join Community
            </span>
            {/* Arrow circle */}
            <span
              className="flex items-center justify-center bg-[#fffbe8] size-[45px] md:size-[54.75px] rounded-[100px] md:rounded-[121.667px]"
              style={{ border: "0.852px solid rgba(255,255,255,0)", marginLeft: -1 }}
            >
              {/* arrow-up-left-01 rotated 180° + scaleY(-1) = points top-right */}
              <span
                className="relative block size-[20px] md:size-[24.333px]"
                style={{ transform: "rotate(180deg) scaleY(-1)" }}
              >
                <Image src={BTN_ARROW} alt="" fill className="object-contain" unoptimized />
              </span>
            </span>
          </motion.a>
        </motion.div>

        {/* ── Mobile decorative cluster (below CTA, hidden lg+) ──────── */}
        <MobileDecor />
      </div>

      {/* ── Red ticker band — scrolling marquee ───────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
        style={{ height: "clamp(31px, 4.5vw, 51.324px)", transform: "rotate(0.35deg)" }}
        aria-hidden="true"
      >
        <div
          className="flex items-center w-max animate-marquee"
          style={{ height: "clamp(28px, 4vw, 43.276px)", backgroundColor: "#ff3b30" }}
        >
          {[...TICKER, ...TICKER].map(({ label, star }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-[4px] md:gap-[6px] whitespace-nowrap px-[16px] md:px-[32px]"
            >
              <span className="relative inline-block shrink-0 size-[9px] md:size-[13.848px]">
                <Image src={star} alt="" fill className="object-contain" unoptimized />
              </span>
              <span className="text-white font-medium text-[11px] md:text-[17.31px]" style={{ lineHeight: 1.3 }}>
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MobileDecor — compact avatar/line/icon cluster, Figma node 88:1164 ─
   Positions are relative to the cluster's own 375×221 bounding box
   (Figma "Group 2085663136" at x:31,y:649 within the 430px mobile frame). */
function MobileDecor() {
  return (
    <div
      className="relative w-full max-w-[380px] mx-auto lg:hidden"
      style={{ aspectRatio: `${MW} / ${MH}`, marginTop: 40 }}
      aria-hidden="true"
    >
      {/* Avatars */}
      <FloatAvatar src={M_A_TOPLEFT} size={57} enterDelay={0.4} floatAmp={6} floatDur={4.2} floatDelay={0}
        className="absolute overflow-hidden" style={{ left: mx(0), top: my(46) }} />
      <FloatAvatar src={M_A_BOTTOMLEFT} size={57} enterDelay={0.48} floatAmp={6} floatDur={4.4} floatDelay={0.3}
        className="absolute overflow-hidden border border-[#4154f9]" style={{ left: mx(97), top: my(162) }} />
      <FloatAvatar src={M_A_TOPRIGHT} size={48} enterDelay={0.45} floatAmp={6} floatDur={3.9} floatDelay={0.6}
        className="absolute overflow-hidden border border-[#ffb522]" style={{ left: mx(327), top: my(15) }} />
      <FloatAvatar src={M_A_BOTTOMRIGHT} size={44} enterDelay={0.5} floatAmp={5} floatDur={4.6} floatDelay={0.9}
        className="absolute overflow-hidden border border-[#8a38f5]" style={{ left: mx(321), top: my(172) }} />

      {/* Lines & spirals */}
      <motion.div
        className="absolute"
        style={{ left: mx(22), top: my(112), width: 70.231, height: 82, transformOrigin: "top center" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.55 }}
      >
        <Image src={M_SPIRAL_1} alt="" fill className="object-contain" unoptimized />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ left: mx(156), top: my(177), width: 158, height: 28.266, transformOrigin: "left center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.7 }}
      >
        <Image src={M_WAVY} alt="" fill className="object-contain" unoptimized />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ left: mx(333), top: my(70), width: 35.553, height: 95.486, transformOrigin: "top center" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
      >
        <Image src={M_SPIRAL_2} alt="" fill className="object-contain" unoptimized />
      </motion.div>

      {/* Small arrow */}
      <motion.div
        className="absolute"
        style={{ left: mx(221), top: my(205), width: 20.67, height: 19.868, rotate: "-13.46deg" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "backOut", delay: 1.1 }}
      >
        <Image src={M_ARROW} alt="" fill className="object-contain" unoptimized />
      </motion.div>

      {/* Red squiggle accent */}
      <motion.div
        className="absolute"
        style={{ left: mx(172), top: my(76), width: 23.401, height: 23.401, rotate: "-13.92deg" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
      >
        <Image src={M_SQUIGGLE_RED} alt="" fill className="object-contain" unoptimized />
      </motion.div>

      {/* Tool icons */}
      <FloatIcon src={M_ICON_PS} size={22.956} delay={0.72} floatAmp={4} floatDur={4.1}
        style={{ left: mx(72), top: my(136), rotate: "-23.94deg" }} />
      <FloatIcon src={M_ICON_AE} size={18.451} delay={0.76} floatAmp={4} floatDur={3.7}
        style={{ left: mx(296), top: my(0), rotate: "-13.46deg" }} />
      <FloatIcon src={M_ICON_WEB} size={16.296} delay={0.75} floatAmp={4} floatDur={3.9} opacity={0.5}
        style={{ left: mx(279), top: my(186), rotate: "-159.14deg", transform: "scaleY(-1)" }} />

      {/* Small photo thumbnail */}
      <motion.div
        className="absolute overflow-hidden rounded-[2px]"
        style={{ left: mx(326), top: my(105), width: 17.395, height: 17.395, rotate: "-32.39deg" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.73 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={M_THUMB}
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
