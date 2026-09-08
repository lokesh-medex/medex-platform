import PageShell from "@/app/_components/shared/PageShell";
import AuthBrandPanel from "@/app/_components/auth/AuthBrandPanel";
import AuthCard, { type AuthMode } from "@/app/_components/auth/AuthCard";

/** Shared layout for `/auth/login` and `/auth/signup` — same design, `mode` picks the active tab. */
export default function AuthPageShell({ mode }: { mode: AuthMode }) {
  return (
    <PageShell showCart={false}>
      <div className="bg-[#F5F5F5] grid grid-cols-1 dt:grid-cols-2">
        <AuthBrandPanel />
        <div className="flex items-center justify-center px-5 py-10 dt:py-14">
          <AuthCard mode={mode} />
        </div>
      </div>
    </PageShell>
  );
}
