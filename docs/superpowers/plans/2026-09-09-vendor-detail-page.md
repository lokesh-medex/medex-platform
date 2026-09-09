# Vendor Detail Page (`/vendor/[slug]`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a rich, per-vendor detail page at `/vendor/[slug]` (gallery,
about, doctors, services, facilities, location/map, contact) and wire the
currently dead-end "View Vendor" CTA — on the homepage `Vendors` section and
the `/listings/vendors` tab — into it.

**Architecture:** A new `app/_lib/vendor-data.ts` holds 10 hand-authored
vendor profiles keyed by slug, matching the same 10 vendors already listed
in `listings-data.ts`'s `VENDOR_ITEMS`. A new route
`app/vendor/[slug]/page.tsx` statically resolves a vendor and renders
`VendorDetailPage`, which follows `/detail/[category]`'s established visual
precedent exactly: `PageShell` → a `Mesh preset="detail"` breadcrumb band →
a `dt:grid-cols-[1.5fr_1fr]` grid with a non-sticky left column
(`glass.subtle` panels: gallery, about, facilities, doctors, services) and a
`dt:sticky` right column (a new `VendorInfoPanel`, the vendor-page
counterpart to `BuyBox`: address, embedded map, hours, contact links, and a
"Contact Vendor" button that opens a mocked react-hook-form modal). Both
CTA sources get a real per-item link once vendor slugs exist.

**Tech Stack:** Next.js 16 (App Router), React 19, antd 6 (`Carousel`,
`Modal`, `Rate`, `Tag`, `Button` — `Carousel` and `Modal` are first uses in
this app), Tailwind CSS 4, react-hook-form + zod (`AppInput`/new
`AppTextArea`), pnpm.

**Spec:** `docs/superpowers/specs/2026-09-09-vendor-detail-page-design.md`

## Global Constraints

- No backend/API integration exists anywhere in this repo — the contact
  modal's submit is mocked (inline success state, no network call); vendor
  content is static data in `app/_lib/vendor-data.ts`, not fetched.
- `glass.subtle` for every content panel on this page (not `glass.vivid`) —
  no live mesh sits behind the two-column grid, only behind the breadcrumb
  band above it, for the same reason documented in `DetailPage.tsx:205-211`
  (a `dt:sticky` element — here, `VendorInfoPanel` — must never have an
  `overflow-hidden` ancestor, or its sticky positioning breaks).
- `react-icons` for icons; antd's own component over a custom one wherever
  antd already has the primitive (`Carousel` for the gallery, `Modal` for
  the contact dialog, `Rate` for doctor ratings); `react-hook-form` for
  forms, never antd `Form`.
- Any new form field component follows the exact `Controller`-wrapping
  pattern in `app/_components/form/AppInput.tsx` (label, required marker,
  `ErrorLabel` on error).
- Package manager is pnpm (`pnpm-lock.yaml` is the live lockfile). Use
  `pnpm lint` for type/lint checks and `pnpm build` for full build
  verification.
- Delete any Playwright-created screenshots/traces once their verification
  purpose is served (per CLAUDE.md).

---

### Task 1: Vendor data model

**Files:**

- Create: `app/_lib/vendor-data.ts`
- Test: `pnpm lint` (no consumer exists yet — this task only establishes
  the typed data + helpers later tasks build on)

**Interfaces:**

- Consumes: nothing.
- Produces (consumed by every later task):
  - `interface VendorDoctor { name: string; specialty: string; rating: string }`
  - `interface VendorService { name: string; category: string; listingsTab: "packages" | "lab-tests" | "services" | "wellness"; price?: number; duration?: string }`
  - `interface Vendor { slug: string; title: string; category: string; rating: string; reviewCount: number; meta: string; tagline: string; description: string; logo?: string; gallery: string[]; address: string; lat?: number; lng?: number; phone: string; email: string; hours: string; amenities: string[]; doctors: VendorDoctor[]; services: VendorService[] }`
  - `export const VENDORS: Vendor[]`
  - `export function slugify(value: string): string`
  - `export function getVendorBySlug(slug: string): Vendor | undefined`
  - `export function getVendorByName(name: string): Vendor | undefined`

- [ ] **Step 1: Write `app/_lib/vendor-data.ts`**

