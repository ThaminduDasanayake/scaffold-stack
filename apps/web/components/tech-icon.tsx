"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TechIcon({
  src,
  fallbackIcon: Fallback,
  alt,
  className,
}: {
  src: string;
  fallbackIcon?: any;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  if (error || !src) {
    if (Fallback) {
      return (
        <Fallback
          weight="bold"
          className={cn('className="text-foreground shrink-0" size-8', className)}
        />
      );
    }
    return null;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      onError={() => setError(true)}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
