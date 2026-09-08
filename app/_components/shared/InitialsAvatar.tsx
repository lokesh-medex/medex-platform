import { Avatar } from "antd";

interface InitialsAvatarProps {
  name: string;
  className?: string;
  rounded?: "full" | "lg";
}

/** Gradient placeholder used wherever a photo has no source (or fails to load). */
export default function InitialsAvatar({
  name,
  className = "",
  rounded = "full",
}: InitialsAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <Avatar
      shape={rounded === "full" ? "circle" : "square"}
      aria-hidden="true"
      className={`bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))]! font-heading! font-bold! select-none! ${
        rounded === "lg" ? "rounded-xl!" : ""
      } ${className}`}
    >
      {initial}
    </Avatar>
  );
}
