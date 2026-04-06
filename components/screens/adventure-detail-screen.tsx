"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, MapPin, Star, MessageCircle, MoreHorizontal, Share2, Bookmark, ChevronRight, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

// ─── Types matching the actual database schema ────────────────────────────────

interface Author {
  handle: string
  displayName: string
  homeCity: string
  homeRegion: string
  avatarUrl?: string
  adventureCount?: number
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

// ─── Sample data ──────────────────────────────────────────────────────────────

const sampleAdventure: Adventure = {
  id: "f34e73a8-6b33-5146-855f-445c157634f7",
  title: "Blue Pool at Tamolitch Falls",
  summary: "One of Oregon's most stunning natural wonders hidden deep in the McKenzie River Trail.",
  body: "The pool's striking blue color comes from the McKenzie River emerging from underground lava flows, creating an otherworldly turquoise that has to be seen to be believed. Best visited early morning before crowds arrive.",
  categorySlug: "swimming",
  visibility: "public",
  createdAt: "2026-03-06 00:00:00+00",
  publishedAt: "2026-03-06 12:00:00+00",
  updatedAt: "2026-03-07 00:00:00+00",
  location: { latitude: 44.2638, longitude: -122.023 },
  author: {
    handle: "jacksanfil",
    displayName: "Jack Sanfil",
    homeCity: "Saratoga",
    homeRegion: "CA",
    avatarUrl: "",
  },
  primaryMedia: {
    id: "b7cb6474-dc03-54d7-aca5-f7607b851cec",
    storageKey: "/images/swimming-hole.jpg",
  },
  stats: {
    favoriteCount: 2431,
    commentCount: 2,
    ratingCount: 847,
    averageRating: 4.9,
  },
  placeLabel: "McKenzie River Trail, Willamette NF",
  media: [
    { id: "1", storageKey: "/images/swimming-hole.jpg" },
    { id: "2", storageKey: "/images/hidden-canyon.jpg" },
    { id: "3", storageKey: "/images/trail-forest.jpg" },
    { id: "4", storageKey: "/images/hero-mountain.jpg" },
  ],
  comments: [
    {
      id: "c1",
      authorHandle: "megan",
      authorDisplayName: "megan",
      authorAvatarUrl: "",
      body: "Absolutely magical! Got there early and had it all to ourselves.",
      createdAt: "2019-04-01T10:00:00Z",
    },
    {
      id: "c2",
      authorHandle: "megan",
      authorDisplayName: "megan",
      authorAvatarUrl: "",
      body: "Takes thirty minutes on the trail before you reach the pool but totally worth every step.",
      createdAt: "2019-04-01T11:00:00Z",
    },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  cafe: "Cafe",
  desert_spots: "Desert",
  hiking: "Hiking",
  swimming: "Swimming Hole",
  camping: "Camping",
  scenic: "Scenic View",
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  const diffYears = Math.floor(diffDays / 365)
  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`
  if (diffDays > 30) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  return "today"
}

// ─── Component ────────────────────────────────────────────────────────────────

interface AdventureDetailScreenProps {
  adventure?: Adventure
}

export function AdventureDetailScreen({ adventure = sampleAdventure }: AdventureDetailScreenProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [commentText, setCommentText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const images = adventure.media?.map((m) => m.storageKey) ?? [adventure.primaryMedia.storageKey]
  const categoryLabel = categoryLabels[adventure.categorySlug] ?? adventure.categorySlug
  
  // Auto-expand textarea as user types
  useEffect(() => {
    if (textareaRef.current && commentText) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + "px"
    } else if (textareaRef.current) {
      // Reset to single line when empty
      textareaRef.current.style.height = "40px"
    }
  }, [commentText])
  
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // TODO: Submit comment to API
      setCommentText("")
    }
  }

  return (
    <div className="relative w-full h-full bg-background">

      {/* ── Single scroll container ────────────────────────────────────────── */}
      <div className="h-full overflow-y-auto">
        
        {/* Hero Carousel - sticky at top, gets covered as you scroll */}
        <div className="sticky top-0 h-[320px] z-0">
          <AdventureImageCarousel
            images={images}
            alt={adventure.title}
            className="h-full"
            aspectRatio="h-full"
            dotsPosition="inside"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating nav - fixed position so it stays visible */}
        <div className="fixed top-0 left-0 right-0 pt-14 px-4 flex items-center justify-between pointer-events-none z-20">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm pointer-events-auto transition-colors ${
                isFavorited ? "bg-primary" : "bg-white/90 backdrop-blur-sm"
              }`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Bookmark
                className={`w-5 h-5 ${isFavorited ? "text-primary-foreground fill-primary-foreground" : "text-foreground"}`}
              />
            </button>
          </div>
        </div>

        {/* Content panel - slides up over the hero */}
        <div className="relative z-10 -mt-6 bg-background rounded-t-3xl pt-6 px-5 pb-24 min-h-[calc(100%-320px+24px)]">

          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                {categoryLabel}
              </span>
              {adventure.stats.averageRating > 0 && (
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-sm">{adventure.stats.averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">({adventure.stats.ratingCount.toLocaleString()})</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-1 text-balance">{adventure.title}</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{adventure.placeLabel}</span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 py-4 border-y border-border mb-5">
            <Avatar className="w-10 h-10">
              <AvatarImage src={adventure.author.avatarUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {adventure.author.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Shared by {adventure.author.displayName}</p>
              <p className="text-xs text-muted-foreground">
                {adventure.author.homeCity}, {adventure.author.homeRegion} · {adventure.author.adventureCount ?? 48} adventures
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-border text-foreground bg-card hover:bg-secondary transition-colors">
              Follow
            </button>
          </div>

          {/* Summary + body */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-2">About this place</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {adventure.summary}
            </p>
            {adventure.body && (
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                {adventure.body}
              </p>
            )}
          </div>

          {/* Location + mini-map */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Location</h2>
              <a
                href={`https://maps.apple.com/?q=${adventure.location.latitude},${adventure.location.longitude}`}
                className="flex items-center gap-1 text-sm font-medium text-primary"
              >
                Get Directions
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="h-36 rounded-2xl bg-[#dde8d8] relative overflow-hidden">
              {/* Stylised map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#cfdec9] to-[#dde8d8]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 144" fill="none" aria-hidden="true">
                <path d="M0 80 Q80 55 160 72 T320 58" stroke="white" strokeWidth="5" fill="none" opacity="0.7" />
                <path d="M0 95 Q80 70 160 88 T320 74" stroke="white" strokeWidth="2" fill="none" opacity="0.35" />
                <ellipse cx="160" cy="75" rx="36" ry="22" fill="#a8c8b8" opacity="0.55" />
              </svg>
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Rate this adventure */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-3">Rate this adventure</h2>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-1 transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || userRating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
              {userRating > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {userRating === 5 ? "Amazing!" : userRating === 4 ? "Great" : userRating === 3 ? "Good" : userRating === 2 ? "Fair" : "Poor"}
                </span>
              )}
            </div>
          </div>

          {/* Comments */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-base font-semibold text-foreground">
                  {adventure.stats.commentCount} {adventure.stats.commentCount === 1 ? "Comment" : "Comments"}
                </h2>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {adventure.comments?.map((comment) => (
                <div key={comment.id} className="bg-muted rounded-2xl rounded-tl-sm p-4 flex items-start gap-3">
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarImage src={comment.authorAvatarUrl} />
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs font-medium">
                      {comment.authorDisplayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{comment.authorDisplayName}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{comment.body}</p>
                  </div>
                </div>
              ))}

              {(!adventure.comments || adventure.comments.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky comment input bar - fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-8 z-30">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              ME
            </AvatarFallback>
          </Avatar>
          <textarea
            ref={textareaRef}
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmitComment()
              }
            }}
            className="flex-1 h-10 max-h-24 rounded-full bg-secondary border-0 text-sm placeholder:text-muted-foreground p-3 resize-none overflow-hidden outline-none focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={handleSubmitComment}
            disabled={!commentText.trim()}
            className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  )
}
