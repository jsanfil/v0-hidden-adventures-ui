Thought for 3s---

# UX Design Spec: Profile & Sidekicks Screens

## Target: iOS 18+ (SwiftUI)

---

## Overview

This document specifies the user experience for the **Profile Screen** and **Sidekicks Screen** in Hidden Adventures for iOS. These screens allow users to view their profile stats, manage their list of Sidekicks (trusted users who can view their "Sidekicks-only" adventures), and discover new users to add as Sidekicks.

---

## 1. Profile Screen

### 1.1 Purpose

Display the logged-in user's profile information, engagement metrics, Sidekicks preview, and their shared adventures.

### 1.2 Layout Structure (Top to Bottom)

```plaintext
┌─────────────────────────────────────┐
│ Status Bar (system-managed)         │
├─────────────────────────────────────┤
│ HEADER (teal background)            │
│ ┌──────┐                    ┌─────┐ │
│ │Avatar│                    │Logout│ │
│ │80pt  │                    │ btn │ │
│ └──────┘                    └─────┘ │
│ Name (title style, white)           │
│ @username (subheadline, white/80)   │
│ 📍 Location (subheadline, white/70) │
├─────────────────────────────────────┤
│ BIO SECTION (system background)     │
│ Placeholder or user bio text        │
├─────────────────────────────────────┤
│ STATS ROW (3 equal cards)           │
│ ┌─────────┬──────────┬─────────┐    │
│ │   20    │    87    │  1240   │    │
│ │Adventures│Likes Rcvd│  Views  │    │
│ └─────────┴──────────┴─────────┘    │
├─────────────────────────────────────┤
│ SIDEKICKS ROW (tappable card)       │
│ ┌───────────────────────────────┐   │
│ │ [Avatar Stack] 10 Sidekicks > │   │
│ │               Manage your crew│   │
│ └───────────────────────────────┘   │
├─────────────────────────────────────┤
│ YOUR ADVENTURES SECTION             │
│ "Shared adventures" heading         │
│ ┌───────────────────────────────┐   │
│ │ Adventure Card 1              │   │
│ └───────────────────────────────┘   │
│ ... (scrollable)                    │
├─────────────────────────────────────┤
│ TAB BAR (Profile tab active)        │
└─────────────────────────────────────┘
```

### 1.3 Component Specifications

#### Screen Container

| Property | Value
|-----|-----
| SwiftUI View | `ScrollView` inside `NavigationStack`
| Background | `.systemBackground` below header
| Safe Area | Respect bottom safe area for tab bar
| Tab Bar | `TabView` with `.tabItem` - Profile tab uses `person.fill` SF Symbol


#### Header

| Element | iOS Implementation
|-----|-----
| Container | Custom `View` with solid color background
| Background Color | `Color(red: 0.35, green: 0.54, blue: 0.48)` (`#5a8a7a`)
| Avatar | 80pt diameter, `clipShape(.circle)`, 4pt white border at 20% opacity
| Avatar Fallback | Initials centered, `.font(.title2.bold())`, darker teal background
| Name | `.font(.title.bold())`, `.foregroundStyle(.white)`
| Username | `.font(.subheadline)`, `.foregroundStyle(.white.opacity(0.8))`
| Location | `.font(.subheadline)`, `.foregroundStyle(.white.opacity(0.7))`
| Location Icon | SF Symbol `location.fill`, 16pt
| Logout Button | 40pt circle, `.ultraThinMaterial` or white/20 background
| Logout Icon | SF Symbol `rectangle.portrait.and.arrow.right`, 20pt


#### Bio Section

| Element | iOS Implementation
|-----|-----
| Container | `VStack` with horizontal padding 16pt
| Text | `.font(.body)`, `.foregroundStyle(.secondary)`
| Empty State | "Add a bio during setup or come back later to tell other explorers what you love to find."


#### Stats Row

