# Doctor detail page (`/doctor/[slug]`)

## Context

Doctors exist as list items today — on the homepage's `Doctors` section
(`app/_components/home/Doctors.tsx`, "Book now" button with no `href`,
does nothing) and as a `ListingCard` tab at `/listings/doctors`
(`app/_lib/listings-data.ts:557-618`, `DOCTOR_ITEMS`) — but neither links
anywhere. Unlike vendors, doctors' listing CTA is `"Book Now"`, which
`ListingCard` currently treats as `canAddToCart = true`
(`app/_components/listings/ListingCard.tsx:20`): clicking it adds
straight to cart with no date/time ever chosen. `ListingsView.tsx`'s
`detailHref` is computed once per _tab_ from `getDetailCategoryByLabel`
(`ListingsView.tsx:58-64`), which returns `undefined` for the
doctors/vendors tabs — so doctor cards aren't links at all today.

Goal: a rich, "world class" doctor detail page — profile, specializations,
languages, experience, location, and a real in-person/tele-consult
booking flow (date + time) — reusing this app's established Vivid-Mesh-
on-flat-chrome primitives (`PageShell`, `glass`, `Mesh`, `BackdropMotifs`,
`Reveal`), matching the visual language already established for
`/detail/[category]` and `/vendor/[slug]` (glass panels over a flat
`#F5F5F5` ground, no live mesh behind the sticky/main content grid), and
turning "Book Now" into a real flow that lands here instead of an
instant, dateless cart-add.

Non-goals: no backend/API integration (this repo has none); no real
booking persistence — confirming a booking is mocked (inline success
state, then a cart-count bump), the same way the vendor spec mocks its
contact form; no changes to the existing cart/checkout logic itself,
only to what triggers a cart add on the doctors tab; no doctor search/
filter changes beyond adding a slug-based link.

## Current state (research findings)

- **No per-doctor detail route exists.** Doctors are cards only, in two
  places: `home/Doctors.tsx` (`DOCTORS_DATA`, 4 doctors, richer of the
  two shapes — has `exp`, `rating`, `img`) and `DOCTOR_ITEMS`
  (`listings-data.ts:557-618`, 8 doctors, shape `{ title, category,
price, rating, meta, img? }` built via `mkItems`, `cta: "Book Now"`,
  `tagColor: brand.primary`). The two lists don't fully overlap (8 vs 4
  names, only the first 4 share img assets) and have no `slug`, bio,
  specializations, languages, location, or contact fields.
