"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ── Assets ────────────────────────────────────────────────────────────────────
const IMG = {
  bgGrid:       "https://www.figma.com/api/mcp/asset/cb58bcd9-856a-4fc3-a1a5-1d0c3cb5034a",
  // Red card — Component32
  redPupil:     "https://www.figma.com/api/mcp/asset/3c91f239-9bbb-4b3d-8958-f82d46918fa8",
  // Purple card — Component29 body + shared eye frames
  purpleChar:   "https://www.figma.com/api/mcp/asset/590dc366-c265-4ac5-99ff-896f7a8d67cd",
  purplePupil1: "https://www.figma.com/api/mcp/asset/4999f606-c671-4c9b-b66f-9efa05bfb882",
  purplePupil2: "https://www.figma.com/api/mcp/asset/b1315d0a-ddf6-49fa-8900-88f9c806947e",
  // Blue card — Component30
  blueBody:     "https://www.figma.com/api/mcp/asset/b4de1cea-1e7d-4915-84f2-0900e6beab71",
  blueBodyHover:"https://www.figma.com/api/mcp/asset/7a5249b7-eab1-43c0-9390-70c52cdcc3a4",
  blueStar:     "https://www.figma.com/api/mcp/asset/d18efc8c-eecd-4103-8abf-fde16af561c5",
  blueStarHover:"https://www.figma.com/api/mcp/asset/bf798548-cda9-4537-a3eb-f56752a14453",
  blueMouth:    "https://www.figma.com/api/mcp/asset/5e790541-930d-4f62-a53e-7215b45713a9",
  bluePupil:    "https://www.figma.com/api/mcp/asset/783af96b-b0f7-46a2-969e-3b940a706d91",
  // Shared eye composites (Cards 2 & 3)
  eyeDefault1:  "https://www.figma.com/api/mcp/asset/5f2e6b8f-c290-4a70-986a-0550236f7303",
  eyeDefault2:  "https://www.figma.com/api/mcp/asset/dc7f87bf-b082-4a4c-9ae2-8f040e26da87",
  eyeHover1:    "https://www.figma.com/api/mcp/asset/dfd69ea6-8f69-45a1-8e20-953f9454216f",
  eyeHover2:    "https://www.figma.com/api/mcp/asset/5de3730f-bbb3-4240-ab3e-ecb89e8b41a8",
  // Yellow card — Component31
  yellowStar:   "https://www.figma.com/api/mcp/asset/af1578f8-9c8a-4b39-9606-023d527509ed",
  yellowStarH:  "https://www.figma.com/api/mcp/asset/7dd7f360-525a-4ad6-9748-62d5f5c72e8e",
  yellowEye1:   "https://www.figma.com/api/mcp/asset/ec96bb8a-64d9-4be6-9c8a-0c1f52ffaea8",
  yellowEye2:   "https://www.figma.com/api/mcp/asset/9918581d-e34d-4218-b157-14b4af20e459",
  yellowEye1H:  "https://www.figma.com/api/mcp/asset/ffe3c0c4-8aff-45ee-ab9b-8cb1978885e5",
  yellowEye2H:  "https://www.figma.com/api/mcp/asset/17a9a8ea-d9d4-45b0-beed-358c961a32ec",
};

// ── Spring config ─────────────────────────────────────────────────────────────
const SPR = { stiffness: 260, damping: 28, mass: 0.35 } as const;

