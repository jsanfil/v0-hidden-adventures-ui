"use client"

import { ChevronLeft, MapPin, Star, Heart, Bookmark } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

// Mock adventures for sidekicks
const sidekickAdventures = [
  {
    images: ["/images/hidden-canyon.jpg", "/images/trail-forest.jpg"],
    title: "Hidden Canyon Trail",
    location: "Hidden location",
    category: "Trails",
    rating: 4.7,
    likes: 32,
  },
  {
    images: ["/images/swimming-hole.jpg"],
    title: "Crystal Clear Springs",
    location: "Hidden location",
    category: "Water Spots",
    rating: 4.9,
    likes: 58,
  },
  {
    images: ["/images/scenic-overlook.jpg"],
    title: "Mountain Vista Point",
    location: "Denver, CO",
    category: "Viewpoints",
    rating: 4.6,
    likes: 24,
  },
]

export interface SidekickUser {
  id: string
  name: string
  username: string
  avatar: string
  location: string
  adventures: number
  bio?: string
  likesReceived?: number
  views?: number
}

// Default user when none is selected (for thumbnail preview)
const defaultUser: SidekickUser = {
  id: "default",
  name: "Sarah Chen",
  username: "@sarahc",
  avatar: "/images/avatar-sarah.jpg",
  location: "Portland, OR",
  adventures: 45,
}

interface SidekickProfileScreenProps {
  user?: SidekickUser | null
  onBack?: () => void
}

export function SidekickProfileScreen({ user: propUser, onBack }: SidekickProfileScreenProps) {
  const user = propUser ?? defaultUser
  
  // Generate mock stats based on user data
  const stats = {
    adventures: user.adventures,
    likesReceived: user.likesReceived ?? Math.floor(Math.random() * 150) + 20,
    views: user.views ?? Math.floor(Math.random() * 2000) + 500,
  }

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar Space */}
      <div className="h-14 flex-shrink-0 bg-[#5a8a7a]" />

      {/* Profile Header */}
      <div className="bg-[#5a8a7a] px-5 pb-6 flex-shrink-0">
        <div className="flex justify-between items-start">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-[#4a7a6a] text-white text-2xl">
              {user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mt-1"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-white mt-4">{user.name}</h1>
        <p className="text-white/80 text-sm mt-0.5">{user.username}</p>
        <div className="flex items-center gap-1.5 mt-2 text-white/70 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{user.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Bio */}
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-sm">
            {user.bio || "This explorer hasn't added a bio yet. Check out their adventures below!"}
          </p>
        </div>

        {/* Stats */}
        <div className="px-5 pb-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-xl font-semibold text-foreground">{stats.adventures}</p>
              <p className="text-xs text-muted-foreground mt-1">Adventures</p>
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-xl font-semibold text-foreground">{stats.likesReceived}</p>
              <p className="text-xs text-muted-foreground mt-1">Likes Received</p>
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-xl font-semibold text-foreground">{stats.views}</p>
              <p className="text-xs text-muted-foreground mt-1">Views</p>
            </div>
          </div>
        </div>

        {/* Shared Adventures */}
        <div className="px-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">Shared adventures</h2>
          <div className="flex flex-col gap-4">
            {sidekickAdventures.map((adventure) => (
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

                  {/* Title & meta */}
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
                          <Star className="w-3.5 h-3.5" />
                          <span>{adventure.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{adventure.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
