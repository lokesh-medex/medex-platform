"use client";

import { useRef, useState } from "react";
import { Carousel, type CarouselRef } from "antd";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorGalleryProps {
  vendor: Vendor;
}

/** Main image carousel + a thumbnail strip that jumps the carousel via its ref. */
export default function VendorGallery({ vendor }: VendorGalleryProps) {
  const carouselRef = useRef<CarouselRef>(null);
  const [active, setActive] = useState(0);

  return (
    <div>
      <div
        className={`relative rounded-[20px] overflow-hidden h-[min(46vh,420px)] min-h-[280px] border border-white/70 shadow-[0_8px_32px_rgba(15,23,42,0.12)] ${glass.subtle}`}
      >
        <Carousel
          ref={carouselRef}
          afterChange={setActive}
          dotPosition="bottom"
        >
          {vendor.gallery.map((src, i) => (
            <div
              key={src + i}
              className="relative h-[min(46vh,420px)] min-h-[280px]"
            >
              <ImageWithFallback
                src={src}
                alt={`${vendor.title} photo ${i + 1}`}
                fill
                sizes="(min-width: 1040px) 60vw, 100vw"
                className="object-cover"
                priority={i === 0}
                fallback={
                  <InitialsAvatar
                    name={vendor.title}
                    rounded="lg"
                    className="absolute inset-0 h-full! w-full! text-5xl!"
                  />
                }
              />
            </div>
          ))}
        </Carousel>
      </div>

      {vendor.gallery.length > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {vendor.gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => carouselRef.current?.goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? "border-primary" : "border-transparent"
              }`}
            >
              <ImageWithFallback
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                fallback={
                  <InitialsAvatar
                    name={vendor.title}
                    rounded="lg"
                    className="absolute inset-0 h-full! w-full! text-lg!"
                  />
                }
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
