// Static content for the Medex homepage, translated from the design canvas
// (Medex-Homepage.dc.html / Medex-Header.dc.html / Medex-Footer.dc.html) data constants.

import { brand } from "@/app/_lib/theme";

// Data-driven per-item styling below (gradients, tier colors, ...) needs
// plain hex strings rather than Tailwind classes, so it draws from the same
// `brand` tokens Tailwind and antd use — see app/_lib/theme.ts.
export const COLOR = {
  primary: brand.primary,
  primary600: brand.primary600,
  primary700: brand.primary700,
  primary50: brand.primary50,
  primary100: brand.primary100,
  secondary: brand.secondary,
  secondary600: brand.secondary600,
  secondary100: brand.secondary100,
  // Matches Tailwind's slate-900/600/500/200 — kept here only because this
  // data module deals in raw hex strings, not Tailwind classes.
  ink: "#0f172a",
  slate600: "#475569",
  slate500: "#64748b",
  slate200: "#e2e8f0",
  white: "#ffffff",
} as const;

const GRAD_A = `linear-gradient(135deg, ${COLOR.primary}, ${COLOR.secondary})`;
const GRAD_B = `linear-gradient(135deg, ${COLOR.secondary}, ${COLOR.primary600})`;

export interface ServiceNode {
  id: number;
  title: string;
  icon: "stethoscope" | "flask" | "star" | "heart";
  blurb: string;
  metricValue: string;
  metricLabel: string;
  secondaryLabel: string;
  secondaryValue: string;
  vendors: string[];
  relatedIds: number[];
  pairWith: string;
}

export const SERVICES_DATA: ServiceNode[] = [
  {
    id: 1,
    title: "Packages",
    icon: "stethoscope",
    blurb:
      "Bundled checkups and specialty care curated from accredited hospitals.",
    metricValue: "12",
    metricLabel: "packages available",
    secondaryLabel: "Avg. booking time",
    secondaryValue: "Same day",
    vendors: ["MedEx Neo Clinic and Pharmacy", "Nectar Wellness Pvt Ltd"],
    relatedIds: [2, 4],
    pairWith: "book a lab test to complete your checkup",
  },
  {
    id: 2,
    title: "Lab Tests",
    icon: "flask",
    blurb:
      "Book diagnostics from certified labs, with reports delivered digitally.",
    metricValue: "40+",
    metricLabel: "Total test types offered",
    secondaryLabel: "Report turnaround",
    secondaryValue: "Within 24 hrs",
    vendors: ["Sooriya Diagnostic", "MedEx Neo Clinic and Pharmacy"],
    relatedIds: [1, 3],
    pairWith: "pair with a service visit for home sample pickup",
  },
  {
    id: 3,
    title: "Services",
    icon: "star",
    blurb:
      "Home sample collection, teleconsultation and ambulance booking on demand.",
    metricValue: "3",
    metricLabel: "Total on-demand offerings",
    secondaryLabel: "Response time",
    secondaryValue: "Under 1 hr",
    vendors: ["Nectar Wellness Pvt Ltd", "Sooriya Diagnostic"],
    relatedIds: [2, 4],
    pairWith: "add wellness sessions to your care plan",
  },
  {
    id: 4,
    title: "Wellness",
    icon: "heart",
    blurb:
      "Therapy, fitness and preventive programs from vetted practitioners.",
    metricValue: "2",
    metricLabel: "Total partner studios",
    secondaryLabel: "Session length",
    secondaryValue: "45-60 min",
    vendors: ["Purnayau Hydro Facial", "Heavenly Spa"],
    relatedIds: [1, 3],
    pairWith: "book a package for a full health check",
  },
];

export interface PartnerLogo {
  src: string;
  alt: string;
}

export const PARTNER_LOGOS_DATA: PartnerLogo[] = [
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2021/12/Kluaynamthai-Hospital-x-MedEx-MedTravel.png?strip=all&quality=70&webp=50&w=1920",
    alt: "Kluaynamthai Hospital",
  },
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/08/Phaythai.png?strip=all&quality=70&webp=50&resize=1920%2C587",
    alt: "Phayathai Hospital",
  },
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/08/Piyavate-Hospital-logo.png?strip=all&quality=70&webp=50&w=1920",
    alt: "Piyavate Hospital",
  },
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Bangkok-Hospital-Logo-1.png?strip=all&quality=70&webp=50&w=1920",
    alt: "Bangkok Hospital",
  },
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/09/Samitivej-Hospitals-Logo-1.png?strip=all&quality=70&webp=50&w=1920",
    alt: "Samitivej Hospital",
  },
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2021/12/Vejthani-Hospital-x-MedEx-MedTravel-2-1.png?strip=all&quality=70&webp=50&w=1920",
    alt: "Vejthani Hospital",
  },
  {
    src: "https://ert5385cfau.exactdn.com/wp-content/uploads/2023/06/Praram_9_Hospital_Logo-removebg-preview.png?strip=all&quality=70&webp=50&w=1920",
    alt: "Praram 9 Hospital",
  },
];

