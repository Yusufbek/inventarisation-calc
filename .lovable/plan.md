

# UI Overhaul: Registration, Bonuses, and Topics Sections

## 1. Registration Form Redesign
**File:** `src/components/webinar/WebinarInlineRegistration.tsx`

Matching the reference image (clean light-blue background, tag pills at top, simplified form):
- Add tag pills row at the top: "Bepul" (primary/red), "27 fevral" (dark), "soat 16:00da" (dark) -- reusing the same pill style from the Hero
- Keep the "Ro'yxatdan o'tish" title but style it bolder and left-aligned
- Add subtitle: "Vebinar haqida barcha ma'lumotlar Telegram guruhida beriladi"
- Remove the radio group (attendance question) to simplify the form
- Make inputs more minimal with larger rounded corners (`rounded-2xl`) and lighter borders
- Place Name field full-width, Phone field full-width below it
- Style the submit button as a wide dark/primary rounded-full button
- Remove the outer card border, keep the light blue section background (`bg-primary/5`)

## 2. Bonuses Section Redesign
**File:** `src/components/webinar/WebinarBonuses.tsx`

Matching the reference image (clean white cards with icons on the right side):
- Update section title: "Yana nimalarga ega bo'lasiz?" -> "Qatnashuvchilarga bonuslar"
- Card 1 title: "Avtomatlashtirish eksperti bilan uchrashuv" -> "Bepul konsultatsiya"
- Card 2 title: "Do'koningiz uchun amaliy qo'llanmalar" -> "Tayyor amaliy qo'llanmalar"
- Remove gradients from cards, use clean white/light background with subtle border (`bg-card border border-border`)
- Upload and use the two provided 3D icons:
  - Blue chat bubble icon -> for "Bepul konsultatsiya" card
  - Red PDF icon -> for "Tayyor amaliy qo'llanmalar" card
- Position icons on the right side of each card (similar to reference), with text on the left
- Remove the gift-box image from cards
- Cards should have generous padding and rounded-3xl corners

## 3. "Nimalarni o'rganasiz?" Section Full Remake
**File:** `src/components/webinar/WebinarTopics.tsx`

Matching the reference images -- two-part layout:

**Part A: 3 colored cards in a row (top)**
- 3 cards side by side on desktop, stacked on mobile
- Card 1: Dark navy background (`bg-[#1a1f36]`) with white text
- Card 2: Coral/red background (`bg-[#ff5a5f]`) with white text  
- Card 3: Light blue background (`bg-primary/10`) with dark text
- Each card has a bold title and a description paragraph below
- Large rounded corners (`rounded-3xl`), generous padding
- Content adapted to the existing 3 topics (Kassa, Mulk himoyasi, Hisob-kitob)

**Part B: Two-column layout below (dark background)**
- Full-width dark navy section (`bg-[#1a1f36]`) with rounded-3xl corners
- Left column: light blue card with a bold explanatory paragraph about the webinar context
- Right column: light blue card with heading "Vebinarda o'rganasiz" and a bulleted list of 4-5 specific items
- Remove the current gradient banner with Target icon
- Remove the CTA button from this section (it exists elsewhere)

### Assets to Copy
- `user-uploads://ChatGPT_Image_20_fevr._2026_g._14_57_51.png` -> `public/images/webinar/bonus-pdf-icon.png` (PDF icon for bonuses)
- `user-uploads://ChatGPT_Image_20_fevr._2026_g._14_57_57.png` -> `public/images/webinar/bonus-chat-icon.png` (Chat bubble icon for bonuses)

### Technical Summary
**Files to modify:**
- `src/components/webinar/WebinarInlineRegistration.tsx` -- simplified form with pills
- `src/components/webinar/WebinarBonuses.tsx` -- clean cards with 3D icons, updated texts
- `src/components/webinar/WebinarTopics.tsx` -- full rewrite with colored cards + dark two-column section

**Assets to add:**
- 2 icon images copied to `public/images/webinar/`
