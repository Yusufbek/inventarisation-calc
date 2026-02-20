

# Unified Button Style and UI/UX Review

## 1. Unify All CTA Buttons to Primary Blue Style

The reference image shows a rounded blue button (`bg-primary text-primary-foreground`). Currently, some buttons use dark (`bg-foreground text-background`) instead. These need to be changed:

**WebinarTopics.tsx** (line 61):
- Change `bg-foreground text-background` to `bg-primary text-primary-foreground`
- Add `shadow-lg hover:shadow-xl hover:scale-[1.02]` for consistency with Hero CTA
- Remove `hover:opacity-90`, use `hover:bg-primary/90` instead

**WebinarInlineRegistration.tsx** (line 143):
- Change submit button from `bg-foreground text-background hover:bg-foreground/90` to `bg-primary text-primary-foreground hover:bg-primary/90`

Buttons already correct (no changes needed):
- WebinarHero CTA -- already `bg-primary`
- WebinarRegistrationPopup submit -- already `bg-primary`

## 2. UI/UX Refinements

After reviewing all sections, here are additional polish items:

**WebinarHero.tsx:**
- No issues found -- clean and well-structured

**WebinarTopics.tsx:**
- Add `group` class to CTA button and `group-hover:translate-x-1 transition-transform` to the ArrowRight icon for micro-interaction consistency with WebinarCTA

**WebinarBonuses.tsx:**
- No issues found -- cards are clean

**WebinarSpeaker.tsx:**
- No issues found -- well-structured

**WebinarInlineRegistration.tsx:**
- Tag pills use inconsistent styles vs Hero: the "27 fevral" and "soat 16:00da" pills use `bg-foreground text-background` (dark) while Hero uses `border border-border bg-secondary/50 text-foreground` (light outlined). Unify to match the Hero style for consistency.

### Technical Summary

**Files to modify:**
- `src/components/webinar/WebinarTopics.tsx` -- change CTA to primary blue, add hover animation
- `src/components/webinar/WebinarInlineRegistration.tsx` -- change submit button to primary blue, fix tag pill styles to match Hero

