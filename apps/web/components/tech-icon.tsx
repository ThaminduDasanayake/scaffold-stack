"use client";

import { useState } from "react";
import Image from "next/image";

export function TechIcon({
  src,
  fallbackIcon: Fallback,
  alt,
}: {
  src: string;
  fallbackIcon: any;
  alt: string;
}) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return <Fallback weight="bold" className="text-foreground size-6 shrink-0" />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      onError={() => setError(true)}
      className="size-8 shrink-0 object-contain"
    />
  );
}
