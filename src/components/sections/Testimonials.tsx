"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STAR = "https://www.figma.com/api/mcp/asset/ca49fd01-3483-45ef-a4da-a5068b3dec9e";

const TESTIMONIALS = [
  {
    id: 1,
    quote: `"Before joining HK, I mostly designed alone and rarely shared my work. The community changed that completely. Every conversation, challenge, and piece of feedback pushed me to improve, and I have met people who genuinely celebrate each other's growth instead of competing."`,
    author: "Àlàgbé",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/681ba6ce-e27b-4697-95a9-a73e8b5ff8f3",
  },
  {
    id: 2,
    quote: `"One of the most rewarding aspects of this community is the mentorship opportunities. Sharing knowledge and experiences with both peers and newcomers has fostered a culture of continuous learning, which I find incredibly fulfilling. It's amazing to see how we can lift each other up and create impactful designs together."`,
    author: "Q dus",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/4ebf4985-529c-4bb8-a2af-f15391181c75",
  },
  {
    id: 3,
    quote: `"The community has helped me become more consistent with my craft. Seeing other members share their work inspired me to keep showing up, and the encouragement I received gave me the confidence to take on bigger creative projects.\n\nWhat makes HK special is that people care about more than your portfolio. You can celebrate wins, ask for advice, talk through setbacks, or simply have a good conversation. It feels like being surrounded by friends who want to see you succeed.\n\nSome of the best opportunities and connections I have made started with a simple conversation in HK. It is a community where collaboration happens naturally and everyone is encouraged to bring their ideas to the table. I love being here"`,
    author: "Amaria Graphics",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/c52bda2f-d37a-4ed3-b1c8-63595c64023f",
  },
  {
    id: 4,
    quote: `"I expected another online design group, but HK turned out to be something completely different. The discussions are thoughtful, the challenges are motivating, and the friendships feel genuine. It is a space where you are encouraged to grow without feeling like you have to prove yourself."`,
    author: "ΛCTUΛTOR",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/82f192e7-d3e6-45f9-9664-bf45ec683d7e",
  },
  {
    id: 5,
    quote: `"Joining HK reminded me that design is not meant to be a solo journey. Every week brings new ideas, honest conversations, and people who are willing to share what they know. It has become my favorite place to learn, create, and connect with others who understand the journey."`,
    author: "Elevate Designs",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/a8087b19-f6e2-4ce9-bfbe-ecc7652fc272",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Stars() {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="relative w-4 h-4 flex-none">
          <img src={STAR} alt="" aria-hidden className="absolute inset-0 w-full h-full" />
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <article
      className="bg-[#ffb522] rounded-[15px] overflow-hidden p-5 flex flex-col gap-4 relative"
      style={{ boxShadow: "7px 6px 0px 0px #fffbe8" }}
    >
      <Stars />

      <blockquote className="text-[14px] font-normal text-black leading-[1.2] flex-1">
        {t.quote.split("\n").map((para, i) =>
          para.trim() ? (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {para}
            </p>
          ) : null
        )}
      </blockquote>

      <footer className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex-none">
          <Image
            src={t.avatar}
            alt={t.author}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-px">
          <span className="text-[18px] font-normal text-black leading-[1.2]">{t.author}</span>
          <span className="text-[10px] text-[rgba(24,24,24,0.6)]">{t.date}</span>
        </div>
      </footer>
    </article>
  );
}

const COLS = [
  { cards: [0, 1], initial: { opacity: 0, x: -72 } },
  { cards: [2],    initial: { opacity: 0, y: 72 } },
  { cards: [3, 4], initial: { opacity: 0, x: 72 } },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0f0f0f] py-20 md:py-28 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.52, ease: EASE }}
          className="flex flex-col items-center text-center gap-3 mb-12"
        >
          <h2
            className="font-semibold text-[#fffbe8] leading-[1.1]"
            style={{ fontSize: "clamp(32px, 3.5vw, 48px)", maxWidth: 385 }}
          >
            Voices From the Community
          </h2>
          <p
            className="font-normal leading-[1.3]"
            style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 646 }}
          >
            Hear from designers who have found inspiration, friendships, opportunities, and a place
            to grow through HK.
          </p>
        </motion.div>

        {/* Desktop 3-col masonry with directional slide-in */}
        <div className="hidden md:grid grid-cols-3 gap-5 items-start">
          {COLS.map((col, colIdx) => (
            <motion.div
              key={colIdx}
              initial={col.initial}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: colIdx * 0.08 }}
              className="flex flex-col gap-5"
            >
              {col.cards.map((idx) => (
                <TestimonialCard key={TESTIMONIALS[idx].id} t={TESTIMONIALS[idx]} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Mobile single column — each card fades up */}
        <div className="md:hidden flex flex-col gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
