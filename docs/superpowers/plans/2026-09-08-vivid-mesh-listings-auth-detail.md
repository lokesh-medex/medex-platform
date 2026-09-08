# Vivid Mesh Redesign — /listings, /auth, /detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps
> use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `/listings`, `/auth/login`, `/auth/signup`, and
`/detail/[category]` to full visual parity with the homepage's Vivid
Mesh design system (glass panels, mesh gradients, backdrop motifs, GSAP
motion), reusing the homepage's `Header`/`Footer`, then delete the old
flat chrome.

**Architecture:** A new shared `PageShell` wrapper supplies `Header` +
`Footer` + the top clearance the fixed `Header` needs, used by all
three route groups. New `"listings"`, `"auth"`, `"detail"` presets are
added to the shared `Mesh` component. Each route group is migrated in
its own task (or pair of tasks): swap old chrome for `PageShell`, add a
mesh/backdrop-motif band confined to non-sticky regions, restyle
panel-level surfaces onto `glass.subtle`. Filtering/sorting/pagination,
form validation/submission, and cart/qty/booking logic are untouched
throughout — this is a visual/structural migration only.

**Tech Stack:** Next.js 16 (App Router), React 19, antd 6, Tailwind CSS
4, GSAP 3 (`gsap`, `@gsap/react`), react-hook-form + zod (already in
place for auth forms), pnpm.

**Spec:**
`docs/superpowers/specs/2026-09-08-vivid-mesh-listings-auth-detail-design.md`

## Global Constraints

- No behavioral changes to filtering/sorting/pagination
  (`ListingsView.tsx`), auth form validation/submission
  (`LoginForm`/`SignupForm`), or cart/qty/booking logic (`BuyBox`).
- `glass.vivid` needs a live mesh/gradient behind it; `glass.subtle` is
  safe to use regardless of what's behind it (per its own docstring in
  `app/_lib/glass.ts`) — prefer `glass.subtle` unless a panel is
  confirmed to sit directly over a `Mesh`/gradient layer.
- Never wrap a section containing a `sticky` element (`FilterSidebar`,
  `BuyBox`) in `overflow-hidden` — that section becomes the sticky
  element's positioning ancestor and can silently break its sticky
  behavior. Mesh/`BackdropMotifs` bands stay confined to non-sticky
  regions (intro heading band, breadcrumb strip).
