import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Hero from "@/app/_components/home/Hero";
import FeaturedServices from "@/app/_components/home/FeaturedServices";
import Vendors from "@/app/_components/home/Vendors";
import Membership from "@/app/_components/home/Membership";
import ServicesOrbital from "@/app/_components/home/ServicesOrbital";
import Partners from "@/app/_components/home/Partners";
import Doctors from "@/app/_components/home/Doctors";
import Testimonials from "@/app/_components/home/Testimonials";
import CTA from "@/app/_components/home/CTA";

export default function Home() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      <Header active="" showCart={false} />
      <Hero />
      <FeaturedServices />
      <Vendors />
      <Membership />
      <ServicesOrbital />
      <Partners />
      <Doctors />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
