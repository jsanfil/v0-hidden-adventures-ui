"use client"

import Image from "next/image"
import { Home, Map, Bookmark, User, Search, ChevronDown, X, MapPin, Star, Navigation } from "lucide-react"

const categories = [
  { label: "All", active: true },
  { label: "Trails", active: false },
  { label: "Swimming", active: false },
  { label: "Viewpoints", active: false },
  { label: "Hidden Gems", active: false },
]

interface MapPinMarkerProps {
  top: string
  left: string
  active?: boolean
}

function MapPinMarker({ top, left, active }: MapPinMarkerProps) {
  return (
    <div 
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top, left }}
    >
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center shadow-lg
        ${active ? 'bg-primary scale-110' : 'bg-white'}
        transition-transform
      `}>
        <MapPin className={`w-4 h-4 ${active ? 'text-primary-foreground' : 'text-primary'}`} />
      </div>
      {active && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
      )}
    </div>
  )
}

interface BottomSheetCardProps {
  image: string
  title: string
  location: string
  distance: string
  rating: number
  category: string
}

function BottomSheetCard({ image, title, location, distance, rating, category }: BottomSheetCardProps) {
  return (
    <div className="flex-shrink-0 w-64 bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50">
      <div className="relative h-32">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground">
            {category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1 mb-1">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MapExploreScreen() {
  return (
    <div className="relative w-full h-full bg-[#e8e4d9] overflow-hidden">
      {/* Map Background - Stylized map appearance */}
      <div className="absolute inset-0">
        {/* Base map styling */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4e4d0] to-[#e8e4d9]" />
        
        {/* Simplified map elements */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 375 812" fill="none">
          {/* Roads */}
          <path d="M0 400 Q100 350 200 380 T375 340" stroke="#fff" strokeWidth="8" fill="none" opacity="0.8" />
          <path d="M0 500 Q150 480 250 520 T375 490" stroke="#fff" strokeWidth="6" fill="none" opacity="0.8" />
          <path d="M180 0 Q200 200 160 400 T200 812" stroke="#fff" strokeWidth="4" fill="none" opacity="0.6" />
          
          {/* Water bodies */}
          <ellipse cx="280" cy="280" rx="60" ry="40" fill="#a8ccd7" opacity="0.7" />
          <ellipse cx="80" cy="600" rx="45" ry="30" fill="#a8ccd7" opacity="0.7" />
          
          {/* Forest/park areas */}
          <rect x="50" y="150" width="100" height="80" rx="20" fill="#b8d4a8" opacity="0.5" />
          <rect x="240" y="450" width="120" height="100" rx="25" fill="#b8d4a8" opacity="0.5" />
        </svg>
        
        {/* Map Pins */}
        <MapPinMarker top="35%" left="45%" active />
        <MapPinMarker top="25%" left="65%" />
        <MapPinMarker top="50%" left="30%" />
        <MapPinMarker top="45%" left="70%" />
        <MapPinMarker top="60%" left="55%" />
        <MapPinMarker top="30%" left="25%" />
      </div>
      
      {/* Status Bar Space */}
      <div className="h-14" />
      
      {/* Search Bar */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 shadow-lg">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search places..." 
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Portland, OR</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Category Chips */}
      <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${cat.active 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-foreground shadow-sm'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      {/* Current Location Button */}
      <button className="absolute right-4 top-[200px] w-11 h-11 rounded-full bg-card shadow-lg flex items-center justify-center">
        <Navigation className="w-5 h-5 text-primary" />
      </button>
      
      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl">
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        
        {/* Sheet Header */}
        <div className="px-5 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Nearby Adventures</h2>
            <p className="text-sm text-muted-foreground">12 places within 25 miles</p>
          </div>
          <button className="text-sm text-primary font-medium">List view</button>
        </div>
        
        {/* Horizontal Card Scroll */}
        <div className="flex gap-3 overflow-x-auto px-5 pb-6 scrollbar-hide">
          <BottomSheetCard
            image="/images/swimming-hole.jpg"
            title="Blue Pool"
            location="Willamette NF"
            distance="2.4 mi"
            rating={4.8}
            category="Swimming"
          />
          <BottomSheetCard
            image="/images/trail-forest.jpg"
            title="Opal Creek Trail"
            location="Opal Creek Wilderness"
            distance="4.1 mi"
            rating={4.9}
            category="Trail"
          />
          <BottomSheetCard
            image="/images/scenic-overlook.jpg"
            title="Tom Dick & Harry"
            location="Mt. Hood"
            distance="8.2 mi"
            rating={4.7}
            category="Viewpoint"
          />
        </div>
        
        {/* Tab Bar */}
        <div className="border-t border-border">
          <div className="flex items-center justify-around py-2 pb-7">
            <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
              <Home className="w-6 h-6 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground">Home</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
              <Map className="w-6 h-6 text-primary" fill="currentColor" />
              <span className="text-[10px] font-medium text-primary">Explore</span>
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
    </div>
  )
}