- **`ListingCard`'s "Book Now" path today**: `canAddToCart = item.cta ===
"Book Now"` (`ListingCard.tsx:20`) renders an "Add to Cart" button that
  calls `onAddToCart` directly — no detail page, no date/time ever
  collected. This spec changes that: once a `detailHref` exists for a
  doctor item, `ListingCard`'s existing stretched-`Link` overlay
  (`ListingCard.tsx:30-36`) makes the whole card navigate there instead,
  the same mechanism vendor's spec relies on — no `ListingCard` code
  changes needed, only `ListingsView.tsx`'s href computation (see
  Decisions).
- **No API/fetch layer anywhere** (confirmed in the vendor spec's
  research, still true) — every page is a server component reading a
  typed mock array from `app/_lib/*-data.ts`.
- **Chrome**: every non-home route renders through `PageShell`
  (`app/_components/shared/PageShell.tsx`), which wraps content in the
  `home/Header` + `home/Footer` Vivid Mesh chrome — same as vendor/detail.
- **Detail page visual precedent** (`app/_components/detail/DetailPage.tsx`,
  reused unchanged by the vendor spec): `PageShell` → breadcrumb strip in
  its own `relative overflow-hidden` block carrying `Mesh preset="detail"`
  - `BackdropMotifs` → a `dt:grid-cols-[1.5fr_1fr]` grid, non-sticky left
    column (`glass.subtle` panels), `dt:sticky` right column. The grid is
    deliberately not `overflow-hidden` (breaks the sticky right column).
    This page follows the same structure, with a booking panel taking the
    right column instead of `BuyBox`.
- **Reusable pieces**: `ImageWithFallback`/`InitialsAvatar`, `glass`
  (`app/_lib/glass.ts`), `Mesh` (`"detail"` preset), `BackdropMotifs`,
  `Reveal`, the `DoctorCard` pattern already in `home/Doctors.tsx` (photo
  - rating badge + antd `Rate`), the `FiCheck` checklist-grid pattern
    from `DetailPage.tsx:276-293` (reused here for specializations),
    `LANGUAGES_DATA` (`homepage-data.ts:233-238`, flag-icon `{name, flag}`
    pairs already used elsewhere for language display).
- **Gaps**: no antd `Segmented`, `DatePicker`, or `Modal` usage yet in
  this app (first introductions for this feature, per CLAUDE.md's
  antd-first rule — all are standard antd 6.x components, no new
  dependency needed).

## Decisions

1. **Route**: new top-level `app/doctor/[slug]/page.tsx` (not nested
   under `/detail` or `/listings`), mirroring `app/vendor/[slug]/page.tsx`.
   Static generation via `generateStaticParams()` over doctor slugs.
2. **Data model**: new `app/_lib/doctor-data.ts` as the single source of
   richer doctor profiles. Keyed by the 8 doctors already in
   `DOCTOR_ITEMS` (by title) — the larger, price-bearing list — rather
   than the homepage's 4-doctor `DOCTORS_DATA`; `DOCTOR_ITEMS` gets one
   new field, `slug`, generated from title (e.g. `"dr-ananya-sharma"`).
   `DOCTORS_DATA` (homepage) is matched to the same `doctor-data.ts`
   records by name for its own new `slug` field (4 of the 8 doctors
   overlap by name — homepage cards for those 4 link to real profiles;
   this spec does not need the homepage list to grow to 8).
3. **Wiring the real CTA**: `ListingsView.tsx`'s tab-level `detailHref`
   (`:58-64`) stays as-is for the 4 category tabs; the doctors tab
   additionally gets a per-item href (`item.slug ? \`/doctor/${item.slug}\`
   : undefined`), passed to `ListingCard`per-item instead of the
(currently`undefined`) tab-level value — same mechanism as vendor's
Decision 3. Once a card has a `detailHref`, `ListingCard`'s existing
stretched-`Link`makes the whole card navigate there; the "Book Now"
button inside it still renders (via`item.cta`, unchanged in
`ListingCard.tsx`) but as inert button text under the link overlay,
matching exactly how vendor's "View Vendor" button already behaves
today — no `ListingCard.tsx` changes needed.
4. **Visual treatment**: identical structural precedent to vendor/detail
   — `Mesh preset="detail"` for the breadcrumb band, `glass.subtle` (not
   `glass.vivid`) for every content panel, no live mesh behind the
   two-column grid.
5. **Booking flow (mocked)**: `DoctorBookingPanel.tsx` in the sticky
   right column:
   - antd `Segmented` for consult type, options filtered to what the
     doctor supports (`inPersonAvailable`/`teleConsultAvailable` — a
     doctor could offer only one, so the segmented control only ever
     shows the modes actually available; if only one, render it
     pre-selected with no toggle needed).
   - antd `DatePicker` (`disabledDate` blocks past dates), controlled
     via `react-hook-form` for consistency with the rest of the app's
     form handling, even though this isn't a submitted form to a backend
     — keeps validation (must pick date + slot before confirming)
     idiomatic rather than ad hoc `useState` juggling.
   - Time slots (`doctor.timeSlots`, same list every day — no real
     availability system exists) rendered as a wrapped row of toggle
     buttons, single-select.
   - "Confirm booking" button: disabled until type + date + slot are all
     set; on click, shows a ~1.5s loading state then an inline success
     message ("Booking confirmed for <date> at <time>") for ~2s, then
     resets the panel to its idle state and increments `PageShell`'s
     `cartCount` by 1 — mirrors the vendor contact modal's mocked-submit
     timing and the existing `onAddToCart` cart-count bump pattern
     already used in `ListingsView.tsx`/`DetailPage.tsx`. No real
     network call, no modal — inline in the sticky panel since there's
     only one action on this page (unlike vendor's separate "Contact"
     modal, which was one of several right-column actions).
6. **Contact block**: phone/email are optional fields on `Doctor`
   (per requirements); when present, rendered as `tel:`/`mailto:` rows
   below the booking panel using the same `FiPhone`/`FiMail` treatment
   the vendor spec defines for `VendorInfoPanel`. When both are absent,
   the block doesn't render at all (no "no contact info" placeholder).
7. **Specializations vs. specialty**: `specialty` is the single
   headline field already used everywhere doctors appear today (card
   category tag, header). `specializations` is a new, separate list of
   finer-grained expertise tags (e.g. `specialty: "Cardiologist"`,
   `specializations: ["Interventional Cardiology", "Heart Failure
Management", "Preventive Cardiology"]`) — rendered as its own panel
   using the `FiCheck` chip-grid pattern from `DetailPage.tsx:276-293`,
   not merged into the specialty tag.
8. **Languages**: rendered as small flag+label chips in the header,
   cross-referenced against `LANGUAGES_DATA` (`homepage-data.ts:233-238`)
   for a flag icon when a language name matches one of the 4 entries
   there; falls back to a plain text chip (no flag) for any language
   outside that list, since a doctor's languages aren't guaranteed to be
   a subset of the homepage's fixed 4-language filter list.

## Page design

**Route & data**

- `app/doctor/[slug]/page.tsx`: async server component. `await params`,
  `getDoctorBySlug(slug)`, `notFound()` on miss, render
  `<DoctorDetailPage doctor={doctor} />`. `generateStaticParams()`
  returns `{ slug }` for every entry in `DOCTORS`.
- `app/_lib/doctor-data.ts`:
  ```ts
  interface Doctor {
    slug: string;
    name: string;
    photo?: string;
    specialty: string;
    specializations: string[];
    languages: string[];
    yearsExperience: number;
    rating: string;
    reviewCount: number;
    location: string; // "Area, City" — same shape as vendor's `meta`
    bio: string;
    consultFee: number;
    inPersonAvailable: boolean;
    teleConsultAvailable: boolean;
    timeSlots: string[]; // e.g. ["09:00 AM", "09:30 AM", ...]
    phone?: string;
    email?: string;
  }
  export const DOCTORS: Doctor[];
  export function getDoctorBySlug(slug: string): Doctor | undefined;
  ```

**Composition** (`app/_components/doctor/DoctorDetailPage.tsx`,
`"use client"`, wrapped in `PageShell showCart cartCount={cartCount}` —
booking feeds the cart, unlike vendor's `showCart={false}`):

1. **Breadcrumb hero** — `relative overflow-hidden` band, `Mesh
preset="detail"` + `BackdropMotifs`, breadcrumb chip (`Home /
Listings / Doctors / <name>`, linking to `/` and `/listings/doctors`)
   in a `glass.subtle` pill — structurally identical to
   `DetailPage.tsx:174-202`.
2. **Header block**: photo (`ImageWithFallback` + `InitialsAvatar`
   fallback, circular), name (`h1`), specialty `Tag`, star rating +
   review count (`FaStar`, `DetailPage.tsx:56-66` treatment), years of
   experience, location meta line, language chips (Decision 8).
3. **Left column** (non-sticky, `glass.subtle` panels):
   - **About** panel — `bio`.
   - **Specializations** panel — `FiCheck` chip-grid over
     `specializations` (Decision 7).
4. **Right column** (`dt:sticky dt:top-28`):
   - **`DoctorBookingPanel.tsx`** (Decision 5): consult-type
     `Segmented`, `DatePicker`, time-slot buttons, fee display,
     "Confirm booking" button with the mocked loading → success →
     reset sequence.
   - **Contact block** below it (Decision 6): `tel:`/`mailto:` rows,
     rendered only when `phone`/`email` are present.

**Listings & homepage wiring**

- `app/_lib/listings-data.ts`: add `slug` to `ListingItem` (already
  optional per the vendor spec's change) and to each `DOCTOR_ITEMS` raw
  entry, generated from `title`.
- `app/_components/listings/ListingsView.tsx`: doctors-tab case computes
  a per-item `detailHref` (`item.slug ? \`/doctor/${item.slug}\` :
  undefined`) instead of leaving it `undefined` for the whole tab
  (Decision 3). Vendors and the 4 category tabs keep their existing
  logic unchanged.
- `app/_components/listings/ListingCard.tsx`: no changes needed — same
  reasoning as the vendor spec (`canAddToCart`/`detailHref` mechanisms
  already do the right thing once a per-item href is passed in).
- `app/_components/home/Doctors.tsx`: `DoctorCard`'s "Book now" `Button`
  gets `href={`/doctor/${doc.slug}`}` (antd `Button` supports `href`
  directly, already used elsewhere in this file for "Browse all
  doctors"). `DOCTORS_DATA` (`homepage-data.ts:139-181`) gets a `slug`
  field, matched by name to `doctor-data.ts` records (Decision 2).

## Error handling

- Unknown slug → `notFound()`, same as `/vendor/[slug]` and
  `/detail/[category]`.
- Missing optional fields (`photo`, `phone`, `email`) degrade gracefully
  — `InitialsAvatar` fallback for photo, contact block omitted entirely
  if both phone and email are absent.
- Booking panel: "Confirm booking" stays disabled until consult type +
  date + time slot are all chosen, so there's no invalid-submission
  state to handle — no network failure case exists since nothing is
  ever sent over the network.

## Testing

- No automated UI test infra exists in this repo. Verify manually:
  `next build`/type-check passes; dev server renders `/doctor/<slug>`
  for at least 2 doctors with differing optional-field coverage (one
  with phone+email+photo, one missing them, plus one that's
  tele-consult-only to exercise the single-mode `Segmented` case); the
  "Book Now" CTA from `/listings/doctors` and the homepage `Doctors`
  section both navigate to the right doctor page; the booking flow
  (pick type, date, slot, confirm) shows the mocked success state and
  bumps the header cart count.
- Per CLAUDE.md, delete any Playwright-created screenshots/traces used
  for that manual verification once it's done.
