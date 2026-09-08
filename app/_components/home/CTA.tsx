import { Button } from "antd";

export default function CTA() {
  return (
    <section className="px-5 dt:px-8 pb-16 bg-[#F5F5F5]">
      <div className="max-w-[1024px] mx-auto rounded-3xl py-14 px-8 text-center bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]">
        <h2 className="font-heading text-white font-bold text-[clamp(22px,2.6vw,30px)] tracking-[-0.02em] mb-3">
          Find the right care, without the runaround.
        </h2>
        <p className="text-primary-50 max-w-[420px] mx-auto mb-7 font-sans">
          Join as a partner to reach more patients, or become a member to unlock
          exclusive benefits.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            type="text"
            className="h-auto! py-3! px-6! text-sm! bg-white! text-primary-700! font-sans transition-[transform,box-shadow]! duration-150! hover:-translate-y-0.5! hover:shadow-[0_8px_20px_#00000033]!"
          >
            Become a Partner
          </Button>
          <Button
            type="text"
            className="h-auto! py-3! px-6! text-sm! bg-transparent! text-white! border-[1.5px]! border-white! font-sans transition-[transform,background]! duration-150! hover:-translate-y-0.5! hover:bg-white/15!"
          >
            Become a Member
          </Button>
        </div>
      </div>
    </section>
  );
}
