import TopBar from "@/app/_components/header/TopBar";
import Navbar, { type HeaderActive } from "@/app/_components/header/Navbar";

export type { HeaderActive };

interface HeaderProps {
  active?: HeaderActive;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
}

/** Sticky site header: the desktop-only {@link TopBar} utility strip above the main {@link Navbar}. */
export default function Header({ active = "", showCart = true, cartCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <Navbar active={active} showCart={showCart} cartCount={cartCount} onCartClick={onCartClick} />
    </header>
  );
}
