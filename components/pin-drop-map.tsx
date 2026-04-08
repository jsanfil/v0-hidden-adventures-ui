"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface PinDropMapProps {
  lat: number
  lng: number
  onPinChange: (lat: number, lng: number) => void
}

// Custom SVG pin icon that matches the app's primary color
const createPinIcon = () =>
  L.divIcon({
    className: "",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-100%)">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="hsl(var(--primary))" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3" fill="white" stroke="white"/>
        </svg>
        <div style="width:6px;height:6px;border-radius:50%;background:rgba(0,0,0,0.2);margin-top:-4px;filter:blur(2px)"></div>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
  })

export default function PinDropMap({ lat, lng, onPinChange }: PinDropMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // Add zoom control in bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map)

    const marker = L.marker([lat, lng], {
      icon: createPinIcon(),
      draggable: true,
    }).addTo(map)

    marker.on("dragend", () => {
      const { lat: newLat, lng: newLng } = marker.getLatLng()
      onPinChange(newLat, newLng)
    })

    map.on("click", (e) => {
      const { lat: newLat, lng: newLng } = e.latlng
      marker.setLatLng([newLat, newLng])
      onPinChange(newLat, newLng)
    })

    mapRef.current = map
    markerRef.current = marker

    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync marker if lat/lng prop changes externally
  useEffect(() => {
    if (markerRef.current) {
      const current = markerRef.current.getLatLng()
      if (Math.abs(current.lat - lat) > 0.0001 || Math.abs(current.lng - lng) > 0.0001) {
        markerRef.current.setLatLng([lat, lng])
        mapRef.current?.setView([lat, lng], mapRef.current.getZoom())
      }
    }
  }, [lat, lng])

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ minHeight: 200 }}
    />
  )
}
