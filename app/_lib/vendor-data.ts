// Static vendor profiles for /vendor/[slug]. Keyed by the same 10 vendors
// already listed in app/_lib/listings-data.ts's VENDOR_ITEMS (matched by
// title) so the two never drift into describing different vendor sets —
// see docs/superpowers/specs/2026-09-09-vendor-detail-page-design.md.

import { slugify } from "@/app/_lib/slug";
import { VENDOR_DOCTOR_PHOTO_POOL } from "@/app/_lib/doctor-photos";

export interface VendorDoctor {
  name: string;
  specialty: string;
  rating: string;
  photo?: string;
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
        name: "Video Consultation - Specialist",
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
        name: "Emergency Ambulance (City)",
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
        name: "Video Consultation - General Physician",
        category: "Specialist Consultation",
        listingsTab: "services",
        price: 2200,
        duration: "30 min",
      },
      {
        name: "Advanced Full Body Screening",
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
        name: "Video Consultation - General Physician",
        category: "Consultation",
        listingsTab: "services",
        price: 800,
        duration: "20 min",
      },
      {
        name: "Video Consultation - Specialist",
        category: "Consultation",
        listingsTab: "services",
        price: 1200,
        duration: "30 min",
      },
      {
        name: "Home Nursing Care (Daily)",
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
        name: "Video Consultation - General Physician",
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
        name: "Nutrition Consultation",
        category: "Consultation",
        listingsTab: "wellness",
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
        name: "HbA1c",
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
        name: "Cardiac Risk Package (Senior)",
        category: "Health Package",
        listingsTab: "packages",
        price: 5400,
      },
      {
        name: "Prenatal Care Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 9600,
      },
      {
        name: "Emergency Ambulance (City)",
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
        name: "Video Consultation - Specialist",
        category: "Specialist Consultation",
        listingsTab: "services",
        price: 1800,
        duration: "30 min",
      },
      {
        name: "Advanced Full Body Screening",
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
        name: "Senior Citizen Health Package",
        category: "Health Package",
        listingsTab: "packages",
        price: 9200,
      },
      {
        name: "Cardiac Risk Package (Senior)",
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

let doctorPhotoIndex = 0;

export const VENDORS: Vendor[] = RAW_VENDORS.map((v, i) => ({
  ...v,
  slug: slugify(v.title),
  gallery: galleryFor(i),
  doctors: v.doctors.map((d) => ({
    ...d,
    photo:
      VENDOR_DOCTOR_PHOTO_POOL[
        doctorPhotoIndex++ % VENDOR_DOCTOR_PHOTO_POOL.length
      ],
  })),
}));

export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}

export function getVendorByName(name: string): Vendor | undefined {
  const normalized = name.trim().toLowerCase();
  return VENDORS.find((v) => v.title.toLowerCase() === normalized);
}
