# Vendor detail page (`/vendor/[slug]`)

## Context

Vendors (hospitals, clinics, diagnostic labs, pharmacies) exist as list
items today — on the homepage's `Vendors` section
(`app/_components/home/Vendors.tsx`, no link at all) and as a `ListingCard`
tab at `/listings/vendors` (`app/_lib/listings-data.ts:481-545`,
`VENDOR_ITEMS`) — but neither links anywhere. `ListingCard`'s CTA reads
"View Vendor" only as inert button text: `canAddToCart` is `false` for
non-"Book Now" items (`app/_components/listings/ListingCard.tsx:20`), and
`ListingsView.tsx` computes one `detailHref` per _tab_, shared by every
item in it (`app/_components/listings/ListingsView.tsx:58-64`) — a model
built for the 4 category tabs that each point at one static
`/detail/[category]` page, not for a per-entity page. Vendors need a
genuinely new, per-vendor detail page; there is no existing per-item
detail flow to extend.

Goal: a rich, "world class" vendor detail page — gallery, about, doctors,
services, facilities, location/map, and contact — reusing this app's
established Vivid-Mesh-on-flat-chrome primitives (`PageShell`, `glass`,
`Mesh`, `BackdropMotifs`, `Reveal`), matching the visual language already
established for `/detail/[category]` (glass panels over a flat `#F5F5F5`
ground, no live mesh behind the sticky/main content grid — see "Current
state" below), and wiring the real "View Vendor" CTA into it.

Non-goals: no backend/API integration (this repo has none — see Current
state); no real form submission for the contact modal (mock success
state only); no changes to cart/booking logic elsewhere; no review
_submission_ flow (a read-only ratings/reviews summary is in scope, a
review form is not — YAGNI, nothing asked for it).

## Current state (research findings)

- **No per-item detail route exists.** `app/detail/[category]/page.tsx`
  statically enumerates 4 fixed categories via `generateStaticParams()`
  (`app/_lib/detail-data.ts:4,46`) — one page per _category_, not per
  item/vendor.
- **No API/fetch layer anywhere** (`grep -rn "fetch("` across `app` is
  empty). Every page is a data-driven server component reading a typed
  mock array/record from `app/_lib/*-data.ts` and rendering a client
  component with it — see `app/detail/[category]/page.tsx:13-20` and
  `app/listings/[tab]/page.tsx:12-28`.
- **Chrome**: `app/_components/header/*` and
  `app/_components/footer/Footer.tsx` were deleted in `e3d2eec`; despite
  what `CLAUDE.md`'s "Two headers/footers" section still says, every
  non-home route now goes through `PageShell`
  (`app/_components/shared/PageShell.tsx`), which renders the
  `home/Header` + `home/Footer` Vivid Mesh chrome. This spec treats
  "wrap the page in `PageShell` like `DetailPage.tsx` does" as the real,
  current rule and will flag the stale doc section separately
  (out of scope for this change).
- **Detail page visual precedent** (`app/_components/detail/DetailPage.tsx`):
  `PageShell` → breadcrumb strip in its own `relative overflow-hidden`
  block carrying `Mesh preset="detail"` + `BackdropMotifs` → a
  `dt:grid-cols-[1.5fr_1fr]` grid with a non-sticky left column
  (`glass.subtle` panels) and a `dt:sticky` right column (`BuyBox`). The
  grid itself is deliberately _not_ `overflow-hidden`, because that
  would break `BuyBox`'s sticky positioning (documented at
  `DetailPage.tsx:205-211`) — so no mesh sits behind the main
  two-column grid, only behind the breadcrumb strip above it.
  `glass.subtle` is documented safe without a live mesh behind it;
  `glass.vivid` is not (`app/_lib/glass.ts:14-32`).
- **`VENDOR_ITEMS`** (`app/_lib/listings-data.ts:481-545`): 10 vendors,
  each `{ title, category, rating, meta }` where `meta` is a
  freetext "Area, City" or "City, Country" string, built via `mkItems`
  (`id: "vendors-<i>"`, `tagColor: brand.secondary`,
  `cta: "View Vendor"`, alternating `gradient`). No slug, images,
  doctors, services, or contact fields exist yet.
- **Reusable pieces**: `ImageWithFallback`/`InitialsAvatar`
  (`app/_components/shared/*`), `glass`/`glassScrim`
  (`app/_lib/glass.ts`), `Mesh`/`MeshPreset` (already has a `"detail"`
  preset), `BackdropMotifs`, `Reveal`/`Parallax`
  (`app/_components/shared/Motion.tsx`), the `DoctorCard` pattern in
  `app/_components/home/Doctors.tsx` (photo + rating badge + antd
  `Rate` + CTA), the "Includes" checklist-grid pattern in
  `DetailPage.tsx:276-293`, and the `AppInput`/`AppPasswordInput`/
  `AppCheckbox`/`ErrorLabel` react-hook-form field pattern
  (`app/_components/form/*`).
