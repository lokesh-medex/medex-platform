// Static content for the Medex Listings page, translated from the design
// canvas (Medex-Listings.dc.html's inline data constants + expandVendors
// logic). See app/_lib/homepage-data.ts for the sibling homepage data.

import type { IconType } from "react-icons";
import { FaFlask, FaUserMd } from "react-icons/fa";
import { FiBox, FiHeart, FiHome, FiStar } from "react-icons/fi";
import { brand } from "@/app/_lib/theme";
import { slugify } from "@/app/_lib/vendor-data";

const GRAD_A = `linear-gradient(135deg, ${brand.primary100}, ${brand.secondary100})`;
const GRAD_B = `linear-gradient(135deg, ${brand.secondary100}, ${brand.primary100})`;

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

export interface ListingsTab {
  id: string;
  /** URL segment under /listings/ this tab lives at, e.g. "lab-tests" for /listings/lab-tests. */
  slug: string;
  label: string;
  icon: IconType;
  items: ListingItem[];
  hasPrice: boolean;
  maxPriceDefault: number;
  priceStep: number;
}

interface RawItem {
  title: string;
  category: string;
  meta: string;
  price?: number;
  rating?: string;
  badge?: string;
  img?: string;
}

interface ItemDefaults {
  prefix: string;
  tagColor: string;
  cta: string;
}

function mkItems(
  raw: RawItem[],
  { prefix, tagColor, cta }: ItemDefaults
): ListingItem[] {
  return raw.map((r, i) => ({
    ...r,
    id: `${prefix}-${i}`,
    tagColor,
    cta,
    gradient: i % 2 === 0 ? GRAD_A : GRAD_B,
  }));
}

/**
 * Turns one listing per test/package/service into several vendor offers for
 * it — the same item at a handful of vendors, each at a slightly different
 * price — so the grid reads as a real marketplace to compare across.
 */
function expandVendors(items: ListingItem[], pool: string[]): ListingItem[] {
  const factors = [1, 1.12, 1.22, 1.35, 0.92];
  const rows: ListingItem[] = [];
  items.forEach((it, i) => {
    if (it.price == null) {
      rows.push(it);
      return;
    }
    const count = 2 + (i % 3);
    for (let k = 0; k < count; k++) {
      const vendorName = pool[(i + k) % pool.length];
      const price =
        Math.round((it.price * factors[k % factors.length]) / 10) * 10;
      rows.push({ ...it, id: `${it.id}-v${k}`, vendorName, price });
    }
  });
  return rows;
}

const MEDICAL_VENDOR_POOL = [
  "Sooriya Diagnostic",
  "Norvic International Hospital",
  "Grande International Hospital",
  "MedEx Neo Clinic and Pharmacy",
];
const SERVICE_VENDOR_POOL = [
  "MedEx Neo Clinic and Pharmacy",
  "Nectar Wellness Pvt Ltd",
  "Norvic International Hospital",
];
const WELLNESS_VENDOR_POOL = [
  "Nectar Wellness Pvt Ltd",
  "Purnayau Hydro Facial",
  "Heavenly Spa",
];