```ts
// Static vendor profiles for /vendor/[slug]. Keyed by the same 10 vendors
// already listed in app/_lib/listings-data.ts's VENDOR_ITEMS (matched by
// title) so the two never drift into describing different vendor sets —
// see docs/superpowers/specs/2026-09-09-vendor-detail-page-design.md.

export interface VendorDoctor {
  name: string;
  specialty: string;
  rating: string;
}

export interface VendorService {
  name: string;
  category: string;
  /** Which /listings tab this service belongs to — used to build a
   * "View in Listings" link pre-filtered by name via NavSearch's existing
   * ?q= convention, instead of duplicating cart/booking logic here. */
  listingsTab: "packages" | "lab-tests" | "services" | "wellness";
  price?: number;
  duration?: string;
}

export interface Vendor {
  slug: string;
  title: string;
  category: string;
  rating: string;
  reviewCount: number;
  /** "Area, City" — same shape VENDOR_ITEMS already uses for its `meta` field. */
  meta: string;
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

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// A small pool of real, already-vetted photo URLs already used elsewhere in
// this app's mock data (see app/_lib/homepage-data.ts's VENDORS_RAW) —
// cycled across vendor galleries the same way listings-data.ts's
// expandVendors() cycles a vendor-name pool, rather than sourcing a new
// image per mock vendor.
const STOCK_PHOTOS = [
  "https://api.medex.co/images/provider-banners/76952150-acd7-4d9b-958f-8e55d6febe04.jpg",
  "https://api.medex.co/images/provider-banners/29b3f4ec-228f-4dc2-8ec6-3865dfd81140.jpeg",
  "https://api.medex.co/images/provider-banners/46bc6f60-aa5a-4d30-a533-9d621526da86.png",
  "https://api.medex.co/images/provider-banners/eec557ae-ef00-4380-9003-09d22cedc016.png",
  "https://api.medex.co/images/provider-banners/8d4d063e-4661-4b7a-996b-8ee6dafe41b4.jpg",
];

function galleryFor(index: number): string[] {
  return [
    STOCK_PHOTOS[index % STOCK_PHOTOS.length],
    STOCK_PHOTOS[(index + 2) % STOCK_PHOTOS.length],
  ];
}

const BANGKOK_HOSPITAL_LOGO =
  "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Bangkok-Hospital-Logo-1.png?strip=all&quality=70&webp=50&w=200";
const SAMITIVEJ_LOGO =
  "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Samitivej-Hospitals-Logo-1.png?strip=all&quality=70&webp=50&w=200";
const SOORIYA_LOGO =
  "https://api.medex.co/images/logos/c37f0a86-d75a-4903-ab0c-756c41cba1ae.jpg";

const RAW_VENDORS: Omit<Vendor, "slug" | "gallery">[] = [
  {
    title: "Bangkok Hospital",
    category: "Hospital",
    rating: "4.7",
    reviewCount: 421,
    meta: "Bangkok, Thailand",
    tagline: "Full-service international hospital with 24/7 emergency care.",
    description:
      "Bangkok Hospital is a JCI-accredited multi-specialty hospital serving both local and international patients, with a dedicated international patient desk and round-the-clock emergency and critical care.",
    logo: BANGKOK_HOSPITAL_LOGO,
    address: "2 Soi Soonvijai 7, New Phetchaburi Rd, Bangkok 10310, Thailand",
    lat: 13.7955,
    lng: 100.5695,
    phone: "+66-2-310-3000",
    email: "info@bangkokhospital.com",
    hours: "24 hours, every day",
    amenities: [
      "24/7 Emergency",
      "ICU & Critical Care",
      "International Patient Desk",
      "On-site Pharmacy",
      "Ambulance Service",
    ],
    doctors: [
      { name: "Dr. Somchai Preecha", specialty: "Cardiologist", rating: "4.8" },
      {
        name: "Dr. Aroonrat Chaiyasit",
        specialty: "General Surgeon",
        rating: "4.6",
      },
    ],
    services: [
      {
        name: "Cardiology Consultation",
        category: "Specialist Consultation",
        listingsTab: "services",
        price: 2800,
        duration: "30 min",
      },
      {
        name: "Comprehensive Full Body Checkup",
        category: "Health Package",
        listingsTab: "packages",
        price: 6200,
      },
      {
        name: "Emergency Care",
        category: "Emergency Services",
        listingsTab: "services",
      },
    ],
  },
  {
    title: "Samitivej Hospital",
    category: "Hospital",
    rating: "4.6",
    reviewCount: 388,
    meta: "Bangkok, Thailand",
    tagline: "Family-focused hospital known for pediatrics and orthopedics.",
    description:
      "Samitivej Hospital combines a strong pediatric and family-medicine practice with advanced orthopedic and rehabilitation services, in a patient-friendly, internationally-staffed environment.",
    logo: SAMITIVEJ_LOGO,
    address:
      "133 Sukhumvit 49, Klong Tan Nuea, Watthana, Bangkok 10110, Thailand",
    lat: 13.7305,
    lng: 100.5817,
    phone: "+66-2-022-2222",
    email: "contact@samitivejhospitals.com",
    hours: "24 hours, every day",
    amenities: [
      "24/7 Emergency",
      "International Patient Desk",
      "On-site Pharmacy",
      "Physiotherapy Center",
    ],
    doctors: [
      { name: "Dr. Kannika Sirisak", specialty: "Pediatrician", rating: "4.7" },
      {
        name: "Dr. Wichit Boonrod",
        specialty: "Orthopedic Surgeon",
        rating: "4.5",
      },
    ],
    services: [
      {
        name: "Pediatric Consultation",
        category: "Specialist Consultation",
        listingsTab: "services",
        price: 2200,
        duration: "30 min",
      },
      {
        name: "Orthopedic Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 8800,
      },
      {
        name: "Executive Health Checkup",
        category: "Health Package",
        listingsTab: "packages",
        price: 7200,
      },
    ],
  },
  {
    title: "MedEx Neo Clinic and Pharmacy",
    category: "Clinic",
    rating: "4.8",
    reviewCount: 256,
    meta: "Naxal, Kathmandu",
    tagline: "Neighborhood clinic and pharmacy for everyday and family care.",
    description:
      "MedEx Neo Clinic and Pharmacy offers walk-in general consultations, dermatology, vaccinations, and an on-site pharmacy, with same-day appointments and home sample collection for lab work.",
    address: "4th Floor, Thirbam Road, Naxal, Kathmandu 44600, Nepal",
    lat: 27.7148,
    lng: 85.3266,
    phone: "+977-1-4423456",
    email: "care@medexneoclinic.com",
    hours: "Sun–Fri: 8:00 AM – 8:00 PM, Sat: 9:00 AM – 5:00 PM",
    amenities: [
      "On-site Pharmacy",
      "Home Sample Collection",
      "Video Consultation",
      "Walk-in Appointments",
    ],
    doctors: [
      {
        name: "Dr. Anish Shrestha",
        specialty: "General Physician",
        rating: "4.9",
      },
      { name: "Dr. Priya Karki", specialty: "Dermatologist", rating: "4.7" },
    ],
    services: [
      {
        name: "General Consultation",
        category: "Consultation",
        listingsTab: "services",
        price: 800,
        duration: "20 min",
      },
      {
        name: "Skin & Dermatology Consultation",
        category: "Consultation",
        listingsTab: "services",
        price: 1200,
        duration: "30 min",
      },
      {
        name: "Vaccination",
        category: "Preventive Care",
        listingsTab: "services",
        price: 1500,
      },
    ],
  },
  {
    title: "Nectar Wellness Pvt Ltd",
    category: "Clinic",
    rating: "4.5",
    reviewCount: 174,
    meta: "Thamel, Kathmandu",
    tagline: "Wellness clinic blending medical consultation with spa therapy.",
    description:
      "Nectar Wellness pairs general wellness consultations and nutrition counseling with spa and massage therapy in private treatment rooms — a calmer alternative to a standard clinic visit.",
    address: "Thamel Marg, Thamel, Kathmandu 44600, Nepal",
    lat: 27.7154,
    lng: 85.3123,
    phone: "+977-1-4700123",
    email: "hello@nectarwellness.com.np",
    hours: "Daily: 9:00 AM – 7:00 PM",
    amenities: [
      "Private Treatment Rooms",
      "Aromatherapy",
      "Home Sample Collection",
      "Walk-in Appointments",
    ],
    doctors: [
      {
        name: "Dr. Sabina Rai",
        specialty: "Wellness Physician",
        rating: "4.6",
      },
      { name: "Dr. Bikash Thapa", specialty: "Nutritionist", rating: "4.4" },
    ],
    services: [
      {
        name: "Wellness Consultation",
        category: "Consultation",
        listingsTab: "services",
        price: 1000,
        duration: "30 min",
      },
      {
        name: "Full Body Spa Massage",
        category: "Spa & Therapy",
        listingsTab: "wellness",
        price: 1980,
        duration: "75 min",
      },
      {
        name: "Nutrition Counseling",
        category: "Consultation",
        listingsTab: "services",
        price: 900,
        duration: "30 min",
      },
    ],
  },
  {
    title: "Sooriya Diagnostic",
    category: "Diagnostic Lab",
    rating: "4.4",
    reviewCount: 302,
    meta: "Maharajgunj, Kathmandu",
    tagline: "Accredited diagnostic lab with home sample collection.",
    description:
      "Sooriya Diagnostic runs a full panel of blood and imaging diagnostics with digital reports delivered same-day for most tests, plus a home sample collection service for routine blood work.",
    logo: SOORIYA_LOGO,
    address: "Maharajgunj, Kathmandu 44600, Nepal",
    lat: 27.7362,
    lng: 85.3308,
    phone: "+977-1-4721234",
    email: "reports@sooriyadiagnostic.com.np",
    hours: "Sun–Fri: 6:00 AM – 6:00 PM, Sat: 7:00 AM – 2:00 PM",
    amenities: [
      "Home Sample Collection",
      "Digital Reports",
      "Accredited Laboratory",
    ],
    doctors: [
      {
        name: "Dr. Ramesh Adhikari",
        specialty: "Consultant Pathologist",
        rating: "4.5",
      },
    ],
    services: [
      {
        name: "Complete Blood Count (CBC)",
        category: "Blood Tests",
        listingsTab: "lab-tests",
        price: 450,
        duration: "Results in 4 hrs",
      },
      {
        name: "HbA1c Test",
        category: "Blood Tests",
        listingsTab: "lab-tests",
        price: 900,
        duration: "Results in 6 hrs",
      },
      {
        name: "Lipid Profile",
        category: "Blood Tests",
        listingsTab: "lab-tests",
        price: 650,
        duration: "Results in 6 hrs",
      },
    ],
  },
  {
    title: "Norvic International Hospital",
    category: "Hospital",
    rating: "4.6",
    reviewCount: 267,
    meta: "Kathmandu, Nepal",
    tagline:
      "International hospital specializing in cardiac and maternity care.",
    description:
      "Norvic International Hospital is known for its cardiac care unit and maternity services, backed by 24/7 emergency and critical care and an on-site pharmacy for admitted and outpatient care alike.",
    address: "Thapathali, Kathmandu 44600, Nepal",
    lat: 27.6939,
    lng: 85.3159,
    phone: "+977-1-4258554",
    email: "info@norvichospital.com",
    hours: "24 hours, every day",
    amenities: [
      "24/7 Emergency",
      "ICU & Critical Care",
      "On-site Pharmacy",
      "Ambulance Service",
    ],
    doctors: [
      {
        name: "Dr. Suresh Bhattarai",
        specialty: "Cardiologist",
        rating: "4.7",
      },
      { name: "Dr. Nisha Gurung", specialty: "Gynecologist", rating: "4.5" },
    ],
    services: [
      {
        name: "Cardiac Screening Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 5400,
      },
      {
        name: "Maternity Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 9600,
      },
      {
        name: "Emergency Care",
        category: "Emergency Services",
        listingsTab: "services",
      },
    ],
  },
  {
    title: "Grande International Hospital",
    category: "Hospital",
    rating: "4.5",
    reviewCount: 231,
    meta: "Kathmandu, Nepal",
    tagline: "Multi-specialty hospital with a dedicated cancer care center.",
    description:
      "Grande International Hospital offers neurology and oncology specialty care alongside general emergency services, with an in-house diagnostic imaging center for faster turnaround on scans.",
    address: "Dhapasi, Tokha Road, Kathmandu 44600, Nepal",
    lat: 27.7461,
    lng: 85.3348,
    phone: "+977-1-5159266",
    email: "care@grandehospital.com",
    hours: "24 hours, every day",
    amenities: [
      "24/7 Emergency",
      "International Patient Desk",
      "On-site Pharmacy",
      "Diagnostic Imaging Center",
    ],
    doctors: [
      { name: "Dr. Manoj Poudel", specialty: "Neurologist", rating: "4.6" },
      { name: "Dr. Sunita Maharjan", specialty: "Oncologist", rating: "4.5" },
    ],
    services: [
      {
        name: "Neurology Consultation",
        category: "Specialist Consultation",
        listingsTab: "services",
        price: 1800,
        duration: "30 min",
      },
      {
        name: "Cancer Screening Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 8200,
      },
      {
        name: "Comprehensive Full Body Checkup",
        category: "Health Package",
        listingsTab: "packages",
        price: 6800,
      },
    ],
  },
  {
    title: "Vejthani Hospital",
    category: "Hospital",
    rating: "4.6",
    reviewCount: 349,
    meta: "Bangkok, Thailand",
    tagline: "International hospital with a dedicated orthopedic center.",
    description:
      "Vejthani Hospital is widely known for orthopedic surgery and rehabilitation, with 24/7 emergency care and an international patient desk supporting patients traveling for treatment.",
    address: "1 Lat Phrao 111, Klong Chan, Bang Kapi, Bangkok 10240, Thailand",
    lat: 13.8102,
    lng: 100.6473,
    phone: "+66-2-734-0000",
    email: "info@vejthani.com",
    hours: "24 hours, every day",
    amenities: [
      "24/7 Emergency",
      "International Patient Desk",
      "On-site Pharmacy",
      "Rehabilitation Center",
    ],
    doctors: [
      {
        name: "Dr. Pattama Wongsuk",
        specialty: "Orthopedic Surgeon",
        rating: "4.7",
      },
      { name: "Dr. Thanawat Srisuk", specialty: "Cardiologist", rating: "4.6" },
    ],
    services: [
      {
        name: "Orthopedic Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 9200,
      },
      {
        name: "Cardiac Screening Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 5600,
      },
      {
        name: "Executive Health Checkup",
        category: "Health Package",
        listingsTab: "packages",
        price: 7400,
      },
    ],
  },
  {
    title: "Kathmandu Pharmacy Central",
    category: "Pharmacy",
    rating: "4.3",
    reviewCount: 142,
    meta: "Putalisadak, Kathmandu",
    tagline: "Full-service pharmacy with home delivery across Kathmandu.",
    description:
      "Kathmandu Pharmacy Central stocks a full range of prescription and over-the-counter medicines, with same-day home delivery and a walk-in health checkup kiosk for quick vitals checks.",
    address: "Putalisadak, Kathmandu 44600, Nepal",
    lat: 27.705,
    lng: 85.32,
    phone: "+977-1-4245678",
    email: "orders@kathmandupharmacycentral.com.np",
    hours: "Daily: 7:00 AM – 10:00 PM",
    amenities: [
      "Home Delivery",
      "Genuine Medicines",
      "Insurance Billing",
      "Extended Hours",
    ],
    doctors: [],
    services: [
      {
        name: "Prescription Medicines",
        category: "Pharmacy",
        listingsTab: "services",
        duration: "Same-day",
      },
      { name: "Home Delivery", category: "Pharmacy", listingsTab: "services" },
      {
        name: "Health Checkup Kiosk",
        category: "Preventive Care",
        listingsTab: "services",
        price: 300,
      },
    ],
  },
  {
    title: "Life Pharmacy Nepal",
    category: "Pharmacy",
    rating: "4.2",
    reviewCount: 118,
    meta: "New Baneshwor, Kathmandu",
    tagline: "Neighborhood pharmacy with a loyalty program and late hours.",
    description:
      "Life Pharmacy Nepal serves New Baneshwor with a wide medicine stock, wellness products, and home delivery, staying open later than most nearby pharmacies for evening prescriptions.",
    address: "New Baneshwor, Kathmandu 44600, Nepal",
    lat: 27.6893,
    lng: 85.3436,
    phone: "+977-1-4780123",
    email: "support@lifepharmacynepal.com",
    hours: "Daily: 7:00 AM – 11:00 PM",
    amenities: [
      "Home Delivery",
      "Genuine Medicines",
      "Loyalty Program",
      "Extended Hours",
    ],
    doctors: [],
    services: [
      {
        name: "Prescription Medicines",
        category: "Pharmacy",
        listingsTab: "services",
        duration: "Same-day",
      },
      { name: "Home Delivery", category: "Pharmacy", listingsTab: "services" },
      {
        name: "Wellness Products",
        category: "Pharmacy",
        listingsTab: "services",
      },
    ],
  },
];

export const VENDORS: Vendor[] = RAW_VENDORS.map((v, i) => ({
  ...v,
  slug: slugify(v.title),
  gallery: galleryFor(i),
}));

export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}

export function getVendorByName(name: string): Vendor | undefined {
  const normalized = name.trim().toLowerCase();
  return VENDORS.find((v) => v.title.toLowerCase() === normalized);
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/_lib/vendor-data.ts
git commit -m "Add vendor data model for /vendor/[slug]"
```

