"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import type { Testimonial } from "@/types";

function TestimonialCard({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className="relative bg-[#ffb522] rounded-[15px] overflow-hidden p-5 flex flex-col gap-4"
      style={{ boxShadow: "7px 6px 0px 0px #fffbe8" }}
    >
      {/* Stars */}
      <StarRating />

      {/* Quote */}
      <blockquote className="text-[14px] font-normal text-black leading-[1.55] flex-1">
        {testimonial.quote.split("\n").map((para, i) =>
          para.trim() ? (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {para}
            </p>
          ) : null
        )}
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-2 pt-2 border-t border-black/10">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[15px] font-normal text-black leading-tight">
            {testimonial.author}
          </span>
          <span className="text-[10px] text-[rgba(24,24,24,0.55)]">
            {testimonial.date}
          </span>
        </div>
      </footer>
    </motion.article>
  );
}

export default function Testimonials() {
  // Split into 3 columns like Figma layout
  const col1 = [TESTIMONIALS[0], TESTIMONIALS[1]];
  const col2 = [TESTIMONIALS[2]];
  const col3 = [TESTIMONIALS[3], TESTIMONIALS[4]];

  return (
    <section className="bg-[#0f0f0f] py-20 md:py-28 border-t border-[rgba(255,255,255,0.06)]">
      <div className="container-hk">
        <SectionHeading
          title="Voices From the Community"
          subtitle="Hear from designers who have found inspiration, friendships, opportunities, and a place to grow through HK."
          className="mb-12"
        />

        {/* Desktop 3-col masonry */}
        <div className="hidden md:grid grid-cols-3 gap-5 items-start">
          <div className="flex flex-col gap-5">
            {col1.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={i * 0.1} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {col2.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={0.1 + i * 0.1} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {col3.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={0.2 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* Mobile single column */}
        <div className="md:hidden flex flex-col gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
