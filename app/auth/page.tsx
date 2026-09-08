import { redirect } from "next/navigation";

/** Bare `/auth` has no tab of its own — send visitors to the login page. */
export default function AuthIndexPage() {
  redirect("/auth/login");
}