// ── Eye-spring hook — motion values bypass React re-renders entirely ───────────
// eyeA/B: [cx, cy] as fractions of card width/height
function usePupilSprings(
  eyeA: [number, number],
  eyeB: [number, number],
  maxPx: number,
) {
  const cardRef = useRef<HTMLDivElement>(null);

  const ax = useMotionValue(0), ay = useMotionValue(0);
  const bx = useMotionValue(0), by = useMotionValue(0);
  const sax = useSpring(ax, SPR), say = useSpring(ay, SPR);
  const sbx = useSpring(bx, SPR), sby = useSpring(by, SPR);

  const push = (
    mx: number, my: number, w: number, h: number,
    [cx, cy]: [number, number],
    xMV: typeof ax, yMV: typeof ay,
  ) => {
    const dx = mx - cx * w;
    const dy = my - cy * h;
    const d = Math.hypot(dx, dy);
    const s = d > 0 ? Math.min(maxPx, d) / d : 0;
    xMV.set(dx * s);
    yMV.set(dy * s);
  };

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    push(mx, my, rect.width, rect.height, eyeA, ax, ay);
    push(mx, my, rect.width, rect.height, eyeB, bx, by);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseLeave = useCallback(() => {
    ax.set(0); ay.set(0); bx.set(0); by.set(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cardRef, onMouseMove, onMouseLeave,
    a: { x: sax, y: say },
    b: { x: sbx, y: sby },
  };
}

// ── Shared card glow ──────────────────────────────────────────────────────────
function glowShadow(rgb: string) {
  return `0 0 0 1px rgba(${rgb},0.45), 0 0 28px rgba(${rgb},0.13)`;
}
const NO_GLOW = "0 0 0 1px rgba(255,255,255,0), 0 0 0 rgba(255,255,255,0)";

// ── Stagger variants ──────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const rowV  = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const cardV = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Card shell ────────────────────────────────────────────────────────────────
function CardShell({
  glow, children, innerRef, onMouseMove, onMouseLeave, onHoverChange,
}: {
  glow: string;
  children: React.ReactNode;
  innerRef: React.RefObject<HTMLDivElement | null>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  onHoverChange?: (h: boolean) => void;
}) {
  return (
    <motion.div
      ref={innerRef}
      variants={cardV}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { onMouseLeave(); onHoverChange?.(false); }}
      onMouseEnter={() => onHoverChange?.(true)}
      whileHover={{ boxShadow: glow }}
      initial={{ boxShadow: NO_GLOW }}
      transition={{ boxShadow: { duration: 0.3, ease: "easeOut" } }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      {children}
    </motion.div>
  );
}

// ── Card 1 — Red · WhatsApp & Telegram ───────────────────────────────────────
// Character 283.47 × 273.05 at left:372.49 top:24.07 in 656×254 card
// Right socket inset[32.84% 15.1%  29.45% 48.57%] → eye centre frac (0.856, 0.651)
// Left  socket inset[33.05% 51.43% 29.24% 12.25%] → eye centre frac (0.699, 0.651)
// Pupil 48.97px in 103px socket → max travel 26px (Figma shows ~26px at card scale)
function Card1() {
  const { cardRef, onMouseMove, onMouseLeave, a, b } = usePupilSprings(
    [0.856, 0.651], [0.699, 0.651], 26,
  );

  return (
    <CardShell
      glow={glowShadow("255,59,48")}
      innerRef={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Text */}
      <div className="absolute flex flex-col items-start"
        style={{ left: 37.25, top: "50%", transform: "translateY(-50%)", width: 281.9, gap: 31.32 }}>
        <p className="font-medium text-[#fffbe8] leading-[1.1]" style={{ fontSize: 27.09, wordBreak: "break-word" }}>
          A growing community on WhatsApp &amp; Telegram
        </p>
        <div className="flex items-center justify-center rounded-[86px]"
          style={{ background: "rgba(255,59,48,0.1)", height: 38.095, padding: "10.32px 20.64px" }}>
          <span className="font-medium text-[#ff3b30] whitespace-nowrap" style={{ fontSize: 15.238 }}>
            Join Our Community
          </span>
        </div>
      </div>

      {/* Character */}
      <div className="absolute" style={{ left: 372.49, top: 24.07, width: 283.47, height: 273.05 }}>
        <div className="absolute inset-0" style={{ background: "#ff3b30", borderRadius: "108.81px 108.81px 0 0" }} />

        {/* Right socket — inset[32.84% 15.1% 29.45% 48.57%] */}
        <div className="absolute overflow-hidden rounded-[128.54px] bg-[#fffbe8] animate-eyeblink"
          style={{ top: "32.84%", right: "15.1%", bottom: "29.45%", left: "48.57%" }}>
          <motion.div
            style={{ position: "absolute", left: -9.79, top: "50%", width: 48.97, height: 48.97, x: a.x, y: a.y }}
            className="-translate-y-1/2"
          >
            <img alt="" aria-hidden src={IMG.redPupil} style={{ width: "100%", height: "100%" }} />
          </motion.div>
        </div>

        {/* Left socket — inset[33.05% 51.43% 29.24% 12.25%] */}
        <div className="absolute overflow-hidden rounded-[128.54px] bg-[#fffbe8] animate-eyeblink"
          style={{ top: "33.05%", right: "51.43%", bottom: "29.24%", left: "12.25%", animationDelay: "0.18s" }}>
          <motion.div
            style={{ position: "absolute", left: -9.79, top: "50%", width: 48.97, height: 48.97, x: b.x, y: b.y }}
            className="-translate-y-1/2"
          >
            <img alt="" aria-hidden src={IMG.redPupil} style={{ width: "100%", height: "100%" }} />
          </motion.div>
        </div>
      </div>
    </CardShell>
  );
}

// ── Card 2 — Purple · Resources & playlists ───────────────────────────────────
// Character 376.37 × 189.13 at left:214.18 top:65.56 in 427×254 card
// Pupil1 inset[44.07% 77.77% 37.23% 12.84%] → socket centre frac (0.660, 0.671)
// Pupil2 inset[18.03% 66.02% 63.27% 24.58%] → socket centre frac (0.753, 0.507)
// Sockets ~35px; max travel 11px gives visible arc within tiny socket
function Card2() {
  const [hov, setHov] = useState(false);
  const { cardRef, onMouseMove, onMouseLeave, a, b } = usePupilSprings(
    [0.660, 0.671], [0.753, 0.507], 11,
  );

  return (
    <CardShell
      glow={glowShadow("175,82,222")}
      innerRef={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverChange={setHov}
    >
      <p className="absolute font-medium text-[#fffbe8] leading-[1.2]"
        style={{ fontSize: 27.09, left: 38.94, top: 49.10, width: 210.79, wordBreak: "break-word" }}>
        Curated design resources &amp; playlists
      </p>
      <div className="absolute flex items-center justify-center rounded-[86px]"
        style={{ background: "rgba(175,82,222,0.1)", height: 38.095, left: 38.94, top: 182.01, padding: "10.32px 20.64px" }}>
        <span className="font-medium text-[#af52de] whitespace-nowrap" style={{ fontSize: 15.238 }}>Explore Now</span>
      </div>

      {/* Character */}
      <div className="absolute" style={{ left: 214.18, top: 65.56, width: 376.37, height: 189.13 }}>
        <div className="absolute" style={{ inset: "-15.05% -8.51% -13.79% -7.63%" }}>
          <img alt="Purple character" src={IMG.purpleChar} className="block w-full h-full object-contain" />
        </div>

        {/* Pupil 1 — inset[44.07% 77.77% 37.23% 12.84%] */}
        <div className="absolute overflow-hidden animate-eyeblink"
          style={{ top: "44.07%", right: "77.77%", bottom: "37.23%", left: "12.84%" }}>
          <motion.div style={{ position: "absolute", inset: "-41.07%", x: a.x, y: a.y }}>
            <img alt="" aria-hidden src={hov ? IMG.eyeHover1 : IMG.purplePupil1} className="block w-full h-full"
              style={{ transition: "opacity 0.25s" }} />
          </motion.div>
        </div>

        {/* Pupil 2 — inset[18.03% 66.02% 63.27% 24.58%] */}
        <div className="absolute overflow-hidden animate-eyeblink"
          style={{ top: "18.03%", right: "66.02%", bottom: "63.27%", left: "24.58%", animationDelay: "0.18s" }}>
          <motion.div style={{ position: "absolute", inset: "-41.07%", x: b.x, y: b.y }}>
            <img alt="" aria-hidden src={hov ? IMG.eyeHover2 : IMG.purplePupil2} className="block w-full h-full"
              style={{ transition: "opacity 0.25s" }} />
          </motion.div>
        </div>
      </div>
    </CardShell>
  );
}

// ── Card 3 — Blue · Weekly X Spaces ──────────────────────────────────────────
// Character 254.01 × 224.04 at left:198.10 top:50.32 in 427×254 card
// Left  pupil inset[53.63% 31.01% 37.96% 61.57%] → frac (0.851, 0.706)
// Right pupil inset[53.63% 51.01% 37.96% 41.57%] → frac (0.731, 0.706)
// Sockets ~19px; max travel 9px
function Card3() {
  const [hov, setHov] = useState(false);
  const { cardRef, onMouseMove, onMouseLeave, a, b } = usePupilSprings(
    [0.851, 0.706], [0.731, 0.706], 9,
  );

  return (
    <CardShell
      glow={glowShadow("65,84,249")}
      innerRef={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverChange={setHov}
    >
      <p className="absolute font-medium text-[#fffbe8] leading-[1.2]"
        style={{ fontSize: 27.09, left: 37.25, top: 37.25, width: 225.19, wordBreak: "break-word" }}>
        Weekly X Spaces for creative discussions
      </p>
      <div className="absolute flex items-center justify-center rounded-[86px]"
        style={{ background: "rgba(65,84,249,0.1)", height: 38.095, left: 37.25, top: 189.63, padding: "10.32px 20.64px" }}>
        <span className="font-medium text-[#4154f9] whitespace-nowrap" style={{ fontSize: 15.238 }}>Follow Us on X</span>
      </div>

      {/* Character — body swaps on hover */}
      <div className="absolute" style={{ left: 198.10, top: 50.32, width: 254.01, height: 224.04 }}>
        <div className="absolute" style={{ top: 0, right: "11.01%", bottom: 0, left: 0 }}>
          <div style={{ position: "absolute", top: "0.4%", left: "0.46%", right: 0, bottom: 0 }}>
            <motion.img
              alt="Blue character"
              src={IMG.blueBody}
              className="block w-full h-full object-contain"
              animate={{ opacity: hov ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            />
            <motion.img
              alt=""
              aria-hidden
              src={IMG.blueBodyHover}
              className="absolute inset-0 block w-full h-full object-contain"
              animate={{ opacity: hov ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>

        {/* Star — swaps colour on hover */}
        <div className="absolute" style={{ top: "28.66%", right: 0, bottom: "46.37%", left: "77.98%" }}>
          <div style={{ position: "absolute", inset: "8.92%" }}>
            <motion.img alt="" aria-hidden src={IMG.blueStar} animate={{ opacity: hov ? 0 : 1 }} transition={{ duration: 0.25 }} className="absolute inset-0 block w-full h-full" />
            <motion.img alt="" aria-hidden src={IMG.blueStarHover} animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 block w-full h-full" />
          </div>
        </div>

        {/* Left pupil — inset[53.63% 31.01% 37.96% 61.57%] */}
        <div className="absolute overflow-hidden animate-eyeblink"
          style={{ top: "53.63%", right: "31.01%", bottom: "37.96%", left: "61.57%" }}>
          <motion.div style={{ position: "absolute", inset: "-69.7%", x: a.x, y: a.y }}>
            <img alt="" aria-hidden src={IMG.bluePupil} className="block w-full h-full" />
          </motion.div>
        </div>

        {/* Right pupil — inset[53.63% 51.01% 37.96% 41.57%] */}
        <div className="absolute overflow-hidden animate-eyeblink"
          style={{ top: "53.63%", right: "51.01%", bottom: "37.96%", left: "41.57%", animationDelay: "0.18s" }}>
          <motion.div style={{ position: "absolute", inset: "-69.7%", x: b.x, y: b.y }}>
            <img alt="" aria-hidden src={IMG.bluePupil} className="block w-full h-full" />
          </motion.div>
        </div>

        {/* Mouth */}
        <div className="absolute" style={{ top: "73.5%", right: "26.41%", bottom: "22%", left: "37.19%" }}>
          <div style={{ position: "absolute", inset: "-27.59% -3.01% -27.58% -3.01%" }}>
            <img alt="" aria-hidden src={IMG.blueMouth} className="block w-full h-full" />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// ── Card 4 — Yellow · Project highlights ─────────────────────────────────────
// Character 311.924×311.924 at bottom:-91.09 right:-43.31 in 656×254 card
// char top in card: 254-311.924+91.09=33.17  char left: 656-311.924+43.31=387.39
// Eyes at top:122.39 in char, each 57.795px side by side centred at char.x/2
// Eye1 centre in card: (514.45, 184.46) → frac (0.784, 0.726)
// Eye2 centre in card: (572.25, 184.46) → frac (0.872, 0.726)
function Card4() {
  const [hov, setHov] = useState(false);
  const { cardRef, onMouseMove, onMouseLeave, a, b } = usePupilSprings(
    [0.784, 0.726], [0.872, 0.726], 14,
  );

  // Eye sizes: default 57.795px → hover 68.271px (from Component31 Frame2147228691 vs 692)
  const eyeSize = hov ? 68.271 : 57.795;

  return (
    <CardShell
      glow={glowShadow("255,181,34")}
      innerRef={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverChange={setHov}
    >
      {/* Text */}
      <div className="absolute flex flex-col items-start text-[#fffbe8]"
        style={{ left: 64.34, top: "50%", transform: "translateY(-60%)", width: 284.44, gap: 13.545 }}>
        <p className="font-medium leading-[1.1]" style={{ fontSize: 27.09, width: 231.11 }}>Project highlights</p>
        <p className="opacity-70 leading-[1.3]" style={{ fontSize: 15.238, wordBreak: "break-word" }}>
          Tag <span className="font-medium text-[#ffb522]">@hkofdesigners</span>{" "}
          on X, IG, or TikTok When you post online to stand a chance to be featured on our website or just use the get featured button
        </p>
      </div>

      {/* Get featured button */}
      <div className="absolute flex items-center justify-center rounded-[86px]"
        style={{ background: "rgba(255,181,34,0.1)", height: 38.095, left: 64.40, top: 196.56, padding: "10.32px 20.64px" }}>
        <span className="font-medium text-[#ffb522] whitespace-nowrap" style={{ fontSize: 15.238 }}>Get featured</span>
      </div>

      {/* Yellow star character */}
      <div className="absolute" style={{ bottom: -91.09, right: -43.31, width: 311.924, height: 311.924 }}>
        {/* Star — swaps + rotates on hover */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <motion.div
            animate={{ rotate: hov ? 15 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: "4.64%" }}
          >
            <motion.img alt="" aria-hidden src={IMG.yellowStar} animate={{ opacity: hov ? 0 : 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 block w-full h-full" />
            <motion.img alt="" aria-hidden src={IMG.yellowStarH} animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 block w-full h-full" />
          </motion.div>
        </div>

        {/* Eyes — grow on hover, spring-tracked */}
        <div className="absolute flex items-center"
          style={{ left: "50%", top: 122.39, transform: "translateX(-50%)" }}>
          {/* Eye 1 */}
          <motion.div
            className="relative overflow-hidden animate-eyeblink flex-none"
            animate={{ width: eyeSize, height: eyeSize }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ position: "absolute", inset: 0, x: a.x, y: a.y }}>
              <motion.img alt="" aria-hidden src={IMG.yellowEye1} animate={{ opacity: hov ? 0 : 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 w-full h-full" />
              <motion.img alt="" aria-hidden src={IMG.yellowEye1H} animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 w-full h-full" />
            </motion.div>
          </motion.div>
          {/* Eye 2 */}
          <motion.div
            className="relative overflow-hidden animate-eyeblink flex-none"
            animate={{ width: eyeSize, height: eyeSize }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "0.18s" }}
          >
            <motion.div style={{ position: "absolute", inset: 0, x: b.x, y: b.y }}>
              <motion.img alt="" aria-hidden src={IMG.yellowEye2} animate={{ opacity: hov ? 0 : 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 w-full h-full" />
              <motion.img alt="" aria-hidden src={IMG.yellowEye2H} animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 w-full h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </CardShell>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section className="bg-[#101010] relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[900px] pointer-events-none" aria-hidden>
        <img src={IMG.bgGrid} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      </div>

      <div className="container-hk relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.52, ease: EASE }}
          className="flex flex-col items-center text-center mb-10"
          style={{ maxWidth: 378.41, marginInline: "auto", gap: 10.16 }}
        >
          <p className="font-semibold text-[#fffbe8] leading-[1.1] w-full"
            style={{ fontSize: "clamp(26px, 3.17vw, 40.635px)" }}>
            Built by Designers, for Designers.
          </p>
          <p className="font-normal leading-[1.3] w-full"
            style={{ fontSize: 15.238, color: "rgba(255,255,255,0.7)" }}>
            At HK of Design, we offer a space where designers collaborate, learn, and inspire one another
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="flex flex-col gap-4">
          <motion.div className="flex flex-col lg:flex-row gap-4"
            variants={rowV} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <div style={{ flex: "656 1 0", minWidth: 0 }}><Card1 /></div>
            <div style={{ flex: "427 1 0", minWidth: 0 }}><Card2 /></div>
          </motion.div>
          <motion.div className="flex flex-col lg:flex-row gap-4"
            variants={rowV} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <div style={{ flex: "427 1 0", minWidth: 0 }}><Card3 /></div>
            <div style={{ flex: "656 1 0", minWidth: 0 }}><Card4 /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
