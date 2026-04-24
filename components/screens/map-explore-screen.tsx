"use client"

import { Home, Map, Bookmark, User, Search, MapPin, Star, Navigation, Globe, Users, Lock, Mountain, Footprints, Waves, UtensilsCrossed, Building2, Gem, Leaf, Plus, X, ChevronRight, Locate, SlidersHorizontal, Check, Heart, Telescope } from "lucide-react"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"
import { useState, useRef } from "react"
import type { LucideIcon } from "lucide-react"

const visibilityFilters = [
  { label: "All", icon: null },
  { label: "Public", icon: Globe },
  { label: "Connections", icon: Users },
  { label: "Private", icon: Lock },
]

const categories: { label: string; icon: LucideIcon }[] = [
  { label: "Viewpoints", icon: Mountain },
  { label: "Trails", icon: Footprints },
  { label: "Water Spots", icon: Waves },
  { label: "Food & Drink", icon: UtensilsCrossed },
  { label: "Abandoned Places", icon: Building2 },
  { label: "Caves", icon: Gem },
  { label: "Nature Escapes", icon: Leaf },
  { label: "Roadside Stops", icon: Navigation },
]

// Adventure data with positions for the map
const adventures = [
  {
    id: "blue-pool",
    title: "Blue Pool",
    location: "Willamette NF",
    distance: "2.4 mi",
    rating: 4.8,
    category: "Water Spots",
    categoryIcon: Waves,
    images: ["/images/swimming-hole.jpg", "/images/hidden-canyon.jpg", "/images/hero-mountain.jpg"],
    top: "38%",
    left: "42%",
  },
  {
    id: "opal-creek",
    title: "Opal Creek Trail",
    location: "Opal Creek Wilderness",
    distance: "4.1 mi",
    rating: 4.9,
    category: "Trails",
    categoryIcon: Footprints,
    images: ["/images/trail-forest.jpg", "/images/coastal-path.jpg"],
    top: "28%",
    left: "68%",
  },
  {
    id: "tom-dick-harry",
    title: "Tom Dick & Harry",
    location: "Mt. Hood",
    distance: "8.2 mi",
    rating: 4.7,
    category: "Viewpoints",
    categoryIcon: Mountain,
    images: ["/images/scenic-overlook.jpg"],
    top: "22%",
    left: "25%",
  },
  {
    id: "oneonta-gorge",
    title: "Oneonta Gorge",
    location: "Columbia River Gorge",
    distance: "12.5 mi",
    rating: 4.9,
    category: "Caves",
    categoryIcon: Gem,
    images: ["/images/hidden-canyon.jpg", "/images/swimming-hole.jpg"],
    top: "52%",
    left: "32%",
  },
  {
    id: "multnomah-falls",
    title: "Multnomah Falls",
    location: "Columbia River Gorge",
    distance: "14.2 mi",
    rating: 4.8,
    category: "Viewpoints",
    categoryIcon: Mountain,
    images: ["/images/hero-mountain.jpg", "/images/scenic-overlook.jpg"],
    top: "45%",
    left: "72%",
  },
  {
    id: "forest-park",
    title: "Forest Park Loop",
    location: "Portland, OR",
    distance: "1.2 mi",
    rating: 4.5,
    category: "Trails",
    categoryIcon: Footprints,
    images: ["/images/trail-forest.jpg"],
    top: "62%",
    left: "55%",
  },
]

interface MapPinMarkerProps {
  adventure: typeof adventures[0]
  isSelected: boolean
  onSelect: () => void
}

