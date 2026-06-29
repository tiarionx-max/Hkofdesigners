"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/data";

const COL_COUNTS = [
  [0, 3, 6, 9],   // col 1
  [1, 4, 7, 10],  // col 2
  [2, 5, 8, 11],  // col 3
];

export default function Gallery() {
  return (
    <section className="bg-[#0f0f0f] py-16 overflow-hidden">
      <div className="container-hk">
        {/* Masonry-style columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COL_COUNTS.map((indices, colIdx) => (
            <div key={colIdx} className={`flex flex-col gap-3 ${colIdx === 2 ? "hidden md:flex" : ""}`}>
              {indices.map((itemIdx, rowIdx) => {
                const item = GALLERY_ITEMS[itemIdx];
                if (!item) return null;
                const isFirst = rowIdx === 0;
                const aspectRatio = isFirst ? "aspect-[4/5]" : rowIdx === 1 ? "aspect-[4/3]" : rowIdx === 2 ? "aspect-square" : "aspect-[4/3]";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: colIdx * 0.08 + rowIdx * 0.06,
                    }}
                    className={`relative ${aspectRatio} rounded-[12px] overflow-hidden bg-[#181818] group cursor-pointer`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
