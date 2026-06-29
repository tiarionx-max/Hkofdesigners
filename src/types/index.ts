export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  date: string;
  avatar: string;
}

export interface Feature {
  id: string;
  title: string;
  description?: string;
  cta: string;
  ctaHref: string;
  mascot: string;
  accent: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MarqueeTag {
  label: string;
  bg: string;
  text: string;
}

export interface WhyReason {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}
