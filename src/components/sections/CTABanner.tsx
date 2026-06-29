"use client";

import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="bg-[#fffbe8] py-20 md:py-28">
      <div className="container-hk">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Decorative squiggle */}
          <div className="flex items-center gap-3 text-[rgba(15,15,15,0.25)]">
            <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
              <path d="M2 7 Q8 2 14 7 Q20 12 26 7 Q32 2 38 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col gap-3 max-w-[640px]">
            <h2 className="text-[clamp(28px,5vw,52px)] font-semibold leading-tight tracking-tight text-[#0f0f0f]">
              Stop{" "}
              <span className="relative">
                <span className="text-[#FF3D3D]">Designing</span>
              </span>{" "}
              in Isolation
              <br />
              Create with{" "}
              <span className="text-[#4169FF]">creatives</span> like you.
            </h2>
            <p className="text-[15px] md:text-[17px] text-[rgba(15,15,15,0.6)] leading-relaxed">
              Be part of the HK Designer community, learn, grow, and connect with designers like you.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0f0f0f] text-[#fffbe8] text-[15px] font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.35)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f]/50"
            >
              Join Community
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>

          {/* Decorative dots */}
          <div className="flex items-center gap-2 mt-2">
            {["#FF3D3D", "#ffb522", "#4169FF", "#00D084", "#8B5CF6"].map((c, i) => (
              <motion.span
                key={i}
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
