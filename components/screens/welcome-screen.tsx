"use client"

import Image from "next/image"
import { Compass } from "lucide-react"

export function WelcomeScreen() {
  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <Image
        src="/images/hero-mountain.jpg"
        alt="Mountain landscape"
        fill
        className="object-cover"
        priority
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between px-6 pt-16 pb-12">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center pt-8">
          <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg mb-4">
            <Compass className="w-9 h-9 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif text-white tracking-tight">Hidden Adventures</h1>
        </div>
        
        {/* Bottom Content */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-medium text-white">Discover the extraordinary</h2>
            <p className="text-white/80 text-base leading-relaxed">
              Find hidden gems, scenic trails, and unforgettable places shared by explorers like you.
            </p>
          </div>
          
          {/* CTAs */}
          <div className="space-y-2">
            <button className="w-full py-4 text-base font-medium rounded-2xl bg-white text-foreground hover:bg-white/95 shadow-lg transition-colors">
              Get Started
            </button>
            <button className="w-full py-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
              Already have an account? <span className="text-white font-semibold underline underline-offset-2">Sign In</span>
            </button>
          </div>
          
          <p className="text-center text-white/60 text-xs px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
