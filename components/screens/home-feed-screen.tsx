"use client"

import { Home, Map, Bookmark, User, Search, Bell, MapPin, Heart, Star, Mountain, Footprints, Waves, UtensilsCrossed, Building2, Gem, Leaf, Navigation, Globe, Users, Lock } from "lucide-react"
import { useState } from "react"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

const visibilityFilters = [
  { label: "All", icon: null },
  { label: "Public", icon: Globe },
  { label: "Connections", icon: Users },
  { label: "Private", icon: Lock },
]

const categories = [
  { label: "Viewpoints", icon: Mountain },
  { label: "Trails", icon: Footprints },
  { label: "Water Spots", icon: Waves },
  { label: "Food & Drink", icon: UtensilsCrossed },
  { label: "Abandoned Places", icon: Building2 },
  { label: "Caves", icon: Gem },
  { label: "Nature Escapes", icon: Leaf },
  { label: "Roadside Stops", icon: Navigation },
]

const adventures = [
  {
    images: ["/images/hero-mountain.jpg", "/images/scenic-overlook.jpg", "/images/trail-forest.jpg"],
    title: "Eagle Creek Trail to Tunnel Falls",
    location: "Columbia River Gorge, OR",
    category: "Waterfall Hike",
    rating: 4.9,
    saves: 2847,
  },
  {
    images: ["/images/swimming-hole.jpg", "/images/hidden-canyon.jpg"],
    title: "Blue Pool at Terwilliger Hot Springs",
    location: "Willamette National Forest, OR",
    category: "Hidden Gem",
    rating: 4.8,
    saves: 1523,
  },
  {
    images: ["/images/scenic-overlook.jpg"],
    title: "Tom Dick & Harry Mountain",
    location: "Mt. Hood, OR",
    category: "Scenic View",
    rating: 4.7,
    saves: 982,
  },
  {
    images: ["/images/coastal-path.jpg", "/images/hero-mountain.jpg"],
    title: "Sunset Cliffs at Cape Kiwanda",
    location: "Pacific City, OR",
    category: "Coastal Walk",
    rating: 4.7,
    saves: 892,
  },
  {
    images: ["/images/hidden-canyon.jpg", "/images/swimming-hole.jpg", "/images/scenic-overlook.jpg"],
    title: "Oneonta Gorge Slot Canyon",
    location: "Columbia River Gorge, OR",
    category: "Canyon",
    rating: 4.9,
    saves: 3104,
  },
  {
    images: ["/images/trail-forest.jpg", "/images/coastal-path.jpg"],
    title: "Opal Creek Ancient Forest",
    location: "Opal Creek Wilderness, OR",
    category: "Old Growth",
    rating: 4.8,
    saves: 1270,
  },
]

export function HomeFeedScreen() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeVisibility, setActiveVisibility] = useState("All")

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar Space */}
      <div className="h-14 flex-shrink-0" />

      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-muted-foreground text-sm">Good morning</p>
          <h1 className="text-xl font-semibold text-foreground">Jordan</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-foreground" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </div>

      {/* Visibility Segmented Control */}
      <div className="px-5 pb-3 flex-shrink-0">
        <div className="flex bg-secondary rounded-xl p-1 gap-0.5">
          {visibilityFilters.map(({ label, icon: Icon }) => {
            const isActive = activeVisibility === label
            return (
              <button
                key={label}
                onClick={() => setActiveVisibility(label)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Category Filter Carousel */}
      <div className="flex-shrink-0 overflow-x-auto scrollbar-hide px-5 pb-3">
        <div className="flex gap-2 w-max">
          {categories.map(({ label, icon: Icon }) => {
            const isActive = activeCategory === label
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(isActive ? null : label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col gap-4 px-5 pt-2">
          {adventures.map((adventure) => (
            <div key={adventure.title} className="relative rounded-2xl overflow-hidden bg-card shadow-sm">
              <div className="relative">
                <AdventureImageCarousel
                  images={adventure.images}
                  alt={adventure.title}
                  aspectRatio="aspect-[4/3]"
                  dotsPosition="inside"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                {/* Category */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground">
                    {adventure.category}
                  </span>
                </div>

                {/* Save button */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center z-10">
                  <Bookmark className="w-4 h-4 text-foreground" />
                </button>

                {/* Title & meta — sits above the dots */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 pointer-events-none">
                  <h3 className="font-semibold text-white text-base mb-1.5 leading-snug">
                    {adventure.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/80 text-sm">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{adventure.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm flex-shrink-0 ml-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{adventure.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{adventure.saves.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-2 pb-7">
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Home className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="text-[10px] font-medium text-primary">Home</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Map className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Explore</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Bookmark className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Saved</span>
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