- **Gaps**: no gallery/carousel component anywhere (antd `Carousel` is
  unused but available); no map component or embed anywhere; no antd
  `Tabs`/`Modal`/`Card` usage yet (all first introductions for this
  feature, per CLAUDE.md's "use antd's component when it already has
  one" rule); no textarea form primitive (`AppInput` wraps antd
  `Input`, not `Input.TextArea`).

## Decisions

1. **Route**: new top-level `app/vendor/[slug]/page.tsx` (not nested
   under `/detail` or `/listings`) — vendors are their own entity type,
   structurally different from the category-keyed `/detail` pages.
   Static generation via `generateStaticParams()` over vendor slugs,
   mirroring `app/detail/[category]/page.tsx`.
2. **Data model**: new `app/_lib/vendor-data.ts` as the single source of
   richer vendor profiles, keyed by the _same_ 10 vendors already in
   `VENDOR_ITEMS` (by title) rather than a disconnected new list — two
   arrays describing the same 10 real-world vendors would drift.
   `listings-data.ts`'s `VENDOR_ITEMS` gets one new field, `slug`,
   generated from each title (e.g. `"bangkok-hospital"`); `vendor-data.ts`
   uses that same slug as its key/lookup.
3. **Wiring the real CTA**: `ListingsView.tsx`'s href logic
   (`:58-64`) is per-tab today; change the vendors tab specifically to
   compute a per-item href (`/vendor/${item.slug}`) instead of reusing
   the shared per-tab `detailHref`, since every vendor needs a distinct
   URL unlike the 4 category tabs. Non-vendor tabs keep today's
   per-tab-shared `detailHref` unchanged.
4. **Visual treatment**: follow the `/detail` precedent exactly — reuse
   `Mesh preset="detail"` for the breadcrumb strip (same structural
   role: a short, non-sticky band above a sticky-column grid), and
   `glass.subtle` (not `glass.vivid`) for every content panel, since no
   live mesh sits behind the two-column grid for the same sticky-ancestor
   reason documented in `DetailPage.tsx`.
5. **Gallery**: antd `Carousel` (main image, autoplay off, dot
   navigation) plus a thumbnail strip below it that jumps the carousel
   via a ref — first use of antd `Carousel` in the app, per the
   antd-first convention.
6. **Map**: an embedded Google Maps iframe
   (`https://www.google.com/maps?q=<lat>,<lng>&output=embed`, or
   `q=<urlencoded address>` when no lat/lng is set) inside a
   `glass.subtle` frame — no API key, no new npm dependency. Falls back
   to address-text-only (no iframe) if a vendor record has neither
   coordinates nor a usable address string.
7. **Contact**: a "Contact Vendor" button opens an antd `Modal`
   containing a `react-hook-form` + zod form (name, email, phone,
   message) built from `AppInput`. The message field needs a textarea,
   which `AppInput` doesn't support (it hardcodes antd `Input`) — add a
   new `app/_components/form/AppTextArea.tsx` following the exact same
   `Controller`-wrapping pattern from CLAUDE.md, wrapping antd
   `Input.TextArea` instead. Submit is mocked (no backend exists
   anywhere in this repo): on valid submit, show an inline success
   state in the modal for ~2s, then close it. No real network call.
8. **Doctors/services sections are data-driven but self-contained**:
   each vendor's `doctors`/`services` arrays are small, hand-authored
   arrays on that vendor's record (matching how `DETAIL_CATALOG` and
   `VENDOR_ITEMS` already hand-author their content) — not pulled from
   `DOCTORS_DATA` or `listings-data.ts`'s test/package/service catalog,
   which model different things (global doctor roster,
   test-shopped-across-vendors) than "this vendor's own staff/services
   list." Services listed here are informational (name, category,
   price, duration) with a "View in Listings" link into the matching
   `/listings/<tab>` search rather than a duplicate Add-to-Cart flow —
   avoids re-implementing cart logic on a second page for the same
   items.

## Page design

**Route & data**

- `app/vendor/[slug]/page.tsx`: async server component. `await params`,
  look up via `getVendorBySlug(slug)`, `notFound()` on miss, render
  `<VendorDetailPage vendor={vendor} />`. `generateStaticParams()`
  returns `{ slug }` for every entry in `VENDORS`.
- `app/_lib/vendor-data.ts`:
  ```ts
  interface VendorDoctor {
    name: string;
    specialty: string;
    rating: string;
    img?: string;
  }
  interface VendorService {
    name: string;
    category: string;
    price?: number;
    duration?: string;
  }
  interface Vendor {
    slug: string;
    title: string;
    category: string;
    rating: string;
    reviewCount: number;
    meta: string; // "Area, City" — same shape VENDOR_ITEMS already uses
    tagline: string;
    description: string;
    logo?: string;
    gallery: string[];
    address: string;
    lat?: number;
    lng?: number;
    phone: string;
    email: string;
    hours: string;
    amenities: string[];
    doctors: VendorDoctor[];
    services: VendorService[];
  }
  export const VENDORS: Vendor[];
  export function getVendorBySlug(slug: string): Vendor | undefined;
  ```