function MapPinMarker({ adventure, isSelected, onSelect }: MapPinMarkerProps) {
  const Icon = adventure.categoryIcon
  
  return (
    <button
      onClick={onSelect}
      className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group"
      style={{ top: adventure.top, left: adventure.left }}
    >
      {/* Pin with icon and label */}
      <div className={`flex flex-col items-center transition-all duration-200 ${isSelected ? "scale-110 -translate-y-1" : "group-hover:scale-105"}`}>
        {/* Label */}
        <div className={`mb-1 px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap shadow-md transition-all ${
          isSelected 
            ? "bg-primary text-primary-foreground" 
            : "bg-white text-foreground"
        }`}>
          {adventure.title}
        </div>
        {/* Pin body */}
        <div className={`relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-colors ${
          isSelected ? "bg-primary" : "bg-white"
        }`}>
          <Icon className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
          {/* Pin point */}
          <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${
            isSelected ? "border-t-primary" : "border-t-white"
          }`} />
        </div>
      </div>
    </button>
  )
}

interface AdventurePreviewCardProps {
  adventure: typeof adventures[0]
  onClose: () => void
}

function AdventurePreviewCard({ adventure, onClose }: AdventurePreviewCardProps) {
  return (
    <div className="absolute bottom-24 left-4 right-4 rounded-2xl overflow-hidden bg-card shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
      <div className="relative">
        <AdventureImageCarousel
          images={adventure.images}
          alt={adventure.title}
          aspectRatio="aspect-[4/3]"
          dotsPosition="inside"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground">
            {adventure.category}
          </span>
        </div>

        {/* Close button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* Title & meta — overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 pointer-events-none">
          <h3 className="font-semibold text-white text-base mb-1.5 leading-snug">
            {adventure.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="line-clamp-1">{adventure.location}</span>
              <span className="mx-1">·</span>
              <span>{adventure.distance}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80 text-sm flex-shrink-0 ml-3">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{adventure.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type SheetState = "collapsed" | "peek" | "expanded"

export function MapExploreScreen() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeVisibility, setActiveVisibility] = useState("All")
  const [selectedAdventure, setSelectedAdventure] = useState<string | null>(null)
  const [sheetState, setSheetState] = useState<SheetState>("peek")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const dragStartY = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  const selectedAdventureData = adventures.find(a => a.id === selectedAdventure)
  
  // Filter adventures by category
  const filteredAdventures = activeCategory 
    ? adventures.filter(a => a.category === activeCategory)
    : adventures

  const handlePinSelect = (adventureId: string) => {
    if (selectedAdventure === adventureId) {
      setSelectedAdventure(null)
    } else {
      setSelectedAdventure(adventureId)
      setSheetState("collapsed")
    }
  }

  const handleMapTap = () => {
    if (selectedAdventure) setSelectedAdventure(null)
    if (filterOpen) setFilterOpen(false)
  }

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    dragStartY.current = clientY
  }

  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY
    const delta = clientY - dragStartY.current
    
    if (delta < -50) {
      // Dragged up
      if (sheetState === "collapsed") setSheetState("peek")
      else if (sheetState === "peek") setSheetState("expanded")
    } else if (delta > 50) {
      // Dragged down
      if (sheetState === "expanded") setSheetState("peek")
      else if (sheetState === "peek") setSheetState("collapsed")
    }
  }

  const getSheetHeight = () => {
    switch (sheetState) {
      case "collapsed": return "h-[100px]"
      case "peek": return "h-[280px]"
      case "expanded": return "h-[70%]"
    }
  }

  return (
    <div className="relative w-full h-full bg-[#e8e4d9] overflow-hidden">
      {/* Map Background - Full screen with tap handler */}
      <div className="absolute inset-0" onClick={handleMapTap}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4e4d0] to-[#e8e4d9]" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 375 812" fill="none">
          {/* Roads */}
          <path d="M0 400 Q100 350 200 380 T375 340" stroke="#fff" strokeWidth="8" fill="none" opacity="0.8" />
          <path d="M0 500 Q150 480 250 520 T375 490" stroke="#fff" strokeWidth="6" fill="none" opacity="0.8" />
          <path d="M180 0 Q200 200 160 400 T200 812" stroke="#fff" strokeWidth="4" fill="none" opacity="0.6" />
          <path d="M50 200 Q120 250 100 350" stroke="#fff" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M300 100 Q280 200 320 300" stroke="#fff" strokeWidth="3" fill="none" opacity="0.5" />
          {/* Water features */}
          <ellipse cx="280" cy="280" rx="60" ry="40" fill="#a8ccd7" opacity="0.7" />
          <ellipse cx="80" cy="600" rx="45" ry="30" fill="#a8ccd7" opacity="0.7" />
          <path d="M340 450 Q360 500 330 550" stroke="#a8ccd7" strokeWidth="12" fill="none" opacity="0.6" />
          {/* Parks/Green areas */}
          <rect x="50" y="150" width="100" height="80" rx="20" fill="#b8d4a8" opacity="0.5" />
          <rect x="240" y="450" width="120" height="100" rx="25" fill="#b8d4a8" opacity="0.5" />
          <circle cx="150" cy="500" r="40" fill="#b8d4a8" opacity="0.4" />
        </svg>
        
        {/* Adventure Pin Markers */}
        {filteredAdventures.map((adventure) => (
          <MapPinMarker
            key={adventure.id}
            adventure={adventure}
            isSelected={selectedAdventure === adventure.id}
            onSelect={() => handlePinSelect(adventure.id)}
          />
        ))}
        
        {/* Current location indicator */}
        <div className="absolute top-[55%] left-[48%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-500 animate-ping opacity-40" />
          </div>
        </div>
      </div>

      {/* Status Bar Space */}
      <div className="h-12" />

      {/* Search Bar + Filter Button - Floating over map */}
      <div className="absolute top-12 left-0 right-0 px-4 z-20">
        <div className="flex items-center gap-2">
          {/* Search input */}
          <div className={`flex-1 flex items-center gap-2 bg-card rounded-2xl px-4 py-3 shadow-lg transition-all ${isSearchFocused ? "ring-2 ring-primary" : ""}`}>
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search adventures or places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
            />
            {searchQuery.length > 0 && (
              <button onClick={() => setSearchQuery("")} className="flex-shrink-0">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`w-11 h-11 rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                filterOpen || activeVisibility !== "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Visibility popover */}
            {filterOpen && (
              <div className="absolute top-13 right-0 mt-2 bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden w-52 z-30">
                <div className="px-4 pt-3 pb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Show adventures</p>
                </div>
                {visibilityFilters.map(({ label, icon: Icon }) => {
                  const isActive = activeVisibility === label
                  return (
                    <button
                      key={label}
                      onClick={() => { setActiveVisibility(label); setFilterOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        isActive ? "text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      {Icon ? <Icon className="w-4 h-4 flex-shrink-0" /> : <Globe className="w-4 h-4 flex-shrink-0" />}
                      {label}
                      {isActive && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  )
                })}
                <div className="h-2" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Location Button */}
      <button className="absolute right-4 bottom-[300px] w-11 h-11 rounded-full bg-card shadow-lg flex items-center justify-center z-10">
        <Locate className="w-5 h-5 text-primary" />
      </button>

      {/* Selected Adventure Preview Card */}
      {selectedAdventureData && (
        <AdventurePreviewCard 
          adventure={selectedAdventureData} 
          onClose={() => setSelectedAdventure(null)} 
        />
      )}

      {/* Bottom Sheet - Draggable */}
      <div 
        ref={sheetRef}
        className={`absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl transition-all duration-300 ease-out ${getSheetHeight()} ${selectedAdventure ? "translate-y-full" : ""}`}
      >
        {/* Drag Handle */}
        <div 
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        
        {/* Sheet Header */}
        <div className="px-5 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Nearby Adventures</h2>
            <p className="text-xs text-muted-foreground">{filteredAdventures.length} places within 25 miles</p>
          </div>
          <button
            onClick={() => setSheetState(sheetState === "expanded" ? "peek" : "expanded")}
            className="text-sm text-primary font-medium"
          >
            {sheetState === "expanded" ? "Map view" : "List view"}
          </button>
        </div>

        {/* Category Filter Pills - inside the sheet */}
        <div className="overflow-x-auto scrollbar-hide px-5 pb-3">
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
                      : "bg-secondary text-foreground border-border"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Adventure Cards - Horizontal scroll in peek, vertical in expanded */}
        {sheetState === "expanded" ? (
          <div className="flex-1 overflow-y-auto px-5 pb-24">
            <div className="space-y-3">
              {filteredAdventures.map((adventure) => (
                <button
                  key={adventure.id}
                  onClick={() => handlePinSelect(adventure.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 text-left transition-colors hover:bg-secondary"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={adventure.images[0]} alt={adventure.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">{adventure.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{adventure.location}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{adventure.distance}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-medium">{adventure.rating}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
            {filteredAdventures.map((adventure) => (
              <button
                key={adventure.id}
                onClick={() => handlePinSelect(adventure.id)}
                className="flex-shrink-0 w-56 bg-secondary/50 rounded-2xl overflow-hidden text-left transition-transform hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img src={adventure.images[0]} alt={adventure.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-medium text-foreground">
                      {adventure.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1 mb-0.5">{adventure.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{adventure.distance}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-medium">{adventure.rating}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
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
              <Map className="w-6 h-6 text-primary" fill="currentColor" />
              <span className="text-[10px] font-medium text-primary">Explore</span>
            </button>
            <div className="flex flex-col items-center gap-0.5 px-3 -mt-5">
              <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
              </button>
              <span className="text-[10px] font-medium text-muted-foreground mt-0.5">Post</span>
            </div>
            <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
              <Telescope className="w-6 h-6 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground">Discover</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
              <User className="w-6 h-6 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
