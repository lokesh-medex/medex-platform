// Static content for the Medex detail page, translated from the design canvas
// (Medex Detail Page.dc.html) CATALOG constant.

import { slugify } from "@/app/_lib/slug";

export type DetailCategory = "package" | "labtest" | "service" | "wellness";

/** Maps a navbar NavMenu.label (see homepage-data.ts) to its detail category. */
const CATEGORY_BY_LABEL: Record<string, DetailCategory> = {
  Packages: "package",
  "Lab Tests": "labtest",
  Services: "service",
  Wellness: "wellness",
};

export function getDetailCategoryByLabel(
  label: string
): DetailCategory | undefined {
  return CATEGORY_BY_LABEL[label];
}

export interface DetailItem {
  categoryLabel: string;
  includesHeading: string;
  title: string;
  badge: string | null;
  imgSrc: string;
  credit: string;
  creditHref: string;
  description: string;
  includes: string[];
  rating: string;
  reviewCount: number;
  meta: string;
  vendorName: string;
  vendorCategory: string;
  vendorDescription: string;
  vendorLocation: string;
  vendorLogo: string;
  price: string;
  originalPrice: string | null;
  discountPct: string | null;
  /** Preparation instructions the customer needs before the appointment/test, if any. */
  prep?: string;
  /** Turnaround time for results/deliverables, if applicable (e.g. lab reports, consultation notes). */
  tat?: string;
  /** How to book this item, if it needs more than "Add to Cart" (e.g. scheduling, home collection). */
  bookingInfo?: string;
}

export const DETAIL_CATALOG: Record<DetailCategory, DetailItem> = {
  package: {
    categoryLabel: "Packages",
    includesHeading: "Tests included",
    title: "Comprehensive Full Body Checkup",
    badge: "Popular",
    imgSrc:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    credit: "Photo by JC Gellidon on Unsplash",
    creditHref: "https://unsplash.com/@jcgellidon",
    description:
      "A complete diagnostic screening covering blood work, cardiac markers, liver and kidney function, and a physician review — designed to catch issues early with a single visit.",
    includes: [
      "Complete Blood Count",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
      "ECG",
      "Physician Consultation",
      "Digital Report",
    ],
    rating: "4.7",
    reviewCount: 312,
    meta: "55 tests · results in 24 hrs",
    vendorName: "Bangkok Hospital",
    vendorCategory: "Hospital",
    vendorDescription:
      "Bangkok Hospital is a JCI-accredited multi-specialty hospital serving both local and international patients, with a dedicated international patient desk and round-the-clock emergency and critical care.",
    vendorLocation: "Sukhumvit, Bangkok",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Bangkok-Hospital-Logo-1.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 5,500",
    originalPrice: "NPR 6,200",
    discountPct: "11% OFF",
    prep: "Fast for 8–10 hours before your visit (water is fine). Wear a loose-sleeved top for the blood draw.",
    tat: "Full report within 24 hours, including physician review.",
    bookingInfo:
      "Book a slot online or call the hospital directly; walk-ins accepted subject to availability.",
  },
  labtest: {
    categoryLabel: "Lab Tests",
    includesHeading: "What's covered",
    title: "HbA1c Test",
    badge: null,
    imgSrc:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
    credit: "Photo by Diana Polekhina on Unsplash",
    creditHref: "https://unsplash.com/@diana_pole",
    description:
      "Measures your average blood glucose levels over the past three months, used to diagnose and monitor diabetes. Fasting is not required.",
    includes: [
      "Blood sample collection",
      "Lab analysis",
      "Digital report",
      "Doctor's note on request",
    ],
    rating: "4.6",
    reviewCount: 189,
    meta: "Results in 6 hrs",
    vendorName: "Sooriya Diagnostic",
    vendorCategory: "Diagnostic Lab",
    vendorDescription:
      "Sooriya Diagnostic runs a full panel of blood and imaging diagnostics with digital reports delivered same-day for most tests, plus a home sample collection service for routine blood work.",
    vendorLocation: "Kathmandu",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/08/Piyavate-Hospital-logo.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 900",
    originalPrice: null,
    discountPct: null,
    prep: "No fasting required — eat and drink normally before this test.",
    tat: "Results in 6 hours, delivered digitally.",
    bookingInfo: "Home sample collection available, or visit the lab directly.",
  },
  service: {
    categoryLabel: "Services",
    includesHeading: "What's included",
    title: "Video Consultation - Specialist",
    badge: "15% OFF",
    imgSrc:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=1200&q=80",
    credit: "Photo by Onur Binay on Unsplash",
    creditHref: "https://unsplash.com/@onurbinay",
    description:
      "A 20-minute video call with a specialist of your choice — get advice, a prescription, or a referral for further tests, all from home.",
    includes: [
      "20-min video call",
      "e-Prescription",
      "Digital consultation notes",
      "Follow-up message thread",
    ],
    rating: "4.7",
    reviewCount: 254,
    meta: "20 min call",
    vendorName: "Nectar Wellness Pvt Ltd",
    vendorCategory: "Clinic",
    vendorDescription:
      "Nectar Wellness pairs general wellness consultations and nutrition counseling with spa and massage therapy in private treatment rooms — a calmer alternative to a standard clinic visit.",
    vendorLocation: "Naxal, Kathmandu",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2021/12/Kluaynamthai-Hospital-x-MedEx-MedTravel.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 1,020",
    originalPrice: "NPR 1,200",
    discountPct: "15% OFF",
    tat: "Consultation notes and e-prescription delivered within 30 minutes of your call.",
    bookingInfo:
      "Choose an available time slot online; you'll get a video call link by SMS and email.",
  },
  wellness: {
    categoryLabel: "Wellness",
    includesHeading: "Session details",
    title: "Full Body Spa Massage",
    badge: null,
    imgSrc:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
    credit: "Photo by Toa Heftiba on Unsplash",
    creditHref: "https://unsplash.com/@heftiba",
    description:
      "A 75-minute full body massage designed to relieve muscle tension and improve circulation, performed by certified therapists in a private room.",
    includes: [
      "75 min session",
      "Private room",
      "Aromatherapy oils",
      "Herbal tea service",
    ],
    rating: "4.5",
    reviewCount: 98,
    meta: "75 min session",
    vendorName: "Heavenly Spa",
    vendorCategory: "Wellness Spa",
    vendorDescription:
      "Heavenly Spa is a boutique wellness studio in Lazimpat offering therapeutic massage and spa treatments in private, calming rooms — a relaxing alternative to a standard clinic visit.",
    vendorLocation: "Lazimpat, Kathmandu",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Samitivej-Hospitals-Logo-1.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 1,980",
    originalPrice: "NPR 2,200",
    discountPct: "10% OFF",
    prep: "Arrive 10 minutes early to change; avoid a heavy meal right before your session.",
    bookingInfo:
      "Book a preferred time slot online; reschedule up to 2 hours in advance.",
  },
};