- Don't put a `glass.*` class directly on an antd form control (`Input`,
  `Select`, `Checkbox`, `Slider`) — antd's own styles can out-specificity
  a plain Tailwind utility class without `!` (see CLAUDE.md's "Rules
  learned the hard way"), and no homepage precedent does this. Glass
  belongs on panel/card/chip containers.
- `react-icons` for icons, antd components over custom ones where antd
  already has the primitive, `react-hook-form` for forms (already true
  here — no changes needed) — per CLAUDE.md.
- Delete any Playwright-created screenshots/traces once their
  verification purpose is served (per CLAUDE.md).

---

### Task 1: Add `"listings"`, `"auth"`, `"detail"` Mesh presets

**Files:**

- Modify: `app/_components/home/Mesh.tsx:38-49` (type), `:51-137` (presets object)
- Test: manual (dev server + visual check; Mesh has no existing test suite)

**Interfaces:**

- Consumes: nothing new.
- Produces: `MeshPreset` now includes `"listings" | "auth" | "detail"`,
  consumable by `<Mesh preset="listings" />` etc. in later tasks.

- [ ] **Step 1: Extend the `MeshPreset` union**

In `app/_components/home/Mesh.tsx`, replace:

```ts
export type MeshPreset =
  | "hero"
  | "stats"
  | "features"
  | "vendors"
  | "orbital"
  | "membership"
  | "partners"
  | "doctors"
  | "testimonials"
  | "cta"
  | "footer";
```

with:

```ts
export type MeshPreset =
  | "hero"
  | "stats"
  | "features"
  | "vendors"
  | "orbital"
  | "membership"
  | "partners"
  | "doctors"
  | "testimonials"
  | "cta"
  | "footer"
  | "listings"
  | "auth"
  | "detail";
```

- [ ] **Step 2: Add the three new preset entries**

Still in `Mesh.tsx`, the `MESH_PRESETS` object currently ends with:

```ts
  // Quietest preset on the page — the footer is reference material, not a
  // moment, so it gets two small, low-opacity blobs rather than a wash.
  footer: {
    blobs: [
      { x: 12, y: 8, size: 520, c: "secondary", o: 0.14 },
      { x: 92, y: 86, size: 460, c: "primary", o: 0.12 },
    ],
  },
};
```

Replace it with:

```ts
  // Quietest preset on the page — the footer is reference material, not a
  // moment, so it gets two small, low-opacity blobs rather than a wash.
  footer: {
    blobs: [
      { x: 12, y: 8, size: 520, c: "secondary", o: 0.14 },
      { x: 92, y: 86, size: 460, c: "primary", o: 0.12 },
    ],
  },
  // Confined to the listings intro band only — FilterSidebar further down
  // the page is sticky, and wrapping that region in overflow-hidden (which
  // every other Mesh usage pairs with) would become its sticky-positioning
  // ancestor. See docs/superpowers/specs/2026-09-08-vivid-mesh-listings-auth-detail-design.md.
  listings: {
    blobs: [
      { x: 10, y: 10, size: 640, c: "secondary", o: 0.16 },
      { x: 92, y: 6, size: 560, c: "primary", o: 0.14 },
      { x: 50, y: 100, size: 520, c: "violet", o: 0.12 },
    ],
  },
  auth: {
    blend: "screen",
    blobs: [
      { x: 20, y: 14, size: 620, c: "primary", o: 0.35 },
      { x: 88, y: 30, size: 560, c: "secondary", o: 0.4 },
      { x: 46, y: 96, size: 640, c: "violet", o: 0.3 },
    ],
  },
  // Confined to the breadcrumb strip only — same sticky-ancestor
  // constraint as `listings` (BuyBox is sticky).
  detail: {
    blobs: [
      { x: 8, y: 8, size: 600, c: "primary", o: 0.14 },
      { x: 94, y: 20, size: 560, c: "secondary", o: 0.13 },
      { x: 54, y: 100, size: 480, c: "violet", o: 0.1 },
    ],
  },
};
```

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no new errors (unused-export or type errors would show here
immediately since `MeshPreset` is a discriminated union consumed
exhaustively via `MESH_PRESETS[preset]`).

- [ ] **Step 4: Commit**

```bash
git add app/_components/home/Mesh.tsx
git commit -m "Add listings/auth/detail Mesh presets"
```

---

### Task 2: Create the shared `PageShell` wrapper

**Files:**

- Create: `app/_components/shared/PageShell.tsx`
- Test: manual (exercised end-to-end once a page group consumes it, in
  Task 3)

**Interfaces:**

- Consumes: `Header`/`HeaderActive` from `app/_components/home/Header.tsx`,
  `Footer` from `app/_components/home/Footer.tsx`.
- Produces: `export default function PageShell(props: { active?:
HeaderActive; showCart?: boolean; cartCount?: number; onCartClick?: ()
=> void; children: React.ReactNode })` — consumed by listings/auth/detail
  page files in Tasks 3, 5, 6.

- [ ] **Step 1: Write `PageShell.tsx`**

```tsx
import Header, { type HeaderActive } from "@/app/_components/home/Header";
import Footer from "@/app/_components/home/Footer";

interface PageShellProps {
  active?: HeaderActive;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
  children: React.ReactNode;
}

/**
 * Shared Vivid Mesh chrome for every route besides `/`: the floating
 * Header + Footer, plus the `pt-32` top clearance the fixed Header needs
 * (Hero absorbs this role on `/` — see Header's own comment on why it's
 * `fixed` rather than `sticky`).
 */
export default function PageShell({
  active = "",
  showCart = true,
  cartCount = 0,
  onCartClick,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen">
      <Header
        active={active}
        showCart={showCart}
        cartCount={cartCount}
        onCartClick={onCartClick}
      />
      <div className="pt-32">{children}</div>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/_components/shared/PageShell.tsx
git commit -m "Add shared PageShell wrapper for non-homepage routes"
```

---

### Task 3: Migrate `/listings` to PageShell + intro mesh band

**Files:**

- Modify: `app/listings/page.tsx` (full replace)
- Modify: `app/listings/[tab]/page.tsx` (full replace)
- Modify: `app/_components/listings/ListingsView.tsx:1-18` (imports),
  `:89-99` (intro markup), `:133-137` (card grid wrap)
- Test: manual (dev server + Playwright screenshot of `/listings` and
  `/listings/lab-tests`)

**Interfaces:**

- Consumes: `PageShell` (Task 2), `Mesh preset="listings"` (Task 1),
  `BackdropMotifs` (`app/_components/shared/BackdropMotifs.tsx`,
  unchanged), `Reveal` (`app/_components/shared/Motion.tsx`, unchanged).
- Produces: nothing new consumed elsewhere.

- [ ] **Step 1: Replace `app/listings/page.tsx`**

```tsx
import PageShell from "@/app/_components/shared/PageShell";
import ListingsView from "@/app/_components/listings/ListingsView";
import { DEFAULT_LISTINGS_TAB } from "@/app/_lib/listings-data";

// /listings (no path segment) is an alias for its default tab — see
// app/listings/[tab]/page.tsx for the other tabs (/listings/packages, etc).
export default function ListingsPage() {
  return (
    <PageShell showCart={false}>
      <ListingsView activeTabId={DEFAULT_LISTINGS_TAB.id} />
    </PageShell>
  );
}
```

- [ ] **Step 2: Replace `app/listings/[tab]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import PageShell from "@/app/_components/shared/PageShell";
import ListingsView from "@/app/_components/listings/ListingsView";
import { LISTINGS_TABS, getTabBySlug } from "@/app/_lib/listings-data";

export function generateStaticParams() {
  return LISTINGS_TABS.map((tab) => ({ tab: tab.slug }));
}

export default async function ListingsTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab: slug } = await params;
  const tab = getTabBySlug(slug);
  if (!tab) notFound();

  return (
    <PageShell showCart={false}>
      <ListingsView key={tab.id} activeTabId={tab.id} />
    </PageShell>
  );
}
```

- [ ] **Step 3: Add imports to `ListingsView.tsx`**

At the top of `app/_components/listings/ListingsView.tsx`, change:

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, Button } from "antd";
import { FiSliders } from "react-icons/fi";
import FilterSidebar from "@/app/_components/listings/FilterSidebar";
import ListingCard from "@/app/_components/listings/ListingCard";
import MobileFilterDrawer from "@/app/_components/listings/MobileFilterDrawer";
import SearchSortBar from "@/app/_components/listings/SearchSortBar";
import TabPills from "@/app/_components/listings/TabPills";
import {
  LISTINGS_TABS,
  PAGE_SIZE,
  defaultFilterState,
  filterAndSortItems,
  sortOptionsFor,
  type SortValue,
} from "@/app/_lib/listings-data";
```

to:

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, Button } from "antd";
import { FiSliders } from "react-icons/fi";
import FilterSidebar from "@/app/_components/listings/FilterSidebar";
import ListingCard from "@/app/_components/listings/ListingCard";
import MobileFilterDrawer from "@/app/_components/listings/MobileFilterDrawer";
import SearchSortBar from "@/app/_components/listings/SearchSortBar";
import TabPills from "@/app/_components/listings/TabPills";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Reveal } from "@/app/_components/shared/Motion";
import {
  LISTINGS_TABS,
  PAGE_SIZE,
  defaultFilterState,
  filterAndSortItems,
  sortOptionsFor,
  type SortValue,
} from "@/app/_lib/listings-data";
```