---

### Task 2: Vendor route + page skeleton

**Files:**

- Create: `app/vendor/[slug]/page.tsx`
- Create: `app/_components/vendor/VendorDetailPage.tsx`
- Test: manual (dev server + Playwright screenshot)

**Interfaces:**

- Consumes: `VENDORS`, `getVendorBySlug`, `type Vendor` (Task 1);
  `PageShell` (`app/_components/shared/PageShell.tsx`); `Mesh preset="detail"`
  (`app/_components/home/Mesh.tsx`, already exists); `BackdropMotifs`; `glass`.
- Produces: `export default function VendorDetailPage({ vendor }: { vendor: Vendor })`
  — later tasks (3–7) insert `VendorGallery`, `VendorDoctors`,
  `VendorServices`, and `VendorInfoPanel` into its JSX in place of the
  placeholders this task leaves.

- [ ] **Step 1: Write `app/vendor/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import VendorDetailPage from "@/app/_components/vendor/VendorDetailPage";
import { VENDORS, getVendorBySlug } from "@/app/_lib/vendor-data";

export function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  return <VendorDetailPage vendor={vendor} />;
}
```

- [ ] **Step 2: Write `app/_components/vendor/VendorDetailPage.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Tag } from "antd";
import { FaStar } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorDetailPageProps {
  vendor: Vendor;
}

export default function VendorDetailPage({ vendor }: VendorDetailPageProps) {
  return (
    <PageShell active="Vendors" showCart={false}>
      <div className="bg-[#F5F5F5]">
        <div className="relative overflow-hidden">
          <Mesh preset="detail" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={64}
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
              <Link
                href="/listings/vendors"
                className="text-slate-500 shrink-0"
              >
                Vendors
              </Link>
              <span className="shrink-0">/</span>
              <span className="text-slate-900 font-semibold truncate">
                {vendor.title}
              </span>
            </div>
          </div>
        </div>

        <section className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14 grid grid-cols-1 dt:grid-cols-[1.5fr_1fr] gap-9 items-start">
          {/* Not `overflow-hidden` on this section — the right column
              (VendorInfoPanel, added in Task 6) is `dt:sticky`, and
              wrapping a sticky ancestor in overflow-hidden breaks its
              sticky positioning, same constraint as DetailPage.tsx. */}
          <BackdropMotifs
            count={5}
            opacity={0.04}
            seed={41}
            zone="edges"
            minSize={110}
            maxSize={210}
          />

          {/* LEFT: header, gallery (Task 3), about, facilities, doctors (Task 4), services (Task 5) */}
          <div>
            <Tag
              variant="filled"
              className="m-0! mb-3! text-xs! font-bold text-secondary! bg-secondary-100! rounded-full px-3! py-1.5! border-0!"
            >
              {vendor.category}
            </Tag>
            <h1 className="font-heading text-slate-900 font-bold text-[clamp(24px,3vw,32px)] leading-[1.2] m-0 mb-2">
              {vendor.title}
            </h1>
            <div className="flex items-center gap-1.5 mb-6">
              <FaStar size={15} color="#f59e0b" />
              <span className="text-[13.5px] font-bold text-slate-900">
                {vendor.rating}
              </span>
              <span className="text-[13px] text-slate-400">
                ({vendor.reviewCount} reviews)
              </span>
              <span className="text-slate-300">&middot;</span>
              <span className="text-[13px] text-slate-500">{vendor.meta}</span>
            </div>

            <div className={`rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
                About
              </h2>
              <p className="text-[13.5px] font-bold text-secondary m-0 mb-3">
                {vendor.tagline}
              </p>
              <p className="text-slate-600 text-[14.5px] leading-[1.7] m-0">
                {vendor.description}
              </p>
            </div>

            <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
                Facilities
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
                {vendor.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5"
                  >
                    <FiCheck size={16} className="shrink-0 text-primary" />
                    <span className="text-[13.5px] text-slate-700 font-semibold">
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: sticky vendor info card (Task 6 replaces this placeholder) */}
          <div
            className={`flex flex-col gap-3 rounded-[20px] p-6 dt:sticky dt:top-28 ${glass.subtle}`}
          >
            <h2 className="font-heading text-slate-900 font-bold text-base m-0">
              {vendor.title}
            </h2>
            <p className="text-[13.5px] text-slate-600 m-0">{vendor.address}</p>
            <p className="text-[13.5px] text-slate-600 m-0">
              {vendor.phone} &middot; {vendor.email}
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Visual verification**