/** Page/tab title for a detail item, e.g. "Video Consultation - Specialist at Nectar Wellness Pvt Ltd". */
export function getDetailPageTitle(item: DetailItem): string {
  return `${item.title} at ${item.vendorName}`;
}

/** URL for a category's detail page, e.g. "/bangkok-hospital/comprehensive-full-body-checkup". */
export function hrefForDetailItem(category: DetailCategory): string {
  const item = DETAIL_CATALOG[category];
  return `/${slugify(item.vendorName)}/${slugify(item.title)}`;
}

/** Reverses hrefForDetailItem's (vendor slug, service slug) pair back into a DetailCategory, for app/[vendor]/[service]/page.tsx. */
export function getDetailCategoryByVendorAndService(
  vendorSlug: string,
  serviceSlug: string
): DetailCategory | undefined {
  return (Object.keys(DETAIL_CATALOG) as DetailCategory[]).find((category) => {
    const item = DETAIL_CATALOG[category];
    return (
      slugify(item.vendorName) === vendorSlug &&
      slugify(item.title) === serviceSlug
    );
  });
}

export function parsePrice(str: string): number {
  return Number(str.replace(/[^\d.]/g, "")) || 0;
}

export function formatPrice(n: number): string {
  return "NPR " + Math.round(n).toLocaleString("en-US");
}

const CREDIT_RE = /^Photo by (.+) on Unsplash$/;

/** Splits a "Photo by X on Unsplash" caption so the name and "Unsplash" can each link separately, per Unsplash's attribution guidelines. Returns null if the caption doesn't match that shape. */
export function splitCredit(
  credit: string
): { name: string; before: string; after: string } | null {
  const match = CREDIT_RE.exec(credit);
  if (!match) return null;
  return { name: match[1], before: "Photo by ", after: " on " };
}