- [ ] **Step 4: Wrap the intro band in a mesh section**

In the same file, change:

```tsx
  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      <div className="max-w-360 mx-auto px-5 dt:px-8 pt-8">
        <h1 className="font-heading text-slate-900 font-bold text-[clamp(24px,3vw,32px)] tracking-[-0.02em] m-0 mb-5">
          Browse everything on the network
        </h1>
        <TabPills tabs={LISTINGS_TABS} activeTabId={tab.id} />
      </div>

      <div className="max-w-360 mx-auto px-5 dt:px-8 pt-7 pb-24 flex gap-8 items-start">
```

to:

```tsx
  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      <div className="relative overflow-hidden">
        <Mesh preset="listings" />
        <BackdropMotifs
          count={5}
          opacity={0.05}
          seed={42}
          zone="edges"
          minSize={110}
          maxSize={200}
        />
        <Reveal className="relative max-w-360 mx-auto px-5 dt:px-8 pt-8 pb-2">
          <h1 className="font-heading text-slate-900 font-bold text-[clamp(24px,3vw,32px)] tracking-[-0.02em] m-0 mb-5">
            Browse everything on the network
          </h1>
          <TabPills tabs={LISTINGS_TABS} activeTabId={tab.id} />
        </Reveal>
      </div>

      <div className="max-w-360 mx-auto px-5 dt:px-8 pt-7 pb-24 flex gap-8 items-start">
```

