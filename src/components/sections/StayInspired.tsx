"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

// ── Icons ──────────────────────────────────────────────────────────────────
function ExternalArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SpotifyIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── X Space notifications ──────────────────────────────────────────────────
const NOTIFS = [
  { text: "Pst", accent: false },
  { text: "Thechain Alhaji is speaking 🎙️", accent: false },
  { text: "is now a speaker", accent: true },
  { text: "Pst", accent: false },
  { text: "Thechain Alhaji is speaking 🎙️", accent: false },
];

function XSpaceVisual() {
  const [notifIdx, setNotifIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNotifIdx(i => (i + 1) % NOTIFS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const speakers = [
    { initials: "TC", label: "Host", color: "#4169FF", size: 52, speaking: true },
    { initials: "AK", label: "Speaker", color: "rgba(255,255,255,0.07)", size: 40, speaking: false },
    { initials: "HK", label: "Speaker", color: "rgba(255,255,255,0.07)", size: 40, speaking: false },
  ];

  return (
    <div className="relative h-[240px] rounded-[12px] overflow-hidden"
      style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(65,84,249,0.09) 0%, transparent 70%)" }} />

      {/* Floating notification */}
      <div className="absolute top-3 right-3" style={{ minWidth: 140 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={notifIdx}
            initial={{ opacity: 0, y: -6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(8px)",
              fontSize: 10,
              color: NOTIFS[notifIdx].accent ? "#4169FF" : "rgba(255,251,232,0.65)",
              whiteSpace: "nowrap",
            }}
          >
            {NOTIFS[notifIdx].accent && (
              <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: "#4169FF" }} />
            )}
            {NOTIFS[notifIdx].text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker row — centred */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ gap: 24 }}>
        {speakers.map((sp, i) => (
          <div key={i} className="flex flex-col items-center" style={{ gap: 6 }}>
            <div className="relative" style={{ width: sp.size, height: sp.size }}>
              {/* Speaking pulse rings on host */}
              {sp.speaking && [1, 2].map(ring => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1.5px solid rgba(65,84,249,0.35)" }}
                  animate={{ scale: [1, 1.45 + ring * 0.15], opacity: [0.5, 0] }}
                  transition={{ duration: 1.9, repeat: Infinity, delay: ring * 0.5, ease: "easeOut" }}
                />
              ))}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center font-semibold text-[#fffbe8]"
                style={{
                  background: sp.color,
                  border: sp.speaking ? "none" : "1px solid rgba(255,255,255,0.1)",
                  fontSize: sp.size * 0.3,
                }}
              >
                {sp.initials}
              </div>
            </div>
            <span style={{ fontSize: 9, color: "rgba(255,251,232,0.35)" }}>{sp.label}</span>
          </div>
        ))}
      </div>

      {/* Audio wave under host — subtle */}
      <div className="absolute flex items-end" style={{ bottom: 36, left: "50%", transform: "translateX(-50%)", gap: 3 }}>
        {[5, 9, 14, 10, 16, 11, 7].map((h, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: 3, background: "rgba(65,84,249,0.55)" }}
            animate={{ height: [h * 0.5, h, h * 0.6, h * 0.9, h * 0.5] }}
            transition={{ duration: 0.9 + i * 0.08, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
          />
        ))}
      </div>

      {/* LIVE badge */}
      <div className="absolute bottom-3 left-3 flex items-center" style={{ gap: 5 }}>
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#FF3D3D" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span style={{ fontSize: 9, color: "rgba(255,251,232,0.45)", letterSpacing: "0.06em" }}>LIVE · X SPACE</span>
      </div>

      {/* Listener count */}
      <div className="absolute bottom-3 right-3" style={{ fontSize: 9, color: "rgba(255,251,232,0.3)" }}>
        1.2k listening
      </div>
    </div>
  );
}

// ── Spotify visual ─────────────────────────────────────────────────────────
const EQ_HEIGHTS = [18, 32, 48, 38, 60, 42, 55, 28, 62, 36, 50, 26, 44, 34, 56, 30, 46, 40];

