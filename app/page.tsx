"use client"

import { useState } from "react"
import { IPhoneFrame } from "@/components/iphone-frame"
import { WelcomeScreen } from "@/components/screens/welcome-screen"
import { ProfileSetupScreen } from "@/components/screens/profile-setup-screen"
import { HomeFeedScreen } from "@/components/screens/home-feed-screen"
import { MapExploreScreen } from "@/components/screens/map-explore-screen"
import { AdventureDetailScreen } from "@/components/screens/adventure-detail-screen"
import { cn } from "@/lib/utils"

const screens = [
  { id: "welcome", name: "Welcome", component: WelcomeScreen },
  { id: "profile", name: "Profile Setup", component: ProfileSetupScreen },
  { id: "home", name: "Home Feed", component: HomeFeedScreen },
  { id: "map", name: "Map Explore", component: MapExploreScreen },
  { id: "detail", name: "Adventure Detail", component: AdventureDetailScreen },
]

export default function Page() {
  const [activeScreen, setActiveScreen] = useState("welcome")

  const ActiveComponent = screens.find(s => s.id === activeScreen)?.component || WelcomeScreen

  return (
    <main className="min-h-screen bg-[#f5f3ef]">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">Hidden Adventures</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A modern outdoor discovery app concept. Explore hidden gems, scenic trails, and unforgettable places.
        </p>
      </header>

      {/* Screen Navigation */}
      <nav className="flex justify-center gap-2 px-4 pb-8 flex-wrap">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setActiveScreen(screen.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeScreen === screen.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-white text-foreground hover:bg-white/80 shadow-sm"
            )}
          >
            {screen.name}
          </button>
        ))}
      </nav>

      {/* iPhone Preview */}
      <div className="flex justify-center pb-16">
        <IPhoneFrame className="transform scale-[0.85] md:scale-100 origin-top">
          <ActiveComponent />
        </IPhoneFrame>
      </div>

      {/* All Screens Grid */}
      <section className="px-6 pb-20">
        <h2 className="text-2xl font-serif text-foreground text-center mb-8">All Screens</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {screens.map((screen) => {
            const ScreenComponent = screen.component
            return (
              <div key={screen.id} className="flex flex-col items-center">
                {/* Wrapper with pointer-events-none on inner content, overlay captures clicks */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview ${screen.name}`}
                  onClick={() => setActiveScreen(screen.id)}
                  onKeyDown={(e) => e.key === "Enter" && setActiveScreen(screen.id)}
                  className="relative transform scale-[0.4] origin-top transition-transform hover:scale-[0.42] cursor-pointer"
                >
                  <div className="pointer-events-none select-none">
                    <IPhoneFrame>
                      <ScreenComponent />
                    </IPhoneFrame>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground -mt-[280px]">{screen.name}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Design System Footer */}
      <footer className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif text-foreground text-center mb-8">Design System</h2>
          
          {/* Colors */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Color Palette</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-primary shadow-sm" />
                <span className="text-xs text-muted-foreground mt-2">Forest Green</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-secondary shadow-sm border border-border" />
                <span className="text-xs text-muted-foreground mt-2">Sand</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-background shadow-sm border border-border" />
                <span className="text-xs text-muted-foreground mt-2">Off-White</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-foreground shadow-sm" />
                <span className="text-xs text-muted-foreground mt-2">Slate</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-accent shadow-sm" />
                <span className="text-xs text-muted-foreground mt-2">Muted Blue</span>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Typography</h3>
            <div className="space-y-3 bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-3xl font-serif text-foreground">Instrument Serif - Display</p>
              <p className="text-xl font-semibold text-foreground">Inter Semibold - Headings</p>
              <p className="text-base text-foreground">Inter Regular - Body text for descriptions and content</p>
              <p className="text-sm text-muted-foreground">Inter Regular - Secondary and supporting text</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
