import Link from "next/link";
import { Button } from "antd";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import { SOCIAL_LINKS_DATA } from "@/app/_lib/homepage-data";
import { BRANCHES } from "@/app/_lib/contact-data";
import BranchCard from "@/app/_components/contact/BranchCard";
import ContactForm from "@/app/_components/contact/ContactForm";

const SOCIAL_ICON: Record<string, React.ReactNode> = {
  Facebook: <FaFacebookF size={13} />,
  Instagram: <FaInstagram size={13} />,
  LinkedIn: <FaLinkedinIn size={13} />,
  YouTube: <FaYoutube size={13} />,
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="bg-[#F5F5F5]">
        <div className="relative overflow-hidden">
          <Mesh preset="contact" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={63}
            zone="edges"
            minSize={100}
            maxSize={190}
          />
          <div className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-6 pb-2">
            <div
              className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full px-4 py-2 text-[13px] text-slate-500 ${glass.subtle}`}
            >
              <Link href="/" className="text-slate-500 shrink-0">
                Home
              </Link>
              <span className="shrink-0">/</span>
              <span className="text-slate-900 font-semibold truncate">
                Contact
              </span>
            </div>
          </div>
        </div>

        <section className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14">
          <Reveal preset="standard" className="mb-8">
            <h1 className="font-heading text-slate-900 font-bold text-2xl leading-[1.25] m-0">
              Get in Touch
            </h1>
            <p className="mt-2 max-w-[560px] text-sm text-slate-500">
              Questions about a package, a booking, or partnering with Medex —
              reach your nearest branch or send us a message.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 dt:grid-cols-[1.1fr_1fr] gap-9 items-start">
            {/* LEFT: branches — stacked, flows with the page (same as the
                cart page's line-item list next to its sticky summary). No
                inner scrollbox: the sticky form to the right already stays
                visible as this column scrolls past. */}
            <div>
              <h2 className="font-heading text-slate-900 font-bold text-lg m-0 mb-4">
                Our Branches
              </h2>
              <div className="flex flex-col gap-5">
                {BRANCHES.map((branch) => (
                  <BranchCard key={branch.id} branch={branch} />
                ))}
              </div>
            </div>

            {/* RIGHT: form — sticky so it's visible without scrolling the page */}
            <div
              className={`rounded-[20px] p-6 dt:p-8 dt:sticky dt:top-28 ${glass.subtle}`}
            >
              <h2 className="font-heading text-slate-900 font-bold text-lg m-0 mb-2">
                Send us a message
              </h2>
              <p className="mb-5 text-sm text-slate-500">
                Have a general question, or one for a specific branch? Drop us a
                message and our team will get back to you.
              </p>
              <ContactForm />

              <div className="mt-6 flex items-center gap-2.5 border-t border-slate-200 pt-6">
                <span className="mr-1 text-xs font-bold text-slate-500">
                  Follow us
                </span>
                {SOCIAL_LINKS_DATA.map((soc) => (
                  <Button
                    key={soc.label}
                    type="text"
                    shape="circle"
                    href={soc.href}
                    aria-label={soc.label}
                    className="h-8! w-8! bg-slate-100! text-slate-500! hover:text-slate-900!"
                    icon={SOCIAL_ICON[soc.label]}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
