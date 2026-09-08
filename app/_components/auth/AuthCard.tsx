import Link from "next/link";
import LoginForm from "@/app/_components/auth/LoginForm";
import SignupForm from "@/app/_components/auth/SignupForm";
import SocialAuthButtons from "@/app/_components/auth/SocialAuthButtons";
import { glass } from "@/app/_lib/glass";
import { BRAND_DARK_PANEL } from "@/app/_lib/theme";

export type AuthMode = "login" | "signup";

interface AuthCardProps {
  mode: AuthMode;
}

/**
 * Tabbed login/signup card: the right-hand panel of the auth split, and the
 * whole page on mobile. Login and signup are separate routes (`/auth/login`,
 * `/auth/signup`) sharing this same design — switching tabs navigates rather
 * than flipping local state.
 */
export default function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";

  return (
    <div className="w-full max-w-100">
      <div className={`flex rounded-full p-1 mb-8 ${glass.subtle}`}>
        <Link
          href="/auth/login"
          className={`flex-1 flex items-center justify-center rounded-full py-2.5 text-sm font-bold font-sans transition-colors ${
            isLogin
              ? `text-white! ${BRAND_DARK_PANEL}`
              : "bg-transparent text-slate-500"
          }`}
        >
          Log in
        </Link>
        <Link
          href="/auth/signup"
          className={`flex-1 flex items-center justify-center rounded-full py-2.5 text-sm font-bold font-sans transition-colors ${
            !isLogin
              ? `text-white! ${BRAND_DARK_PANEL}`
              : "bg-transparent text-slate-500"
          }`}
        >
          Sign up
        </Link>
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-semibold text-slate-400">
          or continue with
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <SocialAuthButtons />

      <p className="text-center text-[13.5px] text-slate-500 mt-7 mb-0">
        {isLogin ? (
          <>
            New to Medex?{" "}
            <Link href="/auth/signup" className="font-bold text-primary">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-bold text-primary">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
