Thought for 3sHere's a concise design overview for the Adventure Detail screen:

---

## Adventure Detail Screen - Design Specification

### Layout Structure

- **Full-screen scroll container** with a sticky hero image that gets covered as content scrolls up
- **Hero carousel** (320pt height) pinned at top, content panel slides over it with a rounded top (24pt radius)
- **Floating navigation bar** at top: back button (left), share + bookmark buttons (right) - all in white/90 opacity circles with backdrop blur
- **Sticky comment input bar** fixed at bottom with backdrop blur


### Content Panel Sections (top to bottom)

1. **Category badge + Rating** - Category label in a pill/chip (secondary background), star rating with count on the right
2. **Title** - Large semibold text (24pt equivalent)
3. **Location label** - Map pin icon + place label text in muted color
4. **Author row** - Avatar, "Shared by [Name]", subtitle "[City], [Region] · [N] adventures", Follow button
5. **About section** - "About this place" header, summary + body text
6. **Location/Map section** - "Location" header with "Get Directions >" link, stylized mini-map placeholder (soft green/sage tones) with centered pin marker. Tapping "Get Directions" opens native maps app
7. **Rate section** - "Rate this adventure" header, 5 tappable star icons (empty = muted, filled = amber), contextual feedback text appears after selection
8. **Comments section** - Comment count header with 3-dot menu (for report/flag options), list of comment bubbles


### Comment Bubbles

- Light sand/beige background (`bg-muted` - oklch 0.94 0.01 90)
- Rounded corners with notched top-left (rounded-2xl rounded-tl-sm)
- Avatar, username, timestamp, and comment body ALL inside the bubble together
- Timestamp right-aligned, relative format ("7 years ago")


### Comment Input Bar

- User avatar (left), auto-expanding textarea (center), send button (right)
- Textarea: single line default, expands up to ~4 lines, same sand color as comment bubbles
- Send button: primary color circle, disabled state at 40% opacity when empty
- Enter submits, Shift+Enter for new line


### Color Palette

- **Primary**: Deep forest green (oklch 0.45 0.1 145)
- **Secondary**: Darker sand (oklch 0.88 0.02 90)
- **Muted**: Light sand (oklch 0.94 0.01 90) - used for comment bubbles and input
- **Accent**: Sage green (oklch 0.75 0.08 145)
- **Background**: Off-white (oklch 0.98 0.005 90)


### Interactive States

- **Bookmark button**: Toggles between white/90 background (unfavorited) and primary green background with filled icon (favorited)
- **Star rating**: Hover/tap preview, fills amber on selection
- **Comment input**: Auto-expands as text is entered, collapses when cleared


### Data Model (from schema)

```plaintext
Adventure: id, title, summary, body, categorySlug, placeLabel, location {lat, lng}, 
           author {handle, displayName, homeCity, homeRegion, avatarUrl, adventureCount},
           primaryMedia, media[], stats {favoriteCount, commentCount, ratingCount, averageRating},
           comments[] {id, authorHandle, authorDisplayName, authorAvatarUrl, body, createdAt}
```

---

This covers the full visual hierarchy, interaction patterns, and data requirements for implementing the screen on iOS.