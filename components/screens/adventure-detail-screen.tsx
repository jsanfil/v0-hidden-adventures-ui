"use client"

import { ChevronLeft, Share2, Bookmark, MapPin, Star, Clock, TrendingUp, Heart, MessageCircle, Navigation, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdventureImageCarousel } from "@/components/adventure-image-carousel"

const heroImages = [
  "/images/swimming-hole.jpg",
  "/images/hidden-canyon.jpg",
  "/images/trail-forest.jpg",
  "/images/hero-mountain.jpg",
]

export function AdventureDetailScreen() {
  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Hero Image Carousel */}
      <div className="relative h-[320px] flex-shrink-0">
        <AdventureImageCarousel
          images={heroImages}
          alt="Blue Pool"
          className="h-full"
          aspectRatio="h-full"
          dotsPosition="inside"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 pt-14 px-4 flex items-center justify-between pointer-events-none">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm pointer-events-auto">
              <Bookmark className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto -mt-6 relative">
        <div className="bg-background rounded-t-3xl pt-6 px-5 pb-32">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                Hidden Gem
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-sm">4.9</span>
                <span className="text-muted-foreground text-sm">(847)</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">Blue Pool at Tamolitch Falls</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">McKenzie River Trail, Willamette NF</span>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 py-4 border-y border-border mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium text-foreground">2-3 hrs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Difficulty</p>
                <p className="text-sm font-medium text-foreground">Moderate</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                <Navigation className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-medium text-foreground">4.2 mi</p>
              </div>
            </div>
          </div>
          
          {/* Author */}
          <div className="flex items-center gap-3 mb-5">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">SK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Shared by Sarah K.</p>
              <p className="text-xs text-muted-foreground">Local Explorer · 48 adventures</p>
            </div>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-border text-foreground bg-card hover:bg-secondary transition-colors">
              Follow
            </button>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-2">About this place</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Blue Pool is one of Oregon&apos;s most stunning natural wonders. The pool&apos;s striking blue color comes from the McKenzie River emerging from underground lava flows, creating an otherworldly turquoise that has to be seen to be believed.
            </p>
            <button className="text-sm text-primary font-medium mt-2">Read more</button>
          </div>
          
          {/* Map Preview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Location</h2>
              <button className="text-sm text-primary font-medium flex items-center gap-1">
                Get Directions
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="h-36 rounded-2xl bg-[#e8e4d9] relative overflow-hidden">
              {/* Simplified map */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4e4d0] to-[#e8e4d9]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 144" fill="none">
                <path d="M0 72 Q75 50 150 72 T300 60" stroke="#fff" strokeWidth="4" fill="none" opacity="0.8" />
                <ellipse cx="150" cy="72" rx="30" ry="20" fill="#a8ccd7" opacity="0.7" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Activity */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
              <button className="text-sm text-primary font-medium">See all</button>
            </div>
            
            <div className="space-y-3">
              {/* Activity Item */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground"><span className="font-medium">Mike J.</span> visited this spot</p>
                  <p className="text-xs text-muted-foreground mt-0.5">&quot;Absolutely magical! Got there early and had it all to ourselves.&quot;</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="w-3.5 h-3.5" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>3</span>
                    </button>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                </div>
              </div>
              
              {/* Activity Item */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">AL</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground"><span className="font-medium">Amy L.</span> saved this adventure</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="w-3.5 h-3.5" />
                      <span>8</span>
                    </button>
                    <span className="text-xs text-muted-foreground">5 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-5 pt-4 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">2,431 people saved this</p>
          </div>
          <button className="flex-1 h-12 rounded-2xl text-base font-medium bg-primary text-primary-foreground flex items-center justify-center gap-2 transition-colors hover:opacity-90">
            <Navigation className="w-5 h-5" />
            Start Adventure
          </button>
        </div>
      </div>
    </div>
  )
}