const LAB_ITEMS = expandVendors(
  mkItems(
    [
      {
        title: "Complete Blood Count (CBC)",
        category: "Blood Tests",
        price: 450,
        rating: "4.6",
        meta: "Results in 4 hrs",
      },
      {
        title: "Lipid Profile",
        category: "Blood Tests",
        price: 650,
        rating: "4.5",
        meta: "Results in 6 hrs",
      },
      {
        title: "Blood Sugar (Fasting)",
        category: "Blood Tests",
        price: 300,
        rating: "4.7",
        meta: "Results in 2 hrs",
      },
      {
        title: "HbA1c",
        category: "Blood Tests",
        price: 900,
        rating: "4.6",
        meta: "Results in 6 hrs",
        badge: "Popular",
      },
      {
        title: "Liver Function Test",
        category: "Blood Tests",
        price: 850,
        rating: "4.5",
        meta: "Results in 6 hrs",
      },
      {
        title: "Kidney Function Test",
        category: "Blood Tests",
        price: 800,
        rating: "4.4",
        meta: "Results in 6 hrs",
      },
      {
        title: "Chest X-Ray",
        category: "Imaging",
        price: 700,
        rating: "4.5",
        meta: "Same-day report",
      },
      {
        title: "Abdominal Ultrasound",
        category: "Imaging",
        price: 1800,
        rating: "4.6",
        meta: "Same-day report",
      },
      {
        title: "MRI Brain",
        category: "Imaging",
        price: 8500,
        rating: "4.8",
        meta: "Report in 24 hrs",
      },
      {
        title: "CT Scan Chest",
        category: "Imaging",
        price: 6500,
        rating: "4.7",
        meta: "Report in 24 hrs",
      },
      {
        title: "ECG (Electrocardiogram)",
        category: "Cardiac",
        price: 500,
        rating: "4.5",
        meta: "Instant result",
      },
      {
        title: "2D Echocardiogram",
        category: "Cardiac",
        price: 2200,
        rating: "4.7",
        meta: "45 min · same-day",
      },
      {
        title: "TMT (Treadmill Test)",
        category: "Cardiac",
        price: 2800,
        rating: "4.6",
        meta: "45 min · same-day",
        badge: "Popular",
      },
      {
        title: "Thyroid Profile (T3 T4 TSH)",
        category: "Hormone & Thyroid",
        price: 950,
        rating: "4.6",
        meta: "Results in 24 hrs",
      },
      {
        title: "Vitamin D Test",
        category: "Hormone & Thyroid",
        price: 1200,
        rating: "4.5",
        meta: "Results in 24 hrs",
      },
      {
        title: "Vitamin B12 Test",
        category: "Hormone & Thyroid",
        price: 1100,
        rating: "4.4",
        meta: "Results in 24 hrs",
      },
      {
        title: "Allergy Panel (Food)",
        category: "Allergy",
        price: 3500,
        rating: "4.5",
        meta: "Results in 3 days",
      },
      {
        title: "Allergy Panel (Environmental)",
        category: "Allergy",
        price: 3800,
        rating: "4.4",
        meta: "Results in 3 days",
      },
    ],
    { prefix: "labtests", tagColor: brand.primary, cta: "Book Now" }
  ),
  MEDICAL_VENDOR_POOL
);

const PACKAGE_ITEMS = expandVendors(
  mkItems(
    [
      {
        title: "Basic Health Checkup",
        category: "Full Body",
        price: 2500,
        rating: "4.5",
        meta: "25 tests included",
      },
      {
        title: "Comprehensive Full Body Checkup",
        category: "Full Body",
        price: 5500,
        rating: "4.7",
        meta: "55 tests included",
        badge: "Popular",
      },
      {
        title: "Advanced Full Body Screening",
        category: "Full Body",
        price: 8900,
        rating: "4.7",
        meta: "75 tests included",
      },
      {
        title: "Diabetes Care Package",
        category: "Full Body",
        price: 3200,
        rating: "4.5",
        meta: "18 tests included",
      },
      {
        title: "Fever Panel Package",
        category: "Full Body",
        price: 1800,
        rating: "4.4",
        meta: "12 tests included",
      },
      {
        title: "Executive Health Checkup",
        category: "Executive",
        price: 12500,
        rating: "4.8",
        meta: "90 tests + consult",
        badge: "Popular",
      },
      {
        title: "Corporate Wellness Package",
        category: "Executive",
        price: 9500,
        rating: "4.6",
        meta: "60 tests included",
      },
      {
        title: "Women's Wellness Package",
        category: "Women's Health",
        price: 4500,
        rating: "4.6",
        meta: "40 tests included",
      },
      {
        title: "Prenatal Care Package",
        category: "Women's Health",
        price: 6800,
        rating: "4.7",
        meta: "35 tests included",
      },
      {
        title: "PCOS Screening Package",
        category: "Women's Health",
        price: 3900,
        rating: "4.5",
        meta: "20 tests included",
      },
      {
        title: "Senior Citizen Health Package",
        category: "Senior Care",
        price: 6200,
        rating: "4.6",
        meta: "50 tests included",
      },
      {
        title: "Cardiac Risk Package (Senior)",
        category: "Senior Care",
        price: 7500,
        rating: "4.7",
        meta: "30 tests included",
      },
    ],
    { prefix: "packages", tagColor: brand.secondary, cta: "Book Now" }
  ),
  MEDICAL_VENDOR_POOL
);

