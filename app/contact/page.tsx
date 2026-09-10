import { Suspense } from "react";
import ContactPage from "@/app/_components/contact/ContactPage";

export default function Page() {
  return (
    // ContactForm reads `?purpose=` via useSearchParams, which requires a
    // Suspense boundary on a statically generated page.
    <Suspense>
      <ContactPage />
    </Suspense>
  );
}