| Element | iOS Implementation
|-----|-----
| Container | `HStack(spacing: 12)` with horizontal padding 16pt
| Card | Custom `View` with `.background(.systemBackground)`, `.clipShape(RoundedRectangle(cornerRadius: 12))`, `1pt` border using `.stroke`
| Number | `.font(.title2.bold())`, `.foregroundStyle(.primary)`, centered
| Label | `.font(.caption)`, `.foregroundStyle(.secondary)`, 4pt top padding
| Cards | "Adventures", "Likes Received", "Views"
| Interactivity | None (read-only metrics)


#### Sidekicks Row

| Element | iOS Implementation
|-----|-----
| Container | `Button` with full-width, `RoundedRectangle(cornerRadius: 12)` background
| Background | `.systemBackground` with 1pt border
| Layout | `HStack` with avatar stack, text VStack, and chevron
| Avatar Stack | `HStack(spacing: -8)` with `zIndex` for proper layering
| Avatar Size | 32pt diameter, 2pt `.systemBackground` border
| Overflow Badge | "+N" in 32pt circle, `.systemGray5` background
| Primary Text | "X Sidekicks", `.font(.headline)`, `.foregroundStyle(.primary)`
| Secondary Text | "Manage your crew", `.font(.caption)`, `.foregroundStyle(.secondary)`
| Chevron | SF Symbol `chevron.right`, `.foregroundStyle(.secondary)`
| Tap Feedback | `.buttonStyle(.plain)` with custom highlight, or use `List` row style
| Tap Action | `NavigationLink` to `SidekicksView`


#### Avatar Stack Logic

```swift
ForEach(sidekicks.prefix(5)) { sidekick in
    AvatarView(user: sidekick)
        .frame(width: 32, height: 32)
        .overlay(Circle().stroke(.background, lineWidth: 2))
        .zIndex(Double(5 - index))  // First avatar on top
}
if sidekicks.count > 5 {
    Text("+\(sidekicks.count - 5)")
        .font(.caption.bold())
        .frame(width: 32, height: 32)
        .background(Color(.systemGray5))
        .clipShape(Circle())
}
```

#### Empty State (0 Sidekicks)

| Element | iOS Implementation
|-----|-----
| Icon | SF Symbol `person.2.fill`, 24pt, `.secondary`
| Text | "Add your first sidekick", `.font(.headline)`
| Chevron | Still visible to encourage tap


#### Adventures Section

| Element | iOS Implementation
|-----|-----
| Heading | "Shared adventures", `.font(.headline)`, left-aligned
| Card List | `VStack(spacing: 12)` or `LazyVStack` for performance
| Adventure Card | Existing `AdventureCard` component


### 1.4 Data Model

```swift
struct ProfileUser: Identifiable {
    let id: String
    var name: String
    var username: String           // includes @ prefix
    var location: String
    var avatarURL: URL?
    var bio: String                // empty string if not set
    var stats: ProfileStats
    var sidekicks: [SidekickPreview]
}

struct ProfileStats {
    var adventures: Int
    var likesReceived: Int
    var views: Int
    var sidekicksCount: Int
}

struct SidekickPreview: Identifiable {
    let id: String
    let name: String
    let initials: String
    var avatarURL: URL?
}
```

### 1.5 Navigation

| Action | iOS Implementation
|-----|-----
| Tap Sidekicks Row | `NavigationLink` pushes `SidekicksView`
| Tap Logout Button | Present `.alert` confirmation, then sign out
| Tap Adventure Card | `NavigationLink` pushes `AdventureDetailView`
| Tab Bar | `TabView` with `selection` binding


---

## 2. Sidekicks Screen

### 2.1 Purpose

Allow users to view their current Sidekicks, search for new users, add or remove Sidekicks with confirmation for destructive actions.

### 2.2 Layout Structure

