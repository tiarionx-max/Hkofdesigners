"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANIM_VIDEOS = [
  "/why-join/card-1.mp4",
  "/why-join/card-2.mp4",
  "/why-join/card-3.mp4",
];

const CARDS = [
  {
    id: 1,
    title: "Learn by Doing,",
    subtext: "Fueled by Great Ideas.",
    subtextColor: "#4154f9",
    desc: "Dive into practical design conversations, hands-on experiences, and fresh perspectives that keep your creativity moving.",
  },
  {
    id: 2,
    title: "Meet Great Creatives,",
    subtext: "Take on Bigger Challenges.",
    subtextColor: "#ff3b30",
    desc: "Connect with talented designers and grow together through collaborative discussions and challenges that push your skills further.",
  },
  {
    id: 3,
    title: "Get Seen in a",
    subtext: "Community That Cheers You On",
    subtextColor: "#ffb522",
    desc: "Share your work, gain recognition, and be part of a supportive network that celebrates progress and inspires confidence.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhyJoin() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#0f0f0f] py-20 md:py-28 border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.52, ease: EASE }}
          className="text-center mb-12"
        >
          <h2
            className="font-semibold text-[#fffbe8] leading-tight"
            style={{ fontSize: "clamp(32px, 3.5vw, 48px)" }}
          >
            Why Designers Join HK
          </h2>
          <p
            className="mt-3 mx-auto"
            style={{
              fontSize: 18,
              color: "rgba(255,251,232,0.65)",
              maxWidth: 675,
              lineHeight: 1.5,
            }}
          >
            More than a group chat, HK is a place where designers meaningfully grow, connect, and get seen.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="flex gap-4 items-stretch"
          onMouseLeave={() => setHovered(null)}
          style={{ height: 534 }}
        >
          {CARDS.map((card, i) => {
            const isActive = hovered === card.id;
            const isInactive = hovered !== null && hovered !== card.id;

            return (
              <motion.div
                key={card.id}
                animate={{
                  width: hovered === null ? "33.33%" : isActive ? 646 : 313,
                  opacity: isInactive ? 0.5 : 1,
                }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative rounded-[20px] overflow-hidden cursor-pointer flex-shrink-0"
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,251,232,0.2)",
                }}
                onMouseEnter={() => setHovered(card.id)}
              >
                {/* Animation background video */}
                <motion.div
                  className="absolute pointer-events-none"
                  animate={{
                    width: isActive ? 797 : 437,
                    height: isActive ? 797 : 534,
                    opacity: isActive ? 0.9 : 0.5,
                    top: isActive ? -132.57 : -1,
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ left: -7.58 }}
                >
                  <video
                    src={ANIM_VIDEOS[i]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Top fade mask */}
                <motion.div
                  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                  animate={{ height: isActive ? 140 : 92 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    background: "linear-gradient(to bottom, #0f0f0f 0%, transparent 100%)",
                  }}
                />

                {/* Bottom fade mask */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
                  animate={{ height: isActive ? 140 : 92 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    background: "linear-gradient(to top, #0f0f0f 0%, transparent 100%)",
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                  <h3
                    className="font-semibold text-[#fffbe8] leading-tight"
                    style={{ fontSize: 36, lineHeight: 1.15 }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-semibold mt-1"
                    style={{ fontSize: 24, color: card.subtextColor, lineHeight: 1.2 }}
                  >
                    {card.subtext}
                  </p>

                  {/* Description — only on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3, ease: EASE, delay: 0.1 }}
                        className="mt-3"
                        style={{
                          fontSize: 15,
                          color: "rgba(255,251,232,0.65)",
                          lineHeight: 1.55,
                          maxWidth: 420,
                        }}
                      >
                        {card.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
