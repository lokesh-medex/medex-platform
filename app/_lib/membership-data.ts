// Static content for the /membership page — plan pricing, feature lines and
// trust stats, sourced from https://medex.co/membership. Kept separate from
// `MEMBERSHIP_TIERS_DATA` in homepage-data.ts, which is placeholder content
// for the homepage's own Membership teaser section.

export const MEMBERSHIP_HERO = {
  eyebrow: "Membership",
  title: "Healthcare designed for real life.",
  desc: "Experience primary care the way it should be. Same-day appointments, 24/7 virtual care, and a dedicated team that treats you like a person, not a patient.",
  promo: "15% off your first appointment with code MDX1111",
};

export interface TrustStat {
  value: string;
  label: string;
}

export const MEMBERSHIP_STATS: TrustStat[] = [
  { value: "24/7", label: "Virtual care" },
  { value: "200+", label: "Partner clinics" },
  { value: "50,000+", label: "Active members" },
  { value: "98%", label: "Satisfaction rate" },
];

export interface MembershipPlan {
  slug: string;
  name: string;
  priceAnnual: string;
  priceMonthly: string;
  desc: string;
  features: string[];
  isFeatured: boolean;
}

export const MEMBERSHIP_PLANS_DATA: MembershipPlan[] = [
  {
    slug: "essential",
    name: "Essential",
    priceAnnual: "THB 4,990",
    priceMonthly: "THB 499",
    desc: "Everyday primary care for individuals getting started.",
    features: [
      "GP consultation: 12/year",
      "Lab tests credit: 250/month",
      "Annual health checkup: Basic",
      "Personal health concierge: 2/year",
    ],
    isFeatured: false,
  },
  {
    slug: "advanced",
    name: "Advanced",
    priceAnnual: "THB 17,990",
    priceMonthly: "THB 1,499",
    desc: "More frequent care, plus mental health and home visits.",
    features: [
      "GP consultation: 3/month",
      "Mental health: 1/year",
      "Nurse at home: 2/year",
      "Ground transfers: 2/year",
      "Lab tests credit: 750/month",
      "Annual health checkup: Enhanced",
    ],
    isFeatured: false,
  },
  {
    slug: "signature",
    name: "Signature",
    priceAnnual: "THB 35,990",
    priceMonthly: "THB 2,999",
    desc: "A dedicated GP and specialist access for ongoing care.",
    features: [
      "Dedicated GP: 1/month",
      "GP consultation: 5/month",
      "Specialist visits: 4/year",
      "Mental health: 6/year",
      "Nurse at home: 4/year",
      "Ground transfers: 5/year",
      "Lab tests credit: 1,500/month",
      "Annual health checkup: Premium",
    ],
    isFeatured: true,
  },
  {
    slug: "prestige",
    name: "Prestige",
    priceAnnual: "THB 59,990",
    priceMonthly: "THB 4,999",
    desc: "The full concierge experience for comprehensive care.",
    features: [
      "Dedicated GP: 1/month",
      "GP consultation: 10/month",
      "Specialist visits: 12/year",
      "Mental health: 15/year",
      "Nurse at home: 10/year",
      "Ground transfers: 12/year",
      "Lab tests credit: 2,500/month",
      "Annual health checkup: Executive",
    ],
    isFeatured: false,
  },
];

export const MEMBERSHIP_FOOTNOTES = [
  "Save 20% with annual billing",
  "30-day money-back guarantee on all annual plans",
];
