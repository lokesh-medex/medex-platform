/**
 * Shared shell for /terms and /privacy — same Vivid Mesh composition as
 * /about and /contact (light breadcrumb + hero on `Mesh preset="contact"`,
 * quiet BackdropMotifs), but the body is a single readable glass card of
 * prose instead of a marketing section grid, since this is reference
 * material a visitor scans or searches rather than a page they browse.
 * Closes with the shared dark CTA + Footer, matching every other route.
 */

import Link from "next/link";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import CTA from "@/app/_components/home/CTA";
import Footer from "@/app/_components/home/Footer";
import type { LegalContent } from "@/app/_lib/legal-data";

interface IProps {
  content: LegalContent;
}

export default function LegalPage({ content }: IProps) {
  const { eyebrow, title, lastUpdated, intro, sections } = content;

  return (
    <PageShell showFooter={false}>
      <div className="overflow-hidden bg-[#F5F5F5]">
        <div className="relative">
          <Mesh preset="contact" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={title.length}
            zone="edges"
            minSize={100}
            maxSize={190}
          />

          <div className="relative mx-auto max-w-[1280px] px-5 pt-6 pb-2 dt:px-8">
            <div
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[13px] text-slate-500 ${glass.subtle}`}
            >
              <Link href="/" className="shrink-0 text-slate-500">
                Home
              </Link>
              <span className="shrink-0">/</span>
              <span className="truncate font-semibold text-slate-900">
                {title}
              </span>
            </div>
          </div>

          <Reveal
            preset="standard"
            className="relative mx-auto max-w-[1280px] px-5 pt-8 pb-12 dt:px-8"
          >
            <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
              {eyebrow}
            </span>
            <h1 className="mt-3 font-heading text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.035em] text-slate-900">
              {title}
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Last updated {lastUpdated}
            </p>
            <p className="mt-5 max-w-[720px] text-sm leading-relaxed text-slate-600">
              {intro}
            </p>
          </Reveal>
        </div>

        <section className="relative mx-auto max-w-[1280px] px-5 pb-20 dt:px-8">
          <Reveal
            preset="subtle"
            className={`flex max-w-[820px] flex-col gap-8 rounded-[20px] p-6 dt:p-10 ${glass.subtle}`}
          >
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="m-0 mb-3 font-heading text-lg font-bold text-slate-900">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="m-0 text-sm leading-relaxed text-slate-600"
                    >
                      {p}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="m-0 flex flex-col gap-2 pl-5 text-sm leading-relaxed text-slate-600">
                      {section.list.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <div className="overflow-hidden bg-[#0d0116]">
        <CTA />
        <Footer />
      </div>
    </PageShell>
  );
}
