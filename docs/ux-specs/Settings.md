Thought for 3s# iOS Design Specification: Settings Screen

## Overview

Implement a Settings screen accessible from the user's Profile screen via a settings gear icon button. The Settings feature consists of a main list view and 5 sub-screens, all using a consistent warm cream/beige design language.

---

## Navigation Architecture

```plaintext
Profile Screen
    └── Settings (main)
            ├── Send Feedback
            ├── Terms of Service
            ├── Privacy Policy
            ├── Delete Account
            └── Upload Debug Logs (action with confirmation alert)
```

**Entry Point:** Settings gear icon button in the top-right corner of the Profile screen header (replaces any existing logout button).

**Navigation Pattern:** Push/pop navigation stack. Each sub-screen has a back button returning to the previous screen.

---

## Color Palette

| Token | Hex | Usage
|-----|-----|-----
| Background | `#F5F3EB` | Main screen background (warm cream)
| Card | `#FFFFFF` or `#FAF9F6` | Card/container backgrounds
| Text Primary | `#2D2A26` | Headings, primary labels
| Text Secondary | `#6B7280` | Descriptions, muted text
| Accent | `#64748B` | Subheadings, info text (slate/blue-gray)
| Border | `#E5E2D9` | Dividers, input borders
| Destructive | `#DC2626` | Delete button background
| Destructive Text | `#7F1D1D` | Delete button text


---

## Typography

| Element | Font | Weight | Size
|-----|-----|-----
| Screen Title | System (SF Pro) | Bold | 28-32pt
| List Item Label | System | Medium | 17pt
| Body Text | System | Regular | 15-16pt
| Legal Content | System | Regular | 14pt
| Button Text | System | Semibold | 17pt


---

## Screen 1: Settings Main

**Title:** "Advanced Settings"

**Back Button:** Pill-shaped button with chevron-left icon and "Back" label, positioned top-left.

**Content:** Vertical list of tappable rows, each with:

- Left: Text label
- Right: Chevron-right icon (gray)
- Bottom: 1px border divider


**List Items (in order):**

1. "Give us feedback" → navigates to Send Feedback
2. "Terms of Service" → navigates to Terms of Service
3. "Privacy Policy" → navigates to Privacy Policy
4. "Delete Account" → navigates to Delete Account
5. "Upload Debug Logs" → triggers action + shows confirmation alert


**Row Styling:**

- Padding: 16pt vertical, 0 horizontal
- Full-width tap target
- No background change on tap (or subtle highlight)


---

## Screen 2: Send Feedback

**Title:** "Send Feedback"

**Back Button:** Circular button with chevron-left icon only.

**Content:**

1. **Description Text** (accent/slate color):

> "We appreciate hearing from you. Please provide your feedback below or contact [support@lucidios.com](mailto:support@lucidios.com)"




2. **Category Picker** (dropdown/picker):

1. Placeholder: "Category..."
2. Border: 1px solid border color
3. Corner radius: 8pt
4. Options: Bug Report, Feature Request, General Feedback, Other



3. **Feedback Text Area:**

1. Placeholder: "Please enter your feedback."
2. Border: 1px solid border color
3. Corner radius: 8pt
4. Min height: 150pt
5. Resizable or scrollable



4. **Submit Button:**

1. Full width (with horizontal padding)
2. Background: transparent or light
3. Border: 1px solid border color
4. Corner radius: 8pt
5. Text: "Submit" (primary text color, semibold)
6. Centered text





**Spacing:** 24pt between major elements.

---

## Screen 3: Terms of Service

**Title:** "Terms of Service" (displayed in header area with background image/gradient overlay)

**Back Button:** Circular button with chevron-left icon, white background.

**Content:** Scrollable legal text in a card container.

**Structure:**

```plaintext
Hidden Adventures Terms and Conditions
Last updated: March 3, 2019

[Sections:]
- Introduction paragraph
- Communications
- Content
- Accounts
- Intellectual Property
- Links To Other Web Sites
- Termination
- Governing Law
- Changes
- Contact Us
```

**Styling:**

- Section headings: Bold, 18pt
- Body paragraphs: Regular, 14pt, text-secondary color
- Bullet lists where applicable
- Card has rounded corners (16pt) and subtle shadow


---

## Screen 4: Privacy Policy

**Title:** "Privacy Policy" (displayed in header area with background image/gradient overlay)

**Back Button:** Circular button with chevron-left icon, white background.

