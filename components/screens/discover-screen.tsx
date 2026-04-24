"use client"

import {
  Home,
  Map,
  User,
  Star,
  MapPin,
  Search,
  Telescope,
  ChevronRight,
  Heart,
  X,
  Plus,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

// ─── Mock Data ────────────────────────────────────────────────────────────────

const explorers = [
  {
    id: "1",
    name: "Maya Reyes",
    handle: "@mayaexplores",
    avatar: "/images/avatar-sarah.jpg",
    location: "Portland, OR",
    adventureCount: 62,
    topCategories: ["Waterfall Hikes", "Canyon"],
    coverImages: ["/images/hero-mountain.jpg", "/images/hidden-canyon.jpg"],
  },
  {
    id: "2",
    name: "Theo Nakamura",
    handle: "@theo.outdoors",
    avatar: "/images/avatar-sarah.jpg",
    location: "Bend, OR",
    adventureCount: 38,
    topCategories: ["Viewpoints", "Geology"],
    coverImages: ["/images/scenic-overlook.jpg", "/images/trail-forest.jpg"],
  },
]

const popularAdventures = [
  {
    images: ["/images/hero-mountain.jpg", "/images/scenic-overlook.jpg", "/images/trail-forest.jpg"],
    title: "Eagle Creek Trail to Tunnel Falls",
    location: "Columbia River Gorge, OR",
    category: "Waterfall Hike",
    rating: 4.9,
    favorites: 3104,
    author: "Maya Reyes",
  },
  {
    images: ["/images/hidden-canyon.jpg", "/images/swimming-hole.jpg"],
    title: "Oneonta Gorge Slot Canyon",
    location: "Columbia River Gorge, OR",
    category: "Canyon",
    rating: 4.9,
    favorites: 2847,
    author: "Maya Reyes",
  },
  {
    images: ["/images/swimming-hole.jpg"],
    title: "Blue Pool at Terwilliger Hot Springs",
    location: "Willamette National Forest, OR",
    category: "Hidden Gem",
    rating: 4.8,
    favorites: 1523,
    author: "Theo Nakamura",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 mb-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {onSeeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-0.5 text-xs font-medium text-primary">
          See all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

function CreatorCard({ explorer }: { explorer: typeof explorers[0] }) {
  return (
    <div className="w-64 flex-shrink-0 bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Cover collage */}
      <div className="h-28 relative overflow-hidden">
        <AdventureImageCarousel
          images={explorer.coverImages}
          alt={explorer.name}
          aspectRatio="aspect-[16/7]"
          dotsPosition="below"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        {/* Avatar overlapping bottom edge */}
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-12 h-12 border-2 border-card">
            <AvatarImage src={explorer.avatar} alt={explorer.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
              {explorer.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Body */}
      <div className="pt-8 pb-3 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground leading-tight">{explorer.name}</p>
            <p className="text-xs text-muted-foreground">{explorer.handle}</p>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full flex-shrink-0">
            {explorer.adventureCount} trips
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs">{explorer.location}</span>
        </div>

        {/* Top categories */}
        <div className="flex flex-wrap gap-1 mt-2">
          {explorer.topCategories.slice(0, 2).map((cat) => (
            <span key={cat} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StandoutAdventureCard({ adventure }: { adventure: typeof popularAdventures[0] }) {
  return (
    <div className="w-56 flex-shrink-0 rounded-2xl overflow-hidden bg-card shadow-sm border border-border">
      <div className="relative">
        <AdventureImageCarousel
          images={adventure.images}
          alt={adventure.title}
          aspectRatio="aspect-[4/3]"
          dotsPosition="inside"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-medium text-foreground">
            {adventure.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 pb-6 pointer-events-none">
          <p className="font-semibold text-white text-xs leading-snug line-clamp-2">{adventure.title}</p>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1 text-white/75 text-[10px]">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="line-clamp-1">{adventure.location}</span>
            </div>
            <div className="flex items-center gap-1 text-white/80 text-[10px] flex-shrink-0 ml-2">
              <Star className="w-3 h-3 fill-white" />
              <span>{adventure.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">by {adventure.author}</p>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Heart className="w-3 h-3" />
          <span>{adventure.favorites.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

function SearchResults({ query }: { query: string }) {
  const filteredExplorers = explorers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase())
  )
  const filteredAdventures = popularAdventures.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.location.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto pb-28 px-5 flex flex-col gap-6 pt-4">
      {/* People */}
      {filteredExplorers.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">People</h3>
          <div className="flex flex-col gap-2">
            {filteredExplorers.map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-card rounded-2xl border border-border shadow-sm">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={c.avatar} alt={c.name} />
                  <AvatarFallback className="bg-primary/20 text-primary text-sm">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.handle} · {c.location}</p>
                </div>
                <button className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-primary text-primary text-xs font-semibold">
                  View
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adventures */}
      {filteredAdventures.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Adventures</h3>
          <div className="flex flex-col gap-3">
            {filteredAdventures.map((a) => (
              <div key={a.title} className="flex items-center gap-3 px-4 py-3 bg-card rounded-2xl border border-border shadow-sm">
                <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
                  <AdventureImageCarousel
                    images={a.images}
                    alt={a.title}
                    aspectRatio="aspect-square"
                    dotsPosition="below"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{a.title}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="text-xs line-clamp-1">{a.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-sm font-medium text-foreground">{a.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredExplorers.length === 0 && filteredAdventures.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-16 text-center">
          <Compass className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-foreground">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-xs text-muted-foreground mt-1">Try a different name, place, or category.</p>
        </div>
      )}
    </div>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const isSearching = searchQuery.trim().length > 0

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar Space */}
      <div className="h-14 flex-shrink-0" />

      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-foreground mb-3">Discover</h1>
        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people and adventures…"
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {isSearching && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 w-5 h-5 flex items-center justify-center text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isSearching ? (
        <SearchResults query={searchQuery} />
      ) : (
        <div className="flex-1 overflow-y-auto pb-28 flex flex-col gap-6 pt-2">

          {/* 1. Explore Adventurers */}
          <section>
            <SectionHeader title="Explore Adventurers" />
            <div className="overflow-x-auto scrollbar-hide pl-5 pr-3">
              <div className="flex gap-3 w-max pr-2">
                {explorers.map((c) => (
                  <CreatorCard key={c.id} explorer={c} />
                ))}
              </div>
            </div>
          </section>

          {/* 2. Popular Adventures */}
          <section>
            <SectionHeader title="Popular Adventures" />
            <div className="overflow-x-auto scrollbar-hide pl-5 pr-3">
              <div className="flex gap-3 w-max pr-2">
                {popularAdventures.map((a) => (
                  <StandoutAdventureCard key={a.title} adventure={a} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-end justify-around pt-2 pb-7 px-2">
          <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
            <Home className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Home</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
            <Map className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Explore</span>
          </button>
          <div className="flex flex-col items-center gap-0.5 px-3 -mt-5">
            <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
            </button>
            <span className="text-[10px] font-medium text-muted-foreground mt-0.5">Post</span>
          </div>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
            <Telescope className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="text-[10px] font-medium text-primary">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
            <User className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
