"use client"

import Image from "next/image"
import { Home, Map, Bookmark, User, Search, Bell, MapPin, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdventureCardProps {
  image: string
  title: string
  location: string
  category: string
  rating: number
  saves: number
  featured?: boolean
}

function AdventureCard({ image, title, location, category, rating, saves, featured }: AdventureCardProps) {
  return (
    <div className={cn(
      "relative rounded-2xl overflow-hidden bg-card shadow-sm",
      featured ? "aspect-[16/10]" : "aspect-[4/3]"
    )}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Category Badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground">
          {category}
        </span>
      </div>
      
      {/* Save Button */}
      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
        <Bookmark className="w-4 h-4 text-foreground" />
      </button>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <h3 className={cn(
          "font-semibold text-white mb-1 line-clamp-1",
          featured ? "text-lg" : "text-base"
        )}>
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{saves}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SmallAdventureCard({ image, title, location }: { image: string; title: string; location: string }) {
  return (
    <div className="flex-shrink-0 w-36">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
        <Image src={image} alt={title} fill className="object-cover" />
        <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <Bookmark className="w-3.5 h-3.5 text-foreground" />
        </button>
      </div>
      <h4 className="font-medium text-sm text-foreground line-clamp-1">{title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-1">{location}</p>
    </div>
  )
}

export function HomeFeedScreen() {
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
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Featured Adventure */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Featured Adventure</h2>
          </div>
          <AdventureCard
            image="/images/hero-mountain.jpg"
            title="Eagle Creek Trail to Tunnel Falls"
            location="Columbia River Gorge, OR"
            category="Waterfall Hike"
            rating={4.9}
            saves={2847}
            featured
          />
        </div>
        
        {/* Near You - Horizontal Scroll */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="text-base font-semibold text-foreground">Near You</h2>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            <SmallAdventureCard
              image="/images/swimming-hole.jpg"
              title="Blue Pool"
              location="Willamette NF"
            />
            <SmallAdventureCard
              image="/images/trail-forest.jpg"
              title="Opal Creek"
              location="Opal Creek"
            />
            <SmallAdventureCard
              image="/images/scenic-overlook.jpg"
              title="Tom Dick & Harry"
              location="Mt. Hood"
            />
            <SmallAdventureCard
              image="/images/coastal-path.jpg"
              title="Cape Lookout"
              location="Oregon Coast"
            />
          </div>
        </div>
        
        {/* Popular Now */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Popular Now</h2>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="space-y-4">
            <AdventureCard
              image="/images/hidden-canyon.jpg"
              title="Oneonta Gorge"
              location="Columbia River Gorge, OR"
              category="Hidden Gem"
              rating={4.8}
              saves={1523}
            />
            <AdventureCard
              image="/images/coastal-path.jpg"
              title="Sunset Cliffs at Cape Kiwanda"
              location="Pacific City, OR"
              category="Scenic View"
              rating={4.7}
              saves={892}
            />
          </div>
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