const SERVICE_ITEMS = expandVendors(
  mkItems(
    [
      {
        title: "Home Blood Sample Collection",
        category: "Home Sample Collection",
        price: 200,
        rating: "4.6",
        meta: "30 min visit",
      },
      {
        title: "Home Nursing Care (Daily)",
        category: "Home Sample Collection",
        price: 1500,
        rating: "4.5",
        meta: "Per day",
      },
      {
        title: "Video Consultation - General Physician",
        category: "Teleconsultation",
        price: 500,
        rating: "4.6",
        meta: "15 min call",
        badge: "Popular",
      },
      {
        title: "Video Consultation - Specialist",
        category: "Teleconsultation",
        price: 1200,
        rating: "4.7",
        meta: "20 min call",
      },
      {
        title: "Emergency Ambulance (City)",
        category: "Ambulance",
        price: 1500,
        rating: "4.5",
        meta: "~15 min response",
      },
      {
        title: "Inter-city Ambulance Transfer",
        category: "Ambulance",
        price: 6000,
        rating: "4.4",
        meta: "~30 min response",
      },
      {
        title: "Physiotherapy Session (Home)",
        category: "Physiotherapy",
        price: 1800,
        rating: "4.6",
        meta: "45 min session",
      },
      {
        title: "Physiotherapy Session (Clinic)",
        category: "Physiotherapy",
        price: 1200,
        rating: "4.5",
        meta: "45 min session",
      },
      {
        title: "Post-Surgery Rehab Program",
        category: "Physiotherapy",
        price: 8500,
        rating: "4.7",
        meta: "10 sessions",
      },
    ],
    { prefix: "services", tagColor: brand.primary, cta: "Book Now" }
  ),
  SERVICE_VENDOR_POOL
);

const WELLNESS_ITEMS = expandVendors(
  mkItems(
    [
      {
        title: "Hatha Yoga - Group Class",
        category: "Yoga",
        price: 500,
        rating: "4.5",
        meta: "60 min · group",
      },
      {
        title: "Personal Yoga Training",
        category: "Yoga",
        price: 1500,
        rating: "4.7",
        meta: "60 min · 1:1",
      },
      {
        title: "Nutrition Consultation",
        category: "Nutrition",
        price: 1200,
        rating: "4.6",
        meta: "40 min session",
      },
      {
        title: "Diet Plan (4 Weeks)",
        category: "Nutrition",
        price: 3500,
        rating: "4.6",
        meta: "4-week program",
        badge: "Popular",
      },
      {
        title: "Therapy Session (Individual)",
        category: "Mental Health",
        price: 2000,
        rating: "4.7",
        meta: "50 min session",
      },
      {
        title: "Couples Counselling",
        category: "Mental Health",
        price: 2800,
        rating: "4.6",
        meta: "60 min session",
      },
      {
        title: "Full Body Spa Massage",
        category: "Spa",
        price: 2200,
        rating: "4.5",
        meta: "75 min session",
      },
      {
        title: "Ayurvedic Wellness Therapy",
        category: "Spa",
        price: 2800,
        rating: "4.6",
        meta: "90 min session",
      },
    ],
    { prefix: "wellness", tagColor: brand.secondary, cta: "Book Now" }
  ),
  WELLNESS_VENDOR_POOL
);

