import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Gallery from "@/components/sections/Gallery";
import StayInspired from "@/components/sections/StayInspired";
import WhyJoin from "@/components/sections/WhyJoin";
import Testimonials from "@/components/sections/Testimonials";
import Events from "@/components/sections/Events";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <StayInspired />
        <WhyJoin />
        <Testimonials />
        <Events />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
