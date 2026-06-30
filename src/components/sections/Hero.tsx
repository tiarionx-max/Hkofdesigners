"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ── Asset URLs (Figma node 18:829) ── */
const A_LEFT  = "https://www.figma.com/api/mcp/asset/c24b09cc-66a6-4845-bf6f-259d0488352d";
const A_TRI   = "https://www.figma.com/api/mcp/asset/641c19e6-9420-461e-93e3-15129bded1b1";
const A_CIRC  = "https://www.figma.com/api/mcp/asset/a8a6d1e2-5741-460a-8aac-ba74d1cd6afd";
const A_TR    = "https://www.figma.com/api/mcp/asset/5b66dded-2237-4dd9-8282-7170faa6029d";
const F_L_SH  = "https://www.figma.com/api/mcp/asset/b7e9e78f-e40d-42ff-b4e1-3cfb6b3a5a47";
const F_L_IN  = "https://www.figma.com/api/mcp/asset/7a1af808-6041-4543-8cdc-58f9dbdb609c";
const F_T_SH  = "https://www.figma.com/api/mcp/asset/0e792bc7-fb42-42fa-8144-ea696360af81";
const F_T_BO  = "https://www.figma.com/api/mcp/asset/e49508ea-31d7-468c-b2ea-e2498c67a87b";
const F_C_O   = "https://www.figma.com/api/mcp/asset/acd6d474-3e03-4896-9468-929b2c745bbb";
const F_TR_SH = "https://www.figma.com/api/mcp/asset/4c67b564-a3d7-478a-a09b-6bb2f3ff5e03";
const F_TR_IN = "https://www.figma.com/api/mcp/asset/589b9e3c-9d2f-46f2-8a15-dab92ba96e9a";
const I_FG    = "https://www.figma.com/api/mcp/asset/25a7f6b0-398c-4ad7-ab9f-a55b7f97a21e";
const I_PS    = "https://www.figma.com/api/mcp/asset/7f25f15e-4089-43fd-83ac-d7a76a9962f5";
const I_AE    = "https://www.figma.com/api/mcp/asset/22ab8aa7-1ff0-4406-afd5-0d0101e81107";
const I_CH    = "https://www.figma.com/api/mcp/asset/01fd55a1-59dd-4902-9de9-92fb47eaf12c";
const I_CH2   = "https://www.figma.com/api/mcp/asset/a99c7df1-61d8-414a-bfe3-43d03f3724bf";
const I_MP    = "https://www.figma.com/api/mcp/asset/010fbc39-c319-4f0c-93fb-fcf0979847f4";
const D_WAVY  = "https://www.figma.com/api/mcp/asset/9af97042-dc51-4e7f-bd50-e9c75f32ab57";
const D_SPL   = "https://www.figma.com/api/mcp/asset/62137e40-2ab1-4561-9443-6dd657e295f0";
const D_SPR   = "https://www.figma.com/api/mcp/asset/b30d6d2a-b558-4e9f-9898-e6fe58927ed7";
const D_ARL   = "https://www.figma.com/api/mcp/asset/06189eea-4582-4f58-ae40-d93f879ba81c";
const D_ARR   = "https://www.figma.com/api/mcp/asset/3ce187ba-a457-47f8-9692-390d8e481d84";
const D_ARTR  = "https://www.figma.com/api/mcp/asset/a48418b4-d43c-402a-8f8b-1a446fe4568d";
const BTN_ARR = "https://www.figma.com/api/mcp/asset/de9d23f1-b021-41f5-b02d-a7493645a915";
const STAR    = "https://www.figma.com/api/mcp/asset/39719b86-1cfb-4bf9-a0ad-f8ae2060e72e";

/* ── Word cycling data ── */
const DESIGNERS = [
  { word: "Every",   color: "#ffb522", bg: "rgba(255,181,34,0.12)"  },
  { word: "Graphic", color: "#4154f9", bg: "rgba(65,84,249,0.12)"   },
  { word: "UI/UX",   color: "#af52de", bg: "rgba(175,82,222,0.12)"  },
  { word: "Motion",  color: "#ffb522", bg: "rgba(255,181,34,0.12)"  },
  { word: "3D/2D",   color: "#FF3D3D", bg: "rgba(255,59,48,0.12)"   },
];

