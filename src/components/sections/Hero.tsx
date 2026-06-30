"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ── Asset URLs (Figma node 18:829) ── */
const WAVY_LINE   = "https://www.figma.com/api/mcp/asset/7f2a6ae1-630f-43c9-8926-dbf6cd2cea05";
const IMG_135     = "https://www.figma.com/api/mcp/asset/88d098c2-1569-402b-8d3a-c2b601c906be"; // avatar left
const IMG_136     = "https://www.figma.com/api/mcp/asset/0f25c750-ec1a-4da2-911b-4527cf78ec01"; // avatar center-left (blue)
const IMG_137     = "https://www.figma.com/api/mcp/asset/775e51de-c0d9-4196-9aed-c6dd002f7136"; // avatar center-right (purple)
const IMG_138     = "https://www.figma.com/api/mcp/asset/f8310f81-a846-400b-9eb7-0c47bc1ad5a2"; // avatar top-right (yellow)
const BG_GRID     = "https://www.figma.com/api/mcp/asset/3daefa95-98ba-4fa2-9731-a3e0cbb04aaa"; // bg stripe pattern
const ARROW_L     = "https://www.figma.com/api/mcp/asset/c9b50bf1-868a-4790-b27d-21af76d176b3"; // small arrow left
const ARROW_R     = "https://www.figma.com/api/mcp/asset/5fd17e53-ff33-4af7-a996-7e4b4cc0367f"; // small arrow right
const ARROW_TR    = "https://www.figma.com/api/mcp/asset/6ff3c7f1-5501-4bff-997e-c1885fa769dc"; // small arrow top-right
const SPIRAL_L    = "https://www.figma.com/api/mcp/asset/65697901-f2e9-4705-8fd1-bb19f1b1af80"; // left spiral
const SPIRAL_R    = "https://www.figma.com/api/mcp/asset/fdbfde78-97ba-4554-a23a-d7df0d3a8c83"; // right spiral
const WEBFLOW     = "https://www.figma.com/api/mcp/asset/1fab3673-e181-4e92-b239-a7e0034f4969"; // webflow-like icon
const AE_ICON     = "https://www.figma.com/api/mcp/asset/3702bb17-f016-4b5e-974a-86a616ec1eb4"; // After Effects
const CHAT_ICON   = "https://www.figma.com/api/mcp/asset/2177442a-5ab4-4b1f-aaba-03c1c5449f8d"; // chat bubble 1
const DESIGN_MUG  = "https://www.figma.com/api/mcp/asset/bd25671f-bf39-444e-98cd-72e30f49a8e8"; // design mug icon
const CHAT_ICON2  = "https://www.figma.com/api/mcp/asset/5464e8d9-4a31-410c-b577-00933cadbe44"; // chat bubble 2
const MOTION_ICON = "https://www.figma.com/api/mcp/asset/1478f750-6dd1-4b9c-8957-9b63e3b2a9f9"; // motion play icon
const DOODLE_R    = "https://www.figma.com/api/mcp/asset/1a5a75c1-1ec7-4e1d-8a71-f556acda1673"; // right doodle
const DOODLE_L    = "https://www.figma.com/api/mcp/asset/37746ee8-00a7-4b2b-9df1-f66dcf2d4503"; // left doodle
const PEN_TOOL    = "https://www.figma.com/api/mcp/asset/a6c3341e-9c10-43b0-a79a-af0fcdf69df2"; // pen tool icon
const PS_ICON     = "https://www.figma.com/api/mcp/asset/8ccae42b-0dbf-4ece-bb8e-522cf130cda9"; // photoshop icon
const BTN_ARROW   = "https://www.figma.com/api/mcp/asset/301c7e87-5050-4cbc-ae54-02012a54e3cd"; // arrow-up-left (rotated →)
const STAR        = "https://www.figma.com/api/mcp/asset/43aa0541-6774-4115-90c3-b8a64eda47aa"; // ticker star

/* ── Word cycling ── */
const DESIGNERS = [
  { word: "Every",   color: "#ffb522" },
  { word: "Graphic", color: "#4154f9" },
  { word: "UI/UX",   color: "#af52de" },
  { word: "Motion",  color: "#ffb522" },
  { word: "3D/2D",   color: "#FF3D3D" },
];

