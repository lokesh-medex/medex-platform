import { Suspense } from "react";
import type { Metadata } from "next";
import AuthPageShell from "@/app/_components/auth/AuthPageShell";

export const metadata: Metadata = {
  title: "Sign up — Medex",
  description:
    "Create a Medex account to compare, book and manage care across hospitals, labs and wellness studios.",
};

export default function SignupPage() {
  return (
    // SignupForm reads `?tier=` via useSearchParams, which requires a
    // Suspense boundary on a statically generated page.
    <Suspense>
      <AuthPageShell mode="signup" />
    </Suspense>
  );
}
