import { Button, Tag } from "antd";
import { FaStar } from "react-icons/fa";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import type { ListingItem } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";

/** One card in the listings grid — a lab test, package, service, vendor or doctor offer. */
export default function ListingCard({ item }: { item: ListingItem }) {
  return (
    <div
      className={`rounded-[18px] overflow-hidden flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_#0f172a1a] ${glass.subtle}`}
    >
      <div
        className="relative h-37.5 overflow-hidden"
        style={{ background: item.gradient }}
      >
        {item.img && (
          <ImageWithFallback
            src={item.img}
            alt={item.title}
            fill
            sizes="(min-width: 1040px) 25vw, 50vw"
            className="object-cover"
            fallback={
              <InitialsAvatar
                name={item.title.replace("Dr. ", "")}
                rounded="lg"
                className="absolute inset-0 h-full w-full text-4xl"
              />
            }
          />
        )}
        <Tag
          variant="filled"
          style={{ color: item.tagColor }}
          className="m-0! absolute! top-2.5 left-2.5 text-[11px]! font-bold tracking-[0.02em] bg-white! rounded-full px-2.5! py-1! font-sans leading-normal!"
        >
          {item.category}
        </Tag>
        {item.badge && (
          <Tag
            variant="filled"
            className="m-0! absolute! top-2.5 right-2.5 text-[10.5px]! font-bold text-white! bg-primary! rounded-full px-2.5! py-1! font-sans leading-normal!"
          >
            {item.badge}
          </Tag>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-heading text-slate-900 font-bold text-[15.5px] leading-[1.3] m-0 mb-1.5">
          {item.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          {item.rating && (
            <>
              <FaStar size={13} className="text-primary" />
              <span className="text-[12.5px] font-bold text-slate-900">
                {item.rating}
              </span>
              <span className="text-slate-300">·</span>
            </>
          )}
          <span className="text-[12.5px] text-slate-500">{item.meta}</span>
        </div>
        {item.vendorName && (
          <span className="text-xs font-bold text-secondary mb-3">
            {item.vendorName}
          </span>
        )}
        <div className="flex items-center justify-between gap-2.5 mt-auto">
          {item.price != null && (
            <span className="font-heading text-slate-900 font-bold text-[15px]">
              NPR {item.price.toLocaleString()}
            </span>
          )}
          <Button
            type="primary"
            className="whitespace-nowrap! text-[12.5px]! h-auto! py-2.5! px-4! text-white! font-bold! font-sans bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]!"
          >
            {item.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