```plaintext
┌─────────────────────────────────────┐
│ Navigation Bar                      │
│ < Back    Sidekicks                 │
├─────────────────────────────────────┤
│ HEADER                              │
│ X connections                       │
│ ┌───────────────────────────────┐   │
│ │ 🔍 Search your sidekicks...   │   │
│ └───────────────────────────────┘   │
│ ┌───────────────┬───────────────┐   │
│ │ My Sidekicks  │  Find Users   │   │
│ └───────────────┴───────────────┘   │
├─────────────────────────────────────┤
│ USER LIST (scrollable)              │
│ ┌───────────────────────────────┐   │
│ │ [Avatar] Name        [Action] │   │
│ │          @user • Location     │   │
│ │          X adventures         │   │
│ └───────────────────────────────┘   │
│ ... repeat                          │
├─────────────────────────────────────┤
│ INFO FOOTER                         │
│ "Sidekicks can view your..."        │
└─────────────────────────────────────┘
```

### 2.3 Component Specifications

#### Navigation Bar

| Element | iOS Implementation
|-----|-----
| Style | Standard `NavigationStack` navigation bar
| Title | "Sidekicks", `.font(.headline)`
| Back Button | System back button (automatic with `NavigationStack`)
| Back Action | Pop to ProfileView


#### Subtitle

| Element | iOS Implementation
|-----|-----
| Text | "X connections"
| Style | `.font(.subheadline)`, `.foregroundStyle(.secondary)`
| Position | Below navigation bar, above search


#### Search Bar

| Element | iOS Implementation
|-----|-----
| Component | `.searchable(text: $searchText)` modifier on `List` or `ScrollView`
| Alternative | Custom `TextField` with SF Symbol `magnifyingglass`
| Placeholder | "Search your sidekicks..." or "Search all users..." (context-dependent)
| Background | `.systemGray6` (`.secondarySystemBackground`)
| Corner Radius | 10pt (system default for search fields)


#### Tab Switcher (Segmented Control)

| Element | iOS Implementation
|-----|-----
| Component | `Picker` with `.pickerStyle(.segmented)`
| Segments | "My Sidekicks", "Find Users"
| Binding | `@State var selectedTab: SidekicksTab`
| On Change | Clear search query via `.onChange(of: selectedTab)`


```swift
enum SidekicksTab: String, CaseIterable {
    case mySidekicks = "My Sidekicks"
    case findUsers = "Find Users"
}

Picker("", selection: $selectedTab) {
    ForEach(SidekicksTab.allCases, id: \.self) { tab in
        Text(tab.rawValue).tag(tab)
    }
}
.pickerStyle(.segmented)
```

#### User List

| Element | iOS Implementation
|-----|-----
| Container | `List` with `.listStyle(.plain)` or `LazyVStack` in `ScrollView`
| Row Background | `.systemBackground` with 1pt border
| Row Padding | 12pt all sides
| Row Corner Radius | 12pt
| Row Spacing | 8pt between rows


#### User List Item

| Element | iOS Implementation
|-----|-----
| Layout | `HStack` with avatar, text VStack, Spacer, action button
| Avatar | 48pt diameter, `AsyncImage` with placeholder
| Avatar Fallback | Initials, `.font(.headline)`, teal background
| Name | `.font(.subheadline.weight(.medium))`, `.foregroundStyle(.primary)`
| Username | `.font(.caption)`, `.foregroundStyle(.secondary)`
| Meta | "Location · X adventures", `.font(.caption)`, `.foregroundStyle(.secondary)`


#### Action Button States

| State | iOS Implementation
|-----|-----
| **Not a Sidekick** | `Button` with "Add" label, SF Symbol `person.badge.plus`, `.tint(.accentColor)`
| **Is a Sidekick** | `Button` with "Remove" label, SF Symbol `person.badge.minus`, `.tint(.secondary)`
| **Pending Removal** | `HStack` with two circular buttons: checkmark (green), xmark (gray)


```swift
// Button styling
.buttonStyle(.bordered)
.buttonBorderShape(.capsule)
.controlSize(.small)
```

