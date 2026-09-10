import type { Metadata } from "next";
import MembershipPage from "@/app/_components/membership/MembershipPage";

export const metadata: Metadata = {
  title: "Membership — Medex",
  description:
    "Same-day appointments, 24/7 virtual care and a dedicated team — compare Medex membership plans and become a member.",
};

export default function Page() {
  return <MembershipPage />;
}
