import Header from "@/app/_components/home/Header";
import Footer from "@/app/_components/home/Footer";
import Hero from "@/app/_components/home/Hero";
import StatsBand from "@/app/_components/home/StatsBand";
import FeaturedServices from "@/app/_components/home/FeaturedServices";
import Vendors from "@/app/_components/home/Vendors";
import ServicesOrbital from "@/app/_components/home/ServicesOrbital";
import Membership from "@/app/_components/home/Membership";
import Partners from "@/app/_components/home/Partners";
import Doctors from "@/app/_components/home/Doctors";
import Testimonials from "@/app/_components/home/Testimonials";
import CTA from "@/app/_components/home/CTA";

// Consecutive sections in the same "register" (light vs. dark) are grouped
// under one shared-background wrapper instead of each painting its own —
// see the comment on FLAT SECTION GROUNDS in `_components/home/Mesh.tsx`.
// That wrapper also owns `overflow-hidden`: each section keeps `relative`
// (so its own Mesh/BackdropMotifs layers still position against it) but not
// the clip, so a Parallax-drifted layer can bleed into its neighbor within
// the run instead of getting cut off at the section boundary.
// Hero stands alone (no neighboring dark section), so it isn't wrapped.
export default function Home() {
  return (
    <div className="font-sans">
      <Header active="" showCart={false} />
      <Hero />
      <div className="overflow-hidden bg-[#f8f5fa]">
        <StatsBand />
        <FeaturedServices />
        <Vendors />
      </div>
      <div className="overflow-hidden bg-[#100119]">
        <ServicesOrbital />
        <Membership />
      </div>
      <div className="overflow-hidden bg-[#f8f5fa]">
        <Partners />
        <Doctors />
        <Testimonials />
      </div>
      <div className="overflow-hidden bg-[#0d0116]">
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
