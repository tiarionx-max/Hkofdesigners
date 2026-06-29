import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Events", href: "/events" },
  { label: "Join Us", href: "#" },
];

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-[rgba(255,255,255,0.08)]">
      {/* Main footer body */}
      <div className="container-hk py-16 md:py-20">
        {/* Top row: tagline + nav */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
          <p className="text-[14px] text-[rgba(255,251,232,0.5)] max-w-[260px] leading-relaxed">
            A Creative Home for <span className="text-[#ffb522]">Every</span> Designer.
          </p>

          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] text-[rgba(255,251,232,0.55)] hover:text-[#fffbe8] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Large logo text */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-10">
          <div className="flex items-start gap-4 mb-2">
            {/* Geometric mark (large) */}
            <div className="flex items-end gap-[5px] mt-2">
              <span className="block w-[32px] h-[32px] rounded-[6px] bg-[#FF3D3D]" />
              <span className="block w-[32px] h-[32px] rounded-full bg-[#FF8C00]" />
              <span
                className="block w-0 h-0"
                style={{
                  borderLeft: "16px solid transparent",
                  borderRight: "16px solid transparent",
                  borderBottom: "32px solid #4169FF",
                }}
              />
            </div>
          </div>
          <h2 className="text-[clamp(56px,10vw,120px)] font-semibold leading-[0.9] tracking-tight text-[#fffbe8]">
            HK of
            <br />
            Designers
          </h2>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="container-hk py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[rgba(255,251,232,0.35)]">
            © 2026 HK of Designers. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-[rgba(255,251,232,0.4)] hover:text-[#fffbe8] transition-colors"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
