# Discover Tab — SwiftUI UX Spec

> Terse spec for Codex conversion. Follow iOS 17+ HIG. Use SwiftUI-native patterns.

---

## Screen Overview

**Purpose:** Browse adventurers (people) and popular adventures. Search both.

**Layout:** Full-screen, vertically scrollable with sticky tab bar.

---

## Color Tokens

| Token | Light | Usage |
|-------|-------|-------|
| `background` | `#FAF9F7` (warm off-white) | Screen bg |
| `foreground` | `#2D3142` (dark slate) | Primary text |
| `card` | `#FFFFFF` | Card surfaces |
| `primary` | `#3D6B4F` (forest green) | CTAs, active states |
| `primaryForeground` | `#FAF9F7` | Text on primary |
| `secondary` | `#EDE9E3` (warm sand) | Search field bg, chips |
| `secondaryForeground` | `#3D4256` | Text on secondary |
| `muted` | `#F3F0EC` | Subtle bg |
| `mutedForeground` | `#6B7280` | Secondary text |
| `border` | `#E8E4DE` | Card borders |

---

## Typography

| Style | Font | Size | Weight |
|-------|------|------|--------|
| `largeTitle` | System | 28pt | Semibold |
| `headline` | System | 16pt | Semibold |
| `body` | System | 14pt | Regular |
| `caption` | System | 12pt | Regular |
| `micro` | System | 10pt | Medium |

---

## Spacing Scale (pts)

`2, 4, 6, 8, 12, 16, 20, 24, 32`

---

## Component Hierarchy

```
DiscoverView
├── StatusBarSpacer (56pt)
├── Header
│   ├── Title "Discover" (largeTitle)
│   └── SearchBar
├── ScrollView(.vertical)
│   ├── Section: "Explore Adventurers"
│   │   ├── SectionHeader(title, seeAll: action?)
│   │   └── ScrollView(.horizontal)
│   │       └── LazyHStack(spacing: 12)
│   │           └── CreatorCard[]
│   └── Section: "Popular Adventures"
│       ├── SectionHeader(title, seeAll: action?)
│       └── ScrollView(.horizontal)
│           └── LazyHStack(spacing: 12)
│               └── AdventureCard[]
└── TabBar (absolute bottom)
```

---

## Components

### SearchBar

```
┌─────────────────────────────────────┐
│ 🔍  Search people and adventures…  ✕│
└─────────────────────────────────────┘
```

- **Frame:** full-width, 44pt height
- **Background:** `secondary`, cornerRadius 16
- **Border:** 1pt `border`
- **Leading icon:** `magnifyingglass`, 16pt, `mutedForeground`
- **Placeholder:** "Search people and adventures…", `mutedForeground`
- **Trailing clear button:** shows when `!text.isEmpty`, `xmark` 16pt
- **Focus state:** 2pt ring `primary.opacity(0.3)`

### SectionHeader

```
┌──────────────────────────────────────────┐
│ Explore Adventurers          See all >  │
└──────────────────────────────────────────┘
```

- **HStack:** title (headline) + Spacer + optional "See all" button
- **"See all":** caption, `primary` + chevron.right 14pt
- **Padding:** horizontal 20pt, bottom 12pt

### CreatorCard

```
┌────────────────────────────────────────┐
│  ┌──────────────────────────────────┐  │
│  │     IMAGE CAROUSEL               │  │  112pt
│  │     ─────────────────────────────│  │
│  │  ●○                              │  │
│  └──────────────────────────────────┘  │
│  ┌────┐                                │
│  │ AV │ ← overlaps 24pt above edge     │
│  └────┘                                │
│  Name                      38 trips    │
│  @handle                               │
│  📍 Portland, OR                       │
│  ┌─────────┐ ┌─────────┐               │
│  │ Hiking  │ │ Canyon  │               │
│  └─────────┘ └─────────┘               │
└────────────────────────────────────────┘
```

