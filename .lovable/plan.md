

# UI Refinements for Webinar Page

## 1. Registration Form - Remove texts
**File:** `src/components/webinar/WebinarInlineRegistration.tsx`
- Remove the subtitle paragraph "Ma'lumotlaringizni qoldiring va bepul vebinarga qo'shiling" (line 109-111)
- Remove the "Shaxsiy ma'lumotlar" label (line 114-116)

## 2. Speaker Title Update
**File:** `src/components/webinar/WebinarSpeaker.tsx`
- Change line 39 from "Mijozlarni ulash va o'qitish bo'yicha rahbar" to "Do'konlarni avtomatlashtirish bo'yicha ekspert"

## 3. Topics Description Design Enhancement
**File:** `src/components/webinar/WebinarTopics.tsx`
- Replace the plain paragraph (lines 58-61) with a styled card/banner:
  - Add a subtle gradient background (`bg-gradient-to-r from-primary/5 to-primary/10`)
  - Rounded corners (`rounded-2xl`), padding, and a left accent border (`border-l-4 border-primary`)
  - Slightly larger text with better spacing
  - Add a small icon (e.g., `Info` or `Target` from lucide) to the left for visual interest

## 4. Bonuses Section - Gradient Cards
**File:** `src/components/webinar/WebinarBonuses.tsx`
- Card 1: Apply a warm gradient background (`bg-gradient-to-br from-primary/10 via-primary/5 to-transparent`) with a subtle primary-colored border
- Card 2: Apply a complementary gradient (`bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-transparent`) with an emerald border accent
- Add rounded icon containers (using `Users` and `BookOpen` from lucide) with colored backgrounds at the top of each card
- Keep the gift-box image but ensure it blends well with the new gradient backgrounds
- Increase card min-height slightly for more breathing room

### Technical Summary
**Files to modify:**
- `src/components/webinar/WebinarInlineRegistration.tsx` - remove 2 text elements
- `src/components/webinar/WebinarSpeaker.tsx` - update speaker role text
- `src/components/webinar/WebinarTopics.tsx` - style the description as a highlighted banner
- `src/components/webinar/WebinarBonuses.tsx` - add gradients, icons, and colored borders to cards
