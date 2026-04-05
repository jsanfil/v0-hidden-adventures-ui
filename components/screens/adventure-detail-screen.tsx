"use client"

import { useState } from "react"
import { ChevronLeft, Heart, MapPin, Star, MessageCircle, Navigation, AlertTriangle, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

// Types matching the actual database schema
interface Author {
  handle: string
  displayName: string
  homeCity: string
  homeRegion: string
  avatarUrl?: string
}

interface Media {
  id: string
  storageKey: string
}

interface Stats {
  favoriteCount: number
  commentCount: number
  ratingCount: number
  averageRating: number
}

interface Location {
  latitude: number
  longitude: number
}

interface Comment {
  id: string
  authorHandle: string
  authorDisplayName: string
  authorAvatarUrl?: string
  body: string
  createdAt: string
}

interface Adventure {
  id: string
  title: string
  summary: string
  body: string
  categorySlug: string
  visibility: "public" | "private"
  createdAt: string
  publishedAt: string
  updatedAt: string
  location: Location
  author: Author
  primaryMedia: Media
  stats: Stats
  placeLabel: string
  media?: Media[]
  comments?: Comment[]
}

// Sample data matching the schema
const sampleAdventure: Adventure = {
  id: "f34e73a8-6b33-5146-855f-445c157634f7",
  title: "Big Basin Café",
  summary: "A cute little cafe in downtown Saratoga.",
  body: "There is a wide variety of pastries, sandwiches, drinks, and desserts. We Roast Organic Coffee Beans.",
  categorySlug: "cafe",
  visibility: "public",
  createdAt: "2026-03-06 00:00:00+00",
  publishedAt: "2026-03-06 12:00:00+00",
  updatedAt: "2026-03-07 00:00:00+00",
  location: {
    latitude: 37.2638,
    longitude: -122.023
  },
  author: {
    handle: "jacksanfil",
    displayName: "Jack Sanfil",
    homeCity: "Saratoga",
    homeRegion: "CA",
    avatarUrl: "/images/avatar-jack.jpg"
  },
  primaryMedia: {
    id: "b7cb6474-dc03-54d7-aca5-f7607b851cec",
    storageKey: "/images/swimming-hole.jpg"
  },
  stats: {
    favoriteCount: 24,
    commentCount: 2,
    ratingCount: 15,
    averageRating: 4.5
  },
  placeLabel: "Big Basin Café",
  media: [
    { id: "1", storageKey: "/images/swimming-hole.jpg" },
    { id: "2", storageKey: "/images/hidden-canyon.jpg" },
    { id: "3", storageKey: "/images/trail-forest.jpg" },
  ],
  comments: [
    {
      id: "c1",
      authorHandle: "megan",
      authorDisplayName: "megan",
      authorAvatarUrl: "/images/avatar-megan.jpg",
      body: "tastes good though",
      createdAt: "2019-04-01T10:00:00Z"
    },
    {
      id: "c2",
      authorHandle: "megan",
      authorDisplayName: "megan",
      authorAvatarUrl: "/images/avatar-megan.jpg",
      body: "takes thirty minutes for them to pull a muffin out of the case",
      createdAt: "2019-04-01T11:00:00Z"
    }
  ]
}

// Category icon mapping
const categoryIcons: Record<string, string> = {
  cafe: "☕",
  desert_spots: "🏜️",
  hiking: "🥾",
  swimming: "🏊",
  camping: "⛺",
  scenic: "🌄"
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffYears = Math.floor(diffDays / 365)
  
  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
  if (diffDays > 30) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return "today"
}

interface AdventureDetailScreenProps {
  adventure?: Adventure
}

export function AdventureDetailScreen({ adventure = sampleAdventure }: AdventureDetailScreenProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showComments, setShowComments] = useState(false)
  
  const images = adventure.media?.map(m => m.storageKey) || [adventure.primaryMedia.storageKey]
  const categoryIcon = categoryIcons[adventure.categorySlug] || "📍"
  
  if (showComments) {
    return (
      <div className="relative w-full h-full bg-background flex flex-col">
        {/* Comments Header */}
        <div className="flex-shrink-0 bg-secondary/50 pt-14 pb-3 px-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-full"
              onClick={() => setShowComments(false)}
            >
              Back
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Comments</h1>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-9 h-9"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Comments List */}
        <ScrollArea className="flex-1">
          <div className="px-4 py-4 space-y-6">
            {adventure.comments?.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{comment.authorDisplayName}</span>
                  <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt)}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.authorAvatarUrl} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                      {comment.authorDisplayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-secondary/60 rounded-2xl px-4 py-3">
                    <p className="text-sm text-foreground">{comment.body}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {(!adventure.comments || adventure.comments.length === 0) && (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">No comments yet</p>
                <p className="text-muted-foreground text-xs mt-1">Be the first to comment!</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }
  
  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Header with Author */}
      <div className="flex-shrink-0 bg-secondary/50 pt-14 pb-3 px-4">
        <div className="flex items-center justify-between">
          <button className="text-sm font-medium text-foreground">
            Back
          </button>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={adventure.author.avatarUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {adventure.author.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{adventure.author.handle}</span>
          </div>
          <button 
            className="p-1"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart 
              className={`w-6 h-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
            />
          </button>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-4 pb-6">
          {/* Title with Category Icon */}
          <div className="flex items-center gap-3 py-4 bg-secondary/30 -mx-4 px-4 mb-4">
            <span className="text-2xl">{categoryIcon}</span>
            <h1 className="text-xl font-semibold text-foreground">{adventure.title}</h1>
          </div>
          
          {/* Image Carousel */}
          <div className="relative rounded-lg overflow-hidden mb-4">
            <AdventureImageCarousel
              images={images}
              alt={adventure.title}
              className="w-full"
              aspectRatio="aspect-[4/3]"
              dotsPosition="below"
            />
          </div>
          
          {/* Description - Summary + Body */}
          <div className="mb-6">
            <p className="text-sm text-foreground leading-relaxed">
              {adventure.summary} {adventure.body}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-lg border-2 text-base font-medium"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Get Location
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-lg border-2 text-base font-medium"
            >
              <Star className="w-5 h-5 mr-2" />
              Rate Adventure
            </Button>
          </div>
          
          {/* Stats Row - Comments & Report */}
          <div className="flex items-center justify-between py-4 border-t border-border">
            <button 
              className="flex items-center gap-2 text-muted-foreground"
              onClick={() => setShowComments(true)}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{adventure.stats.commentCount} comments</span>
            </button>
            <button className="text-muted-foreground">
              <AlertTriangle className="w-5 h-5" />
            </button>
          </div>
          
          {/* Rating Display */}
          {adventure.stats.averageRating > 0 && (
            <div className="flex items-center gap-2 py-3 border-t border-border">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-sm">{adventure.stats.averageRating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground text-sm">({adventure.stats.ratingCount} ratings)</span>
              <span className="text-muted-foreground text-sm ml-auto">
                {adventure.stats.favoriteCount} favorites
              </span>
            </div>
          )}
          
          {/* Location Info */}
          <div className="py-4 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{adventure.placeLabel}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {adventure.author.homeCity}, {adventure.author.homeRegion}
            </p>
          </div>
          
          {/* Comments Preview */}
          {adventure.comments && adventure.comments.length > 0 && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">Comments</h2>
                <button 
                  className="text-sm text-primary font-medium"
                  onClick={() => setShowComments(true)}
                >
                  See all
                </button>
              </div>
              
              <div className="space-y-4 max-h-[200px] overflow-y-auto">
                {adventure.comments.slice(0, 3).map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={comment.authorAvatarUrl} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {comment.authorDisplayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{comment.authorDisplayName}</span>
                        <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