Run `pnpm dev`, then in Playwright: `browser_navigate` to
`http://localhost:3000/vendor/bangkok-hospital`, screenshot, confirm the
floating Header, mesh visible behind the breadcrumb chip, and the About/
Facilities panels and placeholder right-hand card all render as frosted
glass. Also navigate to `http://localhost:3000/vendor/not-a-real-vendor`
and confirm it 404s. Delete the screenshot(s) afterward.

- [ ] **Step 5: Commit**

```bash
git add app/vendor app/_components/vendor/VendorDetailPage.tsx
git commit -m "Add /vendor/[slug] route with page skeleton"
```

---

### Task 3: Image gallery

**Files:**

- Create: `app/_components/vendor/VendorGallery.tsx`
- Modify: `app/_components/vendor/VendorDetailPage.tsx`
- Test: manual (dev server + Playwright screenshot)

**Interfaces:**

- Consumes: `Vendor` (Task 1), `ImageWithFallback`/`InitialsAvatar`
  (`app/_components/shared/*`, unchanged), `glass`.
- Produces: `export default function VendorGallery({ vendor }: { vendor: Vendor })`,
  inserted into `VendorDetailPage.tsx`'s left column between the header
  block and the About panel.

- [ ] **Step 1: Write `app/_components/vendor/VendorGallery.tsx`**

```tsx
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
```

- [ ] **Step 2: Wire it into `VendorDetailPage.tsx`**

Add the import, change:

```tsx
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";
```

to:

```tsx
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";
```

Then insert the gallery between the header block and the About panel —
change:

