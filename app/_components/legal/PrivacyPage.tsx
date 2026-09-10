import LegalPage from "@/app/_components/legal/LegalPage";
import { PRIVACY_CONTENT } from "@/app/_lib/legal-data";

export default function PrivacyPage() {
  return <LegalPage content={PRIVACY_CONTENT} />;
}
