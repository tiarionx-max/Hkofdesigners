"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Row 1 images (node 41:750) ─────────────────────────────────────────────
const R1 = [
  "https://www.figma.com/api/mcp/asset/740fba9c-5984-4d64-81a4-facf823e19fc",
  "https://www.figma.com/api/mcp/asset/2fd585ec-1ea4-4b79-96af-af76aebb900a",
  "https://www.figma.com/api/mcp/asset/35bebefb-a3a6-4c72-afc8-3254acc60b31",
  "https://www.figma.com/api/mcp/asset/0eb51f50-ca55-4a1b-9bc7-4bb5ca14c5de",
  "https://www.figma.com/api/mcp/asset/844e8160-bd1e-44f5-83c4-4d7dbaf92f3e",
  "https://www.figma.com/api/mcp/asset/5820f33a-aac8-444e-bd0f-ecfe5361f69a",
  "https://www.figma.com/api/mcp/asset/e4eda48c-4e58-4f1e-b152-b4cc8a1aafc6",
  "https://www.figma.com/api/mcp/asset/02e700ed-1c41-45fc-ab9f-26e72670785b",
  "https://www.figma.com/api/mcp/asset/84fbc4d0-bb27-4505-9a28-1630de660020",
  "https://www.figma.com/api/mcp/asset/91dc9cd0-be83-4674-93f4-2a3b521a747b",
  "https://www.figma.com/api/mcp/asset/7513de84-e2b4-48b8-8b17-8f3c61c41dd3",
  "https://www.figma.com/api/mcp/asset/a33b8851-e79b-4129-baf0-4c8401292602",
  "https://www.figma.com/api/mcp/asset/f106e870-41ad-416c-9500-9d109b1f17eb",
  "https://www.figma.com/api/mcp/asset/4045ecf5-5b53-4b55-b135-48829a485f06",
  "https://www.figma.com/api/mcp/asset/abfd1f33-5e24-4102-9936-6ee99dc3700a",
  "https://www.figma.com/api/mcp/asset/1fae3677-c132-4543-ab65-cb52b1414f6c",
];

// ── Row 2 images (node 41:778) ─────────────────────────────────────────────
const R2 = [
  "https://www.figma.com/api/mcp/asset/c5dab23c-0ea5-4e00-b235-e30e7bc2d1e3",
  "https://www.figma.com/api/mcp/asset/117e3340-5d2c-4038-98c7-3f5320bb383e",
  "https://www.figma.com/api/mcp/asset/e471568d-2794-42b5-8635-3a599129e647",
  "https://www.figma.com/api/mcp/asset/66a683d0-5e7c-4e48-862f-7a373977225d",
  "https://www.figma.com/api/mcp/asset/0e352aea-ff9e-4998-a654-0ad59e0ef31e",
  "https://www.figma.com/api/mcp/asset/fdb4a2a8-65fe-44ea-86d2-44b5ca486b4c",
  "https://www.figma.com/api/mcp/asset/ad38e0d6-f6c1-4d67-9578-ccc30a71173a",
  "https://www.figma.com/api/mcp/asset/1cabc8f7-7b83-44fe-8dcb-b23ae71c8464",
  "https://www.figma.com/api/mcp/asset/2a3c61ec-2c31-4e7c-b6ab-4f7ab2a43653",
  "https://www.figma.com/api/mcp/asset/f056daca-4d2c-4aa6-8557-350ad1cbaed5",
  "https://www.figma.com/api/mcp/asset/d72a873d-d669-4979-839c-f1ef4d8ac8ab",
  "https://www.figma.com/api/mcp/asset/fbab6642-92dc-4e1b-8658-a5747ec2eaee",
  "https://www.figma.com/api/mcp/asset/60dcaaf5-5616-4a04-968d-c5dd48916b76",
  "https://www.figma.com/api/mcp/asset/ff6f6d0d-1a0c-49eb-854f-55c9ff58993a",
  "https://www.figma.com/api/mcp/asset/4c8eb7fe-1e2b-4f27-8ccd-e227d58a14d6",
  "https://www.figma.com/api/mcp/asset/9f26afc9-22b6-4d81-adc1-b18a3aabf6dc",
];

// ── Star decorations (node 41:845 hover overlay) ───────────────────────────
const STARS = [
  { src: "https://www.figma.com/api/mcp/asset/56c76424-2e2a-467f-bd35-5f3ed2baf390", left: 25, top: 260 },
  { src: "https://www.figma.com/api/mcp/asset/e53e8bb2-0847-45e0-aaaf-114b4e79b489", left: 80, top: 71 },
  { src: "https://www.figma.com/api/mcp/asset/8478eeb5-5bbb-465c-a312-f90167bfb815", left: 264, top: 204 },
  { src: "https://www.figma.com/api/mcp/asset/27cdabca-413e-462e-ae11-1a980a22c6f8", left: 264, top: 39 },
];

