import Image from "next/image";
import { PARTNER_LOGOS_DATA } from "@/app/_lib/homepage-data";

function LogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-[88px] w-[180px] shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-4">
      <Image src={src} alt={alt} width={148} height={56} className="max-h-full max-w-full object-contain" />
    </div>
  );
}

export default function Partners() {
  const logosRev = [...PARTNER_LOGOS_DATA].reverse();

  return (
    <section id="partners" className="py-16 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-2">
          <h4 className="font-[family-name:var(--font-heading)] text-[#0f172a] font-bold text-[clamp(20px,2.4vw,26px)] tracking-[-0.02em] m-0">
            Featured Hospital Partners
          </h4>
          <p className="text-slate-500 text-sm mt-2 font-sans">
            JCI accredited and ISO-certified facilities across Thailand, ready to serve your team.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden mt-8">
        <div className="absolute inset-y-0 left-0 w-20 bg-[linear-gradient(90deg,#F5F5F5,transparent)] z-[2]" />
        <div className="absolute inset-y-0 right-0 w-20 bg-[linear-gradient(270deg,#F5F5F5,transparent)] z-[2]" />
        <div className="flex gap-6 w-max animate-[marqueeLeft_38s_linear_infinite]">
          {[...PARTNER_LOGOS_DATA, ...PARTNER_LOGOS_DATA].map((logo, i) => (
            <LogoCard key={`a-${i}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
        <div className="flex gap-6 w-max animate-[marqueeRight_34s_linear_infinite] mt-4">
          {[...logosRev, ...logosRev].map((logo, i) => (
            <LogoCard key={`b-${i}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
