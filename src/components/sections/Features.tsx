"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { FEATURES } from "@/lib/data";

const MASCOT_COLORS: Record<string, { bg: string; ring: string }> = {
  whatsapp: { bg: "#e8f4ff", ring: "#4169FF" },
  resources: { bg: "#ffe8e8", ring: "#FF3D3D" },
  spaces: { bg: "#e8fff5", ring: "#00D084" },
  projects: { bg: "#fff8e8", ring: "#ffb522" },
};

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export default function Features() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-hk">
        <SectionHeading
          title="Built by Designers, for Designers."
          subtitle="At HK of Design, we offer a space where designers collaborate, learn, and inspire one another"
          dark
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((feature, i) => {
            const colors = MASCOT_COLORS[feature.id] ?? { bg: "#f5f5f5", ring: "#ccc" };
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.1 }}
                className="group relative rounded-[20px] bg-[#f9f7f2] border border-black/[0.07] p-6 flex flex-col gap-4 overflow-hidden hover:border-black/15 transition-colors"
              >
                {/* Decorative mascot placeholder */}
                <div
                  className="absolute right-4 top-4 w-[80px] h-[80px] rounded-2xl flex items-center justify-center opacity-80"
                  style={{ backgroundColor: colors.bg, border: `2px solid ${colors.ring}20` }}
                  aria-hidden="true"
                >
                  <span className="text-3xl">
                    {feature.id === "whatsapp" && "💬"}
                    {feature.id === "resources" && "🎨"}
                    {feature.id === "spaces" && "🎙️"}
                    {feature.id === "projects" && "✨"}
                  </span>
                </div>

                <div className="max-w-[75%]">
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-[#0f0f0f] leading-snug">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="mt-2 text-[13px] text-[rgba(15,15,15,0.6)] leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>

                <Link
                  href={feature.ctaHref}
                  className="inline-flex items-center gap-2 mt-auto text-[13px] font-medium text-[#0f0f0f] bg-[#0f0f0f]/[0.07] hover:bg-[#0f0f0f]/[0.12] px-4 py-2 rounded-full w-fit transition-colors"
                >
                  {feature.cta}
                  <ArrowRight />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