const VENDOR_ITEMS: ListingItem[] = mkItems(
  [
    {
      title: "Bangkok Hospital",
      category: "Hospital",
      rating: "4.7",
      meta: "Bangkok, Thailand",
    },
    {
      title: "Samitivej Hospital",
      category: "Hospital",
      rating: "4.6",
      meta: "Bangkok, Thailand",
    },
    {
      title: "MedEx Neo Clinic and Pharmacy",
      category: "Clinic",
      rating: "4.8",
      meta: "Naxal, Kathmandu",
    },
    {
      title: "Nectar Wellness Pvt Ltd",
      category: "Clinic",
      rating: "4.5",
      meta: "Thamel, Kathmandu",
    },
    {
      title: "Sooriya Diagnostic",
      category: "Diagnostic Lab",
      rating: "4.4",
      meta: "Maharajgunj, Kathmandu",
    },
    {
      title: "Norvic International Hospital",
      category: "Hospital",
      rating: "4.6",
      meta: "Kathmandu, Nepal",
    },
    {
      title: "Grande International Hospital",
      category: "Hospital",
      rating: "4.5",
      meta: "Kathmandu, Nepal",
    },
    {
      title: "Vejthani Hospital",
      category: "Hospital",
      rating: "4.6",
      meta: "Bangkok, Thailand",
    },
    {
      title: "Kathmandu Pharmacy Central",
      category: "Pharmacy",
      rating: "4.3",
      meta: "Putalisadak, Kathmandu",
    },
    {
      title: "Life Pharmacy Nepal",
      category: "Pharmacy",
      rating: "4.2",
      meta: "New Baneshwor, Kathmandu",
    },
  ],
  { prefix: "vendors", tagColor: brand.secondary, cta: "View Vendor" }
).map((item) => ({ ...item, slug: slugify(item.title) }));

// Reuses the same local doctor photos as the homepage's DOCTORS_DATA (see
// app/_lib/homepage-data.ts) — cycled across more doctors here, falling back
// to InitialsAvatar via ImageWithFallback wherever the asset isn't present.
const DOCTOR_IMGS = [
  "/uploads/ocho-artex-media-rm7rZYdl3rY-unsplash-53da9c94.jpg",
  "/uploads/bruno-rodrigues-279xIHymPYY-unsplash-5e4cf0a6.jpg",
  "/uploads/mohamad-azaam-1O8CJy1A7Wo-unsplash-5b8d19e9.jpg",
  "/uploads/usman-yousaf-pTrhfmj2jDA-unsplash-2d4c9cea.jpg",
];

const DOCTOR_ITEMS = mkItems(
  [
    {
      title: "Dr. Ananya Sharma",
      category: "Cardiologist",
      price: 1500,
      rating: "4.8",
      meta: "14 yrs exp.",
    },
    {
      title: "Dr. Rajiv Thapa",
      category: "Dermatologist",
      price: 1200,
      rating: "4.6",
      meta: "9 yrs exp.",
    },
    {
      title: "Dr. Priya Koirala",
      category: "Pediatrician",
      price: 1000,
      rating: "4.7",
      meta: "11 yrs exp.",
    },
    {
      title: "Dr. Samuel Gurung",
      category: "Orthopedic Surgeon",
      price: 1800,
      rating: "4.9",
      meta: "17 yrs exp.",
      badge: "Popular",
    },
    {
      title: "Dr. Nisha Maharjan",
      category: "Gynecologist",
      price: 1400,
      rating: "4.7",
      meta: "13 yrs exp.",
    },
    {
      title: "Dr. Bipin Shrestha",
      category: "Neurologist",
      price: 2000,
      rating: "4.8",
      meta: "15 yrs exp.",
    },
    {
      title: "Dr. Anjali Rana",
      category: "Psychiatrist",
      price: 1600,
      rating: "4.6",
      meta: "8 yrs exp.",
    },
    {
      title: "Dr. Suman Basnet",
      category: "ENT Specialist",
      price: 1100,
      rating: "4.5",
      meta: "10 yrs exp.",
    },
  ].map((d, i) => ({ ...d, img: DOCTOR_IMGS[i % DOCTOR_IMGS.length] })),
  { prefix: "doctors", tagColor: brand.primary, cta: "Book Now" }
);

