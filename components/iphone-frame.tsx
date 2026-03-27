"use client"

import { cn } from "@/lib/utils"

interface IPhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {/* iPhone 15 Pro frame */}
      <div className="relative w-[375px] h-[812px] bg-[#1a1a1a] rounded-[55px] p-[12px] shadow-2xl">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[120px] w-[3px] h-[32px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[175px] w-[3px] h-[64px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[250px] w-[3px] h-[64px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -right-[3px] top-[175px] w-[3px] h-[100px] bg-[#2a2a2a] rounded-r-sm" />
        
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-black rounded-[43px] overflow-hidden">
          {/* Screen content */}
          <div className="relative w-full h-full bg-background overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />
            
            {/* Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
