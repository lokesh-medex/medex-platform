/**
 * Decorative medical-icon backdrop.
 *
 * Renders a scattered field of clinic/hospital line icons behind a section.
 * Purely decorative: `aria-hidden` + `pointer-events-none`, so it never
 * reaches the a11y tree or eats clicks.
 *
 * Placement is DETERMINISTIC (seeded LCG, not `Math.random`) because this
 * renders on the server — a random layout would produce different markup on
 * server and client and trip a hydration mismatch.
 *
 * No client hooks here, so it stays usable from server components.
 */

import {
  FaStethoscope,
  FaHeartbeat,
  FaPills,
  FaSyringe,
  FaHospital,
  FaUserMd,
  FaTooth,
  FaBrain,
  FaMicroscope,
  FaFlask,
  FaFirstAid,
  FaAmbulance,
  FaDna,
  FaNotesMedical,
  FaHeart,
  FaVial,
  FaCapsules,
  FaBandAid,
  FaBone,
  FaEye,
  FaLungs,
  FaClinicMedical,
  FaHospitalSymbol,
  FaWeight,
  FaThermometer,
  FaProcedures,
  FaBriefcaseMedical,
  FaMortarPestle,
} from "react-icons/fa";

const ICONS = [
  FaStethoscope,
  FaHeartbeat,
  FaPills,
  FaSyringe,
  FaHospital,
  FaUserMd,
  FaTooth,
  FaBrain,
  FaMicroscope,
  FaFlask,
  FaFirstAid,
  FaAmbulance,
  FaDna,
  FaNotesMedical,
  FaHeart,
  FaVial,
  FaCapsules,
  FaBandAid,
  FaBone,
  FaEye,
  FaLungs,
  FaClinicMedical,
  FaHospitalSymbol,
  FaWeight,
  FaThermometer,
  FaProcedures,
  FaBriefcaseMedical,
  FaMortarPestle,
];

/** Numerical Recipes LCG — cheap, stable, and identical on server and client. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

interface IProps {
  /** How many icons to scatter. Keep it low — this is texture, not a pattern. */
  count?: number;
  /** Layer opacity. V1 uses 0.035-0.05, V2 uses 0.10-0.14. */
  opacity?: number;
  /** Any CSS color. Defaults to the site's slate-900 ink. */
  color?: string;
  /** Changes the layout without changing the count. Use the section name's length, an index, whatever. */
  seed?: number;
  /** px bounds for icon size. Large + few reads more premium than small + many. */
  minSize?: number;
  maxSize?: number;
  /**
   * `edges` keeps icons out of the centre 56% of the width, so they never sit
   * behind headings or body copy. `full` scatters across the whole box — only
   * safe at very low opacity.
   */
  zone?: "edges" | "full";
  /** Extra classes on the wrapper (e.g. a `motif-layer` hook for Parallax). */
  className?: string;
}

export default function BackdropMotifs(props: IProps) {
  const {
    count = 6,
    opacity = 0.04,
    color = "#0f172a",
    seed = 1,
    minSize = 120,
    maxSize = 240,
    zone = "edges",
    className = "",
  } = props;

  const rand = lcg(seed * 9973 + 7);

  const items = Array.from({ length: count }, (_, i) => {
    const Icon = ICONS[Math.floor(rand() * ICONS.length)];
    const size = Math.round(minSize + rand() * (maxSize - minSize));
    // Alternate sides so an `edges` layout stays balanced instead of clumping.
    const onLeft = i % 2 === 0;
    const left =
      zone === "edges"
        ? onLeft
          ? rand() * 20 - 4 // -4%..16%
          : 82 + rand() * 20 // 82%..102%
        : rand() * 100;
    const top = (i / count) * 100 + rand() * (100 / count) * 0.8;
    const rotate = Math.round(rand() * 60 - 30);

    return { Icon, size, left, top, rotate, key: `${i}` };
  });

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {items.map(({ Icon, size, left, top, rotate, key }) => (
        <Icon
          key={key}
          size={size}
          color={color}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
