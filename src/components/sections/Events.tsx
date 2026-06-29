"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENTS } from "@/lib/data";

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function Events() {
  return (
    <section className="bg-[#0f0f0f] py-20 md:py-28 border-t border-[rgba(255,255,255,0.06)]">
      <div className="container-hk">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-[28px] md:text-[36px] font-semibold text-[#fffbe8]">
            What&apos;s Happening Next
          </h2>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[rgba(255,251,232,0.6)] hover:text-[#fffbe8] bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.12)] px-4 py-2 rounded-full transition-colors"
          >
            See All Events
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENTS.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              className="group rounded-[18px] bg-[#181818] border border-[rgba(255,255,255,0.08)] overflow-hidden hover:border-[rgba(255,255,255,0.16)] transition-colors"
            >
              {/* Event image */}
              <div className="relative aspect-square overflow-hidden bg-[#0f0f0f]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Logo watermark */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#181818]/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className="flex gap-[3px] items-center">
                    <span className="block w-[8px] h-[8px] rounded-sm bg-[#FF3D3D]" />
                    <span className="block w-[8px] h-[8px] rounded-full bg-[#FF8C00]" />
                    <span className="block w-0 h-0" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: "8px solid #4169FF" }} />
                  </div>
                  <span className="text-[10px] font-medium text-[#fffbe8]">HK of Designers</span>
                </div>
              </div>

              {/* Event info */}
              <div className="p-5 flex flex-col gap-4">
                <h3 className="text-[17px] font-semibold text-[#fffbe8]">{event.title}</h3>
                <p className="text-[13px] text-[rgba(255,251,232,0.55)] leading-relaxed">
                  {event.description}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] text-[rgba(255,251,232,0.45)]">
                    <ClockIcon />
                    {event.date} · {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[rgba(255,251,232,0.45)]">
                    <MapPinIcon />
                    {event.location}
                  </div>
                </div>

                <a
                  href={event.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 mt-auto px-5 py-2.5 rounded-full bg-[#fffbe8] text-[#0f0f0f] text-[13px] font-medium hover:bg-white transition-colors shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                >
                  {event.ctaLabel}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
