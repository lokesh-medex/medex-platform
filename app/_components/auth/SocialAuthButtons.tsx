import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SOCIAL_BUTTON_CLASS =
  "flex-1 flex! items-center! justify-center! gap-2! h-auto! py-2.75! rounded-[10px]! border-[1.5px]! border-slate-200! bg-white! text-[13.5px]! font-semibold! text-slate-700! font-sans";

/** "Continue with Google/Facebook" row shared by the login and signup forms. */
export default function SocialAuthButtons() {
  return (
    <div className="flex gap-3">
      <Button
        variant="outlined"
        icon={<FcGoogle size={17} />}
        className={SOCIAL_BUTTON_CLASS}
      >
        Google
      </Button>
      <Button
        variant="outlined"
        icon={<FaFacebook size={16} className="text-[#1877F2]" />}
        className={SOCIAL_BUTTON_CLASS}
      >
        Facebook
      </Button>
    </div>
  );
}
