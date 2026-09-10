import { Button, Tag } from "antd";
import { FiCheck } from "react-icons/fi";
import { glass } from "@/app/_lib/glass";
import type { MembershipPlan } from "@/app/_lib/membership-data";

export default function PlanCard({ plan }: { plan: MembershipPlan }) {
  return (
    <article
      className={`relative isolate flex flex-col rounded-[32px] p-8 transition-transform duration-300 dt:p-9 ${
        plan.isFeatured
          ? "dt:scale-105 shadow-[0_0_80px_rgba(243,59,39,0.35)]"
          : ""
      } ${glass.dark}`}
    >
      {plan.isFeatured && (
        <Tag className="absolute! -top-3! left-8! m-0! rounded-full! border-0! bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]! px-3! py-1! font-sans text-[11px]! font-bold! text-white! tracking-[0.1em]! uppercase!">
          Most popular
        </Tag>
      )}

      <h3 className="mb-2 font-heading text-[22px] font-bold tracking-[-0.02em] text-white">
        {plan.name}
      </h3>
      <div className="mb-1 flex items-baseline gap-1.5">
        <span className="font-heading text-[32px] leading-none font-bold tracking-[-0.03em] text-white">
          {plan.priceAnnual}
        </span>
        <span className="font-sans text-[13px] text-white/55">/ year</span>
      </div>
      <div className="mb-4 font-sans text-[13px] text-white/55">
        or {plan.priceMonthly} / month
      </div>
      <p className="mb-7 font-sans text-[14px] leading-[1.6] text-white/70">
        {plan.desc}
      </p>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.5] text-white/85"
          >
            <FiCheck size={16} className="mt-0.5 shrink-0 text-[#ff8a75]" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        type={plan.isFeatured ? "primary" : "default"}
        ghost={!plan.isFeatured}
        block
        size="large"
        href={`/auth/signup?tier=${plan.slug}`}
        className={
          plan.isFeatured
            ? "h-auto! border-0! bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]! py-3.5! text-[14.5px]! font-sans"
            : "h-auto! border-white/25! py-3.5! text-[14.5px]! text-white! font-sans hover:border-white/50! hover:text-white!"
        }
      >
        Become a Member
      </Button>
    </article>
  );
}