#### Pending Removal Flow

| Step | Implementation
|-----|-----
| 1. Tap "Remove" | Set `pendingRemovalId = user.id`
| 2. Visual change | Row background: `Color.red.opacity(0.1)`
| 3. Confirm button | SF Symbol `checkmark.circle.fill`, `.tint(.green)`
| 4. Cancel button | SF Symbol `xmark.circle.fill`, `.tint(.gray)`
| 5. Confirm tap | Remove from sidekicks, reset `pendingRemovalId`
| 6. Cancel tap | Reset `pendingRemovalId = nil`


```swift
if pendingRemovalId == user.id {
    HStack(spacing: 8) {
        Button { confirmRemoval(user) } label: {
            Image(systemName: "checkmark.circle.fill")
                .font(.title2)
                .foregroundStyle(.green)
        }
        Button { cancelRemoval() } label: {
            Image(systemName: "xmark.circle.fill")
                .font(.title2)
                .foregroundStyle(.gray)
        }
    }
    .buttonStyle(.plain)
}
```

#### Empty States

| Context | Implementation
|-----|-----
| My Sidekicks (no data) | `ContentUnavailableView` with SF Symbol `person.2.slash`, title "No sidekicks yet", description "Add sidekicks to share your adventures with them"
| Find Users (no data) | `ContentUnavailableView` with SF Symbol `person.3`, title "No users available"
| Search (no results) | `ContentUnavailableView.search` (system search empty state)


```swift
// iOS 17+ ContentUnavailableView
ContentUnavailableView {
    Label("No sidekicks yet", systemImage: "person.2.slash")
} description: {
    Text("Add sidekicks to share your adventures with them")
}
```

#### Info Footer

| Element | iOS Implementation
|-----|-----
| Container | `VStack` pinned to bottom or in `safeAreaInset(edge: .bottom)`
| Background | `.secondarySystemBackground` or `.ultraThinMaterial`
| Border | Top 1pt `.separator` color
| Padding | 12pt vertical, 16pt horizontal
| Text | `.font(.caption)`, `.foregroundStyle(.secondary)`, `.multilineTextAlignment(.center)`
| Content | "Sidekicks can view your 'Sidekicks-only' adventures. They cannot edit or delete them."


### 2.4 Data Model

```swift
struct SidekickUser: Identifiable, Hashable {
    let id: String
    var name: String
    var username: String           // includes @ prefix
    var avatarURL: URL?
    var location: String
    var adventuresCount: Int
}

@Observable
class SidekicksViewModel {
    var selectedTab: SidekicksTab = .mySidekicks
    var searchText: String = ""
    var sidekickIds: Set<String> = []
    var pendingRemovalId: String? = nil
    var allUsers: [SidekickUser] = []
    
    var filteredUsers: [SidekickUser] {
        let baseList = selectedTab == .mySidekicks 
            ? allUsers.filter { sidekickIds.contains($0.id) }
            : allUsers
        
        guard !searchText.isEmpty else { return baseList }
        
        return baseList.filter {
            $0.name.localizedCaseInsensitiveContains(searchText) ||
            $0.username.localizedCaseInsensitiveContains(searchText)
        }
    }
}
```

### 2.5 Interactions Summary

| Action | Implementation
|-----|-----
| Tap Back | System navigation back (automatic)
| Type in Search | Filter via `searchText` binding, real-time
| Tap Segment | Switch `selectedTab`, clear `searchText`
| Tap "Add" | `sidekickIds.insert(user.id)`
| Tap "Remove" | `pendingRemovalId = user.id`
| Tap Confirm | `sidekickIds.remove(user.id)`, `pendingRemovalId = nil`
| Tap Cancel | `pendingRemovalId = nil`


---

## 3. Navigation Flow