export interface Doctor {
  name: string;
  specialty: string;
  exp: string;
  rating: string;
  initials: string;
  img: string;
}

export const DOCTORS_DATA: Doctor[] = [
  {
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    exp: "14 yrs",
    rating: "4.9",
    initials: "AS",
    img: "/uploads/ocho-artex-media-rm7rZYdl3rY-unsplash-53da9c94.jpg",
  },
  {
    name: "Dr. Rajiv Thapa",
    specialty: "Dermatologist",
    exp: "9 yrs",
    rating: "4.8",
    initials: "RT",
    img: "/uploads/bruno-rodrigues-279xIHymPYY-unsplash-5e4cf0a6.jpg",
  },
  {
    name: "Dr. Priya Koirala",
    specialty: "Pediatrician",
    exp: "11 yrs",
    rating: "4.9",
    initials: "PK",
    img: "/uploads/mohamad-azaam-1O8CJy1A7Wo-unsplash-5b8d19e9.jpg",
  },
  {
    name: "Dr. Samuel Gurung",
    specialty: "Orthopedic Surgeon",
    exp: "17 yrs",
    rating: "4.7",
    initials: "SG",
    img: "/uploads/usman-yousaf-pTrhfmj2jDA-unsplash-2d4c9cea.jpg",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote:
      "Comparing lab prices across three vendors used to take a whole afternoon. On Medex it took two minutes, and my results arrived before I got home.",
    name: "Sita Rai",
    role: "Patient, full-body checkup",
    rating: 5,
  },
  {
    quote:
      "I book my mother's physiotherapy sessions here every month. The vendor ratings actually match what we experienced in person.",
    name: "Anil Maharjan",
    role: "Caregiver",
    rating: 5,
  },
  {
    quote:
      "As someone who travels for work, being able to switch languages and find a clinic in a new city on the same app made a stressful week much easier.",
    name: "Maya Tamang",
    role: "Patient, wellness programs",
    rating: 4,
  },
];

export interface FlagOption {
  name: string;
  flag: string;
}

export const LANGUAGES_DATA: FlagOption[] = [
  { name: "English", flag: "/uploads/english.webp" },
  { name: "Nepali", flag: "/uploads/nepal.webp" },
  { name: "Hindi", flag: "/uploads/india.webp" },
  { name: "Thai", flag: "/uploads/thailand.webp" },
];

export const COUNTRIES_DATA: FlagOption[] = [
  { name: "Nepal", flag: "/uploads/nepal.webp" },
  { name: "Thailand", flag: "/uploads/thailand.webp" },
  { name: "Singapore", flag: "/uploads/singapore.webp" },
];

export interface NavMenuItem {
  label: string;
  isNew?: boolean;
}

export interface NavMenu {
  label: "Lab Tests" | "Packages" | "Services" | "Wellness";
  items: NavMenuItem[];
  viewAll: string;
}

export const NAV_MENUS_DATA: NavMenu[] = [
  {
    label: "Lab Tests",
    items: [
      { label: "Blood Test Panel" },
      { label: "Diabetes Screening" },
      { label: "Thyroid Profile", isNew: true },
      { label: "Allergy Test" },
    ],
    viewAll: "View all lab tests",
  },
  {
    label: "Packages",
    items: [
      { label: "Full Body Checkup" },
      { label: "Senior Care Package" },
      { label: "Women's Health Package", isNew: true },
      { label: "Corporate Package" },
    ],
    viewAll: "View all packages",
  },
  {
    label: "Services",
    items: [
      { label: "Home Sample Collection" },
      { label: "Teleconsultation" },
      { label: "Ambulance Booking" },
      { label: "Health Records", isNew: true },
    ],
    viewAll: "View all services",
  },
  {
    label: "Wellness",
    items: [
      { label: "Physiotherapy" },
      { label: "Mental Health Counseling", isNew: true },
      { label: "Nutrition Coaching" },
      { label: "Fitness Programs" },
    ],
    viewAll: "View all wellness",
  },
];

export const MOBILE_NAV_LABELS = [
  "Packages",
  "Lab Tests",
  "Services",
  "Wellness",
  "Vendors",
  "Doctors",
] as const;

