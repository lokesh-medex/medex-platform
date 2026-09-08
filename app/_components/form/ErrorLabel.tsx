import type { ReactNode } from "react";

/** Shared error text for form fields — a red caption placed just under the field it describes. */
export default function ErrorLabel({ children }: { children: ReactNode }) {
  return <p className="text-danger text-xs mt-1 mb-0">{children}</p>;
}
