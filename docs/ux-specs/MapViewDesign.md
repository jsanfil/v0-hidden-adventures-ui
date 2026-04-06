Thought for 5s## Map Explore View - Design & Interaction Specification

### Overall Layout

- **Full-screen map** takes up the entire viewport, maximizing exploration space
- **Floating search bar** at top (below safe area)
- **Floating filter button** next to search bar
- **Draggable bottom sheet** anchored to bottom
- **Current location button** floating on right side above the sheet


---

### Search Bar

- **Position**: Top of screen, horizontal layout with filter button
- **Style**: Rounded card (`rounded-2xl`), white background, shadow
- **Contents**: Search icon, text input placeholder "Search adventures or places...", clear button (X) when text present
- **Focus state**: Ring highlight around input
- **Behavior**: Search filters adventures and can reground map location


---

### Filter Button

- **Position**: Right of search bar
- **Style**: Square button (`44x44pt`), rounded (`rounded-2xl`), shadow
- **Icon**: Horizontal sliders icon (`SlidersHorizontal`)
- **States**:

- Default: White background, dark icon
- Active (filter applied OR popover open): Primary color background, white icon





#### Visibility Filter Popover

- **Trigger**: Tap filter button
- **Position**: Anchored below filter button, right-aligned
- **Style**: Rounded card, shadow, white background
- **Header**: "Show adventures" label (muted, uppercase, small)
- **Options**: All, Public, Connections, Private - each with icon and label
- **Selection**: Checkmark on active option
- **Dismiss**: Tap option, tap filter button again, or tap map


---

### Map Pins

- **Structure** (top to bottom):

1. **Label**: Adventure title in a small pill/badge above the pin
2. **Pin body**: Circle with category icon inside
3. **Pin point**: Triangle pointing down



- **Default state**: White background, primary-colored icon, white label with dark text
- **Selected state**: Primary color background, white icon, primary-colored label with white text, slight scale up (110%) and lift (-1pt Y)
- **Hover/tap feedback**: Slight scale up (105%)
- **Category icons mapping**:

- Viewpoints → Mountain
- Trails → Footprints
- Water Spots → Waves
- Food & Drink → Utensils
- Abandoned Places → Building
- Caves → Gem
- Nature Escapes → Leaf
- Roadside Stops → Navigation





---

### Current Location Indicator

- **Style**: Blue dot with white border, pulsing animation ring
- **Position**: Centered on user's location on map


### Recenter Button

- **Position**: Right edge, above bottom sheet
- **Style**: Round button (`44x44pt`), white background, shadow
- **Icon**: Locate/crosshairs icon in primary color


---

### Bottom Sheet (Apple Maps / Yelp style)

#### Three States:

1. **Collapsed** (`100pt` height): Shows only drag handle and header
2. **Peek** (`280pt` height): Shows header + category pills + horizontal card scroll
3. **Expanded** (`70%` of screen): Shows header + category pills + vertical scrolling list


#### Drag Behavior:

- Drag handle at top (small horizontal pill, `40x4pt`, muted color)
- Drag up: collapsed → peek → expanded
- Drag down: expanded → peek → collapsed
- Threshold: ~50pt drag distance to trigger state change


#### Sheet Header:

- **Title**: "Nearby Adventures"
- **Subtitle**: "[count] places within 25 miles"
- **Action button**: "List view" / "Map view" toggle (switches between peek and expanded)


#### Category Filter Pills (inside sheet):

- **Position**: Below header, horizontal scroll
- **Style**: Rounded pills with icon + label
- **Default**: Secondary background, border
- **Selected**: Primary background, white text, no border
- **Behavior**: Tap to filter, tap again to clear. Filters both map pins and card list.


#### Adventure Cards in Sheet:

**Peek state (horizontal scroll):**

- Card width: `224pt`
- Image: 16:10 aspect ratio
- Category badge overlaid top-left
- Below image: Title, distance, rating with star icon
- Tap: Selects pin on map, shows preview card, collapses sheet


**Expanded state (vertical list):**

- Full-width rows with thumbnail (64x64pt rounded), title, location, distance, rating
- Chevron on right indicating tappable
- Tap: Same as peek cards


---

### Adventure Preview Card (when pin selected)

- **Position**: Floating above tab bar, full width with padding
- **Trigger**: Tap a map pin
- **Animation**: Slide in from bottom
- **Layout** (matches Home Feed card style):

- 4:3 aspect ratio image carousel
- Gradient overlay on image (transparent top → 65% black bottom)
- Category badge: Top-left, white/blur background
- Close button (X): Top-right, white/blur background, round
- Title: White text, overlaid on image bottom
- Location + distance: White/80% opacity, with MapPin icon, dot separator
- Rating: White/80% opacity, star icon + number



- **Dismiss**: Tap X button, tap another pin, or tap empty map area
- **Navigation**: Tap card → Adventure Detail screen
- **Sheet behavior when card shown**: Sheet slides off-screen (translateY full)


---

### Tab Bar

- **Position**: Bottom of sheet (always visible)
- **Items**: Home, Explore (active), Post (center floating FAB), Saved, Profile
- **Active state**: Primary color fill
- **FAB**: Raised circular button with plus icon


---

### Visual Styling Summary

- **Colors**: Primary green for active states, white/card for surfaces, muted for secondary text
- **Shadows**: Consistent shadow on floating elements (search bar, filter button, pins, sheet)
- **Border radius**: `rounded-2xl` for cards/buttons, `rounded-full` for pills/badges
- **Typography**: Semibold for titles, regular for body, small (10-12pt) for badges/metadata
- **Spacing**: 16pt horizontal padding, 8-12pt gaps between elements


QuoteQ