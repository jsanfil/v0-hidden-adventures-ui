"use client"

import { useState } from "react"
import {
  ChevronLeft, X, Plus, ChevronRight,
  Mountain, Footprints, Waves, UtensilsCrossed,
  Building2, Gem, Leaf, Navigation,
  Globe, Users, Lock, MapPin, ImagePlus,
} from "lucide-react"
import { Home, Map, Bookmark, User } from "lucide-react"

const categories = [
  { label: "Viewpoints", icon: Mountain },
  { label: "Trails", icon: Footprints },
  { label: "Water Spots", icon: Waves },
  { label: "Food & Drink", icon: UtensilsCrossed },
  { label: "Abandoned Places", icon: Building2 },
  { label: "Caves", icon: Gem },
  { label: "Nature Escapes", icon: Leaf },
  { label: "Roadside Stops", icon: Navigation },
]

const visibilityOptions = [
  { label: "Public", icon: Globe, description: "Anyone can see this" },
  { label: "Connections", icon: Users, description: "Only people you follow" },
  { label: "Private", icon: Lock, description: "Only you" },
]

const mockPhotos = [
  "/images/hero-mountain.jpg",
  "/images/swimming-hole.jpg",
  "/images/scenic-overlook.jpg",
  "/images/coastal-path.jpg",
  "/images/trail-forest.jpg",
]

export function PostScreen() {
  const [step, setStep] = useState<"photos" | "details">("photos")
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(["/images/hero-mountain.jpg", "/images/swimming-hole.jpg"])
  const [activePhoto, setActivePhoto] = useState(0)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [visibility, setVisibility] = useState("Public")

  const togglePhoto = (photo: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photo) ? prev.filter((p) => p !== photo) : [...prev, photo]
    )
  }

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar */}
      <div className="h-14 flex-shrink-0" />

      {/* Header */}
      <div className="px-5 pb-4 flex items-center justify-between flex-shrink-0 border-b border-border">
        <div className="flex items-center gap-3">
          {step === "details" ? (
            <button onClick={() => setStep("photos")} className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          ) : (
            <button className="w-8 h-8 flex items-center justify-center">
              <X className="w-5 h-5 text-foreground" />
            </button>
          )}
          <h1 className="text-base font-semibold text-foreground">
            {step === "photos" ? "New Adventure" : "Adventure Details"}
          </h1>
        </div>
        {step === "photos" ? (
          <button
            onClick={() => selectedPhotos.length > 0 && setStep("details")}
            className={`text-sm font-semibold flex items-center gap-1 ${selectedPhotos.length > 0 ? "text-primary" : "text-muted-foreground"}`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Post
          </button>
        )}
      </div>

      {step === "photos" ? (
        <div className="flex-1 overflow-y-auto">
          {/* Preview of selected photos */}
          {selectedPhotos.length > 0 && (
            <div className="relative aspect-square bg-muted flex-shrink-0">
              <img
                src={selectedPhotos[activePhoto] || selectedPhotos[0]}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {/* Photo counter */}
              {selectedPhotos.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/60 rounded-full px-2.5 py-1">
                  <span className="text-white text-xs font-medium">{activePhoto + 1} / {selectedPhotos.length}</span>
                </div>
              )}
              {/* Dots */}
              {selectedPhotos.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {selectedPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activePhoto ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Photo grid */}
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Select Photos ({selectedPhotos.length} selected)
            </p>
            <div className="grid grid-cols-3 gap-1">
              {/* Add more button */}
              <button className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 bg-secondary">
                <Plus className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium">Add Photo</span>
              </button>
              {mockPhotos.map((photo) => {
                const isSelected = selectedPhotos.includes(photo)
                const idx = selectedPhotos.indexOf(photo)
                return (
                  <button
                    key={photo}
                    onClick={() => { togglePhoto(photo); if (isSelected && idx === activePhoto) setActivePhoto(0) }}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                    {/* Selection overlay */}
                    <div className={`absolute inset-0 transition-colors ${isSelected ? "bg-primary/20" : "bg-transparent"}`} />
                    {/* Badge */}
                    <div className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "bg-primary border-primary" : "bg-black/30 border-white/70"
                    }`}>
                      {isSelected && <span className="text-[9px] font-bold text-white">{idx + 1}</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Selected photos strip */}
          <div className="px-5 pt-4 pb-3 flex gap-2 overflow-x-auto flex-shrink-0">
            {selectedPhotos.map((photo, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <button
              onClick={() => setStep("photos")}
              className="w-16 h-16 rounded-xl border-2 border-dashed border-border bg-secondary flex-shrink-0 flex items-center justify-center"
            >
              <ImagePlus className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="px-5 pb-8 flex flex-col gap-5">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give this spot a name..."
                className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What makes this place special? Share tips, directions, best time to visit..."
                rows={3}
                className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add a location..."
                  className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(({ label, icon: Icon }) => {
                  const isActive = category === label
                  return (
                    <button
                      key={label}
                      onClick={() => setCategory(isActive ? null : label)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-foreground border-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Who can see this?</label>
              <div className="flex flex-col gap-2">
                {visibilityOptions.map(({ label, icon: Icon, description }) => {
                  const isActive = visibility === label
                  return (
                    <button
                      key={label}
                      onClick={() => setVisibility(label)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                        isActive
                          ? "bg-primary/10 border-primary"
                          : "bg-secondary border-transparent"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-primary" : "bg-muted"}`}>
                        <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>{label}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                      <div className={`ml-auto w-4 h-4 rounded-full border-2 flex-shrink-0 ${isActive ? "border-primary bg-primary" : "border-border"}`}>
                        {isActive && <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-2 pb-7">
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5">
            <Home className="w-6 h-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Home</span>
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