**Composition** (`app/_components/vendor/VendorDetailPage.tsx`,
`"use client"`, wrapped in `PageShell showCart={false}` — no cart
affordance on this page, matching the "informational, links out to
listings" decision above):

1. **Breadcrumb hero** — `relative overflow-hidden` band, `Mesh
preset="detail"` + `BackdropMotifs`, breadcrumb chip (`Home / Listings
/ Vendors / <name>`, links to `/` and `/listings/vendors`) in a
   `glass.subtle` pill, matching `DetailPage.tsx:174-202` structurally.
2. **Header block** below the hero: vendor name (`h1`), category `Tag`,
   star rating + review count (`FaStar`, same treatment as
   `DetailPage.tsx:56-66`), area/city meta.
3. **Gallery** (`VendorGallery.tsx`): antd `Carousel` main image (16:9,
   rounded, `glass.subtle` frame) + thumbnail strip; `ImageWithFallback`
   per slide, `InitialsAvatar` fallback if a vendor has no images.
4. **Left column** (non-sticky, matches `DetailPage.tsx`'s left column):
   - **About** panel: `tagline` + `description`, `glass.subtle`.
   - **Facilities** panel: reuses the `DetailPage.tsx:276-293`
     checklist-grid pattern (`FiCheck` + label chips) over `amenities`.
   - **Doctors** (`VendorDoctors.tsx`): grid of cards adapted from
     `DoctorCard` (`home/Doctors.tsx`) but on `glass.subtle` (no mesh
     behind this column) instead of `glass.vivid`/`glassScrim` —
     photo, rating badge, name, specialty, antd `Rate` (disabled,
     `allowHalf`). No "Book now" button (no per-doctor booking flow
     exists) — card is informational only.
   - **Services** (`VendorServices.tsx`): simple row/grid list — name,
     category tag, price (`formatPrice`-style if present), duration —
     each row links to `/listings/<slug-for-that-category>?q=<name>`
     via `NavSearch`'s existing `?q=` convention
     (`ListingsView.tsx:45-48` already seeds `filters.search` from it).
5. **Right column** (`dt:sticky dt:top-28`, matches `BuyBox`'s
   positioning): **Vendor Info panel** (`VendorInfoPanel.tsx`) —
   logo/name/category recap, address line, embedded map (see Decision 6) or address-only fallback, hours, `tel:`/`mailto:` quick-action
   rows (`FiPhone`/`FiMail`), and the primary **Contact Vendor** button
   opening `VendorContactModal`.
6. **Contact modal** (`VendorContactModal.tsx`): antd `Modal`, a
   `react-hook-form` + zod schema (`name`, `email`, `phone` optional,
   `message`), `AppInput` ×3 + new `AppTextArea`, submit button shows a
   loading state then an inline "Message sent" success state, closes
   after ~2s (mocked, per Decision 7).

**Listings wiring**

- `app/_lib/listings-data.ts`: add `slug` to `ListingItem` (optional,
  only vendors set it) and to each `VENDOR_ITEMS` raw entry, generated
  from `title` (lowercase, spaces→hyphens, strip punctuation).
- `app/_components/listings/ListingsView.tsx`: change the vendors-tab
  case so `ListingCard`'s `detailHref` is computed per item
  (`item.slug ? \`/vendor/${item.slug}\` : detailHref`) instead of the
single tab-level `detailHref` used for the other 3 linkable tabs.
- `app/_components/listings/ListingCard.tsx`: no changes needed —
  `canAddToCart` already treats non-"Book Now" CTAs (vendors' "View
  Vendor") as plain button text, and `detailHref` already makes the
  whole card a `Link` when present (`:30-36`) — passing a real
  per-item href here is sufficient to make "View Vendor" work.
- `app/_components/home/Vendors.tsx`: each `VENDORS_DATA` card also
  gets a real link to its vendor page. `VENDORS_DATA`
  (`app/_lib/homepage-data.ts:522-566`) currently has no slug field —
  add one the same way as `VENDOR_ITEMS`, matched by vendor name to the
  same `vendor-data.ts` records (same 10 vendors, one canonical slug
  scheme).

## Error handling

- Unknown slug → `notFound()` (standard Next.js 404), same as
  `/detail/[category]` behavior for an unknown category.
- Missing optional fields (`lat`/`lng`, `logo`, gallery images, doctor
  photos) degrade gracefully via existing `ImageWithFallback`/
  `InitialsAvatar` and the map's address-only fallback (Decision 6) —
  no vendor record needs every field populated.
- Contact form validation errors render inline via the existing
  `ErrorLabel` pattern; no submission ever reaches a real network call,
  so there's no network-failure case to handle.

## Testing

- No automated UI test infra exists in this repo (confirmed during
  research). Verify manually: `next build`/type-check passes, dev
  server renders `/vendor/<slug>` for at least 2 vendors with differing
  optional-field coverage (one with lat/lng + full gallery, one
  missing them, to exercise both map/gallery fallbacks), the "View
  Vendor" CTA from `/listings/vendors` and the homepage `Vendors`
  section both navigate to the right vendor page, and the contact
  modal's validation + mocked success state both work.
- Per CLAUDE.md, delete any Playwright-created screenshots/traces used
for that manual verification once it's done.
</content>
