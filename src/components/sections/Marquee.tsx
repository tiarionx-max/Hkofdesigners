import Badge from "@/components/ui/Badge";
import { MARQUEE_TAGS } from "@/lib/data";

export default function Marquee() {
  const doubled = [...MARQUEE_TAGS, ...MARQUEE_TAGS];

  return (
    <section
      className="relative bg-[#181818] border-y border-[rgba(255,255,255,0.08)] py-3 overflow-hidden"
      aria-label="Design categories"
    >
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-20 z-10 bg-gradient-to-r from-[#181818] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 inset-y-0 w-20 z-10 bg-gradient-to-l from-[#181818] to-transparent" />

      <div className="flex w-max animate-marquee">
        {doubled.map((tag, i) => (
          <div key={i} className="mx-2">
            <Badge label={tag.label} bg={tag.bg} text={tag.text} />
          </div>
        ))}
      </div>
    </section>
  );
}
