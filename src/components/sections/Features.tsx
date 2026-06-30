"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ── Asset URLs (fresh from Figma) ─────────────────────────────────────────────
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
  yellowStar:   "https://www.figma.com/api/mcp/asset/9f1cd705-64ee-4f93-b11a-237f8897283b",
  yellowEye1:   "https://www.figma.com/api/mcp/asset/d16ede58-08d9-4115-8b37-84612b9a5526",
  yellowEye2:   "https://www.figma.com/api/mcp/asset/8833308b-57ca-43d5-acb7-87b65ee706f8",
};

// ── Eye tracking ──────────────────────────────────────────────────────────────
// eyeCenters: array of [cx, cy] as fractions of card width/height
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

// ── Entrance animation ────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ── Card 1 — Red character · WhatsApp & Telegram ──────────────────────────────
// Card: 656 × 254 px
// Character div (283.468 × 273.055) at left:371.89 top:23.48 in card
// Left eye socket  inset[33.05% 51.43% 29.24% 12.25%] of char → center in card ≈ (458, 165) → fractions (0.699, 0.650)
// Right eye socket inset[32.84% 15.1%  29.45% 48.57%] of char → center in card ≈ (561, 165) → fractions (0.855, 0.650)
function Card1() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.699, 0.650], [0.855, 0.650]],
    10
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0 }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] shrink-0 w-full"
      style={{ height: 254 }}
    >
      {/* bg grid */}
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Text + CTA */}
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 36.66, top: "50%", transform: "translateY(-50%)", width: 281.905, gap: 31.323 }}
      >
        <p className="font-medium text-[#fffbe8] leading-[1.1]" style={{ fontSize: 27.09, wordBreak: "break-word" }}>
          A growing community on WhatsApp &amp; Telegram
        </p>
        <div
          className="flex items-center justify-center rounded-[86px]"
          style={{
            background: "rgba(255,59,48,0.1)",
            height: 38.095,
            padding: "10.32px 20.64px",
            width: 182.011,
          }}
        >
          <span className="font-medium text-[#ff3b30] text-right whitespace-nowrap" style={{ fontSize: 15.238 }}>
            Join Our Community
          </span>
        </div>
      </div>

      {/* Character */}
      <div
        className="absolute"
        style={{ left: 371.89, top: 23.48, width: 283.468, height: 273.055 }}
      >
        {/* Red blob body */}
        <div
          className="absolute inset-0"
          style={{ background: "#ff3b30", borderRadius: "108.814px 108.814px 0 0" }}
        />

        {/* Left eye socket — inset[33.05% 51.43% 29.24% 12.25%] */}
        <div
          className="absolute overflow-hidden rounded-[128.537px] bg-[#fffbe8]"
          style={{
            top: "33.05%", right: "51.43%", bottom: "29.24%", left: "12.25%",
          }}
        >
          <div
            className="absolute flex items-center justify-center"
            style={{
              inset: 0,
              transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`,
              transition: "transform 0.08s ease-out",
            }}
          >
            <img
              alt=""
              aria-hidden
              src={IMG.redPupil}
              style={{ position: "absolute", left: -9.79, top: "calc(50% - 1.17px)", width: 48.966, height: 48.966 }}
            />
          </div>
        </div>

        {/* Right eye socket — inset[32.84% 15.1% 29.45% 48.57%] */}
        <div
          className="absolute overflow-hidden rounded-[128.537px] bg-[#fffbe8]"
          style={{
            top: "32.84%", right: "15.1%", bottom: "29.45%", left: "48.57%",
          }}
        >
          <div
            className="absolute flex items-center justify-center"
            style={{
              inset: 0,
              transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`,
              transition: "transform 0.08s ease-out",
            }}
          >
            <img
              alt=""
              aria-hidden
              src={IMG.redPupil}
              style={{ position: "absolute", left: -9.79, top: "calc(50% - 1.17px)", width: 48.966, height: 48.966 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Card 2 — Purple character · Resources & playlists ─────────────────────────
// Card: 427 × 254 px
// Character div (376.373 × 189.133) at left:213.59 top:64.96 in card
// Eye 1 inset[44.07% 77.77% 37.23% 12.84%] → center in card ≈ (280, 166) → (0.655, 0.654)
// Eye 2 inset[18.03% 66.02% 63.27% 24.58%] → center in card ≈ (324, 117) → (0.759, 0.461)
function Card2() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.655, 0.654], [0.759, 0.461]],
    8
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] shrink-0 w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Text */}
      <p
        className="absolute font-medium text-[#fffbe8] leading-[1.2]"
        style={{ fontSize: 27.09, left: 38.35, top: "calc(50% - 77.88px)", width: 210.794, wordBreak: "break-word" }}
      >
        Curated design resources &amp; playlists
      </p>

      {/* CTA */}
      <div
        className="absolute flex items-center justify-center rounded-[86px]"
        style={{
          background: "rgba(175,82,222,0.1)",
          height: 38.095,
          left: 38.35,
          top: 181.42,
          padding: "10.32px 20.64px",
        }}
      >
        <span className="font-medium text-[#af52de] text-right whitespace-nowrap" style={{ fontSize: 15.238 }}>
          Explore Now
        </span>
      </div>

      {/* Character */}
      <div
        className="absolute"
        style={{ left: 213.59, top: 64.96, width: 376.373, height: 189.133 }}
      >
        {/* Body image */}
        <div className="absolute" style={{ inset: "-15.05% -8.51% -13.79% -7.63%" }}>
          <img alt="Purple character" src={IMG.purpleChar} className="block w-full h-full object-contain" />
        </div>

        {/* Pupil 1 — inset[44.07% 77.77% 37.23% 12.84%] */}
        <div
          className="absolute overflow-hidden"
          style={{ top: "44.07%", right: "77.77%", bottom: "37.23%", left: "12.84%" }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-41.07%",
              transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`,
              transition: "transform 0.08s ease-out",
            }}
          >
            <img alt="" aria-hidden src={IMG.purplePupil1} className="block w-full h-full" />
          </div>
        </div>

        {/* Pupil 2 — inset[18.03% 66.02% 63.27% 24.58%] */}
        <div
          className="absolute overflow-hidden"
          style={{ top: "18.03%", right: "66.02%", bottom: "63.27%", left: "24.58%" }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-41.07%",
              transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`,
              transition: "transform 0.08s ease-out",
            }}
          >
            <img alt="" aria-hidden src={IMG.purplePupil2} className="block w-full h-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Card 3 — Blue character · Weekly X Spaces ─────────────────────────────────
