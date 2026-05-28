'use client'

import { useState } from 'react'

export function TechIcon({
  src,
  fallbackIcon: Fallback,
  alt,
}: {
  src: string
  fallbackIcon: any
  alt: string
}) {
  const [error, setError] = useState(false)
  if (error || !src) {
    return <Fallback className="text-primary/80 size-6 shrink-0" />
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="size-6 shrink-0 object-contain"
    />
  )
}
