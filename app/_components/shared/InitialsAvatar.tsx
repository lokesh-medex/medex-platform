interface InitialsAvatarProps {
  name: string;
  className?: string;
  rounded?: "full" | "lg";
}

/** Gradient placeholder used wherever a photo has no source (or fails to load). */
export default function InitialsAvatar({ name, className = "", rounded = "full" }: InitialsAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={`flex items-center justify-center bg-[linear-gradient(135deg,#f33b27,#872888)] text-white font-[family-name:var(--font-heading)] font-bold select-none ${
        rounded === "full" ? "rounded-full" : "rounded-xl"
      } ${className}`}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
