"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Tag } from "antd";
import { FiShoppingBag } from "react-icons/fi";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { glass } from "@/app/_lib/glass";
import { formatPrice, parsePrice } from "@/app/_lib/detail-data";
import { CART_ITEMS, cartCatalogItem } from "@/app/_lib/cart-data";

/** Quantity stepper — same circular-pill ± control as DetailPage's BuyBox. */
function QtyStepper({
  qty,
  onDec,
  onInc,
}: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex items-center border-[1.5px] border-slate-200 rounded-full overflow-hidden">
      <Button
        type="text"
        onClick={onDec}
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
        onClick={onInc}
        aria-label="Increase quantity"
        className="w-9! h-9! rounded-none! text-base! font-bold text-slate-900!"
      >
        +
      </Button>
    </div>
  );
}

export default function CartPage() {
  const [qtyById, setQtyById] = useState(() =>
    Object.fromEntries(CART_ITEMS.map((line) => [line.id, line.qty]))
  );

  const lines = CART_ITEMS.map((line) => ({
    ...cartCatalogItem(line.id),
    id: line.id,
    qty: qtyById[line.id],
  }));

  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce(
    (sum, line) => sum + parsePrice(line.price) * line.qty,
    0
  );

  const setQty = (id: string, qty: number) =>
    setQtyById((prev) => ({ ...prev, [id]: qty }));

  return (
    <PageShell showCart cartCount={cartCount}>
      <div className="bg-[#F5F5F5]">
        <div className="relative overflow-hidden">
          <Mesh preset="cart" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={91}
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
                Cart
              </span>
            </div>
          </div>
        </div>

        <section className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14 grid grid-cols-1 dt:grid-cols-[1.5fr_1fr] gap-9 items-start">
          <h1 className="font-heading text-slate-900 font-bold text-2xl leading-[1.25] m-0 dt:col-span-2">
            Your Cart
          </h1>

          {/* LEFT: line items */}
          <div className="flex flex-col gap-4">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-[20px] p-5 ${glass.subtle}`}
              >
                <Image
                  src={line.imgSrc}
                  alt={line.title}
                  height={80}
                  width={80}
                  className="h-20 w-20 rounded-2xl object-cover shrink-0"
                />
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <Tag
                    variant="filled"
                    className="self-start m-0! text-xs! font-bold text-secondary! bg-secondary-100! rounded-full px-3! py-1.5! border-0!"
                  >
                    {line.categoryLabel}
                  </Tag>
                  <span className="font-heading text-slate-900 font-bold text-base truncate">
                    {line.title}
                  </span>
                  <span className="text-xs text-slate-500 truncate">
                    {line.vendorName}
                  </span>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
                  <QtyStepper
                    qty={line.qty}
                    onDec={() => setQty(line.id, Math.max(1, line.qty - 1))}
                    onInc={() => setQty(line.id, line.qty + 1)}
                  />
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(parsePrice(line.price) * line.qty)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: order summary */}
          <div
            className={`flex flex-col gap-4.5 rounded-[20px] p-6 dt:sticky dt:top-28 ${glass.subtle}`}
          >
            <h2 className="font-heading text-slate-900 font-bold text-lg m-0">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2.5 text-sm">
              {lines.map((line) => (
                <div key={line.id} className="flex justify-between gap-3">
                  <span className="text-slate-500 truncate">
                    {line.title} × {line.qty}
                  </span>
                  <span className="text-slate-900 font-semibold shrink-0">
                    {formatPrice(parsePrice(line.price) * line.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-baseline justify-between pt-2.5 border-t border-slate-200">
              <span className="text-sm font-bold text-slate-900">Total</span>
              <span className="font-heading text-slate-900 font-bold text-[22px]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Button
              type="text"
              block
              icon={<FiShoppingBag size={17} className="text-white!" />}
              className="h-auto! py-3.5! text-white! text-[15px]! font-sans bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]!"
            >
              Buy Now
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
