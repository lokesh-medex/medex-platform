# Vivid Mesh redesign: /listings, /auth, /detail

## Context

The homepage (`/`) was redesigned around a "Vivid Mesh" visual system —
layered glass surfaces, brand-hued mesh gradients, a faint medical-icon
backdrop, and GSAP scroll motion — documented in `CLAUDE.md`. Every other
route (`/listings`, `/auth/*`, `/detail/*`) still uses the original flat
chrome (`app/_components/header/*`, `app/_components/footer/Footer.tsx`)
and flat section styling. `CLAUDE.md` explicitly calls out that adopting
Vivid Mesh outside the homepage is "its own explicit task each time" —
this spec is that task, covering all three remaining route groups.

Goal: bring `/listings`, `/auth/login`, `/auth/signup`, and
`/detail/[category]` to full visual parity with the homepage's Vivid Mesh
language (glass panels, mesh gradients, backdrop motifs, GSAP
Reveal/Parallax motion), reusing the homepage's `Header`/`Footer` chrome,
and delete the old chrome once nothing references it.

Non-goals: no behavioral changes to filtering/sorting/pagination logic,
auth form validation/submission logic, or cart/booking logic in the
detail page's BuyBox. This is a visual/structural migration only.

## Current state (research findings)

- **Routes**: `app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,
  `app/auth/{login,signup}/page.tsx` (both render `AuthPageShell`),
  `app/detail/[category]/page.tsx` (renders `DetailPage`). No nested
  layout.tsx files exist for these groups beyond the root layout.
- **Old chrome blast radius**: exactly 4 files import
  `app/_components/header/*` / `app/_components/footer/Footer.tsx`:
  `app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,
  `app/_components/auth/AuthPageShell.tsx`,
  `app/_components/detail/DetailPage.tsx`. Once all four are migrated,
  the old chrome files become dead code.
- **New chrome reusability**: `app/_components/home/{Header,Navbar,TopBar}.tsx`
  are generic — same `HeaderActive` prop shape as the old header, and
  `Navbar` already links to `/listings`, `/auth/login`, `/auth/signup`,
  and `/detail/<category>`. `Header` is `position: fixed` and reserves no
  layout space (unlike the old `sticky` header); on the homepage, `Hero`
  alone absorbs that top clearance. `app/_components/home/Footer.tsx` is
  a self-contained server component, portable as-is.
- **Forms**: `LoginForm`/`SignupForm` already use `react-hook-form` + zod
  - the `AppInput`/`AppPasswordInput`/`AppCheckbox`/`ErrorLabel` pattern
    mandated by `CLAUDE.md` — no changes needed to form internals.
- **Primitives available**: `app/_lib/glass.ts` (`glass.subtle`,
  `glass.vivid` + `glassScrim`, `glass.dark`), `app/_components/home/Mesh.tsx`
  (`Mesh` + `MeshPreset`, preset-driven blob layer),
  `app/_components/shared/BackdropMotifs.tsx` (seeded, deterministic),
  `app/_components/shared/Motion.tsx` (`Reveal`, `Parallax`, both gated
  on `prefers-reduced-motion`).

## Decisions

1. **Redesign depth**: full Vivid Mesh treatment for every page's own
   content sections, not just a chrome swap — glass panels, mesh
   gradients, backdrop motifs, and GSAP motion applied throughout.
2. **Sequencing**: implement one page group at a time — listings, then
   auth, then detail — each independently reviewable.
3. **Header clearance**: introduce a shared `PageShell` wrapper (new:
   `app/_components/shared/PageShell.tsx`) rather than repeating top
   padding in each page. Props: `{ active?: HeaderActive; showCart?:
boolean; cartCount?: number; onCartClick?: () => void; children:
ReactNode }` (passed straight through to `Header`, `active`
   defaulting to `""`). Renders `<Header .../>`, a `pt-32` top-padded
   wrapper around `children` (matching the `pt-32` Hero currently uses
   at `app/_components/home/Hero.tsx:142` to clear the fixed Header),
   then `<Footer />`. `HeaderActive` (`"" | "Packages" | "Lab Tests" |
"Services" | "Wellness" | "Vendors" | "Doctors"`) tracks mega-menu
   categories, not route groups — all 4 current usages already pass
   `active=""`, and the migration preserves that (no new nav-highlight
   behavior for listings/auth/detail).
4. **Deletion timing**: keep `app/_components/header/*` and
   `app/_components/footer/Footer.tsx` in the tree (unused but present)
   until all three groups are migrated, then delete everything in one
   final cleanup commit/step, including any now-dead imports.
5. **Mesh presets**: add new `"listings"`, `"auth"`, `"detail"` presets
   to `MESH_PRESETS` in `Mesh.tsx`, hand-tuned per section — do not
   reuse homepage presets out of context.

## Per-page-group design

### Listings (`app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,

`app/_components/listings/*`)

- Wrap page content in `PageShell showCart={false}` (matches current
  `<Header active="" showCart={false} />` usage).
- Add a new slim intro band above `TabPills`: heading + `Mesh
preset="listings"` + `BackdropMotifs`, in its own `relative
overflow-hidden` block (following the established
  `Hero`/`FeaturedServices`/`StatsBand` convention of pairing `Mesh`
  with `overflow-hidden` on the containing section). This gives the
  fixed-header clearance area real content instead of blank space,
  mirroring how `Hero` absorbs that role on `/`.
- **Implementation constraint discovered while planning:**
  `FilterSidebar` is `dt:sticky`, spanning the full height of the
  results area. Wrapping the filter/results region in `overflow-hidden`
  (to carry a mesh backdrop) would make that region `FilterSidebar`'s
  sticky-positioning ancestor and risk breaking its sticky behavior —
  so the mesh backdrop stays scoped to the intro band only; the
  filter/results region below it carries no mesh.
- Restyle `TabPills` (sits over the intro band's mesh, so `glass.subtle`
  refracts it) and `SearchSortBar`, `FilterSidebar`/
  `MobileFilterDrawer`, `FilterGroups`, `ListingCard` onto `glass.subtle`
  panels — `glass.subtle` is documented as safe "regardless of what's
  behind it", so this holds even without a mesh behind the
  filter/results region.
- `ListingCard`'s grid entrance wrapped in `Reveal`.
- No changes to `ListingsView.tsx`'s filter/search/sort/pagination
  state or logic — visual only.

### Auth (`app/_components/auth/{AuthPageShell,AuthBrandPanel,AuthCard}.tsx`)

- `AuthPageShell` swaps its old Header/2-col-grid/old-Footer
  composition for `PageShell showCart={false}` wrapping the existing
  2-col grid (`AuthBrandPanel` | `AuthCard`).
- `AuthBrandPanel` gets `Mesh preset="auth"` + `BackdropMotifs` behind
  its existing bullet content, replacing the current plain
  gradient+SVG-rings background.
- `AuthCard` becomes a `glass.subtle` panel (strong opacity needed for
  form legibility); its Login/Signup pill tabs restyled to the
  brand-dark active state used elsewhere in the new chrome (e.g.
  Navbar's mega-menu).
- `LoginForm`, `SignupForm`, `AppInput`, `AppPasswordInput`,
  `AppCheckbox`, `SocialAuthButtons` are untouched — chrome/background
  only, no field or validation changes.

### Detail (`app/_components/detail/DetailPage.tsx`)

- Swap old Header/Footer for `PageShell showCart cartCount={cartCount}`
  (matches current `<Header active="" showCart cartCount={cartCount} />`
  usage).
- **Implementation constraint discovered while planning:** the
  established codebase convention (`Hero`/`FeaturedServices`/`StatsBand`/
  `ServicesOrbital`) always pairs `Mesh`/`BackdropMotifs` with `relative
overflow-hidden` on their containing section, so the blob layer clips
  to that section. `BuyBox` is `dt:sticky`; wrapping its containing grid
  section in `overflow-hidden` would make that section `BuyBox`'s
  sticky-positioning ancestor and risk breaking the sticky behavior
  (`Non-goals` rules out layout/behavior regressions). So the mesh
  backdrop is scoped to the breadcrumb strip only (a short, non-sticky
  block) rather than spanning the sticky grid section below it.
- Breadcrumb strip becomes its own `relative overflow-hidden` section
  with `Mesh preset="detail"` + `BackdropMotifs` behind it, breadcrumb
  content restyled as a `glass.subtle` chip.
- Gallery/description/includes cards and `BuyBox` (sticky right column)
  all use `glass.subtle` (documented as safe to use "regardless of
  what's behind it", unlike `glass.vivid` which needs a live mesh/gradient
  behind it to avoid reading as a plain grey box) — no mesh sits behind
  this section, by the constraint above.
- All cart/qty/booking state and logic in `BuyBox`/`DetailPage`
  untouched.

## Testing

- Manual verification per page group in a browser (dev server) after
  each phase: visual check against homepage's Vivid Mesh language,
  functional check that filtering/sorting/pagination (listings), form
  validation/submission (auth), and cart/qty/booking (detail) all still
  work.
- No new automated tests required — this is a visual/structural
  migration with no logic changes; existing behavior is preserved, not
  newly created.
- After the final cleanup step, grep the repo to confirm
  `app/_components/header/*` and `app/_components/footer/Footer.tsx`
  have zero remaining imports before deleting them.

## Delete Playwright artifacts

Per `CLAUDE.md`, any Playwright-created screenshots/traces used to
visually verify these pages during implementation must be deleted once
their verification purpose is served.
