"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@phosphor-icons/react";

export function TechIcon({
  src,
  fallbackIcon: Fallback,
  alt,
  className,
}: {
  src: string;
  fallbackIcon?: Icon;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  if (error || !src) {
    if (Fallback) {
      return (
        <Fallback
          weight="bold"
          className={cn("size-6 shrink-0 transition-colors duration-200", className)}
        />
      );
    }
    return null;
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn("size-8 shrink-0 object-contain transition-all duration-300", className)}
    />
  );
}