export type HeroPattern = "orbit" | "package" | "lab" | "wellness";

export interface Slide {
  id: number;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  gradient: string;
  pattern: HeroPattern;
  bgSrc: string;
}

export const SLIDES_DATA: Slide[] = [
  {
    id: 1,
    eyebrow: "Medex",
    title: "One search, every healthcare provider near you.",
    desc: "Compare hospitals, labs and wellness studios side by side, then book in a couple of taps.",
    cta: "Get Started",
    gradient: `linear-gradient(120deg, ${COLOR.primary}, ${COLOR.secondary})`,
    pattern: "orbit",
    bgSrc: "/uploads/healthcare.jpg",
  },
  {
    id: 2,
    eyebrow: "Healthcare Packages",
    title: "Curated care packages, without the guesswork.",
    desc: "Preventive and specialty bundles from accredited hospitals, compared on one screen.",
    cta: "Explore Packages",
    gradient: `linear-gradient(120deg, ${COLOR.secondary}, ${COLOR.primary600})`,
    pattern: "package",
    bgSrc: "/uploads/healthcare.jpg",
  },
  {
    id: 3,
    eyebrow: "Lab Test",
    title: "Lab tests, with results you can trust.",
    desc: "Book diagnostics from certified labs and get reports delivered straight to your phone.",
    cta: "Book a Lab Test",
    gradient: `linear-gradient(120deg, ${COLOR.primary700}, ${COLOR.secondary600})`,
    pattern: "lab",
    bgSrc: "/uploads/labtest.avif",
  },
  {
    id: 4,
    eyebrow: "Wellness",
    title: "Wellness that actually fits your week.",
    desc: "Therapy, fitness and preventive programs from practitioners vetted by our team.",
    cta: "Discover Wellness",
    gradient: `linear-gradient(120deg, ${COLOR.secondary600}, ${COLOR.primary})`,
    pattern: "wellness",
    bgSrc: "/uploads/wellness.jpg",
  },
];

export interface HighlightCard {
  icon: string;
  tag: string;
  name: string;
  desc: string;
  cta: string;
  href: string;
  gradient: string;
  iconBg: string;
  tagColor: string;
  tagBg: string;
}

const HIGHLIGHT_CARDS_RAW: Omit<
  HighlightCard,
  "gradient" | "iconBg" | "tagColor" | "tagBg"
