"use client";

/**
 * Site header — a floating `glass.dark` panel rather than two flat,
 * edge-to-edge bars pinned to `top-0`. TopBar's utility row and Navbar's main
 * row live inside the same panel, inset from the viewport edges and split by
 * a hairline — the "floating pill nav" pattern (Linear, Stripe).
 *
 * `fixed`, not `sticky`: a sticky header still reserves its own box in normal
 * flow, so at scroll position 0 it would sit as a separate bar ABOVE Hero
 * rather than floating over Hero's image — exactly the flat backdrop that
 * defeats a glass surface (nothing behind it to refract). `fixed` removes it
 * from flow entirely so Hero's full-bleed image runs behind the glass panel
 * from the first frame. Hero's own copy already reserves `pt-32` of top
 * clearance for this — that padding only makes sense against a floating
 * header, which is a good sign this is the shape the section was meant for.
 *
 * Panel darkens once scrolled. `glass.dark` (`bg-white/10`) is nearly
 * invisible over the dark Hero image — that's the point, it's meant to
 * refract Hero's mesh/photo behind it — but the SAME low opacity goes almost
 * fully transparent over the light sections further down the page
 * (`bg-white`, `bg-[#f8f5fa]`), which drops white nav text to unreadable
 * contrast. A `window.scrollY` threshold swaps to a much denser, near-opaque
 * panel once the user has scrolled past the hero, so legibility no longer
 * depends on what's directly behind the header. The threshold is a plain
 * pixel constant rather than an IntersectionObserver watching Hero's exact
 * height, since Hero's height already varies by viewport (`100svh`) and a
 * small fixed threshold reads correctly either way: crossing it a little
 * early still looks like glass over Hero, crossing it late never happens
 * before Hero has scrolled well out of view.
 *
 * The dense panel is `BRAND_DARK_PANEL` (`./theme.ts`) — a duskened
 * primary→secondary gradient, not a neutral near-black — shared with the
 * mega-menu popover and mobile drawer so all three dark surfaces match.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "./TopBar";
import Navbar, { type HeaderActive } from "./Navbar";
import { glass } from "@/app/_lib/glass";
import { BRAND_DARK_PANEL } from "@/app/_lib/theme";

export type { HeaderActive };

interface HeaderProps {
  active?: HeaderActive;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
  /**
   * Skip the scroll-based glass.dark→BRAND_DARK_PANEL transition and always
   * render the dense panel. For routes with no dark hero behind Header at
   * scroll 0 (everything PageShell wraps) — glass.dark's translucency
   * depends on a dark/vivid backdrop to read against, which those routes
   * don't have at page-load scroll position.
   */
  forceDense?: boolean;
}

const SCROLL_THRESHOLD = 60;

export default function Header({
  active = "",
  showCart = true,
  cartCount = 0,
  onCartClick,
  forceDense = false,
}: HeaderProps) {
  // Starts false so server and first client render agree (no `window` during
  // render) — correct anyway, since a fresh page load starts at scroll 0.
  const [scrolled, setScrolled] = useState(false);
  const dense = forceDense || scrolled;
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-4 dt:px-6">
      <div
        className={`mx-auto max-w-7xl overflow-hidden rounded-3xl transition-[background-color,border-color,box-shadow] duration-300 ${
          dense ? BRAND_DARK_PANEL : glass.dark
        }`}
      >
        <div className="hidden border-b border-white/10 dt:block">
          <TopBar />
        </div>
        <Navbar
          active={active}
          showCart={showCart}
          cartCount={cartCount}
          onCartClick={onCartClick ?? (() => router.push("/cart"))}
        />
      </div>
    </header>
  );
}
