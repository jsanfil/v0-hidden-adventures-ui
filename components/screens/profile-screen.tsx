"use client"

import { Home, Map, Bookmark, User, LogOut, MapPin, Star, Heart, Plus, ChevronRight, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

// Mock user data
const currentUser = {
  name: "Jack Sanfilippo",
  username: "@jacksanfil",
  location: "San Jose, CA",
  avatar: "/images/avatar-jack.jpg",
  bio: "",
  stats: {
    adventures: 20,
    likesReceived: 87,
    views: 1240,
    sidekicks: 10,
  },
  sidekicksList: [
    { id: "1", name: "Sarah", initials: "S" },
    { id: "2", name: "Mike", initials: "M" },
    { id: "3", name: "Alex", initials: "A" },
    { id: "4", name: "Jordan", initials: "J" },
    { id: "5", name: "Casey", initials: "C" },
    { id: "6", name: "Taylor", initials: "T" },
  ],
}

// Mock adventures for the user
const userAdventures = [
  {
    images: ["/images/scenic-overlook.jpg", "/images/hero-mountain.jpg"],
    title: "International Fountain",
    location: "Hidden location",
    category: "Viewpoints",
    rating: 4.0,
    likes: 0,
  },
  {
    images: ["/images/swimming-hole.jpg"],
    title: "Secret Swimming Spot",
    location: "Hidden location",
    category: "Water Spots",
    rating: 4.5,
    likes: 12,
  },
  {
    images: ["/images/trail-forest.jpg", "/images/hidden-canyon.jpg"],
    title: "Sunset Trail",
    location: "Los Gatos, CA",
    category: "Trails",
    rating: 4.8,
    likes: 45,
  },
]

interface ProfileScreenProps {
  onNavigateToSidekicks?: () => void
  onBack?: () => void
}

export function ProfileScreen({ onNavigateToSidekicks, onBack }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<"profile">("profile")

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar Space */}
      <div className="h-14 flex-shrink-0 bg-[#5a8a7a]" />

      {/* Back Button Header - Standalone */}
      <div className="bg-[#5a8a7a] px-5 pt-3 pb-4 flex-shrink-0">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Profile Header with Avatar */}
      <div className="bg-[#5a8a7a] px-5 pb-6 flex-shrink-0">
        <div className="flex justify-between items-start">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-[#4a7a6a] text-white text-2xl">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mt-1">
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-white mt-4">{currentUser.name}</h1>
        <p className="text-white/80 text-sm mt-0.5">{currentUser.username}</p>
        <div className="flex items-center gap-1.5 mt-2 text-white/70 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{currentUser.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Bio */}
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-sm">
            {currentUser.bio || "Add a bio during setup or come back later to tell other explorers what you love to find."}
          </p>
        </div>

        {/* Stats */}
        <div className="px-5 pb-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-xl font-semibold text-foreground">{currentUser.stats.adventures}</p>
              <p className="text-xs text-muted-foreground mt-1">Adventures</p>
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-xl font-semibold text-foreground">{currentUser.stats.likesReceived}</p>
              <p className="text-xs text-muted-foreground mt-1">Likes Received</p>
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-xl font-semibold text-foreground">{currentUser.stats.views}</p>
              <p className="text-xs text-muted-foreground mt-1">Views</p>
            </div>
          </div>
        </div>

        {/* Sidekicks Row */}
        <div className="px-5 pb-4">
          <button 
            onClick={onNavigateToSidekicks}
            className="w-full flex items-center justify-between bg-card rounded-xl p-4 border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Avatar Stack */}
              <div className="relative flex">
                {currentUser.sidekicksList.slice(0, 5).map((sidekick, idx) => (
                  <Avatar 
                    key={sidekick.id}
                    className="w-8 h-8 border-2 border-background"
                    style={{ marginLeft: idx > 0 ? "-8px" : "0" }}
                  >
                    <AvatarImage src={`/images/avatar-${sidekick.initials.toLowerCase()}.jpg`} alt={sidekick.name} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                      {sidekick.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {currentUser.sidekicksList.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background ml-[-8px] flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    +{currentUser.sidekicksList.length - 5}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="text-left">
                <p className="font-semibold text-foreground">{currentUser.stats.sidekicks} Sidekicks</p>
                <p className="text-xs text-muted-foreground">Manage your crew</p>
              </div>
            </div>

            {/* Chevron */}
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </button>
        </div>

        {/* Shared Adventures */}
        <div className="px-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">Shared adventures</h2>
          <div className="flex flex-col gap-4">
            {userAdventures.map((adventure) => (
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
            <Bookmark className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Saved</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1.5">
            <User className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="text-[10px] font-medium text-primary">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
