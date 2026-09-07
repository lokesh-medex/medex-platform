import type { ThemeConfig } from "antd";

/**
 * Canonical brand color tokens — the single source of truth for the site's
 * two accent colors. Everything else (Tailwind utilities, antd's theme,
 * per-item data-driven colors in `homepage-data.ts`) is derived from this.
 *
 * Ink and the grayscale ramp are deliberately NOT tokenized here: `#0f172a`,
 * `#475569`, `#64748b`, `#e2e8f0` already are Tailwind's `slate-900/600/500/200`
 * — reach for `text-slate-900`, `bg-slate-100`, etc. directly rather than a
 * redundant custom token.
 *
 * Tailwind (CSS-native `@theme`, `app/globals.css`) can't import TS values,
 * so its `--color-primary*` / `--color-secondary*` custom properties mirror
 * these hex strings literally — keep the two in sync when a shade changes.
 */
export const brand = {
  primary: "#f33b27",
  primary50: "#fff1ef",
  primary100: "#ffe0dc",
  primary600: "#df321f",
  primary700: "#d92e1c",
  secondary: "#872888",
  secondary100: "#f1dff1",
  secondary600: "#79227a",
} as const;

/** Matches Tailwind's `slate-900`, used as the site's body/heading ink color. */
const ink = "#0f172a";

/**
 * antd theme, built from the same `brand` tokens as the Tailwind config —
 * passed to `ConfigProvider` in `app/layout.tsx` via `AntdThemeProvider` so
 * any antd component picks up the site's colors and type family automatically.
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: brand.primary,
    colorPrimaryBg: brand.primary50,
    colorPrimaryBgHover: brand.primary100,
    colorPrimaryHover: brand.primary600,
    colorPrimaryActive: brand.primary700,
    colorLink: brand.primary,
    colorLinkHover: brand.primary600,
    colorLinkActive: brand.primary700,
    colorTextBase: ink,
    borderRadius: 10,
    fontFamily: "var(--font-manrope), sans-serif",
  },
  components: {
    Button: {
      // The brand's CTAs are pill-shaped; give antd buttons the same treatment
      // rather than the smaller global borderRadius used by most controls.
      borderRadius: 999,
      fontWeight: 700,
    },
  },
};
