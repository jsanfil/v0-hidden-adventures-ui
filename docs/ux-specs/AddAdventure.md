Thought for 2sExplore • 2 FilesNow I have full context. Here's the design spec:

---

# Post Adventure Screen - iOS Design Specification

## Overview

A two-step flow for creating a new adventure post. Step 1 handles media selection with ordering. Step 2 collects metadata (title, description, location, category, visibility).

---

## Data Model

```swift
struct AdventurePost {
    var photos: [UIImage]           // Ordered array of selected photos
    var title: String
    var description: String
    var location: CLLocationCoordinate2D?  // Geolocation (lat/lng)
    var locationLabel: String       // Human-readable label shown in feed
    var category: Category?
    var visibility: Visibility
}

enum Category: String, CaseIterable {
    case viewpoints = "Viewpoints"
    case trails = "Trails"
    case waterSpots = "Water Spots"
    case foodDrink = "Food & Drink"
    case abandonedPlaces = "Abandoned Places"
    case caves = "Caves"
    case natureEscapes = "Nature Escapes"
    case roadsideStops = "Roadside Stops"
}

enum Visibility: String, CaseIterable {
    case publicVisibility = "Public"      // Anyone can see
    case connections = "Connections"       // Only followers
    case privateVisibility = "Private"     // Only you
}
```

---

## Screen 1: Photo Selection

### Layout

| Element | Specification
|-----|-----
| **Header** | Title: "New Adventure", left X button (dismiss), right "Next >" button (primary color when photos selected, muted when none)
| **Preview Area** | Square aspect ratio, displays currently active photo. Bottom-right corner: pill badge showing "1 / 3" count. Bottom-center: dot indicators for pagination (tap to switch)
| **Section Label** | "SELECT PHOTOS (n selected)" - uppercase, xs size, muted color, tracking-wider
| **Photo Grid** | 3-column grid, 1pt gap between items
| **Add Photo Cell** | First cell, dashed border (2pt), rounded-lg, contains + icon and "Add Photo" label centered
| **Photo Cells** | Square aspect ratio, rounded-lg corners, full-bleed image. Selection overlay: primary color at 20% opacity when selected. Selection badge: top-right corner, 20x20pt circle, border 2pt. Unselected: semi-transparent black fill, white border. Selected: primary fill, primary border, white number centered (order in selection)


### Interactions

- Tap photo: Toggle selection. If already selected, remove from array. If not selected, append to array.
- Tap dot indicator: Switch preview to that photo index
- Tap "Next": Navigate to Step 2 (only enabled when `photos.count > 0`)
- Tap X: Dismiss entire flow (confirm if photos selected)


---

## Screen 2: Adventure Details

### Layout

| Element | Specification
|-----|-----
| **Header** | Left: back chevron (returns to Step 1). Title: "Adventure Details". Right: "Post" button (primary fill, rounded-full, white text)
| **Photo Strip** | Horizontal scroll, 64x64pt thumbnails, rounded-xl, 8pt gap. No add button - read-only preview
| **Form Fields** | Vertical stack with 20pt gap between sections


### Form Fields

#### Title

- Label: "TITLE" (uppercase, xs, muted, tracking-wider)
- Input: Single-line text field, `bg-secondary`, rounded-xl, 16pt horizontal padding, 12pt vertical padding
- Placeholder: "Give this spot a name..."


#### Description

- Label: "DESCRIPTION"
- Input: Multi-line text area, 3 rows default, same styling as title
- Placeholder: "What makes this place special? Share tips, directions, best time to visit..."


#### Location (Two-Part Field)

**Coordinates Row:**

- Tappable button that opens Location Picker Sheet
- Leading: MapPin icon (primary when set, muted when empty)
- Text: Shows "37.8651, -119.5383" when set, "Set coordinates..." when empty
- Trailing: X button to clear (when set) or chevron-right (when empty)


**Label Row:**

- Standard text input below coordinates
- Placeholder: "Location label (e.g. Columbia River Gorge, OR)"
- Trailing X button to clear when has content
- Helper text below: "This label appears below the title in the feed. Auto-filled from your pin, or write your own." (11pt, muted)


**Behavior:** When location is confirmed via picker, auto-fill label with resolved place name. User can always edit. Clearing coordinates also clears label.

#### Category

- Label: "CATEGORY"
- Layout: 2-column grid, 8pt gap
- Button size: Fixed height 48pt, full width of column
- Button content: Leading icon (20x20pt), 12pt gap, label text (truncate if needed)
- **Unselected state:** `bg-secondary`, `text-foreground`, `border-transparent`
- **Selected state:** `bg-primary`, `text-primary-foreground`, `border-primary`
- Single selection, tap again to deselect


**Categories with SF Symbols:**

| Category | SF Symbol
|-----|-----
| Viewpoints | `mountain.2`
| Trails | `figure.walk`
| Water Spots | `water.waves`
| Food & Drink | `fork.knife`
| Abandoned Places | `building.2`
| Caves | `diamond`
| Nature Escapes | `leaf`
| Roadside Stops | `location.north`