```tsx
              <span className="text-[13px] text-slate-500">{vendor.meta}</span>
            </div>

            <div className={`rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
                About
              </h2>
```

to:

```tsx
              <span className="text-[13px] text-slate-500">{vendor.meta}</span>
            </div>

            <VendorGallery vendor={vendor} />

            <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
                About
              </h2>
```

(note the About panel's className gains `mt-7` here, to match the spacing
rhythm the Facilities panel below it already uses.)

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Visual verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/vendor/bangkok-hospital`, screenshot, confirm the
carousel renders both gallery photos with working dot navigation, and
clicking a thumbnail jumps the main carousel to that photo. Delete the
screenshot afterward.

- [ ] **Step 5: Commit**

```bash
git add app/_components/vendor/VendorGallery.tsx app/_components/vendor/VendorDetailPage.tsx
git commit -m "Add vendor gallery carousel"
```

---

### Task 4: Doctors section

**Files:**

- Create: `app/_components/vendor/VendorDoctors.tsx`
- Modify: `app/_components/vendor/VendorDetailPage.tsx`
- Test: manual (dev server + Playwright screenshot)

**Interfaces:**

- Consumes: `VendorDoctor` (Task 1), `InitialsAvatar`, `glass`.
- Produces: `export default function VendorDoctors({ doctors }: { doctors: VendorDoctor[] })`,
  returns `null` when `doctors` is empty (exercised by the two pharmacy
  vendors, which have `doctors: []`). Inserted into `VendorDetailPage.tsx`
  after the Facilities panel.

- [ ] **Step 1: Write `app/_components/vendor/VendorDoctors.tsx`**

```tsx
import { Rate } from "antd";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { glass } from "@/app/_lib/glass";
import type { VendorDoctor } from "@/app/_lib/vendor-data";

interface VendorDoctorsProps {
  doctors: VendorDoctor[];
}

/** Read-only staff roster — no per-doctor booking flow exists yet, so cards are informational only. */
export default function VendorDoctors({ doctors }: VendorDoctorsProps) {
  if (doctors.length === 0) return null;

  return (
    <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
      <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
        Our doctors
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {doctors.map((doc) => (
          <div
            key={doc.name}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <InitialsAvatar
              name={doc.name.replace("Dr. ", "")}
              rounded="lg"
              className="h-16! w-16! text-2xl! mb-3"
            />
            <h3 className="font-heading text-slate-900 font-bold text-[15px] leading-tight m-0 mb-1">
              {doc.name}
            </h3>
            <p className="text-primary-700 text-[12.5px] font-bold m-0 mb-2">
              {doc.specialty}
            </p>
            <Rate
              disabled
              allowHalf
              value={Number(doc.rating)}
              className="text-[11px]!"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire it into `VendorDetailPage.tsx`**

Change the import block from:

```tsx
import VendorGallery from "@/app/_components/vendor/VendorGallery";
```

to:

```tsx
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import VendorDoctors from "@/app/_components/vendor/VendorDoctors";
```

Then insert it after the Facilities panel — change:

```tsx
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: sticky vendor info card (Task 6 replaces this placeholder) */}
```

to:

```tsx
                ))}
              </div>
            </div>

            <VendorDoctors doctors={vendor.doctors} />
          </div>

          {/* RIGHT: sticky vendor info card (Task 6 replaces this placeholder) */}
```

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Visual verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/vendor/bangkok-hospital`, screenshot, confirm the
"Our doctors" panel renders 2 cards with initials-avatar, name, specialty,
and a disabled star rating. Navigate to
`http://localhost:3000/vendor/kathmandu-pharmacy-central` and confirm the
"Our doctors" panel is simply absent (empty `doctors` array). Delete
screenshots afterward.

- [ ] **Step 5: Commit**

```bash
git add app/_components/vendor/VendorDoctors.tsx app/_components/vendor/VendorDetailPage.tsx
git commit -m "Add vendor doctors section"
```

---

### Task 5: Services section

**Files:**

- Create: `app/_components/vendor/VendorServices.tsx`
- Modify: `app/_components/vendor/VendorDetailPage.tsx`
- Test: manual (dev server + Playwright screenshot)

**Interfaces:**

- Consumes: `VendorService` (Task 1), `formatPrice` (`app/_lib/detail-data.ts`,
  unchanged), `glass`.
- Produces: `export default function VendorServices({ services }: { services: VendorService[] })`,
  returns `null` when `services` is empty (not currently reachable — every
  vendor has at least 3 — but kept consistent with `VendorDoctors`'s
  empty-state handling for future vendor records). Inserted into
  `VendorDetailPage.tsx` after the Doctors section.

- [ ] **Step 1: Write `app/_components/vendor/VendorServices.tsx`**

```tsx
import Link from "next/link";
import { Tag } from "antd";
import { formatPrice } from "@/app/_lib/detail-data";
import { glass } from "@/app/_lib/glass";
import type { VendorService } from "@/app/_lib/vendor-data";

interface VendorServicesProps {
  services: VendorService[];
}

/** Informational service list — links out to the matching /listings tab
 * (pre-filtered by name via the existing ?q= search convention) rather
 * than duplicating cart/booking logic on this page. */
export default function VendorServices({ services }: VendorServicesProps) {
  if (services.length === 0) return null;

  return (
    <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
      <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
        Services
      </h2>
      <div className="flex flex-col gap-2.5">
        {services.map((s) => (
          <Link
            key={s.name}
            href={`/listings/${s.listingsTab}?q=${encodeURIComponent(s.name)}`}
            className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 transition-colors hover:border-primary"
          >
            <div className="min-w-0">
              <span className="block text-[13.5px] font-bold text-slate-900 truncate">
                {s.name}
              </span>
              <span className="text-xs text-slate-500">
                {s.category}
                {s.duration ? ` · ${s.duration}` : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {s.price != null && (
                <span className="font-heading text-slate-900 font-bold text-[14px]">
                  {formatPrice(s.price)}
                </span>
              )}
              <Tag
                variant="filled"
                className="m-0! text-[11px]! font-bold text-primary! bg-primary-100! rounded-full px-2.5! py-1! border-0!"
              >
                View
              </Tag>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire it into `VendorDetailPage.tsx`**

Change the import block from:

```tsx
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import VendorDoctors from "@/app/_components/vendor/VendorDoctors";
```

to:

```tsx
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import VendorDoctors from "@/app/_components/vendor/VendorDoctors";
import VendorServices from "@/app/_components/vendor/VendorServices";
```

Then insert it after `VendorDoctors` — change:

```tsx
            <VendorDoctors doctors={vendor.doctors} />
          </div>
```

to:

```tsx
            <VendorDoctors doctors={vendor.doctors} />
            <VendorServices services={vendor.services} />
          </div>
```

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Visual + functional verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/vendor/bangkok-hospital`, screenshot, confirm the
Services panel lists 3 rows with name/category/price and a "View" tag.
Click one row and confirm it navigates to `/listings/services?q=...` (or
`/listings/packages?q=...`) with the search box pre-filled from the `?q=`
param. Delete the screenshot afterward.