- **Frame:** 256pt width, auto height
- **Corner radius:** 16pt
- **Background:** `card`
- **Border:** 1pt `border`
- **Shadow:** y: 2, blur: 8, `black.opacity(0.06)`

**Cover area (top):**
- Height: 112pt
- Image carousel with page indicators (inside-bottom)
- Gradient overlay: `black.opacity(0)` → `black.opacity(0.5)` bottom

**Avatar:**
- 48pt circle, offset -24pt from cover bottom edge
- 2pt border `card`
- Positioned left: 16pt

**Body (below avatar, padding top 32pt):**
- Name: body, semibold, `foreground`
- Handle: caption, `mutedForeground`
- Location row: pin icon 12pt + caption `mutedForeground`
- Trip badge: micro, `secondaryForeground`, bg `secondary`, pill, trailing

**Category tags:**
- HStack, spacing 4
- Pill: micro, `primary`, bg `primary.opacity(0.1)`, padding h:6 v:2

### AdventureCard

```
┌────────────────────────────────────┐
│ ┌──────────────────────────────────┐│
│ │                                  ││
│ │      IMAGE CAROUSEL              ││ aspect 4:3
│ │                                  ││
│ │ ┌────────┐                       ││
│ │ │ Canyon │ ← category badge      ││
│ │ └────────┘                       ││
│ │                                  ││
│ │ Title line 1                 ★ 4.9│
│ │ 📍 Location                      ││
│ │           ●○○                    ││
│ └──────────────────────────────────┘│
│ by Author Name           ♡ 2,847    │
└────────────────────────────────────┘
```

- **Frame:** 224pt width
- **Corner radius:** 16pt
- **Background:** `card`
- **Border:** 1pt `border`
- **Shadow:** y: 2, blur: 8, `black.opacity(0.06)`

**Image area:**
- Aspect ratio 4:3
- Carousel with indicators inside-bottom
- Gradient overlay for text legibility

**Category badge (top-left inside image):**
- micro, `foreground`, bg `white.opacity(0.9)`, blur backdrop
- Padding: h 8, v 4
- Corner radius: full

**Title overlay (bottom of image):**
- body, semibold, `white`, 2-line clamp
- Location row: pin 12pt + caption `white.opacity(0.75)`
- Rating: star filled 12pt + micro `white.opacity(0.8)` — trailing

**Footer (below image):**
- Height: 32pt, padding h 12
- "by {author}": micro, `mutedForeground`
- Favorites: heart 12pt + count, `mutedForeground`, trailing

### TabBar

```
┌──────────────────────────────────────────┐
│  Home   Explore   [+]   Discover  Profile│
│   ○       ○       ●        ●        ○    │
└──────────────────────────────────────────┘
```

- **Position:** absolute bottom, safe-area aware
- **Background:** `card`, top border 1pt `border`
- **Height:** 56pt + safe area bottom

**Tab items:** 5 total, evenly distributed
- Icon: 24pt SF Symbol
- Label: micro
- Inactive: `mutedForeground`
- Active: `primary`, icon filled variant

**Center Post button:**
- Raised -20pt above bar baseline
- 48pt circle, bg `primary`
- Plus icon 24pt, `primaryForeground`, stroke 2.5
- Shadow: y 4, blur 12, `black.opacity(0.15)`

**Tab icons:**
| Tab | SF Symbol |
|-----|-----------|
| Home | `house` / `house.fill` |
| Explore | `map` / `map.fill` |
| Post | `plus` |
| Discover | `binoculars` / `binoculars.fill` |
| Profile | `person` / `person.fill` |

---

## Search Results State

When `searchQuery.count > 0`, replace ScrollView content:

```
SearchResultsView
├── Section: "People" (if matches)
│   └── VStack(spacing: 8)
│       └── PersonRow[]
└── Section: "Adventures" (if matches)
    └── VStack(spacing: 12)
        └── AdventureRow[]
```

### PersonRow

