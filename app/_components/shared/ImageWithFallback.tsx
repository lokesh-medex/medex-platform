"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  /** Rendered instead of the <Image> once it fails to load (e.g. a missing local asset). */
  fallback: ReactNode;
}

/**
 * Wraps next/image with a graceful fallback for assets that may not be
 * present yet (e.g. local design uploads not fetched into public/uploads).
 */
export default function ImageWithFallback({ fallback, alt, ...props }: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (errored) return <>{fallback}</>;

  return <Image {...props} alt={alt} onError={() => setErrored(true)} />;
}
