/**
 * Full-size animated Medex mark for the About intro — the 4 layered ribbon
 * paths (violet/red-orange/orange/deep-violet), no background tile, fade+rise
 * into place one after another via the same `Reveal` primitive every other
 * section uses, so it "assembles" on scroll-into-view instead of popping in
 * flat. Behind the mark, two glows cross-fade continuously between the
 * brand's two primary colors — `motion-safe:` keeps that loop off for
 * reduced-motion users, same guarantee `Reveal`/`Parallax` give everywhere
 * else.
 */

import Image from "next/image";
import { Reveal } from "@/app/_components/shared/Motion";

interface MedexMarkProps {
  className?: string;
}

export default function MedexMark({ className = "" }: MedexMarkProps) {
  return (
    <div className={`relative isolate mx-auto ${className}`}>
      {/* Two solid-color glows cross-fading (via `animation-delay`) between
          the brand's two primary colors, rather than one gradient trying to
          animate its own color stops. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-10 blur-3xl motion-safe:animate-[markGlowPulse_2.8s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, #f33b27 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-10 blur-3xl motion-safe:animate-[markGlowPulse_2.8s_ease-in-out_infinite] [animation-delay:1.4s]"
        style={{
          background: "radial-gradient(circle, #872888 0%, transparent 60%)",
        }}
      />
      <Reveal preset="standard" targets="path" stagger={0.12}>
        <svg
          viewBox="0 0 104 100"
          className="h-full w-full drop-shadow-[0_20px_40px_rgba(15,23,42,0.25)]"
          role="img"
          aria-label="Medex"
        >
          <path
            d="M45.21 1.09C58.16 -1.84 63.15 17.18 50.54 20.76C38.09 24.3 32.97 3.86 45.21 1.09ZM49.53 40.99C48.97 41.76 48.42 42.53 47.86 43.31C46 45.22 44.14 47.13 42.27 49.05C37.3 39.44 29 30.02 20.74 23.11C17.72 20.58 8.78 15.75 7.17 13.32C10.76 13.12 15.64 16.38 18.88 17.95C30.51 23.58 40.21 32.18 49.53 40.99ZM57.68 52.91C65.35 63.28 69.88 80.1 61.45 91.27C59.74 93.54 57.41 95.94 54.63 96.77C48.53 95.89 43.66 94.69 43.05 87.5C42.92 85.98 42.35 84.32 43.08 82.95C45.85 88.31 51.51 87.73 52.8 81.58C54.12 75.27 51.66 69.15 49.91 63.31C52.5 59.84 55.09 56.38 57.68 52.91Z"
            fill="#98358f"
            fillRule="evenodd"
            stroke="#98358f"
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
          <path
            d="M57.48 50.69C60.48 47.47 63.49 44.25 66.5 41.03C64 42.94 61.25 47.05 58.17 47.51C58.28 47.17 58.39 46.83 58.5 46.48C57.72 46.53 56.94 46.58 56.17 46.63C56.28 46.14 56.4 45.65 56.51 45.17C54.73 44.28 52.94 43.39 51.16 42.5C52.37 40.83 53.57 39.17 54.78 37.5C52.85 38.02 50.54 41.21 49.85 42.83C49.18 43.34 48.51 43.84 47.83 44.35C47.84 44 47.85 43.65 47.86 43.31C48.42 42.53 48.97 41.76 49.53 40.99C55.63 35.27 61.73 29.55 67.83 23.83C63.58 23.39 59.33 22.94 55.08 22.5C57.59 20.16 61.5 19.18 64.63 17.8C72.37 14.4 80.13 11.13 87.87 7.72C89.76 6.89 97.32 2.9 98.83 3.33C99.36 6.56 96.34 11.08 95.27 14.14C92.7 21.52 89.84 28.89 87.01 36.17C85.65 39.66 84.82 44.16 82.5 47.12C80.24 43.5 80.51 34.89 77.5 32.41C70.83 38.5 64.15 44.6 57.48 50.69Z"
            fill="#ee4b26"
            fillRule="evenodd"
            stroke="#ee4b26"
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
          <path
            d="M57.48 50.69C57.33 51.05 57.19 51.41 57.05 51.77C54.85 52.37 49.08 60.13 48.94 62.39C45.75 63.54 43.36 74.31 42.33 77.33C39.16 82.86 39.15 93.67 46.11 96.74C47.87 97.51 49.82 97.48 51.67 97.71C49.24 98.97 45.2 98.27 42.67 97.5C31.39 94.03 27.51 81.17 30.33 70.51C31.66 65.49 34.29 60.62 37.17 56.33C38.66 54.08 41.54 51.62 42.27 49.05C44.14 47.13 46 45.22 47.86 43.31C47.85 43.65 47.84 44 47.83 44.35C48.51 43.84 49.18 43.34 49.85 42.83C50.54 41.21 52.85 38.02 54.78 37.5C53.57 39.17 52.37 40.83 51.16 42.5C52.94 43.39 54.73 44.28 56.51 45.17C56.4 45.65 56.28 46.14 56.17 46.63C56.94 46.58 57.72 46.53 58.5 46.48C58.39 46.83 58.28 47.17 58.17 47.51C61.25 47.05 64 42.94 66.5 41.03C63.49 44.25 60.48 47.47 57.48 50.69Z"
            fill="#f28f27"
            fillRule="evenodd"
            stroke="#f28f27"
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
          <path
            d="M57.05 51.77C57.26 52.15 57.47 52.53 57.68 52.91C55.09 56.38 52.5 59.84 49.91 63.31C49.59 63 49.26 62.69 48.94 62.39C49.08 60.13 54.85 52.37 57.05 51.77ZM42.33 77.33C42.58 79.21 42.83 81.08 43.08 82.95C42.35 84.32 42.92 85.98 43.05 87.5C43.66 94.69 48.53 95.89 54.63 96.77C53.64 97.08 52.66 97.39 51.67 97.71C49.82 97.48 47.87 97.51 46.11 96.74C39.15 93.67 39.16 82.86 42.33 77.33Z"
            fill="#753b71"
            fillRule="evenodd"
            stroke="#753b71"
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
        </svg>
      </Reveal>
    </div>
  );
}
