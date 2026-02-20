

# Duplicate Current Page as V2 and Restore Original Foyda Webinar

## Overview
The current Foyda Webinar page (redesigned version) will be duplicated to a new V2 route, and the original page at `/webinar/foyda-webinar` will be restored to its previous structure with Mission, Trust, CTA sections, and popup registration.

## What changes

### 1. Create V2 page (preserving the current/redesigned version)
**New file:** `src/pages/WebinarFoydaWebinarV2.tsx`
- Copies the current page structure: Hero (11:00, scroll-to-register), Topics, Bonuses, Speaker, InlineRegistration
- Imports existing components directly (no need to duplicate them since we're restoring the originals to their previous state only in the page-level composition)

Since the current components (WebinarHero, WebinarTopics, WebinarInlineRegistration) have been modified with today's styling changes, we need V2-specific copies:

**New files:**
- `src/components/webinar/WebinarHeroV2.tsx` -- current Hero with 11:00 time and light-style pills
- `src/components/webinar/WebinarTopicsV2.tsx` -- current Topics with primary blue bg and CTA button
- `src/components/webinar/WebinarInlineRegistrationV2.tsx` -- current inline form with light pills, primary blue button, and redirect to success page

### 2. Restore original page at `/webinar/foyda-webinar`
**Modify:** `src/pages/WebinarFoydaWebinar.tsx`
- Restore the original section order: Hero, Mission, Trust, CTA, Speaker, Bonuses
- Use popup registration (WebinarRegistrationPopup) triggered by CTA buttons, instead of inline form
- Add `useState` for popup open/close

**Modify:** `src/components/webinar/WebinarHero.tsx`
- Revert time from `soat 11:00da` back to the original (likely dynamically calculated or a different time)
- Change CTA to open popup instead of scrolling to inline form

**Modify:** `src/components/webinar/WebinarRegistrationPopup.tsx`
- Restore inline success state (isSuccess, green checkmark, Telegram button with tracking) instead of redirect to success page
- Restore the original success message text: "Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz. Telegram guruhimizga qo'shiling:"

### 3. Register V2 route
**Modify:** `src/App.tsx`
- Add route `/webinar/foyda-webinar-v2` pointing to `WebinarFoydaWebinarV2`
- Keep `/webinar/foyda-webinar/success` route (used by V2)

## Technical Summary

**Files to create (4):**
- `src/components/webinar/WebinarHeroV2.tsx` -- copy of current Hero (11:00)
- `src/components/webinar/WebinarTopicsV2.tsx` -- copy of current Topics (primary bg + CTA)
- `src/components/webinar/WebinarInlineRegistrationV2.tsx` -- copy of current inline form (light pills, redirect)
- `src/pages/WebinarFoydaWebinarV2.tsx` -- V2 page using the above components

**Files to modify (4):**
- `src/pages/WebinarFoydaWebinar.tsx` -- restore original section order with Mission, Trust, CTA, popup registration
- `src/components/webinar/WebinarHero.tsx` -- revert to original time/style, open popup instead of scroll
- `src/components/webinar/WebinarRegistrationPopup.tsx` -- restore inline success UI instead of redirect
- `src/App.tsx` -- add `/webinar/foyda-webinar-v2` route
