"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

function ExternalArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function StayInspired() {
  return (
    <section className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="container-hk">
        <SectionHeading
          title="Stay Inspired While You Learn"
          subtitle="Tune into the HK of Designers' Spotify Playlist and join our weekly X Spaces — learning isn't just about tutorials; it's about connection."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Weekly Spaces Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[20px] bg-[#181818] border border-[rgba(255,255,255,0.08)] p-7 flex flex-col gap-6 overflow-hidden group"
          >
            {/* Visual area */}
            <div className="relative h-[240px] rounded-[12px] bg-[#0f0f0f] border border-[rgba(255,255,255,0.06)] flex items-center justify-center overflow-hidden">
              {/* Abstract color swatches */}
              <div className="flex gap-2">
                {["#FF3D3D", "#ffb522", "#4169FF", "#00D084", "#8B5CF6", "#FF6B35"].map(
                  (color, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-24 rounded-full"
                      style={{ backgroundColor: color }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12px] text-[rgba(255,251,232,0.45)]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                Every Sunday · 8:30 PM · Live on X
              </div>
              <h3 className="text-[20px] font-semibold text-[#fffbe8]">
                Weekly Design Spaces on X
              </h3>
              <p className="text-[14px] text-[rgba(255,251,232,0.55)] leading-relaxed">
                Join live conversations every week as top designers share insights, trends, and real experiences from the creative world.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-[#fffbe8] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.14)] transition-colors"
              >
                <XIcon />
                Follow Us on X
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-[rgba(255,251,232,0.65)] hover:text-[#fffbe8] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] transition-colors"
              >
                <CalendarIcon />
                Add to Calendar
              </a>
            </div>
          </motion.div>

          {/* Playlist Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-[20px] bg-[#181818] border border-[rgba(255,255,255,0.08)] p-7 flex flex-col gap-6 overflow-hidden group"
          >
            {/* Visual area */}
            <div className="relative h-[240px] rounded-[12px] bg-[#0f0f0f] border border-[rgba(255,255,255,0.06)] flex items-center justify-center overflow-hidden">
              {/* Playlist visual */}
              <div className="flex gap-1 items-end">
                {[20, 35, 50, 40, 60, 45, 55, 30, 65, 38, 52, 28].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-2 rounded-full bg-[#1DB954]"
                    style={{ height: h }}
                    animate={{ height: [h, h * 0.5, h, h * 0.7, h] }}
                    transition={{
                      duration: 1.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12px] text-[rgba(255,251,232,0.45)]">
                <SpotifyIcon />
                Official Spotify Playlist
              </div>
              <h3 className="text-[20px] font-semibold text-[#fffbe8]">
                The Design Flow Playlist
              </h3>
              <p className="text-[14px] text-[rgba(255,251,232,0.55)] leading-relaxed">
                Soundtrack your creativity — listen to our official Spotify playlist featuring lo-fi, chill, and creative mood tunes loved by designers.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-[#fffbe8] bg-[#1DB954] hover:bg-[#1DB954]/85 transition-colors"
              >
                <SpotifyIcon />
                Follow on Spotify
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-[rgba(255,251,232,0.65)] hover:text-[#fffbe8] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] transition-colors"
              >
                Stream Now
                <ExternalArrow />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
