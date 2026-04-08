"use client"

import { useState, useEffect, useRef } from "react"
import { Drawer } from "vaul"
import {
  MapPin, Navigation, Search, X, Loader2,
  ChevronRight, Map, CheckCircle2,
} from "lucide-react"

type LocationMode = "options" | "search" | "pin"

interface ResolvedLocation {
  name: string
  lat: number
  lng: number
}

interface LocationPickerSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: (location: ResolvedLocation) => void
}

// Simulated place search results
const mockPlaces = [
  { name: "Yosemite National Park", sub: "California, United States", lat: 37.8651, lng: -119.5383 },
  { name: "Yellow Rock Trail", sub: "Kanab, Utah, United States", lat: 37.0525, lng: -111.9899 },
  { name: "Yellowstone Valley", sub: "Wyoming, United States", lat: 44.4605, lng: -110.8281 },
  { name: "Crater Lake", sub: "Oregon, United States", lat: 42.8684, lng: -122.1685 },
  { name: "Olympic National Forest", sub: "Washington, United States", lat: 47.9021, lng: -123.6044 },
  { name: "Zion National Park", sub: "Springdale, Utah, United States", lat: 37.2982, lng: -113.0263 },
  { name: "Acadia National Park", sub: "Maine, United States", lat: 44.3386, lng: -68.2733 },
]

function searchPlaces(query: string) {
  if (!query.trim()) return []
  return mockPlaces.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sub.toLowerCase().includes(query.toLowerCase())
  )
}

// Simple static map tile preview using OpenStreetMap
function StaticMapPreview({ lat, lng, onMove }: { lat: number; lng: number; onMove: (lat: number, lng: number) => void }) {
  const zoom = 13
  const tileSize = 256
  // Convert lat/lng to tile x/y
  const n = Math.pow(2, zoom)
  const xTile = Math.floor(((lng + 180) / 360) * n)
  const yTile = Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n
  )

  const mapUrl = `https://tile.openstreetmap.org/${zoom}/${xTile}/${yTile}.png`

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted">
      {/* Map tiles - 3x3 grid for context */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(3, ${tileSize}px)`, gridTemplateRows: `repeat(3, ${tileSize}px)` }}
        >
          {[-1, 0, 1].map((dy) =>
            [-1, 0, 1].map((dx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${dx},${dy}`}
                src={`https://tile.openstreetmap.org/${zoom}/${xTile + dx}/${yTile + dy}.png`}
                alt=""
                width={tileSize}
                height={tileSize}
                crossOrigin="anonymous"
              />
            ))
          )}
        </div>
      </div>
      {/* Centered pin */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center -translate-y-1/2">
          <MapPin className="w-8 h-8 text-primary drop-shadow-lg" fill="currentColor" />
          <div className="w-2 h-2 rounded-full bg-primary/40 blur-sm -mt-1" />
        </div>
      </div>
      {/* Drag hint */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-black/60 rounded-full px-3 py-1.5">
          <p className="text-white text-xs font-medium">Tap to confirm this location</p>
        </div>
      </div>
    </div>
  )
}

