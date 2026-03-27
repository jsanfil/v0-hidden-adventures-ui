"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Camera, MapPin } from "lucide-react"

export function ProfileSetupScreen() {
  return (
    <div className="relative w-full h-full bg-background">
      {/* Status Bar Space */}
      <div className="h-14" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center">
        <button className="w-10 h-10 flex items-center justify-center -ml-2">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1" />
        <button className="text-muted-foreground text-base">Skip</button>
      </div>
      
      {/* Content */}
      <div className="px-6 pt-4 pb-8 flex flex-col h-[calc(100%-88px)]">
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Set up your profile</h1>
          <p className="text-muted-foreground text-base">Let other explorers know who you are</p>
        </div>
        
        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-4xl text-muted-foreground font-medium">JD</span>
            </div>
            <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="space-y-5 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Display name</label>
            <Input 
              placeholder="How should we call you?"
              className="h-12 rounded-xl bg-secondary border-0 text-base placeholder:text-muted-foreground/60"
              defaultValue="Jordan"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Home base</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="City or region"
                className="h-12 rounded-xl bg-secondary border-0 text-base pl-12 placeholder:text-muted-foreground/60"
                defaultValue="Portland, OR"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Bio <span className="text-muted-foreground font-normal">(optional)</span></label>
            <Textarea 
              placeholder="What kind of adventures do you love?"
              className="min-h-[100px] rounded-xl bg-secondary border-0 text-base resize-none placeholder:text-muted-foreground/60"
              defaultValue="Weekend warrior exploring the PNW. Always searching for secret swimming spots and sunrise hikes."
            />
          </div>
        </div>
        
        {/* CTA */}
        <div className="pt-4">
          <Button 
            className="w-full h-13 text-base font-medium rounded-2xl shadow-sm"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
