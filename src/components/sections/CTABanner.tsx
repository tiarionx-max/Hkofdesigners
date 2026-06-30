"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const SQUIGGLE_LEFT  = "https://www.figma.com/api/mcp/asset/38d7070c-94f6-49b9-b87a-cd227c32c8f9";
const SQUIGGLE_RIGHT = "https://www.figma.com/api/mcp/asset/f809fcc4-9886-431a-918d-43a51510efca";

const EASE = [0.22, 1, 0.36, 1] as const;

// Grid cell positions that get the darker tint (row, col) — 0-indexed
const DARK_CELLS = new Set([
  "0-3","0-11","0-16",
  "1-6","1-14",
  "2-1","2-9","2-18",
  "3-4","3-13",
  "4-7","4-15",
  "5-2","5-10","5-17",
  "6-5","6-12",
  "7-0","7-8","7-18",
]);

const COLS = 20;
const ROWS = 8;

function Grid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 68px)`,
          gridTemplateRows: `repeat(${ROWS}, 68px)`,
          width: COLS * 68,
          height: ROWS * 68,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, idx) => {
          const row = Math.floor(idx / COLS);
          const col = idx % COLS;
          const key = `${row}-${col}`;
          return (
            <div
              key={key}
              style={{
                border: "1px solid rgba(14,198,59,0.06)",
                background: DARK_CELLS.has(key) ? "rgba(1,69,14,0.07)" : "transparent",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function JoinButton() {
  const [hovered, setHovered] = useState(false);
  const shimX = useMotionValue(-100);
  const shimXSpring = useSpring(shimX, { stiffness: 200, damping: 30 });

  const handleEnter = () => {
    setHovered(true);
    shimX.set(110);
  };
  const handleLeave = () => {
    setHovered(false);
    shimX.set(-100);
  };

  return (
    <a
      href="#"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 h-[52px] md:h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f]/50"
      style={{ background: "#0f0f0f" }}
    >
      {/* Shimmer */}
      <motion.span
        className="absolute inset-y-0 pointer-events-none"
        style={{
          width: "50%",
          left: useTransform(shimXSpring, v => `${v}%`),
          background: "linear-gradient(90deg, transparent 0%, rgba(255,251,232,0.12) 50%, transparent 100%)",
        }}
      />
      <span className="relative z-10 text-[#fffbe8] font-semibold text-[15px] md:text-[17px] whitespace-nowrap">
        Join Community
      </span>
      {/* Arrow circle */}
      <motion.span
        animate={hovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="relative z-10 flex items-center justify-center rounded-full size-8 bg-[#fffbe8]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </motion.span>
    </a>
  );
}

export default function CTABanner() {
  return (
    <section className="bg-[#0f0f0f] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#fffbe8]"
          style={{ minHeight: 440 }}
        >
          {/* Grid background */}
          <Grid />

          {/* Left squiggle */}
          <img
            src={SQUIGGLE_LEFT}
            alt="" aria-hidden
            className="absolute left-0 bottom-0 w-[180px] md:w-[240px] pointer-events-none select-none opacity-80"
            style={{ zIndex: 1 }}
          />

          {/* Right squiggle */}
          <img
            src={SQUIGGLE_RIGHT}
            alt="" aria-hidden
            className="absolute right-0 top-0 w-[180px] md:w-[240px] pointer-events-none select-none opacity-80"
            style={{ zIndex: 1 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-24 gap-6 md:gap-8">

            {/* Decorative dots row */}
            <div className="flex items-center gap-2">
              {["#FF3D3D","#ffb522","#4154f9","#00D084","#8B5CF6"].map((c, i) => (
                <motion.span
                  key={i}
                  className="block w-2 h-2 rounded-full"
                  style={{ backgroundColor: c }}
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.22 }}
                />
              ))}
            </div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="font-semibold text-[#0f0f0f] leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", maxWidth: 700 }}
            >
              Stop{" "}
              <span style={{ color: "#4154f9" }}>Designing</span>
              {" "}in Isolation
              <br />
              Create with{" "}
              <span style={{ color: "#ff3b30" }}>creatives</span>
              {" "}like you.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
              className="font-normal text-[#181818] leading-[1.5]"
              style={{ fontSize: "clamp(15px, 2vw, 20px)", maxWidth: 580, opacity: 0.7 }}
            >
              Be part of the HK Designer community, learn, grow, and connect with designers like you.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            >
              <JoinButton />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
