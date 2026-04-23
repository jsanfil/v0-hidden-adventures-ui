"use client"

import {
  Home,
  Map,
  User,
  Star,
  MapPin,
  Search,
  Mountain,
  Footprints,
  Waves,
  UtensilsCrossed,
  Building2,
  Leaf,
  Navigation,
  Compass,
  Plus,
  ChevronRight,
  Heart,
  X,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

// ─── Mock Data ────────────────────────────────────────────────────────────────

const topCreators = [
  {
    id: "1",
    name: "Maya Reyes",
    handle: "@mayaexplores",
    avatar: "/images/avatar-sarah.jpg",
    location: "Portland, OR",
    region: "Pacific Northwest",
    bio: "Chasing waterfalls and secret swimming holes across the PNW.",
    adventureCount: 62,
    topCategories: ["Waterfall Hikes", "Canyon", "Old Growth"],
    coverImages: ["/images/hero-mountain.jpg", "/images/hidden-canyon.jpg"],
    reason: "Top waterfall curator in the PNW",
  },
  {
    id: "2",
    name: "Theo Nakamura",
    handle: "@theo.outdoors",
    avatar: "/images/avatar-sarah.jpg",
    location: "Bend, OR",
    region: "High Desert",
    bio: "Volcanic terrain, lava tubes, and high-desert solitude.",
    adventureCount: 38,
    topCategories: ["Viewpoints", "Geology", "Trails"],
    coverImages: ["/images/scenic-overlook.jpg", "/images/trail-forest.jpg"],
    reason: "Hidden gems off the beaten path",
  },
]

const risingExplorers = [
  {
    id: "3",
    name: "Priya Suresh",
    handle: "@priyaroams",
    avatar: "/images/avatar-sarah.jpg",
    location: "Seattle, WA",
    region: "Cascades",
    bio: "Alpine lakes and wildflower meadows all summer long.",
    adventureCount: 14,
    topCategories: ["Alpine", "Trails", "Water Spots"],
    coverImages: ["/images/swimming-hole.jpg"],
    reason: "Rising star — 14 adventures this season",
  },
  {
    id: "4",
    name: "Lena Marsh",
    handle: "@lenaonthecoast",
    avatar: "/images/avatar-sarah.jpg",
    location: "Astoria, OR",
    region: "Oregon Coast",
    bio: "Coastal cliffs, tide pools, and every sandy cove in between.",
    adventureCount: 21,
    topCategories: ["Coastal", "Viewpoints", "Nature"],
    coverImages: ["/images/coastal-path.jpg"],
    reason: "Best coastal coverage on the app",
  },
]

const standoutAdventures = [
  {
    images: ["/images/hero-mountain.jpg", "/images/scenic-overlook.jpg", "/images/trail-forest.jpg"],
    title: "Eagle Creek Trail to Tunnel Falls",
    location: "Columbia River Gorge, OR",
    category: "Waterfall Hike",
    rating: 4.9,
    saves: 2847,
    author: "Maya Reyes",
  },
  {
    images: ["/images/hidden-canyon.jpg", "/images/swimming-hole.jpg"],
    title: "Oneonta Gorge Slot Canyon",
    location: "Columbia River Gorge, OR",
    category: "Canyon",
    rating: 4.9,
    saves: 3104,
    author: "Maya Reyes",
  },
  {
    images: ["/images/swimming-hole.jpg"],
    title: "Blue Pool at Terwilliger Hot Springs",
    location: "Willamette National Forest, OR",
    category: "Hidden Gem",
    rating: 4.8,
    saves: 1523,
    author: "Theo Nakamura",
  },
]

const categories = [
  { label: "Viewpoints", icon: Mountain },
  { label: "Trails", icon: Footprints },
  { label: "Water Spots", icon: Waves },
  { label: "Food & Drink", icon: UtensilsCrossed },
  { label: "Abandoned Places", icon: Building2 },
  { label: "Nature Escapes", icon: Leaf },
  { label: "Roadside Stops", icon: Navigation },
]

const destinationCreators = [
  {
    id: "5",
    name: "Jordan Vela",
    handle: "@jordanvela",
    avatar: "/images/avatar-sarah.jpg",
    location: "Moab, UT",
    adventureCount: 41,
    coverImages: ["/images/scenic-overlook.jpg"],
    topCategories: ["Canyons", "Desert", "Rock Climbing"],
  },
  {
    id: "6",
    name: "Sam Holt",
    handle: "@samholt.hikes",
    avatar: "/images/avatar-sarah.jpg",
    location: "Flagstaff, AZ",
    adventureCount: 29,
    coverImages: ["/images/trail-forest.jpg"],
    topCategories: ["Trails", "Geology", "Viewpoints"],
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

function CreatorCard({ creator }: { creator: typeof topCreators[0] }) {
  return (
    <div className="w-64 flex-shrink-0 bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Cover collage */}
      <div className="h-28 relative overflow-hidden">
        <AdventureImageCarousel
          images={creator.coverImages}
          alt={creator.name}
          aspectRatio="aspect-[16/7]"
          dotsPosition="below"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        {/* Avatar overlapping bottom edge */}
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-12 h-12 border-2 border-card">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
              {creator.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Body */}
      <div className="pt-8 pb-3 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground leading-tight">{creator.name}</p>
            <p className="text-xs text-muted-foreground">{creator.handle}</p>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full flex-shrink-0">
            {creator.adventureCount} trips
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs">{creator.location}</span>
        </div>

        {/* Bio */}
        {creator.bio && (
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{creator.bio}</p>
        )}

        {/* Top categories */}
        <div className="flex flex-wrap gap-1 mt-2">
          {creator.topCategories.slice(0, 3).map((cat) => (
            <span key={cat} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {cat}
            </span>
          ))}
        </div>

        {/* Reason chip */}
        <div className="mt-2 flex items-center gap-1 text-[10px] text-accent font-medium">
          <Star className="w-3 h-3 fill-accent text-accent flex-shrink-0" />
          {creator.reason}
        </div>

        {/* CTA */}
        <button className="mt-3 w-full py-1.5 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  )
}

function RisingExplorerRow({ creator }: { creator: typeof risingExplorers[0] }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 bg-card rounded-2xl border border-border shadow-sm">
      <Avatar className="w-11 h-11 flex-shrink-0">
        <AvatarImage src={creator.avatar} alt={creator.name} />
        <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
          {creator.name.split(" ").map((n) => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">{creator.name}</p>
        <p className="text-xs text-muted-foreground">{creator.handle} · {creator.location}</p>
        <p className="text-[10px] text-accent font-medium mt-0.5">{creator.reason}</p>
      </div>
      <button className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors">
        View
      </button>
    </div>
  )
}

function StandoutAdventureCard({ adventure }: { adventure: typeof standoutAdventures[0] }) {
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
          <span>{adventure.saves.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

function CategoryGrid() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <div className="px-5 grid grid-cols-4 gap-2">
      {categories.map(({ label, icon: Icon }) => {
        const isActive = active === label
        return (
          <button
            key={label}
            onClick={() => setActive(isActive ? null : label)}
            className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-center transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
            <span className="text-[9px] font-medium leading-tight">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function DestinationCreatorRow({ creator }: { creator: typeof destinationCreators[0] }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-2xl border border-border shadow-sm">
      <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
        <AdventureImageCarousel
          images={creator.coverImages}
          alt={creator.name}
          aspectRatio="aspect-square"
          dotsPosition="below"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">{creator.name}</p>
        <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs">{creator.location}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {creator.topCategories.slice(0, 2).map((cat) => (
            <span key={cat} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <button className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors">
        View
      </button>
    </div>
  )
}

// ─── Search Results ────────────────────────────────────────────────────────────

function SearchResults({ query }: { query: string }) {
  const filteredPeople = [...topCreators, ...risingExplorers].filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase())
  )
  const filteredAdventures = standoutAdventures.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.location.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto pb-28 px-5 flex flex-col gap-6 pt-4">
      {/* People */}
      {filteredPeople.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">People</h3>
          <div className="flex flex-col gap-2">
            {filteredPeople.map((c) => (
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

      {filteredPeople.length === 0 && filteredAdventures.length === 0 && (
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

          {/* 1. Creators To Explore */}
          <section>
            <SectionHeader title="Creators To Explore" onSeeAll={() => {}} />
            <div className="overflow-x-auto scrollbar-hide pl-5 pr-3">
              <div className="flex gap-3 w-max pr-2">
                {topCreators.map((c) => (
                  <CreatorCard key={c.id} creator={c} />
                ))}
              </div>
            </div>
          </section>

          {/* 2. Rising Explorers */}
          <section>
            <SectionHeader title="Rising Explorers" onSeeAll={() => {}} />
            <div className="px-5 flex flex-col gap-2">
              {risingExplorers.map((c) => (
                <RisingExplorerRow key={c.id} creator={c} />
              ))}
            </div>
          </section>

          {/* 3. Standout Adventures */}
          <section>
            <SectionHeader title="Standout Adventures" onSeeAll={() => {}} />
            <div className="overflow-x-auto scrollbar-hide pl-5 pr-3">
              <div className="flex gap-3 w-max pr-2">
                {standoutAdventures.map((a) => (
                  <StandoutAdventureCard key={a.title} adventure={a} />
                ))}
              </div>
            </div>
          </section>

          {/* 4. Browse By Category */}
          <section>
            <SectionHeader title="Browse By Category" />
            <CategoryGrid />
          </section>

          {/* 5. Destination Creators */}
          <section>
            <SectionHeader title="Destination Creators" onSeeAll={() => {}} />
            <div className="px-5 flex flex-col gap-2">
              {destinationCreators.map((c) => (
                <DestinationCreatorRow key={c.id} creator={c} />
              ))}
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
            <Compass className="w-6 h-6 text-primary" fill="currentColor" />
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