```plaintext
┌──────────────┐
│   TabView    │
│  (Profile)   │
└──────┬───────┘
       │
       ▼
┌──────────────┐     NavigationLink        ┌──────────────┐
│  ProfileView │ ───────────────────────▶  │ SidekicksView│
│              │                           │              │
└──────────────┘ ◀─────────────────────── └──────────────┘
                   System Back Button
```

```swift
NavigationStack {
    ProfileView()
        .navigationDestination(for: ProfileDestination.self) { destination in
            switch destination {
            case .sidekicks:
                SidekicksView()
            case .adventureDetail(let id):
                AdventureDetailView(adventureId: id)
            }
        }
}
```

---

## 4. Accessibility Requirements

| Element | iOS Implementation
|-----|-----
| Tap Targets | Minimum 44x44pt (system enforced for buttons)
| Avatar Images | `.accessibilityLabel(user.name)`
| Action Buttons | `.accessibilityLabel("Add \(user.name) as sidekick")`
| Segmented Control | Automatic with `Picker`
| Search Field | Automatic with `.searchable`
| Removal Confirmation | `.accessibilityHint("Double tap to confirm removal")`
| VoiceOver | Use `.accessibilityElement(children: .combine)` for list rows
| Dynamic Type | Use system fonts (`.font(.body)`, etc.) - scales automatically


---

## 5. SF Symbols Reference

| Usage | SF Symbol Name
|-----|-----
| Profile Tab | `person.fill`
| Location | `location.fill`
| Logout | `rectangle.portrait.and.arrow.right`
| Search | `magnifyingglass`
| Chevron | `chevron.right`
| Add Sidekick | `person.badge.plus`
| Remove Sidekick | `person.badge.minus`
| Confirm | `checkmark.circle.fill`
| Cancel | `xmark.circle.fill`
| Empty Sidekicks | `person.2.slash`
| Find Users Empty | `person.3`
| Adventures | `map.fill`
| Likes | `heart.fill`
| Views | `eye.fill`


---

## 6. Color Tokens

| Token | iOS Implementation
|-----|-----
| Primary/Accent | `.accentColor` or custom `Color.accentColor`
| Background | `Color(.systemBackground)`
| Secondary Background | `Color(.secondarySystemBackground)`
| Primary Text | `.primary` / `Color(.label)`
| Secondary Text | `.secondary` / `Color(.secondaryLabel)`
| Separator | `Color(.separator)`
| Destructive | `Color.red`
| Teal Header | `Color(red: 0.35, green: 0.54, blue: 0.48)`


---

## 7. iOS-Specific Patterns

### Haptic Feedback

| Action | Haptic
|-----|-----
| Add Sidekick | `UIImpactFeedbackGenerator(style: .light)`
| Remove Confirmed | `UINotificationFeedbackGenerator().notificationOccurred(.success)`
| Tab Switch | `UISelectionFeedbackGenerator()`


### Swipe Actions (Alternative to Buttons)

```swift
// Optional: Add swipe-to-remove on My Sidekicks tab
.swipeActions(edge: .trailing) {
    Button(role: .destructive) {
        removeSidekick(user)
    } label: {
        Label("Remove", systemImage: "person.badge.minus")
    }
}
```

### Pull to Refresh

```swift
List {
    // content
}
.refreshable {
    await loadUsers()
}
```

---

## 8. Edge Cases

| Scenario | iOS Handling
|-----|-----
| 0 sidekicks | `ContentUnavailableView` on list, placeholder in avatar stack
| 1-5 sidekicks | Show all in overlapping `HStack`
| 6+ sidekicks | Show 5 + "+N" badge
| No bio | Placeholder text with `.foregroundStyle(.tertiary)`
| Network error | Present `.alert` with retry option
| Slow image load | `AsyncImage` with `ProgressView` placeholder
| Offline | Show cached data, disable add/remove with `.disabled(true)`


---

This spec maps directly to SwiftUI components and iOS 18 patterns. Codex can use this to implement native iOS screens that visually match the React prototype while using platform-appropriate components.