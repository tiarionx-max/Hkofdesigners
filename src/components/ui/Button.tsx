"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-[#fffbe8] text-[#0f0f0f] border border-black/10 shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]",
  ghost:
    "bg-transparent text-[#fffbe8] border border-[rgba(255,255,255,0.15)] hover:bg-white/5",
  outline:
    "bg-transparent text-[#fffbe8] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.5)]",
};

const sizes = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-2.5 text-[14px]",
  lg: "px-8 py-3.5 text-[15px]",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  disabled = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-medium leading-tight transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffbe8]/50 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link
          href={href}
          className={base}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={base}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