export const LISTINGS_TABS: ListingsTab[] = [
  {
    id: "labtests",
    slug: "lab-tests",
    label: "Lab Tests",
    icon: FaFlask,
    items: LAB_ITEMS,
    hasPrice: true,
    maxPriceDefault: 10000,
    priceStep: 100,
  },
  {
    id: "packages",
    slug: "packages",
    label: "Packages",
    icon: FiBox,
    items: PACKAGE_ITEMS,
    hasPrice: true,
    maxPriceDefault: 15000,
    priceStep: 500,
  },
  {
    id: "services",
    slug: "services",
    label: "Services",
    icon: FiStar,
    items: SERVICE_ITEMS,
    hasPrice: true,
    maxPriceDefault: 10000,
    priceStep: 100,
  },
  {
    id: "wellness",
    slug: "wellness",
    label: "Wellness",
    icon: FiHeart,
    items: WELLNESS_ITEMS,
    hasPrice: true,
    maxPriceDefault: 5000,
    priceStep: 100,
  },
  {
    id: "vendors",
    slug: "vendors",
    label: "Vendors",
    icon: FiHome,
    items: VENDOR_ITEMS,
    hasPrice: false,
    maxPriceDefault: 0,
    priceStep: 0,
  },
  {
    id: "doctors",
    slug: "doctors",
    label: "Doctors",
    icon: FaUserMd,
    items: DOCTOR_ITEMS,
    hasPrice: true,
    maxPriceDefault: 3000,
    priceStep: 100,
  },
];

/** The tab /listings (with no path segment) renders. */
export const DEFAULT_LISTINGS_TAB = LISTINGS_TABS[0];

export function getTabBySlug(slug: string): ListingsTab | undefined {
  return LISTINGS_TABS.find((t) => t.slug === slug);
}

/** Looks a tab up by its display label (matches the navbar's NavMenu.label / MOBILE_NAV_LABELS). */
export function getTabByLabel(label: string): ListingsTab | undefined {
  return LISTINGS_TABS.find((t) => t.label === label);
}

/** URL for a tab's own listings page, e.g. "/listings/packages". */
export function hrefForTab(tab: ListingsTab): string {
  return `/listings/${tab.slug}`;
}

export function categoriesOf(items: ListingItem[]): string[] {
  return [...new Set(items.map((it) => it.category))];
}

export interface TabSearchResult {
  tab: ListingsTab;
  items: ListingItem[];
}

/** Matches a query against every tab's items, grouped by tab and capped per group — feeds the navbar's search dropdown. */
export function searchListingItems(
  query: string,
  limitPerTab = 5
): TabSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return LISTINGS_TABS.map((tab) => ({
    tab,
    items: tab.items
      .filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q)
      )
      .slice(0, limitPerTab),
  })).filter((result) => result.items.length > 0);
}

export type SortValue =
  "popular" | "price_asc" | "price_desc" | "rating_desc" | "name_asc";

export interface SortOption {
  value: SortValue;
  label: string;
}

export function sortOptionsFor(tab: ListingsTab): SortOption[] {
  return tab.hasPrice
    ? [
        { value: "popular", label: "Popularity" },
        { value: "price_asc", label: "Price: Low to High" },
        { value: "price_desc", label: "Price: High to Low" },
        { value: "rating_desc", label: "Rating: High to Low" },
      ]
    : [
        { value: "popular", label: "Popularity" },
        { value: "rating_desc", label: "Rating: High to Low" },
        { value: "name_asc", label: "Name: A to Z" },
      ];
}

export const PAGE_SIZE = 9;

export interface TabFilterState {
  categories: string[];
  maxPrice: number;
  search: string;
  sort: SortValue;
}

export function defaultFilterState(tab: ListingsTab): TabFilterState {
  return {
    categories: [],
    maxPrice: tab.maxPriceDefault,
    search: "",
    sort: "popular",
  };
}

export function filterAndSortItems(
  tab: ListingsTab,
  filters: TabFilterState
): ListingItem[] {
  let items = tab.items.filter((it) => {
    if (filters.categories.length && !filters.categories.includes(it.category))
      return false;
    if (tab.hasPrice && it.price != null && it.price > filters.maxPrice)
      return false;
    if (
      filters.search &&
      !it.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  if (filters.sort === "price_asc") {
    items = [...items].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (filters.sort === "price_desc") {
    items = [...items].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (filters.sort === "rating_desc") {
    items = [...items].sort(
      (a, b) => parseFloat(b.rating ?? "0") - parseFloat(a.rating ?? "0")
    );
  } else if (filters.sort === "name_asc") {
    items = [...items].sort((a, b) => a.title.localeCompare(b.title));
  }

  return items;
}