/* ── Ticker items (doubled for seamless loop) ── */
const T_BASE_A = ["3D/2D", "UI/UX", "Wireframe", "Graphic", "Chat", "Collaborate", "Motion"];
const T_BASE_B = ["Motion", "3D/2D", "UI/UX", "Wireframe", "Graphic", "Chat", "Collaborate"];
const T_A = [...T_BASE_A, ...T_BASE_A];
const T_B = [...T_BASE_B, ...T_BASE_B];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Small floating icon component ── */
function FloatIcon({
  src, size = 28, rotate = 0, delay = 0, style
}: {
  src: string; size?: number; rotate?: number; delay?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: size, height: size, rotate, ...style }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
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
  const floatY      = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const decoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const current = DESIGNERS[idx];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f0f0f]"
      style={{ minHeight: 700 }}
      aria-label="Hero"
    >
      {/* Stripe background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 88px)",
        }}
      />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 70% at 50% 35%, transparent 0%, rgba(15,15,15,0.75) 60%, #0f0f0f 100%)",
        }}
      />

      {/* ── Floating decorative layer (desktop only) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ y: floatY, opacity: decoOpacity }}
        aria-hidden="true"
      >
        {/* Left rect avatar */}
        <motion.div
          className="absolute"
          style={{ left: "9.6%", top: "43%", width: 89, height: 113 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
        >
          <div className="relative w-full h-full">
            {/* Shadow frame */}
            <div className="absolute" style={{ left: -7, top: 31, width: 89, height: 113 }}>
              <Image src={F_L_SH} alt="" fill className="object-contain" unoptimized />
            </div>
            {/* Inner frame */}
            <div className="absolute inset-0" style={{ top: 24 }}>
              <Image src={F_L_IN} alt="" fill className="object-contain" unoptimized />
            </div>
            {/* Avatar */}
            <div className="absolute overflow-hidden rounded-[8px]" style={{ inset: 17, top: 17, bottom: 0 }}>
              <Image src={A_LEFT} alt="Community member" fill className="object-cover" unoptimized />
            </div>
          </div>
        </motion.div>

        {/* Doodle left */}
        <motion.div
          className="absolute"
          style={{ left: "8.7%", top: "39.1%", width: 39, height: 52 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
        >
          <Image src={D_SPL} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Left spiral */}
        <motion.div
          className="absolute"
          style={{ left: "16.6%", top: "60.4%", width: 87, height: 108 }}
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: EASE }}
        >
          <Image src={D_SPL} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Pen tool icon */}
        <FloatIcon src={I_FG} rotate={-144} style={{ left: "19.1%", top: "49.1%" }} delay={0.8} />

        {/* PS icon */}
        <FloatIcon src={I_PS} rotate={-13} style={{ left: "11.2%", top: "59.3%" }} delay={0.75} />

        {/* Arrow left */}
        <motion.div
          className="absolute"
          style={{ left: "23.1%", top: "73.4%", width: 11, height: 9, rotate: -3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <Image src={D_ARL} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Triangle avatar */}
        <motion.div
          className="absolute"
          style={{ left: "25.3%", top: "64.6%", width: 157, height: 140 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
        >
          <div className="relative w-full h-full">
            {/* Gold border frame */}
            <div className="absolute inset-0" style={{ rotate: "5.71deg" }}>
              <Image src={F_T_BO} alt="" fill className="object-contain" unoptimized />
            </div>
            {/* Shadow */}
            <div className="absolute inset-0" style={{ rotate: "5.71deg", zIndex: -1 }}>
              <Image src={F_T_SH} alt="" fill className="object-contain" unoptimized />
            </div>
            {/* Avatar clipped to triangle */}
            <div
              className="absolute overflow-hidden"
              style={{
                inset: "12px",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            >
              <Image src={A_TRI} alt="Community member" fill className="object-cover" unoptimized />
            </div>
          </div>
        </motion.div>

        {/* Wavy line */}
        <motion.div
          className="absolute"
          style={{ left: "38.2%", top: "72.1%", width: 375, height: 69 }}
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
        >
          <Image src={D_WAVY} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* AE icon */}
        <FloatIcon src={I_AE} rotate={-13} style={{ left: "66.6%", top: "68.4%" }} delay={0.78} />

        {/* Arrow right */}
        <motion.div
          className="absolute"
          style={{ left: "67.3%", top: "79.1%", width: 13, height: 14, rotate: -57 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <Image src={D_ARR} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Circle avatar */}
        <motion.div
          className="absolute"
          style={{ left: "70.6%", top: "64.9%", width: 116, height: 124 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.6, ease: EASE }}
        >
          <div className="relative w-full h-full">
            {/* Outer ring */}
            <div className="absolute inset-0">
              <Image src={F_C_O} alt="" fill className="object-contain" unoptimized />
            </div>
            {/* Avatar */}
            <div className="absolute overflow-hidden rounded-full" style={{ inset: 5, top: 23 }}>
              <Image src={A_CIRC} alt="Community member" fill className="object-cover" unoptimized />
            </div>
          </div>
        </motion.div>

        {/* Motion icon */}
        <FloatIcon src={I_MP} rotate={-13} style={{ left: "70.6%", top: "81.5%" }} delay={0.82} />

        {/* Chat icon 1 */}
        <FloatIcon src={I_CH} rotate={-13} style={{ left: "80.2%", top: "74.4%" }} delay={0.76} />

        {/* Doodle right */}
        <motion.div
          className="absolute"
          style={{ left: "89.1%", top: "32.3%", width: 39, height: 46 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
        >
          <Image src={D_SPR} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Arrow top-right */}
        <motion.div
          className="absolute"
          style={{ left: "85.7%", top: "53.9%", width: 14, height: 14, rotate: -135 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.92, duration: 0.4 }}
        >
          <Image src={D_ARTR} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Right spiral */}
        <motion.div
          className="absolute"
          style={{ left: "82.1%", top: "53.4%", width: 55, height: 137 }}
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.68, duration: 0.6, ease: EASE }}
        >
          <Image src={D_SPR} alt="" fill className="object-contain" unoptimized />
        </motion.div>

        {/* Chat icon 2 */}
        <FloatIcon src={I_CH2} rotate={-13} style={{ left: "90.6%", top: "45.3%" }} delay={0.79} />

        {/* Top-right rect avatar */}
        <motion.div
          className="absolute"
          style={{ left: "82%", top: "32.8%", width: 95, height: 119 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.6, ease: EASE }}
        >
          <div className="relative w-full h-full">
            <div className="absolute" style={{ left: 7, top: 37, width: 95, height: 119 }}>
              <Image src={F_TR_SH} alt="" fill className="object-contain" unoptimized />
            </div>
            <div className="absolute inset-0" style={{ top: 24 }}>
              <Image src={F_TR_IN} alt="" fill className="object-contain" unoptimized />
            </div>
            <div className="absolute overflow-hidden rounded-[8px]" style={{ inset: 17, top: 17, bottom: 0 }}>
              <Image src={A_TR} alt="Community member" fill className="object-cover" unoptimized />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[112px] pb-[120px] lg:pt-[152px] lg:pb-[140px] px-6">
        {/* Star badge */}
        <motion.div
          className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[rgba(255,251,232,0.12)] bg-[rgba(255,251,232,0.04)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <div className="relative w-4 h-4 shrink-0">
            <Image src={STAR} alt="" fill className="object-contain" unoptimized />
          </div>
          <span className="text-[12px] text-[rgba(255,251,232,0.65)] font-medium tracking-wide uppercase">
            Creative Community
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(36px,6.5vw,68px)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#fffbe8] max-w-[680px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
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
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.38, ease: EASE }}
              >
                {current.word}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          Designer.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="mt-5 text-[16px] md:text-[18px] leading-relaxed text-[rgba(255,251,232,0.6)] max-w-[460px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
        >
          Join a vibrant community of Graphic, UI/UX, Motion, and 3D/2D designers,
          where creativity meets collaboration.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.48 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-0 rounded-full shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/40"
            whileHover={{ scale: 1.03, boxShadow: "2px 2px 0px 0px #000" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE }}
          >
            <span className="flex items-center justify-center h-[46px] px-6 bg-[#fffbe8] text-[#0f0f0f] text-[14.5px] font-medium rounded-l-full border border-black/10">
              Join Community
            </span>
            <span className="flex items-center justify-center h-[46px] w-[46px] bg-[#fffbe8] rounded-r-full border border-black/10 border-l-0 text-[#0f0f0f]">
              <div className="relative w-4 h-4">
                <Image src={BTN_ARR} alt="" fill className="object-contain" unoptimized />
              </div>
            </span>
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          <div className="flex -space-x-2">
            {[A_LEFT, A_CIRC, A_TR].map((src, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-full border-2 border-[#0f0f0f] overflow-hidden bg-[#181818]"
              >
                <Image src={src} alt="Member" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[rgba(255,251,232,0.5)]">
            Join <span className="text-[#fffbe8] font-medium">1,000+</span> designers
          </p>
        </motion.div>
      </div>

      {/* ── Ticker bands at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[72px] overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Blue band — forward */}
        <div
          className="absolute w-[110%] -left-[5%]"
          style={{
            top: 10,
            transform: "rotate(-1.5deg)",
            background: "#1a2fff",
            padding: "6px 0",
          }}
        >
          <div className="flex w-max animate-marquee">
            {T_A.map((label, i) => (
              <span
                key={i}
                className="mx-4 text-[12px] font-medium tracking-widest uppercase text-white/90 whitespace-nowrap"
              >
                {label}
                <span className="mx-3 opacity-40">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Red band — reverse */}
        <div
          className="absolute w-[110%] -left-[5%]"
          style={{
            top: 38,
            transform: "rotate(1.5deg)",
            background: "#FF3D3D",
            padding: "6px 0",
          }}
        >
          <div className="flex w-max animate-marquee-reverse">
            {T_B.map((label, i) => (
              <span
                key={i}
                className="mx-4 text-[12px] font-medium tracking-widest uppercase text-white/90 whitespace-nowrap"
              >
                {label}
                <span className="mx-3 opacity-40">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
