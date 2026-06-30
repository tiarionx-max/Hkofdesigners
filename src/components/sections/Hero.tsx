"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── Asset URLs — direct from Figma node 18:829 ─────────────────────── */
// Background
const BG_GRID     = "https://www.figma.com/api/mcp/asset/5543d4c9-4b94-4eea-884e-e71310f9eced";
// Avatars
const A_LEFT      = "https://www.figma.com/api/mcp/asset/24cff3cb-b228-4d7b-a9f9-59802fe00205";
const A_BLUE      = "https://www.figma.com/api/mcp/asset/43e8683a-bb9b-4c42-a3a8-b38c9c7e2278";
const A_PURPLE    = "https://www.figma.com/api/mcp/asset/ec2cd476-b2f4-499d-8d07-6dbbfaa6118e";
const A_YELLOW    = "https://www.figma.com/api/mcp/asset/e3c1b6fa-20f7-4046-8a72-e578d4ed6dbf";
// Lines & spirals (Vectors)
const WAVY        = "https://www.figma.com/api/mcp/asset/9d1424d3-991c-45b7-9bf5-42f9bc2f315a"; // Vector3 — wavy line
const SPIRAL_L    = "https://www.figma.com/api/mcp/asset/8cfae5b8-2042-436e-bd00-0b2b71a4263c"; // Vector1 — left spiral
const SPIRAL_R    = "https://www.figma.com/api/mcp/asset/223e4184-535b-4940-a680-9fc125ffc4ab"; // Vector5 — right spiral
const DOODLE_L    = "https://www.figma.com/api/mcp/asset/77f2aca1-2759-4aa0-8d73-3d93ae7a9016"; // Vector8 — left doodle
const DOODLE_R    = "https://www.figma.com/api/mcp/asset/ef8be2cd-7d45-47b6-b5fb-aeda6fee2111"; // Vector7 — right doodle
const ARROW_1     = "https://www.figma.com/api/mcp/asset/66a2fd20-01b0-4681-9587-adad888bbf10"; // Vector2 — small arrow left
const ARROW_2     = "https://www.figma.com/api/mcp/asset/1547c956-55ff-4292-92c9-dcd8ee28bb7e"; // Vector4 — small arrow right
const ARROW_3     = "https://www.figma.com/api/mcp/asset/8917a0dc-5104-4297-b26c-a852fecb4644"; // Vector6 — small arrow top-right
// Small icons
const ICON_FIGMA  = "https://www.figma.com/api/mcp/asset/de6a64d5-223a-4492-975d-7e680b08f93e"; // streamline web icon
const ICON_AE     = "https://www.figma.com/api/mcp/asset/076ef57b-cf36-4f43-82c0-ecd3c202e9a8"; // After Effects
const ICON_CHAT   = "https://www.figma.com/api/mcp/asset/0169fe9c-fba0-4dac-9ff5-4bd4265208e1"; // chat bubble 1
const ICON_MUG    = "https://www.figma.com/api/mcp/asset/b03a8d6a-534e-4767-8816-7341dd982fd8"; // design mug
const ICON_CHAT2  = "https://www.figma.com/api/mcp/asset/b7c9c0ba-d2d4-421a-b141-61ff3a3f8cde"; // chat bubble 2
const ICON_MOTION = "https://www.figma.com/api/mcp/asset/405fd6f4-e0d5-4816-9b49-8f11afcf2717"; // motion play
const ICON_PS     = "https://www.figma.com/api/mcp/asset/1df573d9-9f98-4b01-99f8-f153564aa9bd"; // Photoshop
const ICON_PEN    = "https://www.figma.com/api/mcp/asset/cca3f25b-2809-4125-91be-48450420a244"; // pen tool
const IMG_THUMB   = "https://www.figma.com/api/mcp/asset/122d42b5-5ac4-4433-9fb4-58d933097d63"; // small rotated photo
// Button
const BTN_ARROW   = "https://www.figma.com/api/mcp/asset/c575c802-64c4-4f47-ad67-05fc0f41680e"; // arrow-up-left-01
// Ticker star
const STAR_A      = "https://www.figma.com/api/mcp/asset/7d3f9f55-4a99-4664-a6e2-0f5dde1dd402";
const STAR_B      = "https://www.figma.com/api/mcp/asset/ef43ffdc-5efd-42d6-9754-e117cf572d02";
const STAR_C      = "https://www.figma.com/api/mcp/asset/0d9ef7b1-bc4a-4ae9-b7ae-cd34ae3fc055";
const STAR_D      = "https://www.figma.com/api/mcp/asset/c820ebe1-885b-45d5-ab89-6d8f50791090";