>[] = [
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/03/STD.png",
    tag: "Sexual Health",
    name: "STD Tests",
    desc: "Confidential and anonymous sexual health screenings across 30+ provinces. Test at home or book the nearest center.",
    cta: "Book Now",
    href: "https://medex.co.th/service/std-tests/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/01/Gemini_Generated_Image_1ci9p1ci9p1ci9p1-1.png",
    tag: "Preventive Care",
    name: "Lab Tests",
    desc: "Comprehensive corporate and personal health checkup packages at JCI-accredited hospitals and partner labs.",
    cta: "Get a Quote",
    href: "https://medex.co.th/service/checkup-packages/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/01/Stethoscope-1.png",
    tag: "Health Care",
    name: "Doctor On Call",
    desc: "Connect with a licensed doctor by phone or video within the hour. Available 24/7 for consultations, prescriptions, and referrals.",
    cta: "Talk to Doctor",
    href: "https://medex.co.th/doctor-on-call/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/03/Nurse-At-Home-1.png",
    tag: "Home Care",
    name: "Nurse at Home",
    desc: "Same-day caregiver fulfillment. Professional nurses dispatched to your home across Bangkok and major cities.",
    cta: "Book a Nurse",
    href: "https://medex.co.th/service/nurse-at-home",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/01/Botox-1.png",
    tag: "Aesthetics",
    name: "Botox Treatment",
    desc: "FDA-approved Botox injections administered by certified doctors in Bangkok. Smooth fine lines and wrinkles safely.",
    cta: "Book a Session",
    href: "https://medex.co.th/service/botox-treatment-bangkok-thailand/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/03/Medicine-1.png",
    tag: "Pharmacy",
    name: "Medication Refill",
    desc: "Refill your regular prescriptions online and get medications delivered to your door across Bangkok and major Thai cities.",
    cta: "Refill Now",
    href: "https://medex.co.th/medicine-express/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/03/DNA.png",
    tag: "Diagnostics",
    name: "Genetic Testing",
    desc: "Unlock insights into your health, ancestry, and inherited risks with certified DNA analysis.",
    cta: "Get Tested",
    href: "https://medex.co.th/service/genetic-testing-service/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/03/family-tree.jpg",
    tag: "DNA Testing",
    name: "Paternity Test",
    desc: "Court-admissible and private paternity DNA testing in Bangkok. Results within 3–5 business days with chain-of-custody documentation.",
    cta: "Learn More",
    href: "https://medex.co.th/service/paternity-testing-bangkok-thailand/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/04/PEP-PrEP.png",
    tag: "PEP PrEp",
    name: "HIV Prevention",
    desc: "Access post-exposure prophylaxis (PEP) and pre-exposure prophylaxis (PrEP) for HIV prevention, confidential and fast.",
    cta: "Learn More",
    href: "https://medex.co.th/service/pep-prep-bangkok-thailand/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/01/Tele-Consultation-1.png",
    tag: "Tele Consultation",
    name: "GP Consultation",
    desc: "Connect with a licensed general practitioner for non-emergency medical advice, prescriptions, and referrals. Available 24/7.",
    cta: "Consult Now",
    href: "https://medex.co.th/teleconsultation/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/01/SKIN-GLOW.png",
    tag: "IV Therapy",
    name: "Premium IV Drip Therapy",
    desc: "Doctor-approved, medical-grade IV drip therapy in Bangkok with mobile and in-clinic options for energy, beauty and recovery.",
    cta: "Book Now",
    href: "https://medex.co.th/iv-drip-therapy-in-bangkok/",
  },
  {
    icon: "https://medex.co.th/wp-content/uploads/2026/02/05-wegovy-2.4mg.png",
    tag: "Weight Management",
    name: "Doctor-Guided Weight Loss",
    desc: "Personalized weight loss programs designed by licensed doctors, combining medical insights with lifestyle coaching.",
    cta: "Get Started",
    href: "https://medex.co.th/diabetes-and-weight-management/",
  },
  {
    icon: "https://medex.co/register-kit/sti2.svg",
    tag: "STI Test Kit",
    name: "At-Home STI Testing",
    desc: "Convenient and discreet at-home testing for common sexually transmitted infections. Results within 3–5 business days.",
    cta: "Order Now",
    href: "https://medex.co.th/sti-kits/",
  },
  {
    icon: "https://jivi.co/wp-content/uploads/2025/10/METHYLATION-BOX__transparent__20250930.png",
    tag: "Unlock Your Genetic Potential",
    name: "DNA Methylation Test",
    desc: "Discover how your genes are expressed with an analysis of key methylation markers like MTHFR and COMT, plus personalized guides.",
    cta: "Order Test Kit",
    href: "https://jivi.co/dna-methylation-tests/",
  },
  {
    icon: "https://jivi.co/wp-content/uploads/2025/10/BIOLOGICAL-BOX__transparent_20250930.png",
    tag: "Unlock Your Longevity Potential",
    name: "Biological Age Test",
    desc: "Find out your true biological age with a test analyzing key biomarkers of aging, plus personalized wellness recommendations.",
    cta: "Order Test Kit",
    href: "https://jivi.co/biological-age-test/",
  },
  {
    icon: "https://jivi.co/wp-content/uploads/2025/10/Combined-BOX__transparent_20250930.png",
    tag: "Biological Age and Genetic Blueprint",
    name: "Longevity Blueprint Bundle",
    desc: "Combine the DNA Methylation Test and Biological Age Test for a complete analysis of your genetic expression and true biological age.",
    cta: "Order Bundle",
    href: "https://jivi.co/methylation-and-biological-combined/",
  },
];

export const HIGHLIGHT_CARDS_DATA: HighlightCard[] = HIGHLIGHT_CARDS_RAW.map(
  (c, i) => ({
    ...c,
    gradient: i % 2 === 0 ? GRAD_A : GRAD_B,
    iconBg: i % 2 === 0 ? COLOR.primary100 : COLOR.secondary100,
    tagColor: i % 2 === 0 ? COLOR.primary700 : COLOR.secondary600,
    tagBg: i % 2 === 0 ? COLOR.primary50 : "#f6e9f7",
  })
);

export interface Vendor {
  name: string;
  location: string;
  img: string;
  gradient: string;
}

