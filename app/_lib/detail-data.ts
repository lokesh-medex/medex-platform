// Static content for the Medex detail page, translated from the design canvas
// (Medex Detail Page.dc.html) CATALOG constant.

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

/** URL for a category's detail page, e.g. "/detail/package". */
export function hrefForDetailCategory(category: DetailCategory): string {
  return `/detail/${category}`;
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
  vendorLocation: string;
  vendorLogo: string;
  price: string;
  originalPrice: string | null;
  discountPct: string | null;
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
    vendorLocation: "Sukhumvit, Bangkok",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Bangkok-Hospital-Logo-1.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 5,500",
    originalPrice: "NPR 6,200",
    discountPct: "11% OFF",
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
    vendorLocation: "Kathmandu",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/08/Piyavate-Hospital-logo.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 900",
    originalPrice: null,
    discountPct: null,
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
    vendorLocation: "Naxal, Kathmandu",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2021/12/Kluaynamthai-Hospital-x-MedEx-MedTravel.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 1,020",
    originalPrice: "NPR 1,200",
    discountPct: "15% OFF",
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
    vendorLocation: "Lazimpat, Kathmandu",
    vendorLogo:
      "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Samitivej-Hospitals-Logo-1.png?strip=all&quality=70&webp=50&w=200",
    price: "NPR 1,980",
    originalPrice: "NPR 2,200",
    discountPct: "10% OFF",
  },
};

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