function SpotifyVisual() {
  const [progress, setProgress] = useState(38);

  // Slowly advance progress bar
  useEffect(() => {
    const id = setInterval(() => setProgress(p => p >= 95 ? 10 : p + 0.3), 180);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[240px] rounded-[12px] overflow-hidden"
      style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(29,185,84,0.08) 0%, transparent 65%)" }} />

      {/* Top row — vinyl + track info */}
      <div className="absolute top-4 left-4 flex items-center" style={{ gap: 12 }}>
        <motion.div
          className="rounded-full flex items-center justify-center relative flex-none"
          style={{ width: 48, height: 48 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          {/* Vinyl rings */}
          <div className="absolute inset-0 rounded-full"
            style={{ background: "conic-gradient(#1DB954 0deg, #0f7a33 90deg, #1DB954 180deg, #0a5c26 270deg, #1DB954 360deg)" }} />
          <div className="absolute rounded-full" style={{ inset: "18%", background: "#0a0a0a" }} />
          <div className="absolute w-1.5 h-1.5 rounded-full" style={{ background: "#1DB954", opacity: 0.7 }} />
        </motion.div>

        <div>
          <p className="font-medium text-[#fffbe8]" style={{ fontSize: 12 }}>Design Flow</p>
          <p style={{ fontSize: 10, color: "rgba(255,251,232,0.4)", marginTop: 1 }}>HK of Designers · Playlist</p>
        </div>

        {/* NOW PLAYING badge */}
        <div className="absolute top-0 right-0 flex items-center" style={{ gap: 4, right: -168, top: 0 }}>
          <SpotifyIcon size={10} />
          <span style={{ fontSize: 9, color: "#1DB954", letterSpacing: "0.05em" }}>NOW PLAYING</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute" style={{ left: 16, right: 16, top: 76 }}>
        <div className="w-full rounded-full" style={{ height: 2, background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#1DB954", transition: "width 0.18s linear" }} />
        </div>
        <div className="flex justify-between" style={{ marginTop: 4 }}>
          <span style={{ fontSize: 9, color: "rgba(255,251,232,0.3)" }}>
            {Math.floor(progress * 0.032)}:{String(Math.floor((progress * 0.032 % 1) * 60)).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 9, color: "rgba(255,251,232,0.3)" }}>3:12</span>
        </div>
      </div>

      {/* Equalizer bars — bottom half */}
      <div className="absolute flex items-end" style={{ bottom: 16, left: 16, right: 16, height: 90, gap: 3 }}>
        {EQ_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full"
            style={{ background: i % 3 === 0 ? "#1DB954" : i % 3 === 1 ? "rgba(29,185,84,0.65)" : "rgba(29,185,84,0.35)" }}
            animate={{ height: [h * 0.45, h, h * 0.6, h * 0.85, h * 0.45] }}
            transition={{
              duration: 1.1 + (i % 5) * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.04,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Pill button ────────────────────────────────────────────────────────────
function Btn({
  href,
  children,
  primary,
  style: extStyle,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 rounded-full font-medium whitespace-nowrap"
      style={{
        fontSize: 13,
        padding: "8px 18px",
        cursor: "pointer",
        textDecoration: "none",
        ...(primary
          ? {}
          : {
              color: "rgba(255,251,232,0.65)",
              border: "1px solid rgba(255,255,255,0.12)",
            }),
        ...extStyle,
      }}
    >
      {children}
    </motion.a>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

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

          {/* ── X Spaces card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-[20px] bg-[#181818] border border-[rgba(255,255,255,0.08)] p-7 flex flex-col gap-6 overflow-hidden"
          >
            <XSpaceVisual />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12px] text-[rgba(255,251,232,0.45)]">
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D084]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
                Every Sunday · 8:30 PM · Live on X
              </div>
              <h3 className="text-[20px] font-semibold text-[#fffbe8]">
                Weekly Design Spaces on X
              </h3>
              <p className="text-[14px] text-[rgba(255,251,232,0.55)] leading-relaxed">
                Join live conversations every week as top designers share insights, trends, and real experiences from the creative world.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-auto flex-wrap">
              <Btn
                href="#"
                primary
                style={{ background: "rgba(255,255,255,0.1)", color: "#fffbe8" }}
              >
                <XIcon />
                Follow Us on X
              </Btn>
              <Btn href="#">
                <CalendarIcon />
                Add to Calendar
              </Btn>
            </div>
          </motion.div>

          {/* ── Spotify card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="rounded-[20px] bg-[#181818] border border-[rgba(255,255,255,0.08)] p-7 flex flex-col gap-6 overflow-hidden"
          >
            <SpotifyVisual />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12px] text-[rgba(255,251,232,0.45)]">
                <SpotifyIcon size={12} />
                Official Spotify Playlist
              </div>
              <h3 className="text-[20px] font-semibold text-[#fffbe8]">
                The Design Flow Playlist
              </h3>
              <p className="text-[14px] text-[rgba(255,251,232,0.55)] leading-relaxed">
                Soundtrack your creativity — listen to our official Spotify playlist featuring lo-fi, chill, and creative mood tunes loved by designers.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-auto flex-wrap">
              <Btn
                href="#"
                primary
                style={{ background: "#1DB954", color: "#fff" }}
              >
                <SpotifyIcon />
                Follow on Spotify
              </Btn>
              <Btn href="#">
                Stream Now
                <ExternalArrow />
              </Btn>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