// Card: 427 × 254 px
// Character div (254.007 × 224.038) at left:197.5 top:49.72
// Left  pupil inset[53.63% 31.01% 37.96% 61.57%] → center in card ≈ (363, 179) → (0.851, 0.706)
// Right pupil inset[53.63% 51.01% 37.96% 41.57%] → center in card ≈ (312, 179) → (0.731, 0.706)
function Card3() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.851, 0.706], [0.731, 0.706]],
    8
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] shrink-0 w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Text */}
      <p
        className="absolute font-medium text-[#fffbe8] leading-[1.2]"
        style={{ fontSize: 27.09, left: 36.66, top: "calc(50% - 89.74px)", width: 225.185, wordBreak: "break-word" }}
      >
        Weekly X Spaces for creative discussions
      </p>

      {/* CTA */}
      <div
        className="absolute flex items-center justify-center rounded-[86px]"
        style={{
          background: "rgba(65,84,249,0.1)",
          height: 38.095,
          left: 36.66,
          top: 189.04,
          padding: "10.32px 20.64px",
        }}
      >
        <span className="font-medium text-[#4154f9] text-right whitespace-nowrap" style={{ fontSize: 15.238 }}>
          Follow Us on X
        </span>
      </div>

      {/* Character */}
      <div
        className="absolute"
        style={{ left: 197.5, top: 49.72, width: 254.007, height: 224.038 }}
      >
        {/* Body */}
        <div className="absolute" style={{ top: 0, right: "11.01%", bottom: 0, left: 0 }}>
          <div style={{ position: "absolute", top: "0.4%", left: "0.46%", right: 0, bottom: 0 }}>
            <img alt="Blue character" src={IMG.blueBody} className="block w-full h-full object-contain" />
          </div>
        </div>

        {/* Left pupil — inset[53.63% 31.01% 37.96% 61.57%] */}
        <div
          className="absolute overflow-hidden"
          style={{ top: "53.63%", right: "31.01%", bottom: "37.96%", left: "61.57%" }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-69.7%",
              transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`,
              transition: "transform 0.08s ease-out",
            }}
          >
            <img alt="" aria-hidden src={IMG.bluePupil} className="block w-full h-full" />
          </div>
        </div>

        {/* Star */}
        <div className="absolute" style={{ top: "28.66%", right: 0, bottom: "46.37%", left: "77.98%" }}>
          <div style={{ position: "absolute", inset: "8.92%" }}>
            <img alt="" aria-hidden src={IMG.blueStar} className="block w-full h-full" />
          </div>
        </div>

        {/* Right pupil — inset[53.63% 51.01% 37.96% 41.57%] */}
        <div
          className="absolute overflow-hidden"
          style={{ top: "53.63%", right: "51.01%", bottom: "37.96%", left: "41.57%" }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-69.7%",
              transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`,
              transition: "transform 0.08s ease-out",
            }}
          >
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