- [ ] **Step 5: Commit**

```bash
git add app/_components/vendor/VendorServices.tsx app/_components/vendor/VendorDetailPage.tsx
git commit -m "Add vendor services section"
```

---

### Task 6: Location, map, and the sticky info panel

**Files:**

- Create: `app/_components/vendor/VendorInfoPanel.tsx`
- Modify: `app/_components/vendor/VendorDetailPage.tsx`
- Test: manual (dev server + Playwright screenshot)

**Interfaces:**

- Consumes: `Vendor` (Task 1), `ImageWithFallback`/`InitialsAvatar`, `glass`.
- Produces: `export default function VendorInfoPanel({ vendor }: { vendor: Vendor })`,
  replacing the plain placeholder card `VendorDetailPage.tsx` has had since
  Task 2. Renders a `VendorContactModal` (Task 7 fills in that component —
  this task imports and mounts it with `open={false}` behavior stubbed via
  local `useState`, and Task 7 supplies the modal's actual content).

**Implementation note (refinement discovered while planning):** the spec's
Decision 6 describes a two-tier map fallback (precise lat/lng, else
address-only with no iframe at all). Since `Vendor.address` is a
_required_ field (Task 1) while `lat`/`lng` are optional, the "neither
lat/lng nor address" case can never occur — so this task always renders an
iframe, querying by `lat,lng` when present and by the URL-encoded address
string otherwise (Google's `output=embed` mode geocodes a plain address
query directly, no API key needed either way). This is strictly better
coverage than a text-only fallback and needs no extra branch.

- [ ] **Step 1: Write `app/_components/vendor/VendorInfoPanel.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button, Tag } from "antd";
import {
  FiClock,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import VendorContactModal from "@/app/_components/vendor/VendorContactModal";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorInfoPanelProps {
  vendor: Vendor;
}

/** Sticky (desktop) contact card — the vendor-page counterpart to
 * DetailPage's BuyBox: recap, embedded map, hours, quick contact links,
 * and the Contact Vendor CTA. */
export default function VendorInfoPanel({ vendor }: VendorInfoPanelProps) {
  const [contactOpen, setContactOpen] = useState(false);

  const mapQuery =
    vendor.lat != null && vendor.lng != null
      ? `${vendor.lat},${vendor.lng}`
      : encodeURIComponent(vendor.address);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <>
      <div
        className={`flex flex-col gap-4.5 rounded-[20px] p-6 dt:sticky dt:top-28 ${glass.subtle}`}
      >
        <div className="flex items-center gap-3">
          {vendor.logo ? (
            <ImageWithFallback
              src={vendor.logo}
              alt={vendor.title}
              height={44}
              width={44}
              className="h-11 w-11 rounded-[10px] object-contain bg-white border border-slate-200"
              fallback={
                <InitialsAvatar
                  name={vendor.title}
                  rounded="lg"
                  className="h-11! w-11! text-lg!"
                />
              }
            />
          ) : (
            <InitialsAvatar
              name={vendor.title}
              rounded="lg"
              className="h-11! w-11! text-lg!"
            />
          )}
          <div className="min-w-0">
            <h2 className="font-heading text-slate-900 font-bold text-base leading-tight m-0 truncate">
              {vendor.title}
            </h2>
            <Tag
              variant="filled"
              className="m-0! mt-1! text-[11px]! font-bold text-secondary! bg-secondary-100! rounded-full px-2.5! py-0.5! border-0!"
            >
              {vendor.category}
            </Tag>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <FiMapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
          <div className="min-w-0">
            <p className="text-[13.5px] text-slate-700 m-0">{vendor.address}</p>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12.5px] font-bold text-primary mt-1"
            >
              Get directions
              <FiExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 h-40">
          <iframe
            title={`Map showing ${vendor.title}`}
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
          <FiClock size={15} className="shrink-0 text-slate-400" />
          {vendor.hours}
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
          <a
            href={`tel:${vendor.phone}`}
            className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700"
          >
            <FiPhone size={15} className="shrink-0 text-primary" />
            {vendor.phone}
          </a>
          <a
            href={`mailto:${vendor.email}`}
            className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700"
          >
            <FiMail size={15} className="shrink-0 text-primary" />
            {vendor.email}
          </a>
        </div>

        <Button
          type="text"
          block
          onClick={() => setContactOpen(true)}
          className="h-auto! py-3.5! text-white! text-[15px]! font-sans bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]!"
        >
          Contact Vendor
        </Button>
      </div>

      <VendorContactModal
        vendor={vendor}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
```

This imports `VendorContactModal`, which does not exist until Task 7 —
Step 2 below adds a minimal placeholder so this task type-checks and is
independently testable; Task 7 replaces the placeholder's body with the
real form.

- [ ] **Step 2: Write a placeholder `app/_components/vendor/VendorContactModal.tsx`**

```tsx
"use client";

import { Modal } from "antd";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorContactModalProps {
  vendor: Vendor;
  open: boolean;
  onClose: () => void;
}

/** Placeholder — Task 7 replaces this body with the real contact form. */
export default function VendorContactModal({
  vendor,
  open,
  onClose,
}: VendorContactModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Contact {vendor.title}
        </span>
      }
    >
      <p className="text-slate-500 text-sm">Contact form coming soon.</p>
    </Modal>
  );
}
```

- [ ] **Step 3: Replace the placeholder right column in `VendorDetailPage.tsx`**

Change the import block from:

```tsx
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import VendorDoctors from "@/app/_components/vendor/VendorDoctors";
import VendorServices from "@/app/_components/vendor/VendorServices";
```

to:

```tsx
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import VendorDoctors from "@/app/_components/vendor/VendorDoctors";
import VendorServices from "@/app/_components/vendor/VendorServices";
import VendorInfoPanel from "@/app/_components/vendor/VendorInfoPanel";
```

Then change:

```tsx
          {/* RIGHT: sticky vendor info card (Task 6 replaces this placeholder) */}
          <div
            className={`flex flex-col gap-3 rounded-[20px] p-6 dt:sticky dt:top-28 ${glass.subtle}`}
          >
            <h2 className="font-heading text-slate-900 font-bold text-base m-0">
              {vendor.title}
            </h2>
            <p className="text-[13.5px] text-slate-600 m-0">
              {vendor.address}
            </p>
            <p className="text-[13.5px] text-slate-600 m-0">
              {vendor.phone} &middot; {vendor.email}
            </p>
          </div>
        </section>
```

to:

```tsx
          {/* RIGHT: sticky vendor info card */}
          <VendorInfoPanel vendor={vendor} />
        </section>
```

- [ ] **Step 4: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 5: Visual verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/vendor/bangkok-hospital`, screenshot, confirm the
sticky info card shows logo/name/category, address with a working "Get
directions" link, an embedded map iframe, hours, tel:/mailto: links, and
a "Contact Vendor" button that opens the placeholder modal. Also check
`http://localhost:3000/vendor/kathmandu-pharmacy-central` (no `lat`/`lng`
set... note: Task 1's data gives every vendor coordinates, so this instead
confirms the `logo`-less fallback path: the card should show an
`InitialsAvatar` instead of a broken image). Delete screenshots afterward.

