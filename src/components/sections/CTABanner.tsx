"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Figma assets
const SQUIGGLE_LEFT  = "https://www.figma.com/api/mcp/asset/f03f7ef1-5d32-4a0f-9bec-4f71d6d06510";
const SQUIGGLE_RIGHT = "https://www.figma.com/api/mcp/asset/8f8c2ddc-68d0-4ee2-8280-a0e1be726be5";
const ARROW_ICON     = "https://www.figma.com/api/mcp/asset/8d61736b-dfff-460b-b603-568ea1bbff12";

const EASE = [0.22, 1, 0.36, 1] as const;

// Dark cells (row-col) extracted from Figma — 0-indexed, 19 cols × 16 rows
const DARK_CELLS = new Set([
  "2-12","4-16","5-3","5-4","7-17","9-0","9-8",
  "11-5","13-5","15-16","16-4","16-8",
]);

const COLS = 19;
const ROWS = 16;
const CELL = 57.698;

function Grid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows:    `repeat(${ROWS}, ${CELL}px)`,
          width:  COLS * CELL,
          height: ROWS * CELL,
          position: "absolute",
          top:  "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, idx) => {
          const row = Math.floor(idx / COLS);
          const col = idx % COLS;
          const dark = DARK_CELLS.has(`${row}-${col}`);
          return (
            <div
              key={idx}
              style={{
                border:     "0.962px solid rgba(14,198,59,0.05)",
                background: dark ? "rgba(1,69,14,0.07)" : "transparent",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function CTAButtons() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center">
      {/* "Join Community" pill */}
      <motion.a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={hovered ? { paddingRight: 28 } : { paddingRight: 20 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="relative overflow-hidden inline-flex items-center justify-center h-[42px] pl-5 rounded-full bg-[#0f0f0f] border border-[rgba(0,0,0,0.1)] whitespace-nowrap"
        style={{ paddingRight: 20 }}
      >
        {/* Shimmer on hover */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          animate={hovered ? { opacity: 1, x: "100%" } : { opacity: 0, x: "-100%" }}
          initial={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,251,232,0.1) 50%, transparent 100%)",
          }}
        />
        <span className="relative z-10 font-semibold text-[#fffbe8] text-[15px] leading-[1.3]">
          Join Community
        </span>
      </motion.a>

      {/* Circle arrow button */}
      <motion.a
        href="#"
        whileHover={{ x: 2, y: -2 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="ml-1 inline-flex items-center justify-center size-[42px] rounded-full bg-[#0f0f0f] border border-[rgba(0,0,0,0.1)] flex-none"
      >
        <img
          src={ARROW_ICON}
          alt="Join"
          className="size-[17px] object-contain"
          style={{ transform: "rotate(180deg) scaleY(-1)" }}
        />
      </motion.a>
    </div>
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
          className="relative rounded-[40px] overflow-hidden bg-[#fffbe8]"
          style={{ minHeight: 420 }}
        >
          {/* Grid background */}
          <Grid />

          {/* Left squiggle — yellow/orange, left-center */}
          <img
            src={SQUIGGLE_LEFT}
            alt="" aria-hidden
            className="absolute pointer-events-none select-none"
            style={{
              left: "4%",
              top: "35%",
              width: 62,
              zIndex: 1,
            }}
          />

          {/* Right squiggle — purple, bottom-right */}
          <img
            src={SQUIGGLE_RIGHT}
            alt="" aria-hidden
            className="absolute pointer-events-none select-none"
            style={{
              right: "6%",
              bottom: "15%",
              width: 62,
              zIndex: 1,
              transform: "rotate(180deg) scaleY(-1)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 gap-5 md:gap-6">

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="font-semibold text-black leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(30px, 4.5vw, 54px)", maxWidth: 720 }}
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
              transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
              className="font-normal text-[#181818] leading-[1.4]"
              style={{ fontSize: "clamp(15px, 1.6vw, 20px)", maxWidth: 500, opacity: 0.8 }}
            >
              Be part of the HK Design community, learn, grow, and connect with designers like you.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
            >
              <CTAButtons />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
