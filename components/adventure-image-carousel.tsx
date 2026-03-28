"use client"

import { useState } from "react"
import Image from "next/image"

interface AdventureImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  dotsPosition?: "inside" | "below"
  aspectRatio?: string
}

export function AdventureImageCarousel({
  images,
  alt,
  className = "",
  dotsPosition = "inside",
  aspectRatio = "aspect-[4/3]",
}: AdventureImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSwipe = (e: React.TouchEvent) => {
    // touch handled via pointer events on left/right halves
  }

  const goTo = (i: number) => setActiveIndex(i)

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length <= 1) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x < rect.width / 2) {
      setActiveIndex((prev) => Math.max(0, prev - 1))
    } else {
      setActiveIndex((prev) => Math.min(images.length - 1, prev + 1))
    }
  }

  const dots = images.length > 1 && (
    <div className="flex items-center justify-center gap-1">
      {images.map((_, i) =>
        dotsPosition === "inside" ? (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i) }}
            className={`rounded-full transition-all duration-200 ${
              i === activeIndex ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/50"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ) : (
          <span
            key={i}
            className={`rounded-full transition-all duration-200 block ${
              i === activeIndex ? "w-1.5 h-1.5 bg-muted-foreground" : "w-1 h-1 bg-muted-foreground/40"
            }`}
          />
        )
      )}
    </div>
  )

  const isFullHeight = aspectRatio === "h-full"

  return (
    <div className={`${isFullHeight ? "h-full" : "flex flex-col"} ${className}`}>
      <div className={`relative overflow-hidden cursor-pointer ${isFullHeight ? "h-full" : aspectRatio}`} onClick={handleTap}>
        <Image
          src={images[activeIndex]}
          alt={`${alt} ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
        />
        {dotsPosition === "inside" && images.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center">
            {dots}
          </div>
        )}
      </div>
      {dotsPosition === "below" && images.length > 1 && (
        <div className="pt-1.5 flex justify-center">
          {dots}
        </div>
      )}
    </div>
  )
}
