"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import { FiArrowUp } from "react-icons/fi";

/** Pixels the page must be scrolled down before the button appears. */
const SCROLL_THRESHOLD = 400;

/**
 * Floating "back to top" button, mounted once in the root layout so it
 * behaves identically on every page. Fades in once the page has been
 * scrolled past {@link SCROLL_THRESHOLD} and smooth-scrolls to the top
 * on click.
 */
export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      onClick={handleClick}
      aria-label="Back to top"
      className={`flex! items-center! justify-center! fixed! bottom-6! right-6! z-50! h-12! w-12! shadow-[0_12px_32px_#0f172a2e]! transition-all! duration-300! ${
        visible
          ? "opacity-100! translate-y-0!"
          : "pointer-events-none! opacity-0! translate-y-2!"
      }`}
    >
      <FiArrowUp size={20} />
    </Button>
  );
}
