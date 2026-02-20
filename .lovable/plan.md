

# Four Changes to Webinar Pages

## 1. Add Foyda Webinar V2 card to the main page (CalculatorHub)
Add a second webinar card in the "Vebinarlar" section of `src/components/CalculatorHub.tsx` that links to `/webinar/foyda-webinar-v2` with the title "Foyda Webinar V2".

## 2. Move CTA section to the bottom of V1 webinar page
In `src/pages/WebinarFoydaWebinar.tsx`, move `<WebinarCTA>` from its current position (after Trust, before Speaker) to the very bottom (after Bonuses). New order: Hero, Mission, Trust, Speaker, Bonuses, CTA.

## 3. Update speaker title text
In `src/components/webinar/WebinarSpeaker.tsx` (line 39), change:
- "Do'konlarni avtomatlashtirish bo'yicha ekspert"
- to "Do'konlarni rivojlantirish bo'yicha ekspert"

## 4. Remove all time references from V1 webinar page
- **WebinarHero.tsx** (line 27-29): Remove the "soat 16:00da" pill entirely
- **WebinarCTA.tsx** (lines 81-88): Remove the Clock/17:00 row from the date-time card. Also remove the `Clock` import.

---

### Technical Summary

**Files to modify (4):**
- `src/components/CalculatorHub.tsx` -- add V2 webinar card
- `src/pages/WebinarFoydaWebinar.tsx` -- reorder sections (move CTA to bottom)
- `src/components/webinar/WebinarSpeaker.tsx` -- update speaker title text
- `src/components/webinar/WebinarHero.tsx` -- remove time pill
- `src/components/webinar/WebinarCTA.tsx` -- remove clock/time row and Clock import