// ── Card 4 — Yellow sun character · Project highlights ────────────────────────
// Card: 656 × 254 px
// Character div (311.924 × 311.924) at bottom:-91.09 right:-43.31
// char top in card: 254 - 311.924 + 91.09 = 33.17px | char left: 656 - 311.924 + 43.31 = 387.39px
// Eyes centered at top:122.39 in char, two 57.795px eye frames side by side
// Eye 1 center in char: (311.924/2 - 57.795 + 28.9, 122.39 + 28.9) = (127.07, 151.29)
//   in card: (387.39+127.07, 33.17+151.29) = (514.46, 184.46) → fractions (0.784, 0.726)
// Eye 2 center in char: (311.924/2 + 28.9, 151.29) = (184.86+387.39, 184.46) = (572.25, 184.46) → (0.872, 0.726)
function Card4() {
  const { cardRef, offsets, onMouseMove, onMouseLeave } = useEyeTrack(
    [[0.784, 0.726], [0.872, 0.726]],
    10
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0 }}
      className="bg-[#181818] border-[0.593px] border-[rgba(255,255,255,0.1)] overflow-hidden relative rounded-[33.862px] shrink-0 w-full"
      style={{ height: 254 }}
    >
      <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Text content */}
      <div
        className="absolute flex flex-col items-start text-[#fffbe8]"
        style={{ left: 63.75, top: "50%", transform: "translateY(-50%)", width: 284.444, gap: 13.545, wordBreak: "break-word" }}
      >
        <p className="font-medium leading-[1.1]" style={{ fontSize: 27.09, width: 231.111 }}>
          Project highlights
        </p>
        <p className="opacity-70 leading-[1.3]" style={{ fontSize: 15.238 }}>
          Tag{" "}
          <span className="font-medium text-[#ffb522]">@hkofdesigners</span>
          {" "}on X, IG, or TikTok When you post online to stand a chance to be featured on our website
        </p>
      </div>

      {/* Yellow star character */}
      <div
        className="absolute"
        style={{ bottom: -91.09, right: -43.31, width: 311.924, height: 311.924 }}
      >
        {/* Star body */}
        <div className="absolute" style={{ top: 0, left: 0, width: "100%", height: "100%" }}>
          <div style={{ position: "absolute", inset: "4.64%" }}>
            <img alt="Yellow star character" src={IMG.yellowStar} className="block w-full h-full" />
          </div>
        </div>

        {/* Eyes — centered, side by side at top:122.39 */}
        <div
          className="absolute flex items-center"
          style={{ left: "50%", top: 122.39, transform: "translateX(-50%)" }}
        >
          {/* Left eye */}
          <div
            className="relative overflow-hidden"
            style={{ width: 57.795, height: 57.795 }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${offsets[0]?.[0] ?? 0}px, ${offsets[0]?.[1] ?? 0}px)`,
                transition: "transform 0.08s ease-out",
              }}
            >
              <img alt="" aria-hidden src={IMG.yellowEye1} className="absolute inset-0 w-full h-full" />
            </div>
          </div>
          {/* Right eye */}
          <div
            className="relative overflow-hidden"
            style={{ width: 57.795, height: 57.795 }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${offsets[1]?.[0] ?? 0}px, ${offsets[1]?.[1] ?? 0}px)`,
                transition: "transform 0.08s ease-out",
              }}
            >
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
      {/* Full-width background grid */}
      <div className="absolute inset-x-0 top-0 h-[1024px] pointer-events-none">
        <img alt="" aria-hidden src={IMG.bgGrid} className="absolute inset-0 w-full h-full object-cover opacity-40" />
      </div>

      <div className="container-hk relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col items-center text-center mb-[40.635px]"
          style={{ maxWidth: 378.413, marginInline: "auto", gap: 10.159 }}
        >
          <p
            className="font-semibold text-[#fffbe8] leading-[1.1] w-full"
            style={{ fontSize: "clamp(28px, 3.17vw, 40.635px)" }}
          >
            Built by Designers, for Designers.
          </p>
          <p
            className="font-normal leading-[1.3] w-full"
            style={{ fontSize: 15.238, color: "rgba(255,255,255,0.7)" }}
          >
            At HK of Design, we offer a space where designers collaborate, learn, and inspire one another
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="flex flex-wrap" style={{ gap: 27.09 }}>
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row w-full" style={{ gap: 27.09 }}>
            <div style={{ flex: "656 1 0", minWidth: 0 }}>
              <Card1 />
            </div>
            <div style={{ flex: "427 1 0", minWidth: 0 }}>
              <Card2 />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row w-full" style={{ gap: 27.09 }}>
            <div style={{ flex: "427 1 0", minWidth: 0 }}>
              <Card3 />
            </div>
            <div style={{ flex: "656 1 0", minWidth: 0 }}>
              <Card4 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
