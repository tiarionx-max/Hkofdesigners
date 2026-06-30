"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ── Asset URLs ────────────────────────────────────────────────────────────────
const IMG = {
  bgGrid:       "https://www.figma.com/api/mcp/asset/cb58bcd9-856a-4fc3-a1a5-1d0c3cb5034a",
  redPupil:     "https://www.figma.com/api/mcp/asset/ee88e4e4-7985-42c4-b1df-209ebb9a4824",
  purpleChar:   "https://www.figma.com/api/mcp/asset/70e370a9-c0b3-4eba-a2c8-d9dd4f5924d5",
  purplePupil1: "https://www.figma.com/api/mcp/asset/4999f606-c671-4c9b-b66f-9efa05bfb882",
  purplePupil2: "https://www.figma.com/api/mcp/asset/b1315d0a-ddf6-49fa-8900-88f9c806947e",
  blueBody:     "https://www.figma.com/api/mcp/asset/db0dc076-c08d-44bc-80d7-2c28d5c840d5",
  bluePupil:    "https://www.figma.com/api/mcp/asset/783af96b-b0f7-46a2-969e-3b940a706d91",
  blueStar:     "https://www.figma.com/api/mcp/asset/4d8561b5-8591-46fe-b2eb-ec6a16b42cf0",
  blueMouth:    "https://www.figma.com/api/mcp/asset/d40b526b-b6af-497d-bdad-56c402842225",
  yellowStar:   "https://www.figma.com/api/mcp/asset/f8d219b7-13b7-46e8-aecb-cc3dff6340e8",
  yellowEye1:   "https://www.figma.com/api/mcp/asset/870eb864-97a2-4592-9bc0-274a7e160cb3",
  yellowEye2:   "https://www.figma.com/api/mcp/asset/33024fe4-7423-455a-bea3-7119178e8060",
};

// ── Per-card accent colours ───────────────────────────────────────────────────
const ACCENT = {
  red:    "rgba(255,59,48,",
  purple: "rgba(175,82,222,",
  blue:   "rgba(65,84,249,",
  yellow: "rgba(255,181,34,",
} as const;

function glowShadow(color: string) {
  return `0 0 0 1px ${color}0.45), 0 0 28px ${color}0.13)`;
}
const REST_SHADOW = "0 0 0 1px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0)";

