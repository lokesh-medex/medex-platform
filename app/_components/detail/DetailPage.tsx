"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Tag } from "antd";
import { FaStar } from "react-icons/fa";
import { FiCheck, FiShield, FiShoppingBag } from "react-icons/fi";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import {
  DETAIL_CATALOG,
  formatPrice,
  parsePrice,
  splitCredit,
  type DetailCategory,
  type DetailItem,
} from "@/app/_lib/detail-data";

interface DetailPageProps {
  category: DetailCategory;
}

/** Sticky (desktop) buy box: rating/vendor summary, quantity stepper and cart actions. */
function BuyBox({
  item,
  qty,
  totalPrice,
  onDecQty,
  onIncQty,
  onAddToCart,
}: {
  item: DetailItem;
  qty: number;
  totalPrice: string;
  onDecQty: () => void;
  onIncQty: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="flex flex-col gap-4.5 bg-white rounded-[20px] border border-slate-200 p-6 dt:sticky dt:top-[88px]">
      <Tag
        variant="filled"
        className="self-start m-0! text-xs! font-bold text-secondary! bg-secondary-100! rounded-full px-3! py-1.5! border-0!"
      >
        {item.categoryLabel}
      </Tag>
      <h1 className="font-heading text-slate-900 font-bold text-2xl leading-[1.25] m-0">
        {item.title}
      </h1>

      <div className="flex items-center gap-1.5">
        <FaStar size={15} color="#f59e0b" />
        <span className="text-[13.5px] font-bold text-slate-900">
          {item.rating}
        </span>
        <span className="text-[13px] text-slate-400">
          ({item.reviewCount} reviews)
        </span>
        <span className="text-slate-300">&middot;</span>
        <span className="text-[13px] text-slate-500">{item.meta}</span>
      </div>

      <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl">
        <Image
          src={item.vendorLogo}
          alt={item.vendorName}
          height={36}
          width={36}
          className="h-9 w-9 rounded-[10px] object-contain bg-white border border-slate-200"
        />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[13.5px] font-bold text-slate-900 truncate">
            {item.vendorName}
          </span>
          <span className="text-xs text-slate-500 truncate">
            {item.vendorLocation}
          </span>
        </div>
        <a
          href="#"
          className="ml-auto text-[12.5px] font-bold text-primary whitespace-nowrap"
        >
          View vendor
        </a>
      </div>

      <div className="flex items-baseline gap-2.5 pt-1">
        <span className="font-heading text-slate-900 font-bold text-[28px]">
          {item.price}
        </span>
        {item.originalPrice && (
          <>
            <span className="text-[15px] text-slate-400 line-through">
              {item.originalPrice}
            </span>
            <span className="text-[12.5px] font-extrabold text-green-600">
              {item.discountPct}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border-[1.5px] border-slate-200 rounded-full overflow-hidden">
          <Button
            type="text"
            onClick={onDecQty}
            aria-label="Decrease quantity"
            className="w-9! h-9! rounded-none! text-base! font-bold text-slate-900!"
          >
            −
          </Button>
          <span className="w-8 text-center text-sm font-bold text-slate-900">
            {qty}
          </span>
          <Button
            type="text"
            onClick={onIncQty}
            aria-label="Increase quantity"
            className="w-9! h-9! rounded-none! text-base! font-bold text-slate-900!"
          >
            +
          </Button>
        </div>
        <span className="text-[12.5px] text-slate-500">
          Total: {totalPrice}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          type="text"
          block
          onClick={onAddToCart}
          icon={<FiShoppingBag size={17} />}
          className="h-auto! py-3.5! text-white! text-[15px]! font-sans bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]!"
        >
          Add to Cart
        </Button>
        <Button
          type="text"
          block
          className="h-auto! py-3.5! bg-white! text-slate-900! text-[15px]! border-[1.5px]! border-slate-200! font-sans"
        >
          Book Now
        </Button>
      </div>

      <div className="flex items-start gap-2 pt-2.5 border-t border-slate-200">
        <FiShield size={15} className="shrink-0 mt-0.5 text-green-600" />
        <span className="text-xs text-slate-500">
          Free cancellation up to 24 hours before your appointment.
        </span>
      </div>
    </div>
  );
}

export default function DetailPage({ category }: DetailPageProps) {
  const item = DETAIL_CATALOG[category];
  const [qty, setQty] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const totalPrice = formatPrice(parsePrice(item.price) * qty);
  const credit = splitCredit(item.credit);

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      <Header active="" showCart cartCount={cartCount} />

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8 pt-4 flex items-center gap-1.5 text-[13px] text-slate-500">
        <Link href="/" className="text-slate-500">
          Home
        </Link>
        <span>/</span>
        <a href="#" className="text-slate-500">
          {item.categoryLabel}
        </a>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{item.title}</span>
      </div>

      <section className="max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14 grid grid-cols-1 dt:grid-cols-[1.5fr_1fr] gap-9 items-start">
        {/* LEFT: image, description, includes */}
        <div>
          <div className="relative rounded-[20px] overflow-hidden h-[min(46vh,420px)] min-h-[280px]">
            <Image
              src={item.imgSrc}
              alt={item.title}
              fill
              sizes="(min-width: 1040px) 60vw, 100vw"
              className="object-cover"
              priority
            />
            {item.badge && (
              <Tag
                variant="filled"
                className="absolute top-4 left-4 m-0! bg-primary! text-white! text-xs! font-extrabold rounded-full px-3.5! py-1.5! border-0!"
              >
                {item.badge}
              </Tag>
            )}
            <span className="absolute left-1.5 bottom-1.5 max-w-[calc(100%-12px)] truncate text-[11px] text-white bg-black/40 rounded px-1.5 py-0.5">
              {credit ? (
                <>
                  {credit.before}
                  <a
                    href={item.creditHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline"
                  >
                    {credit.name}
                  </a>
                  {credit.after}
                  <a
                    href="https://unsplash.com/?utm_source=medex&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline"
                  >
                    Unsplash
                  </a>
                </>
              ) : (
                item.credit
              )}
            </span>
          </div>

          <div className="mt-7">
            <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
              Description
            </h2>
            <p className="text-slate-600 text-[14.5px] leading-[1.7] m-0">
              {item.description}
            </p>
          </div>

          <div className="mt-7">
            <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
              {item.includesHeading}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
              {item.includes.map((inc) => (
                <div
                  key={inc}
                  className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5"
                >
                  <FiCheck size={16} className="shrink-0 text-primary" />
                  <span className="text-[13.5px] text-slate-700 font-semibold">
                    {inc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: buy box */}
        <BuyBox
          item={item}
          qty={qty}
          totalPrice={totalPrice}
          onDecQty={() => setQty((q) => Math.max(1, q - 1))}
          onIncQty={() => setQty((q) => q + 1)}
          onAddToCart={() => setCartCount((c) => c + qty)}
        />
      </section>

      <Footer />
    </div>
  );
}