export function LocationPickerSheet({ open, onClose, onConfirm }: LocationPickerSheetProps) {
  const [mode, setMode] = useState<LocationMode>("options")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockPlaces>([])
  const [gpsState, setGpsState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [gpsResult, setGpsResult] = useState<ResolvedLocation | null>(null)
  const [pinLocation, setPinLocation] = useState<ResolvedLocation>({
    name: "Yosemite National Park",
    lat: 37.8651,
    lng: -119.5383,
  })
  const searchRef = useRef<HTMLInputElement>(null)

  // Reset state when sheet closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setMode("options")
        setSearchQuery("")
        setSearchResults([])
        setGpsState("idle")
        setGpsResult(null)
      }, 300)
    }
  }, [open])

  // Auto-focus search input
  useEffect(() => {
    if (mode === "search") {
      setTimeout(() => searchRef.current?.focus(), 100)
    }
  }, [mode])

  // Search debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchResults(searchPlaces(searchQuery))
    }, 200)
    return () => clearTimeout(t)
  }, [searchQuery])

  function handleUseCurrentLocation() {
    setGpsState("loading")
    // Simulate GPS lookup
    setTimeout(() => {
      setGpsState("done")
      setGpsResult({ name: "Yosemite Valley, California", lat: 37.7459, lng: -119.5332 })
    }, 1800)
  }

  function handleConfirmGps() {
    if (gpsResult) {
      onConfirm(gpsResult)
      onClose()
    }
  }

  function handleConfirmSearch(place: typeof mockPlaces[number]) {
    onConfirm({ name: place.name, lat: place.lat, lng: place.lng })
    onClose()
  }

  function handleConfirmPin() {
    onConfirm(pinLocation)
    onClose()
  }

  return (
    <Drawer.Root open={open} onOpenChange={(v) => !v && onClose()} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-background rounded-t-2xl max-h-[85vh]">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0">
            {mode !== "options" ? (
              <button
                onClick={() => setMode("options")}
                className="text-sm font-medium text-primary"
              >
                Back
              </button>
            ) : (
              <div className="w-10" />
            )}
            <Drawer.Title className="text-sm font-semibold text-foreground">
              {mode === "options" && "Add Location"}
              {mode === "search" && "Search Places"}
              {mode === "pin" && "Drop a Pin"}
            </Drawer.Title>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">

            {/* --- Options Mode --- */}
            {mode === "options" && (
              <div className="px-5 py-4 flex flex-col gap-3">
                {/* Current Location */}
                <div className="rounded-2xl bg-secondary overflow-hidden">
                  {gpsState === "idle" && (
                    <button
                      onClick={handleUseCurrentLocation}
                      className="w-full flex items-center gap-4 px-4 py-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Navigation className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground">Use Current Location</p>
                        <p className="text-xs text-muted-foreground">Detect where you are now</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </button>
                  )}
                  {gpsState === "loading" && (
                    <div className="flex items-center gap-4 px-4 py-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Finding your location...</p>
                        <p className="text-xs text-muted-foreground">This will just take a moment</p>
                      </div>
                    </div>
                  )}
                  {gpsState === "done" && gpsResult && (
                    <div className="flex items-center gap-4 px-4 py-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{gpsResult.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {gpsResult.lat.toFixed(4)}, {gpsResult.lng.toFixed(4)}
                        </p>
                      </div>
                      <button
                        onClick={handleConfirmGps}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                      >
                        Use
                      </button>
                    </div>
                  )}
                  {gpsState === "error" && (
                    <div className="flex items-center gap-4 px-4 py-4">
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <Navigation className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Location unavailable</p>
                        <p className="text-xs text-muted-foreground">Check your permissions and try again</p>
                      </div>
                      <button
                        onClick={handleUseCurrentLocation}
                        className="flex-shrink-0 text-xs text-primary font-medium"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>

                {/* Search */}
                <button
                  onClick={() => setMode("search")}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-secondary"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Search for a Place</p>
                    <p className="text-xs text-muted-foreground">Find by name, address, or landmark</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>

                {/* Drop a Pin */}
                <button
                  onClick={() => setMode("pin")}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-secondary"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Map className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Drop a Pin</p>
                    <p className="text-xs text-muted-foreground">Pick an exact spot on the map</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>
              </div>
            )}

            {/* --- Search Mode --- */}
            {mode === "search" && (
              <div className="flex flex-col h-full">
                {/* Search input */}
                <div className="px-5 py-3 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      ref={searchRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search parks, trails, landmarks..."
                      className="w-full bg-secondary rounded-xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-muted-foreground/20"
                      >
                        <X className="w-3 h-3 text-foreground" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto px-5 pb-8">
                  {searchQuery === "" && (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                        <Search className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Start typing to search for a location
                      </p>
                    </div>
                  )}
                  {searchQuery !== "" && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        No places found for &ldquo;{searchQuery}&rdquo;
                      </p>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="flex flex-col divide-y divide-border">
                      {searchResults.map((place) => (
                        <button
                          key={place.name}
                          onClick={() => handleConfirmSearch(place)}
                          className="flex items-center gap-3 py-3.5 text-left w-full"
                        >
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{place.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{place.sub}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- Pin Mode --- */}
            {mode === "pin" && (
              <div className="flex flex-col h-full">
                <div className="flex-1 px-5 pt-2 pb-3 min-h-0" style={{ height: 280 }}>
                  <StaticMapPreview
                    lat={pinLocation.lat}
                    lng={pinLocation.lng}
                    onMove={(lat, lng) => setPinLocation((p) => ({ ...p, lat, lng }))}
                  />
                </div>
                {/* Location info + confirm */}
                <div className="px-5 pb-8 flex-shrink-0">
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{pinLocation.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {pinLocation.lat.toFixed(4)}, {pinLocation.lng.toFixed(4)}
                      </p>
                    </div>
                    <button
                      onClick={handleConfirmPin}
                      className="flex-shrink-0 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
