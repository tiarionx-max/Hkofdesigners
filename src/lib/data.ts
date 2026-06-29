import type {
  Testimonial,
  Feature,
  GalleryItem,
  Event,
  MarqueeTag,
  WhyReason,
} from "@/types";

export const MARQUEE_TAGS: MarqueeTag[] = [
  { label: "Motion", bg: "#FF3D3D", text: "#fff" },
  { label: "Social", bg: "#ffb522", text: "#000" },
  { label: "UI/UX", bg: "#4169FF", text: "#fff" },
  { label: "3D/2D", bg: "#00D084", text: "#000" },
  { label: "Graphic", bg: "#8B5CF6", text: "#fff" },
  { label: "Chat", bg: "#FF6B35", text: "#fff" },
  { label: "Collaborate", bg: "#fffbe8", text: "#000" },
  { label: "Wireframe", bg: "#FF3D3D", text: "#fff" },
  { label: "Branding", bg: "#4169FF", text: "#fff" },
  { label: "Illustration", bg: "#00D084", text: "#000" },
  { label: "Typography", bg: "#ffb522", text: "#000" },
  { label: "Product", bg: "#8B5CF6", text: "#fff" },
];

export const FEATURES: Feature[] = [
  {
    id: "whatsapp",
    title: "A growing community on WhatsApp & Telegram",
    cta: "Join Our Community",
    ctaHref: "#",
    mascot: "/mascots/blue-character.png",
    accent: "#4169FF",
  },
  {
    id: "resources",
    title: "Curated design resources & playlists",
    cta: "Explore Now",
    ctaHref: "#",
    mascot: "/mascots/red-character.png",
    accent: "#FF3D3D",
  },
  {
    id: "spaces",
    title: "Weekly X Spaces for creative discussions",
    cta: "Follow Us on X",
    ctaHref: "#",
    mascot: "/mascots/fish-character.png",
    accent: "#00D084",
  },
  {
    id: "projects",
    title: "Project highlights",
    description:
      "Tag your projects on social at X or TikTok for a chance to be featured in our Design Project Highlight.",
    cta: "Tag Us on X",
    ctaHref: "#",
    mascot: "/mascots/yellow-character.png",
    accent: "#ffb522",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", src: "https://picsum.photos/seed/design1/400/500", alt: "Design project 1", width: 400, height: 500 },
  { id: "g2", src: "https://picsum.photos/seed/design2/400/300", alt: "Design project 2", width: 400, height: 300 },
  { id: "g3", src: "https://picsum.photos/seed/design3/400/400", alt: "Design project 3", width: 400, height: 400 },
  { id: "g4", src: "https://picsum.photos/seed/design4/400/350", alt: "Design project 4", width: 400, height: 350 },
  { id: "g5", src: "https://picsum.photos/seed/design5/400/450", alt: "Design project 5", width: 400, height: 450 },
  { id: "g6", src: "https://picsum.photos/seed/design6/400/300", alt: "Design project 6", width: 400, height: 300 },
  { id: "g7", src: "https://picsum.photos/seed/design7/400/500", alt: "Design project 7", width: 400, height: 500 },
  { id: "g8", src: "https://picsum.photos/seed/design8/400/350", alt: "Design project 8", width: 400, height: 350 },
  { id: "g9", src: "https://picsum.photos/seed/design9/400/400", alt: "Design project 9", width: 400, height: 400 },
  { id: "g10", src: "https://picsum.photos/seed/design10/400/300", alt: "Design project 10", width: 400, height: 300 },
  { id: "g11", src: "https://picsum.photos/seed/design11/400/450", alt: "Design project 11", width: 400, height: 450 },
  { id: "g12", src: "https://picsum.photos/seed/design12/400/350", alt: "Design project 12", width: 400, height: 350 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Before joining HK, I mostly designed alone and rarely shared my work. The community changed that completely. Every conversation, challenge, and piece of feedback pushed me to improve, and I have met people who genuinely celebrate each other's growth instead of competing.",
    author: "Àlàgbé",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/f865d74a-04f6-447e-8eec-5bc0a69dcfa3",
  },
  {
    id: "t2",
    quote:
      "One of the most rewarding aspects of this community is the mentorship opportunities. Sharing knowledge and experiences with both peers and newcomers has fostered a culture of continuous learning, which I find incredibly fulfilling. It's amazing to see how we can lift each other up and create impactful designs together.",
    author: "Q dus",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/1a05ab2f-abfd-48e6-8063-09d47ca6923c",
  },
  {
    id: "t3",
    quote:
      "The community has helped me become more consistent with my craft. Seeing other members share their work inspired me to keep showing up, and the encouragement I received gave me the confidence to take on bigger creative projects.\n\nWhat makes HK special is that people care about more than your portfolio. You can celebrate wins, ask for advice, talk through setbacks, or simply have a good conversation. It feels like being surrounded by friends who want to see you succeed.\n\nSome of the best opportunities and connections I have made started with a simple conversation in HK. It is a community where collaboration happens naturally and everyone is encouraged to bring their ideas to the table. I love being here.",
    author: "Amaria Graphics",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/187d8047-68ec-4337-a14a-1a614ca7f41e",
  },
  {
    id: "t4",
    quote:
      "I expected another online design group, but HK turned out to be something completely different. The discussions are thoughtful, the challenges are motivating, and the friendships feel genuine. It is a space where you are encouraged to grow without feeling like you have to prove yourself.",
    author: "ΛCTUΛTOR",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/f9a81e54-ad0f-41db-bb93-cdaa6ce9c516",
  },
  {
    id: "t5",
    quote:
      "Joining HK reminded me that design is not meant to be a solo journey. Every week brings new ideas, honest conversations, and people who are willing to share what they know. It has become my favorite place to learn, create, and connect with others who understand the journey.",
    author: "Elevate Designs",
    date: "June, 2026",
    avatar: "https://www.figma.com/api/mcp/asset/e19f608d-f6c3-4f62-b443-d1e89edeebcc",
  },
];

export const EVENTS: Event[] = [
  {
    id: "e1",
    title: "PS CC Masterclass",
    description:
      "1 hour PS CC masterclass with Genius graphics in collaboration with HK of Designers.",
    date: "Nov 14, 2025 Friday",
    time: "09:00 PM (WAT)",
    location: "Google Meet · Remote",
    image: "https://picsum.photos/seed/event1/300/300",
    ctaLabel: "RSVP on Luma",
    ctaHref: "#",
  },
  {
    id: "e2",
    title: "PS CC Masterclass",
    description:
      "1 hour PS CC masterclass with Genius graphics in collaboration with HK of Designers.",
    date: "Nov 14, 2025 Friday",
    time: "09:00 PM (WAT)",
    location: "Google Meet · Remote",
    image: "https://picsum.photos/seed/event2/300/300",
    ctaLabel: "RSVP on Luma",
    ctaHref: "#",
  },
  {
    id: "e3",
    title: "PS CC Masterclass",
    description:
      "1 hour PS CC masterclass with Genius graphics in collaboration with HK of Designers.",
    date: "Nov 14, 2025 Friday",
    time: "09:00 PM (WAT)",
    location: "Google Meet · Remote",
    image: "https://picsum.photos/seed/event3/300/300",
    ctaLabel: "RSVP on Luma",
    ctaHref: "#",
  },
];

export const WHY_REASONS: WhyReason[] = [
  {
    id: "w1",
    title: "Learn by Doing.",
    subtitle: "Fueled by Great Ideas.",
    image: "https://picsum.photos/seed/why1/360/200",
  },
  {
    id: "w2",
    title: "Meet Great Creatives.",
    subtitle: "Take on Bigger Challenges.",
    image: "https://picsum.photos/seed/why2/360/200",
  },
  {
    id: "w3",
    title: "Get Seen in a",
    subtitle: "Community That Cheers You On.",
    image: "https://picsum.photos/seed/why3/360/200",
  },
];