// ── Designer data per card slot ────────────────────────────────────────────
const DESIGNERS = [
  { name: "Thechainalhaji", bio: "A Multidisciplinary designer with 5+ years experience who has worked over 50 brands" },
  { name: "Creativevault__", bio: "Brand identity designer crafting visual systems for global brands" },
  { name: "Damilola.art", bio: "Illustrator and visual storyteller based in Lagos, Nigeria" },
  { name: "Studiobyola", bio: "Motion & UI designer creating immersive digital experiences" },
  { name: "Creativemindset", bio: "3D artist and brand designer working across multiple industries" },
  { name: "Visualsbynana", bio: "Product designer specializing in SaaS and consumer apps" },
  { name: "Brandingbyseun", bio: "Graphic designer building memorable brand identities" },
  { name: "Artbyfolarin", bio: "Illustrator blending traditional and digital art techniques" },
];

// ── Constants ──────────────────────────────────────────────────────────────
const CARD = 300;   // card width & height in px (320 in Figma, scaled slightly)
const GAP  = 16;    // gap between cards and columns

// ── ShowcaseCard ───────────────────────────────────────────────────────────
const FIGMA_CARD = 320; // original Figma card size for position scaling

function ShowcaseCard({
  src,
  designer,
}: {
  src: string;
  designer: typeof DESIGNERS[0];
}) {
  const [hov, setHov] = useState(false);
  const scale = CARD / FIGMA_CARD;

  return (
    <div
      role="img"
      aria-label={`Design project by ${designer.name}`}
      className="relative flex-none overflow-hidden rounded-[10px] border border-[rgba(255,251,232,0.12)] cursor-pointer"
      style={{ width: CARD, height: CARD }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Project image */}
      <img
        alt=""
        aria-hidden
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hover overlay */}
      <AnimatePresence>
        {hov && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ background: "rgba(15,15,15,0.95)" }}
          >
            {/* Star decorations */}
            {STARS.map((star, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: star.left * scale,
                  top: star.top * scale,
                  width: 21 * scale,
                  height: 21 * scale,
                }}
              >
                <div style={{ position: "absolute", inset: "40.79%" }}>
                  <img alt="" aria-hidden src={star.src} className="block w-full h-full" />
                </div>
              </div>
            ))}

            {/* Content — staggered in */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ gap: 6, paddingInline: 20 }}
            >
              <p
                className="font-medium leading-none text-[#ff3b30]"
                style={{ fontSize: 14 * scale }}
              >
                Illustrated by
              </p>
              <p
                className="font-semibold text-[#fffbe8] text-center leading-[1.2]"
                style={{ fontSize: 28 * scale }}
              >
                {designer.name}
              </p>
              <p
                className="text-center leading-[1.35]"
                style={{
                  fontSize: 9 * scale,
                  color: "rgba(255,251,232,0.7)",
                  maxWidth: 176 * scale,
                }}
              >
                {designer.bio}
              </p>

              {/* View profile button */}
              <button
                className="flex items-center justify-center rounded-full font-medium text-[#ff3b30] whitespace-nowrap"
                style={{
                  marginTop: 14 * scale,
                  background: "rgba(255,59,48,0.2)",
                  height: 31 * scale,
                  paddingInline: 24 * scale,
                  fontSize: 12 * scale,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View profile
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── ShowcaseStrip ──────────────────────────────────────────────────────────
// Builds columns of `perCol` cards, duplicates for seamless CSS loop.
// The strip is doubled so translateX(-50%) brings the clone into view → loop.
function ShowcaseStrip({
  images,
  direction,
  duration,
  perCol = 2,
}: {
  images: string[];
  direction: "left" | "right";
  duration: number;
  perCol?: number;
}) {
  const [paused, setPaused] = useState(false);

  // Build columns
  const cols: string[][] = [];
  for (let i = 0; i < images.length; i += perCol) {
    const slice = images.slice(i, i + perCol);
    if (slice.length > 0) cols.push(slice);
  }
  const doubled = [...cols, ...cols];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}
        style={{
          display: "flex",
          gap: GAP,
          width: "max-content",
          animationDuration: `${duration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((col, colIdx) => (
          <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {col.map((src, cardIdx) => {
              const slot = (colIdx % cols.length) * perCol + cardIdx;
              return (
                <ShowcaseCard
                  key={`${colIdx}-${cardIdx}`}
                  src={src}
                  designer={DESIGNERS[slot % DESIGNERS.length]}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Showcase() {
  return (
    <section className="bg-[#0f0f0f] overflow-hidden py-16 md:py-24">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.52, ease: EASE }}
        className="flex flex-col items-center text-center mb-12"
        style={{ maxWidth: 440, marginInline: "auto", gap: 10, paddingInline: 24 }}
      >
        <p
          className="font-semibold text-[#fffbe8] leading-[1.1]"
          style={{ fontSize: "clamp(26px, 3.17vw, 40.635px)" }}
        >
          Project Showcase
        </p>
        <p
          className="font-normal leading-[1.3]"
          style={{ fontSize: 15.238, color: "rgba(255,255,255,0.7)" }}
        >
          Incredible work from our growing community of talented designers
        </p>
      </motion.div>

      {/* Two infinite scroll strips */}
      <div className="flex flex-col" style={{ gap: GAP }}>
        <ShowcaseStrip images={R1} direction="left"  duration={55} perCol={2} />
        <ShowcaseStrip images={R2} direction="right" duration={48} perCol={2} />
      </div>
    </section>
  );
}
