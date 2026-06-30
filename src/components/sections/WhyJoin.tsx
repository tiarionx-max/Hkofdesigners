"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_REASONS } from "@/lib/data";

const ICONS = ["🛠️", "🤝", "👁️"];

export default function WhyJoin() {
  return (
    <section className="bg-[#0f0f0f] py-20 md:py-28 border-t border-[rgba(255,255,255,0.06)]">
      <div className="container-hk">
        <SectionHeading
          title="Why Designers Join HK"
          subtitle="More than a group chat, HK is a place where designers meaningfully grow, connect, and get seen."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHY_REASONS.map((reason, i) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
              className="flex flex-col gap-5"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-[#181818]">
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="text-4xl">{ICONS[i]}</span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#fffbe8] leading-tight">
                  {reason.title}
                </h3>
                <p className="text-[14px] text-[#ffb522] font-medium">
                  {reason.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