- [ ] **Step 6: Commit**

```bash
git add app/_components/vendor/VendorInfoPanel.tsx app/_components/vendor/VendorContactModal.tsx app/_components/vendor/VendorDetailPage.tsx
git commit -m "Add vendor info panel with embedded map"
```

---

### Task 7: Contact modal form

**Files:**

- Create: `app/_components/form/AppTextArea.tsx`
- Modify: `app/_components/vendor/VendorContactModal.tsx` (full replace of
  the Task 6 placeholder body)
- Test: manual (dev server + Playwright)

**Interfaces:**

- Consumes: `AppInput` (`app/_components/form/AppInput.tsx`, unchanged),
  `ErrorLabel` (`app/_components/form/ErrorLabel.tsx`, unchanged), `Vendor`
  (Task 1).
- Produces: `export default function AppTextArea<T extends FieldValues>(props: IProps<T>)`
  (same shape as `AppInput`, wrapping antd `Input.TextArea`) — reusable by
  any future feature needing a multi-line field, per CLAUDE.md's form
  primitive pattern. `VendorContactModal`'s public props are unchanged from
  Task 6 (`{ vendor, open, onClose }`).

- [ ] **Step 1: Write `app/_components/form/AppTextArea.tsx`**

```tsx
"use client";

import { useRef } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input, type TextAreaProps } from "antd";
import ErrorLabel from "@/app/_components/form/ErrorLabel";

interface IProps<T extends FieldValues> extends Omit<
  TextAreaProps,
  "name" | "value" | "onChange"
> {
  required?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

/** Reusable textarea field: label + antd `Input.TextArea` wired through react-hook-form's `Controller`, with error handling. */
function AppTextArea<T extends FieldValues>(props: IProps<T>) {
  const { required, label, name, placeholder, control, ...restProps } = props;
  const _placeholder = placeholder || `Enter ${label}`;

  const inputRef = useRef(null);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold text-sm text-slate-700" htmlFor={name}>
        {label}
        {required && "*"}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <div className="w-full">
              <Input.TextArea
                id={name}
                ref={inputRef}
                status={error?.message ? "error" : undefined}
                size="large"
                className={error ? "border border-danger" : undefined}
                title={label}
                value={value}
                onChange={onChange}
                placeholder={_placeholder}
                {...restProps}
              />
              {error && <ErrorLabel>{error.message}</ErrorLabel>}
            </div>
          );
        }}
      />
    </div>
  );
}

export default AppTextArea;
```

- [ ] **Step 2: Replace `app/_components/vendor/VendorContactModal.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiCheckCircle } from "react-icons/fi";
import AppInput from "@/app/_components/form/AppInput";
import AppTextArea from "@/app/_components/form/AppTextArea";
import type { Vendor } from "@/app/_lib/vendor-data";

const contactSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().min(1, "Enter your email").email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Enter a message"),
});

type ContactValues = z.infer<typeof contactSchema>;

interface VendorContactModalProps {
  vendor: Vendor;
  open: boolean;
  onClose: () => void;
}

/** Mocked contact form — no backend exists in this app yet, so submit just
 * shows an inline success state for ~2s, then resets and closes. */
export default function VendorContactModal({
  vendor,
  open,
  onClose,
}: VendorContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const { control, handleSubmit, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const submit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      onClose();
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Contact {vendor.title}
        </span>
      }
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <FiCheckCircle size={40} className="text-green-600" />
          <p className="text-slate-700 text-[14.5px] m-0">
            Message sent — {vendor.title} will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} noValidate className="pt-2">
          <div className="mb-4">
            <AppInput
              name="name"
              control={control}
              label="Your name"
              required
            />
          </div>
          <div className="mb-4">
            <AppInput
              name="email"
              control={control}
              label="Email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <AppInput name="phone" control={control} label="Phone (optional)" />
          </div>
          <div className="mb-6">
            <AppTextArea
              name="message"
              control={control}
              label="Message"
              required
              rows={4}
              placeholder={`Ask ${vendor.title} a question...`}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="h-auto! py-3.5! text-[15px]! font-sans"
          >
            Send message
          </Button>
        </form>
      )}
    </Modal>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Functional verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/vendor/bangkok-hospital`, click "Contact Vendor",
submit the form empty and confirm validation errors render under each
required field, then fill in a name/email/message and submit — confirm
the success state (checkmark + "Message sent..." text) appears, and that
the modal auto-closes after ~2s.

- [ ] **Step 5: Commit**

```bash
git add app/_components/form/AppTextArea.tsx app/_components/vendor/VendorContactModal.tsx
git commit -m "Add vendor contact modal form"
```

---

### Task 8: Wire the real "View Vendor" CTAs

**Files:**

- Modify: `app/_lib/listings-data.ts:1-8` (imports), `:13-26` (`ListingItem`
  interface), `:481-545` (`VENDOR_ITEMS`)
- Modify: `app/_components/listings/ListingsView.tsx:20-27` (imports),
  `:186-195` (card map)
- Modify: `app/_components/home/Vendors.tsx` (imports, card map)
- Test: manual (dev server + Playwright)

**Interfaces:**

- Consumes: `getVendorByName`, `slugify` (Task 1).
- Produces: `ListingItem` gains an optional `slug?: string`, set only on
  vendor items — nothing else changes shape.

- [ ] **Step 1: Add `slug` to `ListingItem` and import `slugify` in `listings-data.ts`**

Change:

```ts
import type { IconType } from "react-icons";
import { FaFlask, FaUserMd } from "react-icons/fa";
import { FiBox, FiHeart, FiHome, FiStar } from "react-icons/fi";
import { brand } from "@/app/_lib/theme";
```

to:

```ts
import type { IconType } from "react-icons";
import { FaFlask, FaUserMd } from "react-icons/fa";
import { FiBox, FiHeart, FiHome, FiStar } from "react-icons/fi";
import { brand } from "@/app/_lib/theme";
import { slugify } from "@/app/_lib/vendor-data";
```

Change:

```ts
export interface ListingItem {
  id: string;
  title: string;
  category: string;
  meta: string;
  cta: string;
  tagColor: string;
  gradient: string;
  price?: number;
  rating?: string;
  badge?: string;
  img?: string;
  vendorName?: string;
}
```

to:

```ts
export interface ListingItem {
  id: string;
  title: string;
  category: string;
  meta: string;
  cta: string;
  tagColor: string;
  gradient: string;
  price?: number;
  rating?: string;
  badge?: string;
  img?: string;
  vendorName?: string;
  /** Set only on vendors-tab items — links the card to /vendor/[slug]. */
  slug?: string;
}
```

- [ ] **Step 2: Generate a `slug` for each `VENDOR_ITEMS` entry**

Change:

```ts
const VENDOR_ITEMS = mkItems(
  [
```

to:

```ts
const VENDOR_ITEMS: ListingItem[] = mkItems(
  [
```