```
┌─────────────────────────────────────────────┐
│ ┌────┐                                      │
│ │ AV │  Name                    ┌───────┐   │
│ └────┘  @handle · Location      │ View  │   │
│                                 └───────┘   │
└─────────────────────────────────────────────┘
```

- **Background:** `card`, radius 16, border 1pt `border`
- **Avatar:** 40pt
- **Name:** body semibold
- **Meta:** caption `mutedForeground`
- **View button:** caption semibold, `primary`, border 1pt `primary`, radius 12, padding h 12 v 6

### AdventureRow

```
┌─────────────────────────────────────────────┐
│ ┌──────┐                                    │
│ │ IMG  │  Title (2 lines)           ★ 4.9  │
│ │ 56pt │  📍 Location                       │
│ └──────┘                                    │
└─────────────────────────────────────────────┘
```

- **Background:** `card`, radius 16, border 1pt `border`
- **Thumbnail:** 56pt square, radius 12
- **Title:** body semibold, 2-line clamp
- **Location:** caption `mutedForeground`
- **Rating:** star.fill 14pt `primary` + body `foreground`

### Empty State

```
        🔭
   No results for "query"
   Try a different name, place, or category.
```

- Centered, padding-top 64pt
- Icon: `binoculars` 40pt, `mutedForeground.opacity(0.4)`
- Title: body semibold, `foreground`
- Subtitle: caption, `mutedForeground`

---

## Interaction States

| Element | State | Change |
|---------|-------|--------|
| Card | Pressed | scale(0.98), opacity(0.9), 150ms ease |
| Tab | Pressed | scale(0.95), 100ms |
| Button | Pressed | opacity(0.7), 100ms |
| Search | Focused | ring 2pt primary.opacity(0.3) |

---

## Navigation

- **CreatorCard tap** → Push `ProfileView(userId:)`
- **AdventureCard tap** → Push `AdventureDetailView(adventureId:)`
- **Tab tap** → Switch root tab (except Post)
- **Post button tap** → Present `PostSheet` as fullScreenCover

---

## Animations

| Trigger | Animation |
|---------|-----------|
| Screen appear | Fade-in 300ms, stagger sections 50ms |
| Card load | Fade + translateY(8), 250ms spring |
| Search expand | Height 0→44, 200ms ease |
| Tab switch | Crossfade 200ms |

---

## Accessibility

- All images: descriptive `accessibilityLabel`
- Cards: grouped, `accessibilityElement(children: .combine)`
- Tab bar: `accessibilityTraits = .tabBar`
- Search: `accessibilityLabel = "Search field"`
- Dynamic Type: support up to XXL

---

## Data Models

```swift
struct Explorer: Identifiable {
    let id: String
    let name: String
    let handle: String
    let avatarURL: URL?
    let location: String
    let adventureCount: Int
    let topCategories: [String]
    let coverImages: [URL]
}

struct Adventure: Identifiable {
    let id: String
    let title: String
    let location: String
    let category: String
    let rating: Double
    let favoriteCount: Int
    let authorName: String
    let images: [URL]
}
```

---

## State Management

```swift
@Observable
class DiscoverViewModel {
    var searchQuery: String = ""
    var explorers: [Explorer] = []
    var popularAdventures: [Adventure] = []
    var isLoading: Bool = false
    
    var isSearching: Bool { !searchQuery.isEmpty }
    var filteredExplorers: [Explorer] { /* filter by query */ }
    var filteredAdventures: [Adventure] { /* filter by query */ }
}
```

---

## SwiftUI Patterns to Use

- `NavigationStack` for navigation
- `ScrollView(.horizontal, showsIndicators: false)` for carousels
- `LazyHStack` for horizontal card lists
- `TabView` with page style for image carousels
- `.safeAreaInset(edge: .bottom)` for tab bar spacing
- `@Environment(\.dismiss)` for navigation
- `.searchable` modifier alternative or custom SearchBar
- `.task` for async data loading