/* ─── Ticker items matching Figma exactly ─────────────────────────────── */
const TICKER_ITEMS: { label: string; star: string }[] = [
  { label: "Motion",      star: STAR_A },
  { label: "3D/2D",       star: STAR_A },
  { label: "UI/UX",       star: STAR_A },
  { label: "Wireframe",   star: STAR_B },
  { label: "Graphic",     star: STAR_C },
  { label: "Chat",        star: STAR_C },
  { label: "Collaborate", star: STAR_D },
];

/* ─── Word cycling ────────────────────────────────────────────────────── */
const DESIGNERS = [
  { word: "Every",   color: "#ffb522" },
  { word: "Graphic", color: "#4154f9" },
  { word: "UI/UX",   color: "#af52de" },
  { word: "Motion",  color: "#ffb522" },
  { word: "3D/2D",   color: "#FF3D3D" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Canvas reference: 1280 × 800 px ────────────────────────────────── */
// All pixel positions below reference this canvas size.
// Rendered at 100vw on desktop; floating layer is hidden on mobile.
const CW = 1280;
const CH = 800;
const px = (v: number) => `${(v / CW) * 100}%`;
const py = (v: number) => `${(v / CH) * 100}%`;

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx(i => (i + 1) % DESIGNERS.length), 2800);
    return () => clearInterval(id);
  }, [paused]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const floatY       = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const floatOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const current = DESIGNERS[idx];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101010]"
      style={{ minHeight: 700 }}
      aria-label="Hero"
    >
      {/* ── Background grid ── */}
      <div className="pointer-events-none absolute inset-0">
        <Image src={BG_GRID} alt="" fill className="object-cover object-top" unoptimized priority />
      </div>
      {/* Radial centre vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 75% at 50% 35%, transparent 0%, rgba(16,16,16,0.72) 55%, #101010 100%)",
        }}
      />

      {/* ── Floating decorative layer (desktop only) ─────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ y: floatY, opacity: floatOpacity }}
        aria-hidden="true"
      >
        {/* ── Avatars ─────────────────────────────────── */}

        {/* Left — plain square, 100 × 100, no border */}
        <FadeIn delay={0.45} className="absolute overflow-hidden"
          style={{ left: px(115), top: py(363), width: 100, height: 100 }}>
          <Image src={A_LEFT} alt="Community member" fill className="object-cover" unoptimized />
        </FadeIn>

        {/* Center-left — blue border, 100 × 100 */}
        <FadeIn delay={0.52} className="absolute overflow-hidden border border-[#4154f9]"
          style={{ left: px(347), top: py(563), width: 100, height: 100 }}>
          <Image src={A_BLUE} alt="Community member" fill className="object-cover" unoptimized />
        </FadeIn>

        {/* Center-right — purple border, 76 × 76 */}
        <FadeIn delay={0.5} className="absolute overflow-hidden border border-[#8a38f5]"
          style={{ left: px(920), top: py(565), width: 76, height: 76 }}>
          <Image src={A_PURPLE} alt="Community member" fill className="object-cover" unoptimized />
        </FadeIn>

        {/* Top-right — yellow border, 76 × 76 */}
        <FadeIn delay={0.48} className="absolute overflow-hidden border border-[#ffb522]"
          style={{ left: px(1069), top: py(298), width: 76, height: 76 }}>
          <Image src={A_YELLOW} alt="Community member" fill className="object-cover" unoptimized />
        </FadeIn>

        {/* ── Curved lines & spirals ───────────────────── */}

        {/* Wavy line — Vector3, 375 × 69 */}
        <FadeIn delay={0.35} className="absolute"
          style={{ left: px(489.39), top: py(578.36), width: 375.5, height: 68.72 }}>
          <Image src={WAVY} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Left spiral — Vector1, 87 × 108 */}
        <FadeIn delay={0.55} className="absolute"
          style={{ left: px(211.72), top: py(483.78), width: 87.05, height: 107.78 }}>
          <Image src={SPIRAL_L} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Right spiral — Vector5, 55 × 137 */}
        <FadeIn delay={0.58} className="absolute"
          style={{ left: px(1051.34), top: py(427.59), width: 54.54, height: 136.63 }}>
          <Image src={SPIRAL_R} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Left doodle — Vector8, 39 × 52, rotate 22.3° */}
        <FadeIn delay={0.65} className="absolute"
          style={{ left: px(93.47), top: py(313.85), width: 38.97, height: 51.6, rotate: "22.3deg" }}>
          <Image src={DOODLE_L} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Right doodle — Vector7, 39 × 46 */}
        <FadeIn delay={0.62} className="absolute"
          style={{ left: px(1140.66), top: py(258.83), width: 38.57, height: 46.28 }}>
          <Image src={DOODLE_R} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* ── Small directional arrows ─────────────────── */}

        {/* Arrow 1 — rotate -3.33° */}
        <FadeIn delay={0.8} className="absolute"
          style={{ left: px(296.12), top: py(586.94), width: 11.46, height: 8.77, rotate: "-3.33deg" }}>
          <Image src={ARROW_1} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Arrow 2 — rotate -57.2° */}
        <FadeIn delay={0.82} className="absolute"
          style={{ left: px(860.72), top: py(624.82), width: 12.81, height: 13.66, rotate: "-57.2deg" }}>
          <Image src={ARROW_2} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Arrow 3 — rotate -134.57° */}
        <FadeIn delay={0.84} className="absolute"
          style={{ left: px(1089.76), top: py(417.73), width: 13.52, height: 13.56, rotate: "-134.57deg" }}>
          <Image src={ARROW_3} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* ── Floating icons ───────────────────────────── */}

        {/* Pen tool — rotate -143.59°, scaleY(-1), 33 × 33 */}
        <FadeIn delay={0.7} className="absolute"
          style={{ left: px(211.98), top: py(379.89), width: 33.15, height: 33.15,
            rotate: "-143.59deg", transform: "scaleY(-1)" }}>
          <Image src={ICON_PEN} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Figma/web icon — rotate -159.14°, scaleY(-1), opacity 50%, 31 × 31 */}
        <FadeIn delay={0.75} className="absolute" style={{ opacity: 0.5 }}>
          <div style={{
            position: "absolute", left: px(460.03), top: py(572.05), width: 30.59, height: 30.59,
            rotate: "-159.14deg", transform: "scaleY(-1)",
          }}>
            <Image src={ICON_FIGMA} alt="" fill className="object-contain" unoptimized />
          </div>
        </FadeIn>

        {/* PS icon — rotate -13.46°, 29 × 29 */}
        <FadeIn delay={0.72} className="absolute"
          style={{ left: px(486), top: py(666), width: 28.57, height: 28.57, rotate: "-13.46deg" }}>
          <Image src={ICON_PS} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* AE icon — rotate -13.46°, 28 × 28 */}
        <FadeIn delay={0.76} className="absolute"
          style={{ left: px(852.83), top: py(542.43), width: 28.44, height: 28.03, rotate: "-13.46deg" }}>
          <Image src={ICON_AE} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Chat icon 1 — rotate -13.46°, 28 × 28 */}
        <FadeIn delay={0.77} className="absolute"
          style={{ left: px(1027.22), top: py(589.83), width: 27.9, height: 27.9, rotate: "-13.46deg" }}>
          <Image src={ICON_CHAT} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Design mug — rotate -13.46°, opacity 70%, 28 × 28 */}
        <FadeIn delay={0.68} className="absolute" style={{ opacity: 0.7 }}>
          <div style={{
            position: "absolute", left: px(1043.31), top: py(263.91), width: 27.9, height: 27.9,
            rotate: "-13.46deg",
          }}>
            <Image src={ICON_MUG} alt="" fill className="object-contain" unoptimized />
          </div>
        </FadeIn>

        {/* Chat icon 2 — rotate -13.46°, 28 × 28, right=91.97px */}
        <FadeIn delay={0.79} className="absolute"
          style={{ right: px(91.97), top: `calc(50% - ${29.02}px)`, width: 27.9, height: 27.9, rotate: "-13.46deg" }}>
          <Image src={ICON_CHAT2} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Motion icon — rotate -13.46°, 28 × 28 */}
        <FadeIn delay={0.78} className="absolute"
          style={{ left: px(904.47), top: py(647.4), width: 27.9, height: 27.9, rotate: "-13.46deg" }}>
          <Image src={ICON_MOTION} alt="" fill className="object-contain" unoptimized />
        </FadeIn>

        {/* Small photo thumbnail — rotate -18°, rounded, 24 × 24 */}
        <FadeIn delay={0.73} className="absolute overflow-hidden rounded-[4px]"
          style={{ left: px(1038.23), top: py(371.42), width: 23.7, height: 23.7, rotate: "-18deg" }}>
          <Image
            src={IMG_THUMB}
            alt=""
            fill
            className="object-cover"
            style={{ width: "197.67%", height: "123.26%", left: "-48.84%", top: "-11.63%", position: "absolute" }}
            unoptimized
          />
        </FadeIn>
      </motion.div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[120px] pb-[100px] lg:pt-[152px] lg:pb-[100px] px-6">

        {/* Headline */}
        <motion.h1
          className="text-[clamp(34px,5.5vw,54.52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#fffbe8] max-w-[545px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
        >
          A Creative Home for{" "}
          <span
            className="inline-flex cursor-default select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                style={{ color: current.color, display: "inline-block" }}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
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
          className="mt-[11px] text-[18px] leading-[1.3] text-[rgba(255,255,255,0.7)] max-w-[480px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
        >
          Join a vibrant community of Graphic, UI/UX, Motion, and 3D/2D designers,
          where creativity meets collaboration.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          className="mt-[36px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-full"
            style={{ filter: "drop-shadow(4.543px 4.543px 0px black)" }}
            whileHover={{ y: 2, filter: "drop-shadow(2px 2px 0px black)" }}
            whileTap={{ y: 3, filter: "drop-shadow(1px 1px 0px black)" }}
            transition={{ duration: 0.15, ease: EASE }}
            aria-label="Join Community"
          >
            {/* Left pill: label */}
            <span
              className="flex items-center justify-center bg-[#fffbe8] text-[#0f0f0f] font-medium leading-[1.3] rounded-full border border-black/10 whitespace-nowrap"
              style={{ height: 40.889, paddingInline: 21.807, fontSize: 14.538 }}
            >
              Join Community
            </span>
            {/* Right circle: arrow — arrow-up-left rotated 180° + scaleY(-1) = points top-right */}
            <span
              className="flex items-center justify-center bg-[#fffbe8] rounded-full border border-white/0"
              style={{ width: 40.889, height: 40.889, marginLeft: -1 }}
            >
              <span className="relative block" style={{ width: 18.173, height: 18.173, transform: "rotate(180deg) scaleY(-1)" }}>
                <Image src={BTN_ARROW} alt="" fill className="object-contain" unoptimized />
              </span>
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* ── Single red ticker band ─────────────────────────────────── */}
      <div
        className="absolute bottom-[13px] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: "102.25%", minWidth: 1280 }}
        aria-hidden="true"
      >
        <div
          className="flex items-center justify-between bg-[#ff3b30]"
          style={{ height: 43.276, paddingInline: 86.552 }}
        >
          {TICKER_ITEMS.map(({ label, star }) => (
            <span key={label} className="inline-flex items-center gap-[6px] whitespace-nowrap">
              <span className="relative inline-block shrink-0" style={{ width: 13.848, height: 13.848 }}>
                <Image src={star} alt="" fill className="object-contain" unoptimized />
              </span>
              <span
                className="font-medium leading-[1.3] text-white"
                style={{ fontSize: 17.31 }}
              >
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FadeIn helper — entrance animation wrapper ─────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