- [ ] **Step 5: Wrap the card grid in `Reveal`**

Still in `ListingsView.tsx`, change:

```tsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
  {visibleItems.map((item) => (
    <ListingCard key={item.id} item={item} />
  ))}
</div>
```

to:

```tsx
<Reveal className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
  {visibleItems.map((item) => (
    <ListingCard key={item.id} item={item} />
  ))}
</Reveal>
```

- [ ] **Step 6: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 7: Visual verification**

Run: `pnpm dev` (leave running), then in a Playwright session:
`browser_navigate` to `http://localhost:3000/listings`, take a
screenshot, confirm: floating Header visible at top with no dead gap
below it, mesh blobs visible behind the "Browse everything..." heading
and TabPills, page otherwise renders (filters, cards, Footer). Repeat
for `http://localhost:3000/listings/lab-tests`. Delete the screenshot
file(s) afterward per CLAUDE.md.

- [ ] **Step 8: Commit**

```bash
git add app/listings/page.tsx app/listings/[tab]/page.tsx app/_components/listings/ListingsView.tsx
git commit -m "Migrate /listings pages to PageShell + Vivid Mesh intro band"
```

---

### Task 4: Restyle listings panel components onto `glass.subtle`

**Files:**

- Modify: `app/_components/listings/TabPills.tsx:1-2` (imports), `:24-28` (className)
- Modify: `app/_components/listings/FilterSidebar.tsx:1-2` (imports), `:22` (className)
- Modify: `app/_components/listings/MobileFilterDrawer.tsx:1-2` (imports), `:26-37` (Drawer props)
- Modify: `app/_components/listings/ListingCard.tsx:1-5` (imports), `:10` (className)
- Test: manual (dev server + Playwright screenshot)

**Interfaces:**

- Consumes: `glass` from `app/_lib/glass.ts` (unchanged).
- Produces: nothing new consumed elsewhere. `SearchSortBar.tsx` and
  `FilterGroups.tsx` are intentionally left unmodified (antd form
  controls, per Global Constraints).

- [ ] **Step 1: `TabPills.tsx`**

Change the top imports from:

```tsx
import Link from "next/link";
import { hrefForTab, type ListingsTab } from "@/app/_lib/listings-data";
```

to:

```tsx
import Link from "next/link";
import { hrefForTab, type ListingsTab } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";
```

Change the pill className from:

```tsx
            className={`flex items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-5 py-2.5 font-sans transition-colors duration-150 ${
              active
                ? "bg-secondary border-secondary"
                : "bg-white border-slate-200"
            }`}
```

to:

```tsx
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 font-sans transition-colors duration-150 ${
              active ? "border border-secondary bg-secondary" : glass.subtle
            }`}
```

- [ ] **Step 2: `FilterSidebar.tsx`**

Change the top imports from:

```tsx
import { Button } from "antd";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";
```

to:

```tsx
import { Button } from "antd";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";
```

Change the `<aside>` className from:

```tsx
    <aside className="hidden dt:flex w-68 shrink-0 sticky top-27 max-h-[calc(100vh-148px)] flex-col gap-5 overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-5">
```

to:

```tsx
    <aside
      className={`hidden dt:flex w-68 shrink-0 sticky top-27 max-h-[calc(100vh-148px)] flex-col gap-5 overflow-y-auto rounded-[18px] p-5 ${glass.subtle}`}
    >
```

- [ ] **Step 3: `MobileFilterDrawer.tsx`**

Change the top imports from:

```tsx
import { Button, Drawer } from "antd";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";
```

to:

```tsx
import { Button, Drawer } from "antd";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";
```

(no new import needed — the Drawer surface is styled with inline CSS via
antd's `styles` prop, not a Tailwind class, since antd portals `Drawer`
to `document.body` and its own stylesheet otherwise wins.)

Change the `<Drawer>` opening tag from:

```tsx
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      size="min(320px, 88vw)"
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Filters
        </span>
      }
      className="dt:hidden!"
    >
