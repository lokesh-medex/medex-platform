// Static profile data for the doctor detail page (/doctor/[slug]). Names
// match the 8 doctors already listed in listings-data.ts's DOCTOR_ITEMS (the
// /listings/doctors tab) so slugify(name) here and slugify(title) there
// produce the same slug — richer fields live only in this file rather than
// duplicating a second, disconnected doctor list.

import { slugify } from "@/app/_lib/slug";

export interface Doctor {
  slug: string;
  name: string;
  photo?: string;
  specialty: string;
  specializations: string[];
  languages: string[];
  yearsExperience: number;
  rating: string;
  reviewCount: number;
  location: string;
  bio: string;
  consultFee: number;
  inPersonAvailable: boolean;
  teleConsultAvailable: boolean;
  timeSlots: string[];
  phone?: string;
  email?: string;
}

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const RAW_DOCTORS: Omit<Doctor, "slug">[] = [
  {
    name: "Dr. Ananya Sharma",
    photo: "/uploads/ocho-artex-media-rm7rZYdl3rY-unsplash-53da9c94.jpg",
    specialty: "Cardiologist",
    specializations: [
      "Interventional Cardiology",
      "Heart Failure Management",
      "Preventive Cardiology",
    ],
    languages: ["English", "Nepali", "Hindi"],
    yearsExperience: 14,
    rating: "4.8",
    reviewCount: 214,
    location: "Naxal, Kathmandu",
    bio: "Dr. Ananya Sharma is a cardiologist with 14 years of experience treating coronary artery disease, arrhythmias, and heart failure, with a focus on catching risk factors early through preventive screening.",
    consultFee: 1500,
    inPersonAvailable: true,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
    phone: "+977-1-4123456",
    email: "ananya.sharma@medex.co",
  },
  {
    name: "Dr. Rajiv Thapa",
    photo: "/uploads/bruno-rodrigues-279xIHymPYY-unsplash-5e4cf0a6.jpg",
    specialty: "Dermatologist",
    specializations: [
      "Acne & Scarring",
      "Skin Allergy Testing",
      "Cosmetic Dermatology",
    ],
    languages: ["English", "Nepali"],
    yearsExperience: 9,
    rating: "4.6",
    reviewCount: 138,
    location: "Thamel, Kathmandu",
    bio: "Dr. Rajiv Thapa treats a broad range of skin, hair, and nail conditions, from chronic acne to allergic reactions, and offers cosmetic consultations for patients seeking non-surgical treatments.",
    consultFee: 1200,
    inPersonAvailable: true,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
    phone: "+977-1-4123457",
  },
  {
    name: "Dr. Priya Koirala",
    photo: "/uploads/mohamad-azaam-1O8CJy1A7Wo-unsplash-5b8d19e9.jpg",
    specialty: "Pediatrician",
    specializations: [
      "Newborn Care",
      "Childhood Immunization",
      "Growth & Nutrition",
    ],
    languages: ["English", "Nepali", "Hindi"],
    yearsExperience: 11,
    rating: "4.7",
    reviewCount: 176,
    location: "Maharajgunj, Kathmandu",
    bio: "Dr. Priya Koirala has spent over a decade caring for infants and children, from routine immunization schedules to growth and nutrition guidance for anxious first-time parents.",
    consultFee: 1000,
    inPersonAvailable: true,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
  },
  {
    name: "Dr. Samuel Gurung",
    photo: "/uploads/usman-yousaf-pTrhfmj2jDA-unsplash-2d4c9cea.jpg",
    specialty: "Orthopedic Surgeon",
    specializations: [
      "Knee & Hip Replacement",
      "Sports Injuries",
      "Fracture Care",
    ],
    languages: ["English", "Nepali"],
    yearsExperience: 17,
    rating: "4.9",
    reviewCount: 261,
    location: "New Baneshwor, Kathmandu",
    bio: "Dr. Samuel Gurung is an orthopedic surgeon specializing in joint replacement and sports injury repair, with a caseload spanning weekend athletes to elderly patients needing hip and knee reconstruction.",
    consultFee: 1800,
    inPersonAvailable: true,
    teleConsultAvailable: false,
    timeSlots: TIME_SLOTS,
    phone: "+977-1-4123459",
    email: "samuel.gurung@medex.co",
  },
  {
    name: "Dr. Nisha Maharjan",
    specialty: "Gynecologist",
    specializations: [
      "Prenatal Care",
      "High-Risk Pregnancy",
      "Menstrual Disorders",
    ],
    languages: ["English", "Nepali"],
    yearsExperience: 13,
    rating: "4.7",
    reviewCount: 192,
    location: "Putalisadak, Kathmandu",
    bio: "Dr. Nisha Maharjan provides gynecological and prenatal care, including high-risk pregnancy management, with an emphasis on clear communication through every stage of care.",
    consultFee: 1400,
    inPersonAvailable: true,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
    phone: "+977-1-4123460",
    email: "nisha.maharjan@medex.co",
  },
  {
    name: "Dr. Bipin Shrestha",
    specialty: "Neurologist",
    specializations: [
      "Migraine & Headache",
      "Epilepsy Management",
      "Stroke Follow-up",
    ],
    languages: ["English", "Nepali"],
    yearsExperience: 15,
    rating: "4.8",
    reviewCount: 147,
    location: "Baneshwor, Kathmandu",
    bio: "Dr. Bipin Shrestha treats chronic neurological conditions including migraines, epilepsy, and post-stroke follow-up care, seeing patients exclusively through video consultation.",
    consultFee: 2000,
    inPersonAvailable: false,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
  },
  {
    name: "Dr. Anjali Rana",
    specialty: "Psychiatrist",
    specializations: [
      "Anxiety & Depression",
      "Sleep Disorders",
      "Adolescent Mental Health",
    ],
    languages: ["English", "Nepali", "Hindi"],
    yearsExperience: 8,
    rating: "4.6",
    reviewCount: 103,
    location: "Bagbazar, Kathmandu",
    bio: "Dr. Anjali Rana works with adults and adolescents on anxiety, depression, and sleep disorders, offering both in-person sessions and tele-consultations for ongoing care.",
    consultFee: 1600,
    inPersonAvailable: true,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
    phone: "+977-1-4123462",
  },
  {
    name: "Dr. Suman Basnet",
    photo: "/uploads/ocho-artex-media-rm7rZYdl3rY-unsplash-53da9c94.jpg",
    specialty: "ENT Specialist",
    specializations: [
      "Sinus & Allergy",
      "Hearing Evaluation",
      "Voice & Throat Disorders",
    ],
    languages: ["English", "Nepali"],
    yearsExperience: 10,
    rating: "4.5",
    reviewCount: 118,
    location: "Kalanki, Kathmandu",
    bio: "Dr. Suman Basnet treats ear, nose, and throat conditions ranging from chronic sinus issues to hearing loss evaluation, seeing both walk-in and scheduled patients.",
    consultFee: 1100,
    inPersonAvailable: true,
    teleConsultAvailable: true,
    timeSlots: TIME_SLOTS,
  },
];

export const DOCTORS: Doctor[] = RAW_DOCTORS.map((d) => ({
  ...d,
  slug: slugify(d.name),
}));

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((d) => d.slug === slug);
}
