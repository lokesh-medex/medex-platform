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

export default function Home() {
  return (
    <div className="font-sans">
      <Header active="" showCart={false} />
      <Hero />
      <StatsBand />
      <FeaturedServices />
      <Vendors />
      <ServicesOrbital />
      <Membership />
      <Partners />
      <Doctors />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