```

to:

```tsx
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      size="min(320px, 88vw)"
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Filters
        </span>
      }
      className="dt:hidden!"
      styles={{
        content: {
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow:
            "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        },
      }}
    >
```

- [ ] **Step 4: `ListingCard.tsx`**

Change the top imports from:

```tsx
import { Button, Tag } from "antd";
import { FaStar } from "react-icons/fa";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import type { ListingItem } from "@/app/_lib/listings-data";
```

to:

```tsx
import { Button, Tag } from "antd";
import { FaStar } from "react-icons/fa";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import type { ListingItem } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";
```

Change the outer card className from:

```tsx
    <div className="rounded-[18px] overflow-hidden bg-white border border-slate-200 flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_#0f172a1a]">
```

to:

```tsx
    <div
      className={`rounded-[18px] overflow-hidden flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_#0f172a1a] ${glass.subtle}`}
    >
```

- [ ] **Step 5: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 6: Visual + functional verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/listings`, screenshot, confirm TabPills,
FilterSidebar, and ListingCard all read as frosted glass panels (not
plain white boxes); click a category checkbox in the sidebar and
confirm the result count updates (filtering logic unaffected); open the
mobile filter drawer at a narrow viewport (`browser_resize`) and confirm
it opens with the frosted panel background. Delete any screenshots
taken.

- [ ] **Step 7: Commit**

```bash
git add app/_components/listings/TabPills.tsx app/_components/listings/FilterSidebar.tsx app/_components/listings/MobileFilterDrawer.tsx app/_components/listings/ListingCard.tsx
git commit -m "Restyle listings panels onto glass.subtle"
```

---

### Task 5: Migrate `/auth/login`, `/auth/signup` to PageShell + Vivid Mesh

**Files:**

- Modify: `app/_components/auth/AuthPageShell.tsx` (full replace)
- Modify: `app/_components/auth/AuthBrandPanel.tsx:1-21` (imports + opening markup)
- Modify: `app/_components/auth/AuthCard.tsx:1-44` (imports + tab markup)
- Test: manual (dev server + Playwright screenshot of `/auth/login` and `/auth/signup`)

**Interfaces:**

- Consumes: `PageShell` (Task 2), `Mesh preset="auth"` (Task 1),
  `BackdropMotifs`, `glass`, `BRAND_DARK_PANEL`
  (`app/_lib/theme.ts`, unchanged).
- Produces: nothing new consumed elsewhere. `LoginForm`, `SignupForm`,
  `AppInput`, `AppPasswordInput`, `AppCheckbox`, `SocialAuthButtons` are
  untouched.

- [ ] **Step 1: Replace `AuthPageShell.tsx`**

```tsx
import PageShell from "@/app/_components/shared/PageShell";
import AuthBrandPanel from "@/app/_components/auth/AuthBrandPanel";
import AuthCard, { type AuthMode } from "@/app/_components/auth/AuthCard";

/** Shared layout for `/auth/login` and `/auth/signup` — same design, `mode` picks the active tab. */
export default function AuthPageShell({ mode }: { mode: AuthMode }) {
  return (
    <PageShell showCart={false}>
      <div className="bg-[#F5F5F5] grid grid-cols-1 dt:grid-cols-2">
        <AuthBrandPanel />
        <div className="flex items-center justify-center px-5 py-10 dt:py-14">
          <AuthCard mode={mode} />
        </div>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Add mesh/motifs to `AuthBrandPanel.tsx`**

Change the top imports from:

```tsx
import Image from "next/image";
import { FiCheck } from "react-icons/fi";
```

to:

```tsx
import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
```

Change the opening of the component from:

```tsx
export default function AuthBrandPanel() {
  return (
    <div
      className="hidden dt:flex relative overflow-hidden flex-col justify-between p-14"
      style={{ background: "linear-gradient(135deg, #872888, #df321f)" }}
    >
      <svg
```

to:

```tsx
export default function AuthBrandPanel() {
  return (
    <div
      className="hidden dt:flex relative overflow-hidden flex-col justify-between p-14"
      style={{ background: "linear-gradient(135deg, #872888, #df321f)" }}
    >
      <Mesh preset="auth" />
      <BackdropMotifs
        count={5}
        opacity={0.08}
        color="#ffffff"
        seed={88}
        zone="edges"
        minSize={110}
        maxSize={210}
      />
      <svg
```

(the `svg` element and everything after it is unchanged — it already
has no `z-index`, so it continues to stack below the `z-[1]`/`z-[2]`
content divs the same way `Mesh`/`BackdropMotifs` now do.)

- [ ] **Step 3: Restyle `AuthCard.tsx`'s tab pills**

Change the top imports from:

```tsx
import Link from "next/link";
import LoginForm from "@/app/_components/auth/LoginForm";
import SignupForm from "@/app/_components/auth/SignupForm";
import SocialAuthButtons from "@/app/_components/auth/SocialAuthButtons";
```

to:

```tsx
import Link from "next/link";
import LoginForm from "@/app/_components/auth/LoginForm";
import SignupForm from "@/app/_components/auth/SignupForm";
import SocialAuthButtons from "@/app/_components/auth/SocialAuthButtons";
import { glass } from "@/app/_lib/glass";
import { BRAND_DARK_PANEL } from "@/app/_lib/theme";
```

Change the tab pill markup from:

```tsx
<div className="flex bg-slate-100 rounded-full p-1 mb-8">
  <Link
    href="/auth/login"
    className={`flex-1 flex items-center justify-center rounded-full py-2.5 text-sm font-bold font-sans transition-colors ${
      isLogin
        ? "bg-white text-slate-900 shadow-[0_2px_8px_#0f172a1a]"
        : "bg-transparent text-slate-500"
    }`}
  >
    Log in
  </Link>
  <Link
    href="/auth/signup"
    className={`flex-1 flex items-center justify-center rounded-full py-2.5 text-sm font-bold font-sans transition-colors ${
      !isLogin
        ? "bg-white text-slate-900 shadow-[0_2px_8px_#0f172a1a]"
        : "bg-transparent text-slate-500"
    }`}
  >
    Sign up
  </Link>
</div>
```

to:

```tsx
<div className={`flex rounded-full p-1 mb-8 ${glass.subtle}`}>
  <Link
    href="/auth/login"
    className={`flex-1 flex items-center justify-center rounded-full py-2.5 text-sm font-bold font-sans transition-colors ${
      isLogin
        ? `text-white! ${BRAND_DARK_PANEL}`
        : "bg-transparent text-slate-500"
    }`}
  >
    Log in
  </Link>
  <Link
    href="/auth/signup"
    className={`flex-1 flex items-center justify-center rounded-full py-2.5 text-sm font-bold font-sans transition-colors ${
      !isLogin
        ? `text-white! ${BRAND_DARK_PANEL}`
        : "bg-transparent text-slate-500"
    }`}
  >
    Sign up
  </Link>
</div>
```

- [ ] **Step 4: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 5: Visual + functional verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/auth/login`, screenshot, confirm floating Header,
mesh/motifs visible behind the brand panel's copy, frosted tab pill
switcher with a brand-dark active tab. Fill the login form fields and
confirm client-side validation still fires as before (e.g. submit
empty). Navigate to `http://localhost:3000/auth/signup` and repeat.
Delete any screenshots taken.

- [ ] **Step 6: Commit**

```bash
git add app/_components/auth/AuthPageShell.tsx app/_components/auth/AuthBrandPanel.tsx app/_components/auth/AuthCard.tsx
git commit -m "Migrate /auth pages to PageShell + Vivid Mesh"
```

---

### Task 6: Migrate `/detail/[category]` to PageShell + Vivid Mesh

**Files:**

- Modify: `app/_components/detail/DetailPage.tsx` (imports, BuyBox
  styling, breadcrumb, gallery/description/includes, PageShell wrap)
- Test: manual (dev server + Playwright screenshot of all 4 categories)

**Interfaces:**

- Consumes: `PageShell` (Task 2), `Mesh preset="detail"` (Task 1),
  `BackdropMotifs`, `glass`.
- Produces: nothing new consumed elsewhere. Cart/qty state and
  `formatPrice`/`parsePrice`/`splitCredit` logic untouched.

- [ ] **Step 1: Update imports**

Change the top of `app/_components/detail/DetailPage.tsx` from:

```tsx
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
```

to:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Tag } from "antd";
import { FaStar } from "react-icons/fa";
import { FiCheck, FiShield, FiShoppingBag } from "react-icons/fi";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { glass } from "@/app/_lib/glass";
import {
  DETAIL_CATALOG,
  formatPrice,
  parsePrice,
  splitCredit,
  type DetailCategory,
  type DetailItem,
} from "@/app/_lib/detail-data";
```

- [ ] **Step 2: Restyle `BuyBox`'s outer panel**

Change:

```tsx
    <div className="flex flex-col gap-4.5 bg-white rounded-[20px] border border-slate-200 p-6 dt:sticky dt:top-[88px]">
```

to:

```tsx
    <div
      className={`flex flex-col gap-4.5 rounded-[20px] p-6 dt:sticky dt:top-[88px] ${glass.subtle}`}
    >
```

- [ ] **Step 3: Replace the page's outer return with `PageShell` + a mesh breadcrumb strip**

Change:

```tsx
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
```

to:

```tsx
  return (
    <PageShell showCart cartCount={cartCount}>
      <div className="bg-[#F5F5F5]">
        {/* Breadcrumb */}
        <div className="relative overflow-hidden">
          <Mesh preset="detail" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={77}
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
              <a href="#" className="text-slate-500 shrink-0">
                {item.categoryLabel}
              </a>
              <span className="shrink-0">/</span>
              <span className="text-slate-900 font-semibold truncate">
                {item.title}
              </span>
            </div>
          </div>
        </div>

        <section className="max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14 grid grid-cols-1 dt:grid-cols-[1.5fr_1fr] gap-9 items-start">
```

- [ ] **Step 4: Close the new wrapping tags and drop the old `Footer`**

Change the end of the component from:

```tsx
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
```

to:

```tsx
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
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 5: Restyle the gallery frame, description, and includes blocks**

Change:

```tsx
          <div className="relative rounded-[20px] overflow-hidden h-[min(46vh,420px)] min-h-[280px]">
```

to:

```tsx
          <div className="relative rounded-[20px] overflow-hidden h-[min(46vh,420px)] min-h-[280px] border border-white/70 shadow-[0_8px_32px_rgba(15,23,42,0.12)]">
```

Change:

```tsx
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
```

to:

```tsx
          <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
            <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
              Description
            </h2>
            <p className="text-slate-600 text-[14.5px] leading-[1.7] m-0">
              {item.description}
            </p>
          </div>

          <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
            <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
              {item.includesHeading}
            </h2>
```

- [ ] **Step 6: Type-check**

Run: `pnpm lint`
Expected: no errors, no unclosed-JSX errors (double check indentation
of the two closing tags added in Step 4 — `</section>` then a new
`</div>` for the `bg-[#F5F5F5]` wrapper, then `</PageShell>`).

- [ ] **Step 7: Visual + functional verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/detail/package`, screenshot, confirm floating
Header, mesh visible behind the breadcrumb chip, frosted description/
includes/BuyBox cards. Click the quantity stepper's `+`/`-` and "Add to
Cart" and confirm the cart badge/qty/total price still update (logic
unaffected). Repeat for `/detail/labtest`, `/detail/service`,
`/detail/wellness`. Delete any screenshots taken.

- [ ] **Step 8: Commit**

```bash
git add app/_components/detail/DetailPage.tsx
git commit -m "Migrate /detail pages to PageShell + Vivid Mesh"
```

---

### Task 7: Delete the old flat chrome

**Files:**

- Delete: `app/_components/header/Header.tsx`,
  `app/_components/header/Navbar.tsx`, `app/_components/header/TopBar.tsx`,
  `app/_components/footer/Footer.tsx`
- Test: `pnpm build` (full production build catches any remaining
  import of a deleted file, since Next.js fails the build on an
  unresolved module)

**Interfaces:**

- Consumes: nothing (this task only removes dead code — Tasks 3, 5, 6
  already moved every consumer onto `PageShell`).
- Produces: nothing.

- [ ] **Step 1: Confirm zero remaining references**

Run:

```bash
grep -rn '_components/header\|_components/footer/Footer' app --include='*.tsx' --include='*.ts'
```

Expected: no output (Tasks 3, 5, 6 already migrated the only 4
consumers: `app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,
`AuthPageShell.tsx`, `DetailPage.tsx`).

- [ ] **Step 2: Delete the old chrome files**

```bash
git rm -r app/_components/header app/_components/footer
```

- [ ] **Step 3: Full build verification**

Run: `pnpm build`
Expected: build succeeds with no "Module not found" errors.

- [ ] **Step 4: Commit**

```bash
git commit -m "Delete old flat header/footer chrome, now unused"
```

---

## Post-plan cleanup

After Task 7, no old-chrome references or dead files remain. Confirm
with a final `git status` that only the intended files changed across
all 7 tasks (no stray Playwright artifacts left behind — delete any
that remain per CLAUDE.md).