Then change the closing of that call from:

```ts
  ],
  { prefix: "vendors", tagColor: brand.secondary, cta: "View Vendor" }
);
```

to:

```ts
  ],
  { prefix: "vendors", tagColor: brand.secondary, cta: "View Vendor" }
).map((item) => ({ ...item, slug: slugify(item.title) }));
```

- [ ] **Step 3: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Give the vendors tab per-item hrefs in `ListingsView.tsx`**

Change the type-only import from:

```tsx
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
import {
  LISTINGS_TABS,
  PAGE_SIZE,
  defaultFilterState,
  filterAndSortItems,
  sortOptionsFor,
  type ListingItem,
  type SortValue,
} from "@/app/_lib/listings-data";
```

Then change the card map from:

```tsx
<Reveal className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
  {visibleItems.map((item) => (
    <ListingCard
      key={item.id}
      item={item}
      detailHref={detailHref}
      onAddToCart={() => setCartCount((c) => c + 1)}
    />
  ))}
</Reveal>
```

to:

```tsx
<Reveal className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
  {visibleItems.map((item) => (
    <ListingCard
      key={item.id}
      item={item}
      detailHref={hrefFor(item)}
      onAddToCart={() => setCartCount((c) => c + 1)}
    />
  ))}
</Reveal>
```

Add the `hrefFor` helper just above the `return` statement — change:

```tsx
  const clearFilters = () => updateFilters(() => defaultFilterState(tab));

  return (
```

to:

```tsx
  const clearFilters = () => updateFilters(() => defaultFilterState(tab));

  // Every other linkable tab shares one detailHref per tab (one static
  // /detail/[category] page each); vendors need a distinct URL per card.
  const hrefFor = (item: ListingItem) =>
    tab.id === "vendors"
      ? item.slug
        ? `/vendor/${item.slug}`
        : undefined
      : detailHref;

  return (
```

- [ ] **Step 5: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 6: Wire the homepage `Vendors` section**

Change the top imports of `app/_components/home/Vendors.tsx` from:

```tsx
import Image from "next/image";
import { Button } from "antd";
import { FiArrowRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { VENDORS_DATA } from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";
```

to:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { FiArrowRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { VENDORS_DATA } from "@/app/_lib/homepage-data";
import { getVendorByName } from "@/app/_lib/vendor-data";
import Mesh from "./Mesh";
```

Then change the card map — note the arrow function body changes from an
implicit-return `(...)` to an explicit `{ ... return (...) }` so it can
look up the matching vendor record first. Change:

```tsx
          {VENDORS_DATA.map((v, i) => (
            <article
              key={`${v.name}-${i}`}
              className={`group relative h-[360px] overflow-hidden rounded-[28px] shadow-[0_18px_44px_rgba(15,23,42,0.16)] ${SPANS[i]}`}
            >
```

to:

```tsx
          {VENDORS_DATA.map((v, i) => {
            const vendor = getVendorByName(v.name);
            return (
            <article
              key={`${v.name}-${i}`}
              className={`group relative h-[360px] overflow-hidden rounded-[28px] shadow-[0_18px_44px_rgba(15,23,42,0.16)] ${SPANS[i]}`}
            >
```

And change the end of the same `<article>` from:

```tsx
                <Button
                  type="text"
                  className="h-auto! bg-white! px-5! py-2.5! text-[13px]! text-slate-900! transition-transform! duration-200! font-sans group-hover:-translate-y-0.5!"
                >
                  <span className="flex items-center gap-1.5">
                    Book now
                    <FiArrowUpRight size={13} />
                  </span>
                </Button>
              </div>
            </article>
          ))}
```

to:

```tsx
                <Button
                  type="text"
                  className="h-auto! bg-white! px-5! py-2.5! text-[13px]! text-slate-900! transition-transform! duration-200! font-sans group-hover:-translate-y-0.5!"
                >
                  <span className="flex items-center gap-1.5">
                    Book now
                    <FiArrowUpRight size={13} />
                  </span>
                </Button>
              </div>
              {vendor && (
                <Link
                  href={`/vendor/${vendor.slug}`}
                  aria-label={v.name}
                  className="absolute inset-0 z-10"
                />
              )}
            </article>
            );
          })}
```

(cards for `VENDORS_DATA` entries with no matching vendor record —
"Purnayau Hydro Facial" and "Heavenly Spa", which are wellness-only
vendors not among the 10 canonical vendors in `VENDOR_ITEMS` — simply
render without the link overlay, same inert behavior as today. The
`Link` is placed after the visible content, at `z-10`, so it sits on top
and takes every click uniformly, including on top of the decorative
"Book now" button, which has no `onClick` of its own.)

- [ ] **Step 7: Type-check**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 8: Functional verification**

With `pnpm dev` running, in Playwright: navigate to
`http://localhost:3000/listings/vendors`, click a vendor card's "View
Vendor" button, confirm it navigates to `/vendor/<slug>` for that vendor.
Navigate to `http://localhost:3000/`, scroll to the "Vendors" section,
click the "Nectar Wellness Pvt Ltd" card, confirm it navigates to
`/vendor/nectar-wellness-pvt-ltd`; confirm the "Purnayau Hydro Facial" and
"Heavenly Spa" cards remain non-clickable (no console errors). Delete any
screenshots taken.

- [ ] **Step 9: Commit**

```bash
git add app/_lib/listings-data.ts app/_components/listings/ListingsView.tsx app/_components/home/Vendors.tsx
git commit -m "Wire View Vendor CTAs to /vendor/[slug]"
```

---

### Task 9: Full verification pass

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Full build**

Run: `pnpm build`
Expected: build succeeds, including static generation of all 10
`/vendor/[slug]` pages (watch the build output list them under
`generateStaticParams`).

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: End-to-end manual walkthrough**

With `pnpm dev` running, in Playwright:

- Navigate to `/vendor/bangkok-hospital` (a hospital, full field coverage:
  logo, 2 doctors, 3 services). Screenshot desktop width. Confirm every
  section renders: breadcrumb, gallery, header/rating, About, Facilities,
  Our doctors, Services, and the sticky info panel with a working map,
  directions link, and Contact Vendor button.
- Navigate to `/vendor/kathmandu-pharmacy-central` (a pharmacy, no logo,
  empty doctors array). Confirm the "Our doctors" panel is absent, the
  info panel shows an `InitialsAvatar` in place of a logo, and everything
  else still renders correctly.
- Resize to a mobile viewport (`browser_resize`) on `/vendor/bangkok-hospital`
  and confirm the two-column grid collapses to one column with the info
  panel below the main content (not sticky, since `dt:sticky` only applies
  at the `dt` breakpoint).
- Re-verify both CTA entry points from Task 8 (listings tab card, homepage
  Vendors card) still work.
- Delete every screenshot taken during this task and Tasks 2–8, per
  CLAUDE.md.

- [ ] **Step 4: Final status check**

Run: `git status`
Expected: clean tree (all 9 tasks already committed), no stray Playwright
artifact files left behind.
</content>