// ── Eye-tracking hook ─────────────────────────────────────────────────────────
// eyeCenters: fractions [cx, cy] of card dimensions
function useEyeTrack(eyeCenters: [number, number][], maxPx = 10) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<[number, number][]>(
    () => eyeCenters.map(() => [0, 0])
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setOffsets(
        eyeCenters.map(([cx, cy]) => {
          const dx = mx - cx * rect.width;
          const dy = my - cy * rect.height;
          const dist = Math.hypot(dx, dy);
          const scale = dist > 0 ? Math.min(maxPx, dist) / dist : 0;
          return [dx * scale, dy * scale];
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxPx]
  );

  const onMouseLeave = useCallback(() => {
    setOffsets(eyeCenters.map(() => [0, 0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cardRef, offsets, onMouseMove, onMouseLeave };
}

// ── Stagger variants ──────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ── Pupil mover — centred in socket, translates toward cursor, blinks scaleY ──
function Pupil({
  src,
  offset,
  size,
  blinkDelay = "0s",
}: {
  src: string;
  offset: [number, number];
  size: number;
  blinkDelay?: string;
}) {
  return (
    <div
      className="animate-eyeblink"
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${offset[0]}px), calc(-50% + ${offset[1]}px))`,
        transition: "transform 0.07s ease-out",
        animationDelay: blinkDelay,
      }}
    >
      <img alt="" aria-hidden src={src} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

// ── Card 1 — Red · WhatsApp & Telegram ───────────────────────────────────────
// Card 656 × 254 px  |  character at left:372.49, top:24.07, w:283.47, h:273.05
// Left socket  inset[33.05% 51.43% 29.24% 12.25%] → card frac (0.699, 0.650)
// Right socket inset[32.84% 15.1%  29.45% 48.57%] → card frac (0.855, 0.650)
function Card1() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.699, 0.650], [0.855, 0.650]],
    11
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ boxShadow: glowShadow(ACCENT.red) }}
      initial={{ boxShadow: REST_SHADOW }}
      transition={{ boxShadow: { duration: 0.3, ease: "easeOut" } }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100" />

      {/* Text */}
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 37.25, top: "50%", transform: "translateY(-50%)", width: 281.9, gap: 31.32 }}
      >
        <p className="font-medium text-[#fffbe8] leading-[1.1]" style={{ fontSize: 27.09, wordBreak: "break-word" }}>
          A growing community on WhatsApp &amp; Telegram
        </p>
        <div
          className="flex items-center justify-center rounded-[86px]"
          style={{ background: "rgba(255,59,48,0.1)", height: 38.095, padding: "10.32px 20.64px" }}
        >
          <span className="font-medium text-[#ff3b30] whitespace-nowrap" style={{ fontSize: 15.238 }}>
            Join Our Community
          </span>
        </div>
      </div>

      {/* Character */}
      <div className="absolute" style={{ left: 372.49, top: 24.07, width: 283.47, height: 273.05 }}>
        <div className="absolute inset-0" style={{ background: "#ff3b30", borderRadius: "108.81px 108.81px 0 0" }} />
        {/* Left socket */}
        <div className="absolute overflow-hidden rounded-[128.54px] bg-[#fffbe8]"
          style={{ top: "33.05%", right: "51.43%", bottom: "29.24%", left: "12.25%" }}>
          <Pupil src={IMG.redPupil} offset={offsets[0] ?? [0, 0]} size={48.966} />
        </div>
        {/* Right socket */}
        <div className="absolute overflow-hidden rounded-[128.54px] bg-[#fffbe8]"
          style={{ top: "32.84%", right: "15.1%", bottom: "29.45%", left: "48.57%" }}>
          <Pupil src={IMG.redPupil} offset={offsets[1] ?? [0, 0]} size={48.966} blinkDelay="0.15s" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Card 2 — Purple · Resources & playlists ───────────────────────────────────
// Card 427 × 254  |  character at left:214.18, top:65.56, w:376.37, h:189.13
// Pupil 1 inset[44.07% 77.77% 37.23% 12.84%] → card frac (0.655, 0.654)
// Pupil 2 inset[18.03% 66.02% 63.27% 24.58%] → card frac (0.759, 0.461)
function Card2() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.655, 0.654], [0.759, 0.461]],
    9
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ boxShadow: glowShadow(ACCENT.purple) }}
      initial={{ boxShadow: REST_SHADOW }}
      transition={{ boxShadow: { duration: 0.3, ease: "easeOut" } }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

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
        {/* Pupil 1 */}
        <div className="absolute overflow-hidden"
          style={{ top: "44.07%", right: "77.77%", bottom: "37.23%", left: "12.84%" }}>
          <div className="absolute animate-eyeblink"
            style={{ inset: "-41.07%", transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`, transition: "transform 0.07s ease-out" }}>
            <img alt="" aria-hidden src={IMG.purplePupil1} className="block w-full h-full" />
          </div>
        </div>
        {/* Pupil 2 */}
        <div className="absolute overflow-hidden"
          style={{ top: "18.03%", right: "66.02%", bottom: "63.27%", left: "24.58%" }}>
          <div className="absolute animate-eyeblink"
            style={{ inset: "-41.07%", animationDelay: "0.15s", transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`, transition: "transform 0.07s ease-out" }}>
            <img alt="" aria-hidden src={IMG.purplePupil2} className="block w-full h-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Card 3 — Blue · Weekly X Spaces ──────────────────────────────────────────
// Card 427 × 254  |  character at left:198.10, top:50.32, w:254.01, h:224.04
// Left  pupil inset[53.63% 31.01% 37.96% 61.57%] → card frac (0.851, 0.706)
// Right pupil inset[53.63% 51.01% 37.96% 41.57%] → card frac (0.731, 0.706)
function Card3() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.851, 0.706], [0.731, 0.706]],
    9
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ boxShadow: glowShadow(ACCENT.blue) }}
      initial={{ boxShadow: REST_SHADOW }}
      transition={{ boxShadow: { duration: 0.3, ease: "easeOut" } }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      <p className="absolute font-medium text-[#fffbe8] leading-[1.2]"
        style={{ fontSize: 27.09, left: 37.25, top: 37.25, width: 225.19, wordBreak: "break-word" }}>
        Weekly X Spaces for creative discussions
      </p>
      <div className="absolute flex items-center justify-center rounded-[86px]"
        style={{ background: "rgba(65,84,249,0.1)", height: 38.095, left: 37.25, top: 189.63, padding: "10.32px 20.64px" }}>
        <span className="font-medium text-[#4154f9] whitespace-nowrap" style={{ fontSize: 15.238 }}>Follow Us on X</span>
      </div>

      {/* Character */}
      <div className="absolute" style={{ left: 198.10, top: 50.32, width: 254.01, height: 224.04 }}>
        {/* Body */}
        <div className="absolute" style={{ top: 0, right: "11.01%", bottom: 0, left: 0 }}>
          <div style={{ position: "absolute", top: "0.4%", left: "0.46%", right: 0, bottom: 0 }}>
            <img alt="Blue character" src={IMG.blueBody} className="block w-full h-full object-contain" />
          </div>
        </div>
        {/* Left pupil */}
        <div className="absolute overflow-hidden"
          style={{ top: "53.63%", right: "31.01%", bottom: "37.96%", left: "61.57%" }}>
          <div className="absolute animate-eyeblink"
            style={{ inset: "-69.7%", transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`, transition: "transform 0.07s ease-out" }}>
            <img alt="" aria-hidden src={IMG.bluePupil} className="block w-full h-full" />
          </div>
        </div>
        {/* Star */}
        <div className="absolute" style={{ top: "28.66%", right: 0, bottom: "46.37%", left: "77.98%" }}>
          <div style={{ position: "absolute", inset: "8.92%" }}>
            <img alt="" aria-hidden src={IMG.blueStar} className="block w-full h-full" />
          </div>
        </div>
        {/* Right pupil */}
        <div className="absolute overflow-hidden"
          style={{ top: "53.63%", right: "51.01%", bottom: "37.96%", left: "41.57%" }}>
          <div className="absolute animate-eyeblink"
            style={{ inset: "-69.7%", animationDelay: "0.15s", transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`, transition: "transform 0.07s ease-out" }}>
            <img alt="" aria-hidden src={IMG.bluePupil} className="block w-full h-full" />
          </div>
        </div>
        {/* Mouth */}
        <div className="absolute" style={{ top: "73.5%", right: "26.41%", bottom: "22%", left: "37.19%" }}>
          <div style={{ position: "absolute", inset: "-27.59% -3.01% -27.58% -3.01%" }}>
            <img alt="" aria-hidden src={IMG.blueMouth} className="block w-full h-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Card 4 — Yellow · Project highlights ─────────────────────────────────────
// Card 656 × 254  |  character at bottom:-91.09, right:-43.31, size:311.924
// char top in card: 254 - 311.924 + 91.09 = 33.17  |  char left: 656 - 311.924 + 43.31 = 387.39
// Eyes flex row at char top:122.39, each 57.795px, centered at char.x/2
// Eye 1 center in card: (387.39 + 127.07, 33.17 + 151.29) = (514.46, 184.46) → (0.784, 0.726)
// Eye 2 center in card: (387.39 + 184.86, 33.17 + 151.29) = (572.25, 184.46) → (0.872, 0.726)
function Card4() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.784, 0.726], [0.872, 0.726]],
    10
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ boxShadow: glowShadow(ACCENT.yellow) }}
      initial={{ boxShadow: REST_SHADOW }}
      transition={{ boxShadow: { duration: 0.3, ease: "easeOut" } }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Text block */}
      <div
        className="absolute flex flex-col items-start text-[#fffbe8]"
        style={{ left: 64.34, top: "50%", transform: "translateY(-60%)", width: 284.44, gap: 13.545 }}
      >
        <p className="font-medium leading-[1.1]" style={{ fontSize: 27.09, width: 231.11 }}>
          Project highlights
        </p>
        <p className="opacity-70 leading-[1.3]" style={{ fontSize: 15.238, wordBreak: "break-word" }}>
          Tag{" "}
          <span className="font-medium text-[#ffb522]">@hkofdesigners</span>
          {" "}on X, IG, or TikTok When you post online to stand a chance to be featured on our website or just use the get featured button
        </p>
      </div>

      {/* "Get featured" button — Figma: left:64.40, top:196.56 */}
      <div
        className="absolute flex items-center justify-center rounded-[86px]"
        style={{ background: "rgba(255,181,34,0.1)", height: 38.095, left: 64.40, top: 196.56, padding: "10.32px 20.64px" }}
      >
        <span className="font-medium text-[#ffb522] whitespace-nowrap" style={{ fontSize: 15.238 }}>
          Get featured
        </span>
      </div>

      {/* Yellow star character */}
      <div className="absolute" style={{ bottom: -91.09, right: -43.31, width: 311.924, height: 311.924 }}>
        <div style={{ position: "absolute", inset: "4.64%" }}>
          <img alt="Yellow star character" src={IMG.yellowStar} className="block w-full h-full" />
        </div>
        {/* Eyes side by side */}
        <div className="absolute flex items-center"
          style={{ left: "50%", top: 122.39, transform: "translateX(-50%)" }}>
          <div className="relative overflow-hidden animate-eyeblink" style={{ width: 57.795, height: 57.795 }}>
            <div style={{ position: "absolute", inset: 0, transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`, transition: "transform 0.07s ease-out" }}>
              <img alt="" aria-hidden src={IMG.yellowEye1} className="absolute inset-0 w-full h-full" />
            </div>
          </div>
          <div className="relative overflow-hidden animate-eyeblink" style={{ width: 57.795, height: 57.795, animationDelay: "0.15s" }}>
            <div style={{ position: "absolute", inset: 0, transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`, transition: "transform 0.07s ease-out" }}>
              <img alt="" aria-hidden src={IMG.yellowEye2} className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section className="bg-[#101010] relative py-20 md:py-28 overflow-hidden">
      {/* Full-width bg grid overlay */}
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
          {/* Row 1 */}
          <motion.div
            className="flex flex-col lg:flex-row gap-4"
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div style={{ flex: "656 1 0", minWidth: 0 }}><Card1 /></div>
            <div style={{ flex: "427 1 0", minWidth: 0 }}><Card2 /></div>
          </motion.div>
          {/* Row 2 */}
          <motion.div
            className="flex flex-col lg:flex-row gap-4"
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div style={{ flex: "427 1 0", minWidth: 0 }}><Card3 /></div>
            <div style={{ flex: "656 1 0", minWidth: 0 }}><Card4 /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
