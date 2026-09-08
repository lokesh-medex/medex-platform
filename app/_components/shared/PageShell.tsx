import Header, { type HeaderActive } from "@/app/_components/home/Header";
import Footer from "@/app/_components/home/Footer";

interface PageShellProps {
  active?: HeaderActive;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
  children: React.ReactNode;
}

/**
 * Shared Vivid Mesh chrome for every route besides `/`: the floating
 * Header + Footer, plus the `pt-32` top clearance the fixed Header needs
 * (Hero absorbs this role on `/` — see Header's own comment on why it's
 * `fixed` rather than `sticky`).
 */
export default function PageShell({
  active = "",
  showCart = true,
  cartCount = 0,
  onCartClick,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen">
      <Header
        active={active}
        showCart={showCart}
        cartCount={cartCount}
        onCartClick={onCartClick}
      />
      <div className="pt-32">{children}</div>
      <Footer />
    </div>
  );
}
