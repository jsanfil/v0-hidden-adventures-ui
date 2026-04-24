"use client"

import { useState } from "react"
import { IPhoneFrame } from "@/components/iphone-frame"
import { WelcomeScreen } from "@/components/screens/welcome-screen"
import { ProfileSetupScreen } from "@/components/screens/profile-setup-screen"
import { HomeFeedScreen } from "@/components/screens/home-feed-screen"
import { MapExploreScreen } from "@/components/screens/map-explore-screen"
import { AdventureDetailScreen } from "@/components/screens/adventure-detail-screen"
import { DiscoverScreen } from "@/components/screens/discover-screen"
import { PostScreen } from "@/components/screens/post-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { SidekicksScreen } from "@/components/screens/sidekicks-screen"
import { SidekickProfileScreen, type SidekickUser } from "@/components/screens/sidekick-profile-screen"
import { cn } from "@/lib/utils"

const screens = [
  { id: "welcome", name: "Welcome", component: WelcomeScreen, color: "from-stone-700 to-stone-900" },
  { id: "profile-setup", name: "Profile Setup", component: ProfileSetupScreen, color: "from-slate-500 to-slate-700" },
  { id: "home", name: "Home Feed", component: HomeFeedScreen, color: "from-emerald-700 to-emerald-900" },
  { id: "map", name: "Map Explore", component: MapExploreScreen, color: "from-teal-600 to-teal-800" },
  { id: "discover", name: "Discover", component: DiscoverScreen, color: "from-amber-600 to-amber-800" },
  { id: "post", name: "Post Adventure", component: PostScreen, color: "from-green-700 to-green-900" },
  { id: "detail", name: "Adventure Detail", component: AdventureDetailScreen, color: "from-sky-700 to-sky-900" },
  { id: "profile", name: "Profile", component: ProfileScreen, color: "from-teal-700 to-teal-900" },
  { id: "sidekicks", name: "Sidekicks", component: SidekicksScreen, color: "from-emerald-600 to-emerald-800" },
  { id: "sidekick-profile", name: "Sidekick Profile", component: SidekickProfileScreen, color: "from-teal-600 to-teal-800" },
]

export default function Page() {
  const [activeScreen, setActiveScreen] = useState("welcome")
  const [selectedSidekick, setSelectedSidekick] = useState<SidekickUser | null>(null)

  const activeScreenData = screens.find(s => s.id === activeScreen)
  const ActiveComponent = activeScreenData?.component ?? WelcomeScreen

  // Navigation handlers for screens that need to push/pop
  const handleNavigateToSidekicks = () => setActiveScreen("sidekicks")
  const handleBackFromSidekicks = () => setActiveScreen("profile")
  const handleSelectSidekick = (user: SidekickUser) => {
    setSelectedSidekick(user)
    setActiveScreen("sidekick-profile")
  }
  const handleBackFromSidekickProfile = () => setActiveScreen("sidekicks")

  // Create props for components that need navigation
  const getComponentProps = (screenId: string) => {
    if (screenId === "profile") {
      return { onNavigateToSidekicks: handleNavigateToSidekicks }
    }
    if (screenId === "sidekicks") {
      return { onBack: handleBackFromSidekicks, onSelectUser: handleSelectSidekick }
    }
    if (screenId === "sidekick-profile") {
      return { user: selectedSidekick, onBack: handleBackFromSidekickProfile }
    }
    return {}
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef]">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3 text-balance">Hidden Adventures</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
          A modern outdoor discovery app concept. Explore hidden gems, scenic trails, and unforgettable places.
        </p>
      </header>

      {/* Screen Selector Pills */}
      <div className="flex justify-center gap-2 px-4 pb-8 flex-wrap">
        {screens.map((screen) => (
          <div
            key={screen.id}
            onClick={() => setActiveScreen(screen.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer select-none",
              activeScreen === screen.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-white text-foreground hover:bg-white/80 shadow-sm"
            )}
          >
            {screen.name}
          </div>
        ))}
      </div>

      {/* All Screens Grid — static thumbnails only, no live components */}
      <section className="px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {screens.map((screen) => (
            <div
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group select-none"
            >
              <div className={cn(
                "w-24 h-40 rounded-2xl border-2 transition-all overflow-hidden shadow-md group-hover:shadow-lg group-hover:scale-105",
                activeScreen === screen.id ? "border-primary" : "border-border"
              )}>
                <div className={cn("w-full h-full bg-gradient-to-br flex flex-col items-center justify-center gap-2 p-3", screen.color)}>
                  <span className="text-3xl font-serif text-white/90">{screen.name.charAt(0)}</span>
                  <span className="text-[10px] font-medium text-white/70 text-center leading-tight">{screen.name}</span>
                </div>
              </div>
              <p className={cn(
                "text-xs font-medium text-center",
                activeScreen === screen.id ? "text-primary" : "text-muted-foreground"
              )}>{screen.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* iPhone Preview — live component, isolated */}
      <div className="flex justify-center pb-20">
        <IPhoneFrame className="transform scale-[0.85] md:scale-100 origin-top">
          <ActiveComponent {...getComponentProps(activeScreen)} />
        </IPhoneFrame>
      </div>

      {/* Design System Footer */}
      <footer className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif text-foreground text-center mb-8">Design System</h2>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Color Palette</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Forest Green", cls: "bg-primary" },
                { name: "Sand", cls: "bg-secondary border border-border" },
                { name: "Off-White", cls: "bg-background border border-border" },
                { name: "Slate", cls: "bg-foreground" },
                { name: "Muted Blue", cls: "bg-accent" },
              ].map(({ name, cls }) => (
                <div key={name} className="flex flex-col items-center">
                  <div className={cn("w-16 h-16 rounded-xl shadow-sm", cls)} />
                  <span className="text-xs text-muted-foreground mt-2">{name}</span>
                </div>
              ))}
            </div>
          </div>

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