**Content:** Scrollable legal text in a card container.

**Structure:**

```plaintext
Privacy Policy
Effective date: March 06, 2019

[Sections:]
- Definitions (Service, Personal Data, Usage Data, Cookies)
- Information Collection and Use
- Types of Data Collected
  - Personal Data
  - Usage Data
  - Location Data
  - Tracking & Cookies Data
- Use of Data
- Transfer of Data
- Disclosure of Data
- Security of Data
- Service Providers
- Children's Privacy
- Changes to This Privacy Policy
- Contact Us
```

**Styling:** Same as Terms of Service.

---

## Screen 5: Delete Account

**Title:** "Delete Account"

**Back Button:** Circular button with chevron-left icon.

**Content:** Centered vertically on screen.

1. **Warning Message** (accent/slate color, italic, centered):

> "This will permanently delete your account and all of your content. You will no longer be able to login. Are you sure?"




2. **Delete Button:**

1. Centered horizontally
2. Width: ~60% of screen width
3. Background: Light red/pink tint (`#FEE2E2` or similar)
4. Border: 1px solid muted red
5. Corner radius: 8pt
6. Text: "Delete" (dark red/brown color, semibold)





**Behavior on Delete tap:**

- Show confirmation alert (native UIAlertController)
- Title: "Delete Account?"
- Message: "This action cannot be undone."
- Actions: "Cancel" (default), "Delete" (destructive)
- On confirm: Call delete account API, then navigate to login/onboarding


---

## Alert: Debug Logs Submitted

**Trigger:** Tapping "Upload Debug Logs" row on main settings screen.

**Type:** Native UIAlertController or custom modal overlay.

**Content:**

- **Title:** "Debug Logs Submitted"
- **Message:** "Your debug logs were sent to customer support. Please tap the 'Contact Support' button and provide the details of your issue."
- **Button:** "OK" (dismisses alert)


**Styling if custom modal:**

- Centered card with rounded corners (16pt)
- White background
- Drop shadow
- Semi-transparent black overlay behind


---

## Component Specifications

### Back Button (Pill Style)

- Shape: Rounded rectangle (full pill)
- Background: White
- Shadow: Subtle drop shadow
- Content: Chevron-left icon + "Back" text
- Padding: 8pt vertical, 16pt horizontal


### Back Button (Circle Style)

- Shape: Circle
- Diameter: 40pt
- Background: White
- Shadow: Subtle drop shadow
- Content: Chevron-left icon only, centered


### List Row

- Height: Auto (content + padding)
- Padding: 16pt vertical
- Divider: 1pt line at bottom, inset 16pt from left
- Tap state: Subtle highlight or no change


### Text Input / Text Area

- Background: White or card color
- Border: 1pt solid border color
- Corner radius: 8pt
- Padding: 12pt
- Placeholder color: Text secondary


### Standard Button

- Background: Transparent or card color
- Border: 1pt solid border color
- Corner radius: 8pt
- Padding: 14pt vertical
- Text: Centered, semibold


---

## Accessibility Requirements

- All interactive elements must have accessibility labels
- Back buttons: "Go back" or "Back to [previous screen name]"
- List rows: Label should read the item name
- Minimum tap target: 44pt × 44pt
- Support Dynamic Type for all text
- VoiceOver: Announce screen titles on navigation
- Delete button should announce as a destructive action


---

## State Management

```swift
enum SettingsView {
    case main
    case feedback
    case termsOfService
    case privacyPolicy
    case deleteAccount
}

// Feedback form state
struct FeedbackForm {
    var category: String?
    var message: String
}

// Alert state
var showDebugLogsAlert: Bool
```

---

## API Endpoints (if applicable)

| Action | Method | Endpoint
|-----|-----|-----
| Submit Feedback | POST | `/api/feedback`
| Upload Debug Logs | POST | `/api/debug-logs`
| Delete Account | DELETE | `/api/account`


---

## Assets Required

- SF Symbols: `chevron.left`, `chevron.right`, `gearshape` (for profile button)
- Background image for Terms/Privacy headers (optional, can use gradient)


---

## Notes for Implementation

1. The warm cream background (`#F5F3EB`) should extend to safe areas
2. Legal text content can be loaded from local files or remote API
3. Consider using SwiftUI `NavigationStack` for navigation management
4. The Settings gear button on Profile screen should be positioned in the same location as any existing header action button
5. All screens should support both light mode (primary) and dark mode (adapt colors accordingly)
