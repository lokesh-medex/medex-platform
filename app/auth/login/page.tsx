import type { Metadata } from "next";
import AuthPageShell from "@/app/_components/auth/AuthPageShell";

export const metadata: Metadata = {
  title: "Log in — Medex",
  description:
    "Log in to your Medex account to manage bookings and family members.",
};

export default function LoginPage() {
  return <AuthPageShell mode="login" />;
}
