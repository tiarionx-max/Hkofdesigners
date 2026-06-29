"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const HERO_AVATARS = [
  {
    src: "https://www.figma.com/api/mcp/asset/e8d22330-345a-4486-a0ac-f4ad4a48b9ea",
    shape: "rect",
    bg: "#181818",
    position: "left-[8%] top-[30%]",
    size: 80,
    delay: 0.6,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/21d2bf6e-92ed-4611-81a2-d5ad1a3b02a0",
    shape: "hex",
    bg: "#ffb522",
    position: "left-[18%] top-[55%]",
    size: 88,
    delay: 0.75,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/fc39c2ef-97a9-4eee-8a0b-d074928336da",
    shape: "circle",
    bg: "#4169FF",
    position: "right-[16%] top-[28%]",
    size: 92,
    delay: 0.7,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/e8d22330-345a-4486-a0ac-f4ad4a48b9ea",
    shape: "rect",
    bg: "#FF3D3D",
    position: "right-[8%] top-[52%]",
    size: 76,
    delay: 0.85,
  },
];

function useFloatAnimation(i: number) {
  return {
    y: [0, -10, 0],
    transition: {
      duration: 3.5 + i * 0.4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.3,
    },
  };
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,251,232,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,251,232,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, #0f0f0f 100%)",
        }}
      />

      {/* Floating avatars (desktop only) */}
      {HERO_AVATARS.map((avatar, i) => (
        <motion.div
          key={i}
          animate={useFloatAnimation(i)}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: avatar.delay, duration: 0.5, ease: "backOut" }}
          className={`absolute hidden lg:block ${avatar.position}`}
        >
          <div
            className="overflow-hidden shadow-lg border border-[rgba(255,255,255,0.12)]"
            style={{
              width: avatar.size,
              height: avatar.size,
              borderRadius: avatar.shape === "circle" ? "50%" : avatar.shape === "hex" ? "30% 30% 50% 50% / 30% 30% 50% 50%" : "16px",
              backgroundColor: avatar.bg,
            }}
          >
            <Image
              src={avatar.src}
              alt="Community member"
              width={avatar.size}
              height={avatar.size}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-[clamp(36px,6vw,58px)] font-semibold leading-[1.05] tracking-tight text-[#fffbe8]">
            A Creative Home for{" "}
            <span className="text-[#ffb522]">Every</span> Designer.
          </h1>
          <p className="text-[16px] md:text-[18px] font-normal leading-relaxed text-[rgba(255,251,232,0.65)] max-w-[480px] mx-auto">
            Join a vibrant community of Graphic, UI/UX, Motion, and 3D/2D
            designers, where creativity meets collaboration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="flex items-center"
        >
          {/* Primary CTA */}
          <a
            href="#"
            className="inline-flex items-center gap-0 rounded-full shadow-[4px_4px_0px_0px_#000] transition-all duration-150 hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/50"
          >
            <span className="flex items-center justify-center h-[44px] px-6 bg-[#fffbe8] text-[#0f0f0f] text-[14.5px] font-medium rounded-l-full border border-black/10">
              Join Community
            </span>
            <span className="flex items-center justify-center h-[44px] w-[44px] bg-[#fffbe8] text-[#0f0f0f] rounded-r-full border border-black/10 border-l-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[
              "https://www.figma.com/api/mcp/asset/f865d74a-04f6-447e-8eec-5bc0a69dcfa3",
              "https://www.figma.com/api/mcp/asset/1a05ab2f-abfd-48e6-8063-09d47ca6923c",
              "https://www.figma.com/api/mcp/asset/187d8047-68ec-4337-a14a-1a614ca7f41e",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-full border-2 border-[#0f0f0f] overflow-hidden bg-[#181818]"
              >
                <Image
                  src={src}
                  alt="Member"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[rgba(255,251,232,0.5)]">
            Join <span className="text-[#fffbe8] font-medium">1,000+</span> designers
          </p>
        </motion.div>
      </div>
    </section>
  );
}
