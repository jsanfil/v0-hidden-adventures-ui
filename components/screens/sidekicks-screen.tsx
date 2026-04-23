"use client"

import { ChevronLeft, Search, UserPlus, UserMinus, Check, X } from "lucide-react"
import { useState, useMemo } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import type { SidekickUser } from "./sidekick-profile-screen"

// Mock data for sidekicks (users you've added)
const mySidekicks = [
  { id: "1", name: "Sarah Chen", username: "@sarahc", avatar: "/images/avatar-sarah.jpg", location: "Portland, OR", adventures: 45 },
  { id: "2", name: "Mike Rodriguez", username: "@mikerod", avatar: "/images/avatar-mike.jpg", location: "Seattle, WA", adventures: 23 },
  { id: "3", name: "Emma Wilson", username: "@emmaw", avatar: "/images/avatar-emma.jpg", location: "San Francisco, CA", adventures: 67 },
  { id: "4", name: "Alex Kim", username: "@alexk", avatar: "/images/avatar-alex.jpg", location: "Los Angeles, CA", adventures: 12 },
  { id: "5", name: "Jordan Taylor", username: "@jordant", avatar: "/images/avatar-jordan.jpg", location: "Denver, CO", adventures: 89 },
  { id: "6", name: "Chris Martinez", username: "@chrism", avatar: "/images/avatar-chris.jpg", location: "Austin, TX", adventures: 34 },
  { id: "7", name: "Taylor Swift", username: "@tswift", avatar: "/images/avatar-taylor.jpg", location: "Nashville, TN", adventures: 156 },
  { id: "8", name: "Jamie Lee", username: "@jamiel", avatar: "/images/avatar-jamie.jpg", location: "San Diego, CA", adventures: 28 },
  { id: "9", name: "Morgan Davis", username: "@morgand", avatar: "/images/avatar-morgan.jpg", location: "Phoenix, AZ", adventures: 41 },
  { id: "10", name: "Casey Brown", username: "@caseyb", avatar: "/images/avatar-casey.jpg", location: "Las Vegas, NV", adventures: 19 },
]

// Mock data for all users (for search/discovery)
const allUsers = [
  ...mySidekicks,
  { id: "11", name: "Riley Johnson", username: "@rileyj", avatar: "/images/avatar-riley.jpg", location: "Chicago, IL", adventures: 52 },
  { id: "12", name: "Quinn Parker", username: "@quinnp", avatar: "/images/avatar-quinn.jpg", location: "Miami, FL", adventures: 73 },
  { id: "13", name: "Avery Thompson", username: "@averyt", avatar: "/images/avatar-avery.jpg", location: "Boston, MA", adventures: 31 },
  { id: "14", name: "Blake Williams", username: "@blakew", avatar: "/images/avatar-blake.jpg", location: "Atlanta, GA", adventures: 44 },
  { id: "15", name: "Drew Anderson", username: "@drewa", avatar: "/images/avatar-drew.jpg", location: "Dallas, TX", adventures: 58 },
]

type Tab = "my-sidekicks" | "find-users"

interface SidekicksScreenProps {
  onBack?: () => void
  onSelectUser?: (user: SidekickUser) => void
}

export function SidekicksScreen({ onBack, onSelectUser }: SidekicksScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>("my-sidekicks")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidekickIds, setSidekickIds] = useState<Set<string>>(new Set(mySidekicks.map(s => s.id)))
  const [pendingRemoval, setPendingRemoval] = useState<string | null>(null)

  const currentSidekicks = useMemo(() => {
    return allUsers.filter(user => sidekickIds.has(user.id))
  }, [sidekickIds])

  const filteredMySidekicks = useMemo(() => {
    if (!searchQuery.trim()) return currentSidekicks
    const query = searchQuery.toLowerCase()
    return currentSidekicks.filter(
      user => user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query)
    )
  }, [currentSidekicks, searchQuery])

  const filteredAllUsers = useMemo(() => {
    if (!searchQuery.trim()) return allUsers
    const query = searchQuery.toLowerCase()
    return allUsers.filter(
      user => user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleAddSidekick = (userId: string) => {
    setSidekickIds(prev => new Set([...prev, userId]))
  }

  const handleRemoveSidekick = (userId: string) => {
    setPendingRemoval(userId)
  }

  const confirmRemoval = () => {
    if (pendingRemoval) {
      setSidekickIds(prev => {
        const next = new Set(prev)
        next.delete(pendingRemoval)
        return next
      })
      setPendingRemoval(null)
    }
  }

  const cancelRemoval = () => {
    setPendingRemoval(null)
  }

  const displayedUsers = activeTab === "my-sidekicks" ? filteredMySidekicks : filteredAllUsers

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      {/* Status Bar Space */}
      <div className="h-14 flex-shrink-0" />

      {/* Header */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Sidekicks</h1>
            <p className="text-sm text-muted-foreground">{currentSidekicks.length} connections</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={activeTab === "my-sidekicks" ? "Search your sidekicks..." : "Search all users..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-0 rounded-xl h-10"
          />
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-secondary rounded-xl p-1 gap-0.5 mt-3">
          <button
            onClick={() => { setActiveTab("my-sidekicks"); setSearchQuery("") }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "my-sidekicks"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            My Sidekicks
          </button>
          <button
            onClick={() => { setActiveTab("find-users"); setSearchQuery("") }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "find-users"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Find Users
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {displayedUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">
              {searchQuery ? "No users found" : activeTab === "my-sidekicks" ? "No sidekicks yet" : "No users available"}
            </p>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              {searchQuery 
                ? "Try a different search term" 
                : activeTab === "my-sidekicks" 
                  ? "Add sidekicks to share your adventures with them"
                  : "Check back later for more users to connect with"
              }
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {displayedUsers.map((user) => {
              const isSidekick = sidekickIds.has(user.id)
              const isPendingRemoval = pendingRemoval === user.id

              return (
                <div 
                  key={user.id} 
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    isPendingRemoval ? "bg-destructive/10" : "bg-card border border-border hover:bg-secondary/50"
                  }`}
                >
                  <div 
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                    onClick={() => onSelectUser?.({
                      id: user.id,
                      name: user.name,
                      username: user.username,
                      avatar: user.avatar,
                      location: user.location,
                      adventures: user.adventures,
                    })}
                  >
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.username}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {user.location} &middot; {user.adventures} adventures
                      </p>
                    </div>
                  </div>

                  {isPendingRemoval ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={confirmRemoval}
                        className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-destructive-foreground" />
                      </button>
                      <button
                        onClick={cancelRemoval}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  ) : isSidekick ? (
                    <button
                      onClick={() => handleRemoveSidekick(user.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium transition-colors hover:bg-destructive/20 hover:text-destructive"
                    >
                      <UserMinus className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddSidekick(user.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="px-4 py-3 bg-secondary/50 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Sidekicks can view your &quot;Sidekicks-only&quot; adventures. They cannot edit or delete them.
        </p>
      </div>
    </div>
  )
}
