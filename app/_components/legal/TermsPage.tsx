import LegalPage from "@/app/_components/legal/LegalPage";
import { TERMS_CONTENT } from "@/app/_lib/legal-data";

export default function TermsPage() {
  return <LegalPage content={TERMS_CONTENT} />;
}
