"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  dark = false,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  const textColor = dark ? "text-[#0f0f0f]" : "text-[#fffbe8]";
  const subtitleColor = dark
    ? "text-[rgba(15,15,15,0.65)]"
    : "text-[rgba(255,251,232,0.65)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 ${centered ? "items-center text-center" : "items-start"} ${className}`}
    >
      <h2 className={`text-[32px] md:text-[40px] font-semibold leading-tight tracking-tight ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[16px] md:text-[18px] font-normal leading-relaxed max-w-[560px] ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