#### Visibility

- Label: "WHO CAN SEE THIS?"
- Layout: Vertical stack, 8pt gap
- Row height: Auto (content-based), rounded-xl
- Row content: Leading icon in 32pt circle, title + description stack, trailing radio indicator


**Unselected state:**

- Container: `bg-secondary`, `border-transparent`
- Icon circle: `bg-muted`
- Icon: muted color
- Title: foreground
- Radio: 16pt circle, 2pt border (border color), empty


**Selected state:**

- Container: `bg-primary/10`, `border-primary`
- Icon circle: `bg-primary`
- Icon: `primary-foreground`
- Title: primary color
- Radio: 16pt circle, 2pt border (primary), filled with primary, inner white dot at 50% scale


**Options:**

| Label | Description | SF Symbol
|-----|-----
| Public | Anyone can see this | `globe`
| Connections | Only people you follow | `person.2`
| Private | Only you | `lock`


---

## Location Picker Sheet

### Presentation

- Modal sheet, slides up from bottom
- Max height: 82% of screen
- Rounded top corners: 24pt radius
- Drag handle: Centered, 40x4pt, rounded-full, border color


### Header

- Left: "< Back" (only visible when not on options view)
- Center: Title ("Add Location", "Search Places", or "Drop a Pin")
- Right: X button in 32pt circle


### Option 1: Use Current Location

**Initial State:**

- Row with Navigation icon in 40pt primary/10 circle
- Title: "Use Current Location"
- Subtitle: "Detect where you are now"
- Trailing chevron


**Loading State:**

- Same layout, icon replaced with spinner
- Title: "Finding your location..."
- Subtitle: "This will just take a moment"


**Success State:**

- Checkmark icon in green/10 circle
- Title: Resolved place name (e.g., "Yosemite Valley, California")
- Subtitle: Coordinates
- Trailing "Use" button (primary pill)


**Implementation:** Use `CLLocationManager` for GPS, then reverse geocode with `MKLocalSearch` or `CLGeocoder`.

### Option 2: Search for a Place

**Empty State:**

- Search input with magnifying glass icon
- Centered empty state: "Start typing to search for a location"


**Results State:**

- List of results with MapPin icon, place name, and region/country
- Tap row to confirm and dismiss


**No Results:**

- "No places found for [query]"


**Implementation:** Use `MKLocalSearchCompleter` for autocomplete, `MKLocalSearch` for full results.

### Option 3: Drop a Pin

**Layout:**

- Interactive `MKMapView` (240pt height), rounded-2xl
- Centered pin marker (does not move with map)
- Helper text: "Tap anywhere on the map to move the pin"
- Confirmation bar: Shows current coordinates, "Confirm" button


**Interactions:**

- Tap map: Update pin location to tap point
- Drag map: Pin stays centered, coordinates update to map center
- Confirm: Pass coordinates back


**Implementation:** Use `MKMapView` with `UITapGestureRecognizer`. Pin is a centered overlay view, not an `MKAnnotation`. On tap, convert tap point to coordinates via `convert(_:toCoordinateFrom:)`.

---

## Color Tokens

Use your app's semantic color system:

| Token | Usage
|-----|-----
| `background` | Screen background
| `foreground` | Primary text
| `muted-foreground` | Secondary text, placeholders, icons
| `secondary` | Input backgrounds, unselected buttons
| `primary` | Selected states, accent buttons
| `primary-foreground` | Text on primary backgrounds
| `border` | Dividers, unselected radio borders
| `card` | Tab bar background (with 95% opacity + blur)


---

## Typography

| Style | Spec
|-----|-----
| Section labels | 11pt, semibold, uppercase, tracking 0.5pt, muted
| Input text | 14pt, regular
| Placeholder | 14pt, regular, muted
| Button labels | 14pt, semibold
| Helper text | 11pt, regular, muted


---

## Spacing

| Element | Value
|-----|-----
| Screen horizontal padding | 20pt
| Form section gap | 20pt
| Grid gap | 8pt
| Input padding | 16pt horizontal, 12pt vertical
| Button height (category) | 48pt
| Corner radius (inputs/buttons) | 12pt (rounded-xl)
| Corner radius (thumbnails) | 12pt
| Corner radius (sheet) | 24pt top


---

## Tab Bar

Persistent at bottom, same as other screens:

- Height: 49pt + safe area
- Background: card color at 95% opacity with blur
- Border-top: 1pt, border color
- 4 items: Home, Explore, Saved, Profile
- All muted on this screen (no active state)


---

## Animations

- Sheet slide: 300ms ease-out
- Selection state changes: 150ms ease
- GPS loading spinner: Standard activity indicator
- Photo selection overlay: 150ms fade


---

This spec covers all visual and interaction details needed to implement the Post Adventure screen natively in SwiftUI or UIKit using MapKit for location services.