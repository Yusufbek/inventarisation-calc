

# Adjust Topics Section Color and Add CTA

## 1. Change dark section background to primary blue
**File:** `src/components/webinar/WebinarTopics.tsx`

The outer dark container currently uses `bg-[#1a1f36]` (dark navy). Change it to use the project's primary blue (`bg-primary`) so it matches the blue used throughout the site.

- Line 25: `bg-[#1a1f36]` -> `bg-primary`
- Inner cards stay `bg-white/5 border border-white/10` (they look fine on blue too)

## 2. Add CTA button below the dark section
Add a "Vebinarga yozilish" button centered below the blue container, using the `onRegisterClick` prop that already exists. Style it as a white/light button on the page background with an ArrowRight icon, rounded-full, similar to the CTA used in other sections.

- Import `ArrowRight` from lucide-react
- Add the button after the blue container div, inside the max-w-5xl wrapper
- Style: `bg-foreground text-background font-semibold text-lg px-12 py-4 rounded-full` with hover effects

### Technical Summary
**File to modify:** `src/components/webinar/WebinarTopics.tsx`
- Change background color from navy to primary blue
- Add CTA button beneath the section
