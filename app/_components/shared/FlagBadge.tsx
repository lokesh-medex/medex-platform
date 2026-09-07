import ImageWithFallback from "./ImageWithFallback";

interface FlagBadgeProps {
  name: string;
  flag: string;
  width?: number;
  height?: number;
}

/** Small flag icon with a lettered fallback for when the flag asset is missing. */
export default function FlagBadge({ name, flag, width = 18, height = 13 }: FlagBadgeProps) {
  return (
    <ImageWithFallback
      src={flag}
      alt=""
      width={width}
      height={height}
      className="rounded-[2px] object-contain bg-slate-200"
      fallback={
        <span
          className="flex items-center justify-center rounded-[2px] bg-slate-200 text-slate-500 font-bold leading-none"
          style={{ width, height, fontSize: height * 0.6 }}
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
      }
    />
  );
}