const VENDORS_RAW: Omit<Vendor, "gradient">[] = [
  {
    name: "Nectar Wellness Pvt Ltd",
    location: "Pokhara",
    img: "https://api.medex.co/images/provider-banners/76952150-acd7-4d9b-958f-8e55d6febe04.jpg",
  },
  {
    name: "MedEx Neo Clinic and Pharmacy",
    location:
      "4th Floor, Beside Bhat Bhateni Supermarket, Thirbam Road, Naxal, Kathmandu 44600",
    img: "https://api.medex.co/images/provider-banners/29b3f4ec-228f-4dc2-8ec6-3865dfd81140.jpeg",
  },
  {
    name: "Purnayau Hydro Facial",
    location: "Bhimsengola",
    img: "https://api.medex.co/images/provider-banners/46bc6f60-aa5a-4d30-a533-9d621526da86.png",
  },
  {
    name: "Heavenly Spa",
    location: "P876+MW4, Amrit Marg, Kathmandu 44600",
    img: "https://api.medex.co/images/provider-banners/eec557ae-ef00-4380-9003-09d22cedc016.png",
  },
  {
    name: "SOORIYA DIAGNOSTIC",
    location: "Maharajgunj, Kathmandu-03, Nepal",
    img: "https://api.medex.co/images/logos/c37f0a86-d75a-4903-ab0c-756c41cba1ae.jpg",
  },
  {
    name: "Nectar Wellness Pvt Ltd",
    location: "Thamel, Kathmandu, Nepal",
    img: "https://api.medex.co/images/provider-banners/8d4d063e-4661-4b7a-996b-8ee6dafe41b4.jpg",
  },
];

export const VENDORS_DATA: Vendor[] = VENDORS_RAW.map((v, i) => ({
  ...v,
  gradient: i % 2 === 0 ? GRAD_A : GRAD_B,
}));

export interface MembershipTier {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  isFeatured: boolean;
  bg: string;
  border: string;
  shadow: string;
  textColor: string;
  subTextColor: string;
  checkColor: string;
  btnBg: string;
  btnColor: string;
  btnBorder: string;
  cta: string;
}

export const MEMBERSHIP_TIERS_DATA: MembershipTier[] = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    desc: "Search and book across our network at standard rates.",
    features: ["Search all vendors", "Standard booking", "Email support"],
    isFeatured: false,
    bg: "#fff",
    border: "1px solid #e2e8f0",
    shadow: "none",
    textColor: COLOR.ink,
    subTextColor: COLOR.slate500,
    checkColor: COLOR.secondary,
    btnBg: "transparent",
    btnColor: COLOR.ink,
    btnBorder: `1.5px solid ${COLOR.slate200}`,
    cta: "Get Started",
  },
  {
    name: "Plus",
    price: "NPR 999",
    period: "/ month",
    desc: "Priority booking and discounts across packages and labs.",
    features: [
      "Everything in Basic",
      "10% off packages & labs",
      "Priority booking",
      "Phone support",
    ],
    isFeatured: true,
    bg: `linear-gradient(160deg, ${COLOR.primary}, ${COLOR.secondary})`,
    border: "none",
    shadow: "0 20px 40px #f33b2733",
    textColor: "#fff",
    subTextColor: "rgba(255,255,255,0.85)",
    checkColor: "#fff",
    btnBg: "#fff",
    btnColor: COLOR.primary700,
    btnBorder: "none",
    cta: "Become a Member",
  },
  {
    name: "Family",
    price: "NPR 2,499",
    period: "/ month",
    desc: "Full coverage for up to 5 family members, one account.",
    features: [
      "Everything in Plus",
      "Up to 5 members",
      "Free home sample collection",
      "Dedicated care manager",
    ],
    isFeatured: false,
    bg: "#fff",
    border: "1px solid #e2e8f0",
    shadow: "none",
    textColor: COLOR.ink,
    subTextColor: COLOR.slate500,
    checkColor: COLOR.secondary,
    btnBg: "transparent",
    btnColor: COLOR.ink,
    btnBorder: `1.5px solid ${COLOR.slate200}`,
    cta: "Get Started",
  },
];

export interface FooterCol {
  title: string;
  items: string[];
}

export const FOOTER_COLS_DATA: FooterCol[] = [
  { title: "Services", items: ["Healthcare Packages", "Lab Test", "Wellness"] },
  { title: "Company", items: ["About Medex", "Partners", "Careers"] },
  { title: "Support", items: ["Help center", "Contact us", "Trust & safety"] },
];

// Matches the "Find Us" block in Medex-Footer.dc.html.
export const OFFICE_LOCATION = {
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7!2d85.324!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKathmandu!5e0!3m2!1sen!2snp!4v1692786357355!5m2!1sen!2snp",
  address: "Sanepa, Lalitpur, Kathmandu, Nepal",
};

export interface SocialLink {
  label: "Facebook" | "Instagram" | "LinkedIn" | "YouTube";
  href: string;
}

export const SOCIAL_LINKS_DATA: SocialLink[] = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export const PAYMENT_PARTNERS_DATA: string[] = [
  "eSewa",
  "Khalti",
  "Visa",
  "Mastercard",
  "ConnectIPS",
];
