@AGENTS.md

# Project Conventions

- Always use `react-icons` for icons.
- Always use antd's component when antd already has one for the need, instead of building a custom one from scratch.
- Always use `react-hook-form` for forms — do not use antd's `Form` component.
- Always prefer building reusable form components over one-off, inline form markup.
  - If a reusable form component for the needed input type doesn't exist yet, create one following this pattern (react-hook-form `Controller` wrapping the underlying field, with label, required marker, and error handling):

    ```tsx
    function AppInput(props: IProps) {
      const { required, label, name, placeholder, control, ...restProps } =
        props;
      const _placeholder = placeholder || `Enter ${label}`;

      const inputRef = useRef(null);

      return (
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="">
            {label}
            {required && "*"}
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <div className="w-full">
                  <Input
                    ref={inputRef}
                    status={error?.message && "error"}
                    size="large"
                    className={error && "border border-danger"}
                    title={label}
                    value={value}
                    onChange={onChange}
                    placeholder={_placeholder}
                    {...restProps}
                  />
                  {error && <ErrorLabel>{error.message}</ErrorLabel>}
                </div>
              );
            }}
          />
        </div>
      );
    }

    export default AppInput;
    ```
- Always delete Playwright-created test assets (screenshots, traces, temp files, etc.) once the task they were created for is complete.

## Visual Design System — "Vivid Mesh"

The homepage (`/`, built from `app/_components/home/*`) uses the platform's visual language for marketing UI: layered glass surfaces, brand-hued mesh gradients, a faint medical-icon backdrop, and GSAP scroll motion, in place of flat white/grey cards and section backgrounds. Reuse these primitives for new homepage-style UI rather than reinventing them:

- **Glass** — `app/_lib/glass.ts`: `glass.subtle` (light, mostly opaque), `glass.vivid` (light, low-opacity — pair with its `glassScrim` for any text it carries), `glass.dark` (translucent film for dark/vivid grounds).
- **Mesh gradients** — pattern shown in `app/_components/home/Mesh.tsx`: 3-4 large blurred radial blobs in brand primary/secondary plus rose/violet, hand-tuned per section rather than randomized.
- **Backdrop motifs** — `app/_components/shared/BackdropMotifs.tsx`: a faint scattered field of medical icons, seeded deterministically (never `Math.random` — it renders differently server vs. client and breaks hydration).
- **Scroll motion** — `app/_components/shared/Motion.tsx`: `<Reveal>` (one-shot fade/rise) and `<Parallax>` (decorative layers only, never text/controls), both gated on `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- **Brand-dark surfaces** (dropdowns, scrolled nav) — a duskened primary→secondary gradient, not a neutral near-black; see `BRAND_DARK_BG`/`BRAND_DARK_PANEL` in `app/_lib/theme.ts`.

Rules learned the hard way:

- Glass needs a textured/gradient/image backdrop to refract — over a flat color it just looks like a grey box.
- An antd `Button`'s `icon=` color must be forced with Tailwind's `!` modifier (e.g. `text-white!`) — antd's own button styles otherwise beat an unmodified utility class.
- An overlaid/floating header must be `fixed`, not `sticky` — `sticky` still reserves its own layout box, so at scroll 0 it sits as a flat bar above the hero instead of floating over it.

**Two headers/footers exist on purpose — pick the right one.** `app/_components/home/{Header,Navbar,TopBar,Footer}.tsx` are the Vivid Mesh chrome and are used ONLY by `/`. `app/_components/header/*` and `app/_components/footer/Footer.tsx` are the original flat chrome, unchanged, and are used by every other page (`/listings`, `/detail`, `/auth`). Don't import the `home/` chrome into another route, and don't reskin the shared chrome to match — that would silently change every page at once. Same boundary applies to the sections themselves: `/listings`, `/detail`, and `/auth` still use the prior flat design on purpose. Adopting Vivid Mesh anywhere outside the homepage is its own explicit task each time, not something to do opportunistically while touching a page for another reason.
