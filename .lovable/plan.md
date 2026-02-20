

# Edits for /webinar/foyda-webinar Page

## Overview
Redesigning the webinar landing page with 4 major changes: updated hero with tag pills, removed sections, two new content sections, and an inline registration form replacing the popup.

## Changes

### 1. Hero Section - Add Tag Pills
Update `WebinarHero.tsx` to add three horizontal tag pills above the headline (like in the reference screenshot):
- "Bepul Vebinar" | "27 fevral" | "soat 16:00da"
- Style: rounded-full pills with border, inline-flex row, similar to the reference

Also remove the "BILLZ VEBINAR" uppercase tracking label since the pills replace it.

### 2. Remove Sections
Remove `WebinarTrust` and `WebinarMission` from the page:
- Delete their imports and usage from `WebinarFoydaWebinar.tsx`
- This removes the brand logos section and the "super kuch" feature cards section

### 3. Add Two New Sections
Create two new components (content to be provided by you later, will use placeholder text for now):

**a) `WebinarTopics.tsx`** - "Nimalarni o'rganasiz?"
- Layout: heading + 2x2 grid of rounded cards with light blue/primary-tinted backgrounds
- Each card has a short text description
- A "Vebinarga yozilish" CTA button below the grid
- Style matches the reference screenshot

**b) `WebinarBonuses.tsx`** - "Yana nimalarga ega bo'lasiz?"
- Layout: heading + two side-by-side cards
- Each card has a title and description
- Rounded corners, soft shadow, clean design matching the reference

### 4. Inline Registration Form
Replace the popup registration with an inline section on the page:

**a) Create `WebinarInlineRegistration.tsx`**
- Light blue/primary-tinted background section
- Tag pill at top: "Ro'yxatdan o'tish"
- Headline and description text
- "Shaxsiy ma'lumotlar" label
- Form fields: Name input, Phone input (+998 format)
- Attendance radio buttons (same as current popup)
- Submit button
- Same webhook logic, UTM capture, and success state (Telegram redirect) from the current popup

**b) Update `WebinarFoydaWebinar.tsx`**
- Remove the popup state management (`isPopupOpen`, `setIsPopupOpen`)
- Remove `WebinarRegistrationPopup` import/usage
- Remove `onRegisterClick` prop passing (CTA buttons will scroll to the registration section instead)
- Add scroll-to-registration behavior for all "Vebinarga yozilish" buttons

### Updated Page Order
1. Hero (with tag pills)
2. Speaker section (kept as-is)
3. "Nimalarni o'rganasiz?" (new topics section)
4. "Yana nimalarga ega bo'lasiz?" (new bonuses section)
5. CTA section (kept, button scrolls to registration)
6. Inline Registration Form (new, at the bottom)

---

### Technical Details

**Files to create:**
- `src/components/webinar/WebinarTopics.tsx` - topics grid section
- `src/components/webinar/WebinarBonuses.tsx` - bonuses cards section
- `src/components/webinar/WebinarInlineRegistration.tsx` - inline form with webhook logic

**Files to modify:**
- `src/components/webinar/WebinarHero.tsx` - add tag pills, change CTA to scroll-to behavior
- `src/pages/WebinarFoydaWebinar.tsx` - restructure sections, remove popup logic
- `src/components/webinar/WebinarCTA.tsx` - change button to scroll-to behavior

**No files deleted** (existing components stay in codebase for potential reuse).

**Webhook & tracking:** All existing webhook URL, UTM capture, pixel events (`WebinarFinished`), and CAPI support will be preserved in the inline form, moved from the popup component.

**Note:** The topics and bonuses sections will have placeholder Uzbek text. Please provide the exact content and I will update them.

