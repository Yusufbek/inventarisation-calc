

# UI Adjustments: Topics and Bonuses Sections

## 1. Remove the 3 colored topic cards
**File:** `src/components/webinar/WebinarTopics.tsx`
- Delete the `topicCards` array (lines 7-32) entirely
- Remove the "Part A" grid section (lines 51-66) that renders the 3 colored cards
- Keep only the section heading and the dark "Part B" section below

## 2. Fix text visibility in "Nima haqida gaplashamiz?" section
**File:** `src/components/webinar/WebinarTopics.tsx`

The inner cards currently use `bg-primary/10` with `text-foreground` and `text-muted-foreground`, which don't contrast well on the dark navy background. Based on the reference screenshot:
- Change inner card backgrounds from `bg-primary/10` to a semi-transparent dark style: `bg-white/5 border border-white/10`
- Change heading text from `text-foreground` to `text-white`
- Change body/description text from `text-muted-foreground` to `text-white/70`
- Change CheckCircle icon color to `text-blue-400` for better visibility
- Change list item text from `text-muted-foreground` to `text-white/70`

## 3. Make first bonus icon bigger
**File:** `src/components/webinar/WebinarBonuses.tsx`
- Increase the chat bubble icon (first card) size from `w-20 sm:w-24 md:w-28` to `w-24 sm:w-28 md:w-32`
- Keep the second card icon at its current size

### Technical Summary
**File to modify:**
- `src/components/webinar/WebinarTopics.tsx` -- remove 3 cards, fix colors in dark section
- `src/components/webinar/WebinarBonuses.tsx` -- increase first icon size