/* ── Ticker items — doubled for seamless loop ── */
const TICKER_A_BASE = ["3D/2D", "UI/UX", "Wireframe", "Graphic", "Chat", "Collaborate"];
const TICKER_B_BASE = ["Motion", "3D/2D", "UI/UX", "Wireframe", "Graphic", "Chat", "Collaborate"];
const TICKER_A = [...TICKER_A_BASE, ...TICKER_A_BASE];
const TICKER_B = [...TICKER_B_BASE, ...TICKER_B_BASE];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Floating small icon ── */
function FloatIcon({
  src,
  size = 24,
  rotate = 0,
  delay = 0,
  opacity = 1,
  style,
}: {
  src: string;
  size?: number;
  rotate?: number;
  delay?: number;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: size, height: size, rotate, opacity: 0, ...style }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <Image src={src} alt="" fill className="object-contain" unoptimized />
    </motion.div>
  );
}

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
  const floatY      = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const floatOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const current = DESIGNERS[idx];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101010]"
      style={{ minHeight: 700 }}
      aria-label="Hero"
    >
      {/* Background grid image from Figma */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={BG_GRID}
          alt=""
          fill
          className="object-cover object-top"
          unoptimized
          priority
        />
      </div>

      {/* Radial vignette to keep center dark */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 75% at 50% 35%, transparent 0%, rgba(16,16,16,0.7) 55%, #101010 100%)",
        }}
      />

      {/* ── Floating decorative layer (desktop only) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ y: floatY, opacity: floatOpacity }}
        aria-hidden="true"
      >
        {/* ── Avatars ── */}

        {/* Left avatar — plain square */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ left: "8.98%", top: "45.375%", width: 100, height: 100 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
        >
          <Image src={IMG_135} alt="Community member" fill className="object-cover" unoptimized />
        </motion.div>

        {/* Center-left avatar — blue border */}
        <motion.div
          className="absolute overflow-hidden border border-[#4154f9]"
          style={{ left: "27.1%", top: "70.375%", width: 100, height: 100 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.6, ease: EASE }}
        >
          <Image src={IMG_136} alt="Community member" fill className="object-cover" unoptimized />
        </motion.div>

        {/* Center-right avatar — purple border */}
        <motion.div
          className="absolute overflow-hidden border border-[#8a38f5]"
          style={{ left: "71.9%", top: "70.6%", width: 76, height: 76 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
        >
          <Image src={IMG_137} alt="Community member" fill className="object-cover" unoptimized />
        </motion.div>

        {/* Top-right avatar — yellow border */}
        <motion.div
          className="absolute overflow-hidden border border-[#ffb522]"
          style={{ left: "83.5%", top: "37.25%", width: 76, height: 76 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6, ease: EASE }}
        >
          <Image src={IMG_138} alt="Community member" fill className="object-cover" unoptimized />
        </motion.div>

        {/* ── Decorative lines & spirals ── */}

        {/* Wavy line */}
        <motion.div
          className="absolute"
          style={{ left: "38.2%", top: "72.3%", width: 375, height: 69 }}
          initial={{ opacity: 0, scaleX: 0.85 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        >
          <Image src={WAVY_LINE} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Left spiral */}
        <motion.div
          className="absolute"
          style={{ left: "16.5%", top: "60.5%", width: 87, height: 108, rotate: "22.3deg" }}
          initial={{ opacity: 0, rotate: "0deg" }}
          animate={{ opacity: 1, rotate: "22.3deg" }}
          transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
        >
          <Image src={SPIRAL_L} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Right spiral */}
        <motion.div
          className="absolute"
          style={{ left: "82.1%", top: "53.4%", width: 55, height: 137 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.6 }}
        >
          <Image src={SPIRAL_R} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Left doodle */}
        <motion.div
          className="absolute"
          style={{ left: "7.3%", top: "39.2%", width: 39, height: 52 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.68, duration: 0.5, ease: EASE }}
        >
          <Image src={DOODLE_L} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Right doodle */}
        <motion.div
          className="absolute"
          style={{ left: "89.1%", top: "32.4%", width: 39, height: 46 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.66, duration: 0.5, ease: EASE }}
        >
          <Image src={DOODLE_R} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Arrow left */}
        <motion.div
          className="absolute"
          style={{ left: "23.1%", top: "73.4%", width: 11, height: 9, rotate: "-3.33deg" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
        >
          <Image src={ARROW_L} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Arrow right */}
        <motion.div
          className="absolute"
          style={{ left: "67.2%", top: "78.1%", width: 13, height: 14, rotate: "-57.2deg" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.87, duration: 0.4 }}
        >
          <Image src={ARROW_R} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Arrow top-right */}
        <motion.div
          className="absolute"
          style={{ left: "85.1%", top: "52.2%", width: 14, height: 14, rotate: "-134.57deg" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.88, duration: 0.4 }}
        >
          <Image src={ARROW_TR} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* ── Small icons ── */}

        {/* Pen tool */}
        <FloatIcon
          src={PEN_TOOL}
          size={33}
          rotate={-144}
          style={{ left: "16.6%", top: "47.5%", transform: "scaleY(-1)" }}
          delay={0.72}
        />

        {/* Webflow-like icon */}
        <FloatIcon
          src={WEBFLOW}
          size={24}
          rotate={-159}
          style={{ left: "35.9%", top: "71.5%" }}
          delay={0.75}
          opacity={0.5}
        />

        {/* PS icon */}
        <FloatIcon src={PS_ICON} size={29} rotate={-13} style={{ left: "37.97%", top: "83.25%" }} delay={0.73} />

        {/* AE icon */}
        <FloatIcon src={AE_ICON} size={28} rotate={-13} style={{ left: "66.6%", top: "67.8%" }} delay={0.77} />

        {/* Chat icon 1 */}
        <FloatIcon src={CHAT_ICON} size={28} rotate={-13} style={{ left: "80.3%", top: "73.7%" }} delay={0.76} />

        {/* Design mug icon */}
        <FloatIcon src={DESIGN_MUG} size={28} rotate={-13} style={{ left: "81.5%", top: "33%" }} delay={0.7} opacity={0.7} />

        {/* Chat icon 2 */}
        <FloatIcon src={CHAT_ICON2} size={28} rotate={-13} style={{ left: "92.8%", top: "46.4%" }} delay={0.78} />

        {/* Motion play icon */}
        <FloatIcon src={MOTION_ICON} size={28} rotate={-13} style={{ left: "70.7%", top: "80.9%" }} delay={0.79} />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[120px] pb-[116px] lg:pt-[152px] lg:pb-[116px] px-6">
        {/* Headline */}
        <motion.h1
          className="text-[clamp(34px,5.5vw,54px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#fffbe8] max-w-[600px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
        >
          A Creative Home for{" "}
          <span
            className="relative inline-flex cursor-default select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                className="inline-block"
                style={{ color: current.color }}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {current.word}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          Designer.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="mt-[11px] text-[16px] md:text-[18px] leading-[1.3] text-[rgba(255,255,255,0.7)] max-w-[480px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
        >
          Join a vibrant community of Graphic, UI/UX, Motion, and 3D/2D designers,
          where creativity meets collaboration.
        </motion.p>

        {/* CTA — two separate pills matching Figma exactly */}
        <motion.div
          className="mt-[36px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40 rounded-full"
            style={{ filter: "drop-shadow(4px 4px 0px black)" }}
            whileHover={{ filter: "drop-shadow(2px 2px 0px black)", y: 2 }}
            whileTap={{ filter: "drop-shadow(1px 1px 0px black)", y: 3 }}
            transition={{ duration: 0.15, ease: EASE }}
          >
            {/* Left pill: text */}
            <span className="flex items-center justify-center h-[41px] px-[22px] bg-[#fffbe8] text-[#0f0f0f] text-[14.5px] font-medium leading-[1.3] rounded-full border border-black/10 whitespace-nowrap">
              Join Community
            </span>
            {/* Right circle: arrow */}
            <span className="flex items-center justify-center size-[41px] bg-[#fffbe8] rounded-full border border-white/0 text-[#0f0f0f] -ml-px">
              <span
                className="relative block"
                style={{
                  width: 18,
                  height: 18,
                  transform: "rotate(180deg) scaleY(-1)",
                }}
              >
                <Image src={BTN_ARROW} alt="" fill className="object-contain" unoptimized />
              </span>
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* ── Ticker bands ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 76 }}
        aria-hidden="true"
      >
        {/* Blue band — forward scroll */}
        <div
          className="absolute w-[110%] -left-[5%] overflow-hidden"
          style={{ top: 0, height: 42, transform: "rotate(-1.5deg)" }}
        >
          <div
            className="flex w-max animate-marquee h-full items-center"
            style={{ backgroundColor: "#4154f9" }}
          >
            {TICKER_A.map((label, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-[6px] px-[85px] text-[17px] font-medium leading-[1.3] text-white whitespace-nowrap"
              >
                <span className="relative inline-block shrink-0" style={{ width: 13.5, height: 13.5 }}>
                  <Image src={STAR} alt="" fill className="object-contain" unoptimized />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Red band — reverse scroll */}
        <div
          className="absolute w-[110%] -left-[5%] overflow-hidden"
          style={{ top: 34, height: 42, transform: "rotate(1.5deg)" }}
        >
          <div
            className="flex w-max animate-marquee-reverse h-full items-center"
            style={{ backgroundColor: "#ff3b30" }}
          >
            {TICKER_B.map((label, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-[6px] px-[85px] text-[17px] font-medium leading-[1.3] text-white whitespace-nowrap"
              >
                <span className="relative inline-block shrink-0" style={{ width: 13.5, height: 13.5 }}>
                  <Image src={STAR} alt="" fill className="object-contain" unoptimized />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
