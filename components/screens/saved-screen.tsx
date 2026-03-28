"use client"

import { Home, Map, Bookmark, User, Star, ChevronRight, Mountain, Waves, Footprints, Navigation } from "lucide-react"
import { useState } from "react"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

const regions = [
  {
    name: "Columbia River Gorge",
    state: "Oregon",
    count: 3,
    coverImages: ["/images/hero-mountain.jpg", "/images/hidden-canyon.jpg"],
    adventures: [
      { title: "Eagle Creek Trail to Tunnel Falls", category: "Waterfall Hike", rating: 4.9, images: ["/images/hero-mountain.jpg", "/images/scenic-overlook.jpg", "/images/trail-forest.jpg"], icon: Footprints },
      { title: "Oneonta Gorge Slot Canyon", category: "Canyon", rating: 4.9, images: ["/images/hidden-canyon.jpg", "/images/swimming-hole.jpg"], icon: Mountain },
      { title: "Crown Point Vista House", category: "Viewpoint", rating: 4.7, images: ["/images/scenic-overlook.jpg"], icon: Navigation },
    ],
  },
  {
    name: "Oregon Coast",
    state: "Oregon",
    count: 2,
    coverImages: ["/images/coastal-path.jpg"],
    adventures: [
      { title: "Sunset Cliffs at Cape Kiwanda", category: "Coastal Walk", rating: 4.7, images: ["/images/coastal-path.jpg", "/images/hero-mountain.jpg"], icon: Waves },
      { title: "Thor's Well at Cape Perpetua", category: "Natural Wonder", rating: 4.8, images: ["/images/swimming-hole.jpg"], icon: Waves },
    ],
  },
  {
    name: "Willamette National Forest",
    state: "Oregon",
    count: 2,
    coverImages: ["/images/trail-forest.jpg", "/images/swimming-hole.jpg"],
    adventures: [
      { title: "Opal Creek Ancient Forest", category: "Old Growth", rating: 4.8, images: ["/images/trail-forest.jpg", "/images/coastal-path.jpg"], icon: Footprints },
      { title: "Blue Pool at Terwilliger Hot Springs", category: "Hidden Gem", rating: 4.8, images: ["/images/swimming-hole.jpg", "/images/hidden-canyon.jpg"], icon: Waves },
    ],
  },
]

export function SavedScreen() {
  const [expanded, setExpanded] = useState<string | null>("Columbia River Gorge")

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar Space */}
      <div className="h-14 flex-shrink-0" />

      {/* Header */}
      <div className="px-5 pt-3 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-foreground">Saved</h1>
        <p className="text-sm text-muted-foreground mt-0.5">7 adventures across 3 regions</p>
      </div>

      {/* Region List */}
      <div className="flex-1 overflow-y-auto pb-24 px-5 flex flex-col gap-3">
        {regions.map((region) => {
          const isOpen = expanded === region.name
          return (
            <div key={region.name} className="rounded-2xl overflow-hidden bg-card shadow-sm border border-border">
              {/* Region Header — tap to expand */}
              <div
                onClick={() => setExpanded(isOpen ? null : region.name)}
                className="w-full flex items-center gap-3 p-3 text-left cursor-pointer"
              >
                {/* Cover thumbnail */}
                <div className="w-14 flex-shrink-0 rounded-xl overflow-hidden">
                  <AdventureImageCarousel
                    images={region.coverImages}
                    alt={region.name}
                    aspectRatio="aspect-square"
                    dotsPosition="below"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground leading-tight">{region.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{region.state}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {region.count} saved {region.count === 1 ? "adventure" : "adventures"}
                  </p>
                </div>

                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              </div>

              {/* Expanded Adventure List */}
              {isOpen && (
                <div className="border-t border-border divide-y divide-border">
                  {region.adventures.map((adv) => {
                    const Icon = adv.icon
                    return (
                      <div key={adv.title} className="flex items-center gap-3 px-3 py-2.5">
                        <div className="w-10 flex-shrink-0 rounded-lg overflow-hidden">
                          <AdventureImageCarousel
                            images={adv.images}
                            alt={adv.title}
                            aspectRatio="aspect-square"
                            dotsPosition="below"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground leading-snug line-clamp-1">{adv.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-[10px] text-muted-foreground">{adv.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          <span className="text-xs font-medium text-foreground">{adv.rating}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-2 pb-7">
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Home className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Home</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Map className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Explore</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Bookmark className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="text-[10px] font-medium text-primary">Saved</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <User className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
