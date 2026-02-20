

# Content and Layout Updates for /webinar/foyda-webinar

## Changes

### 1. WebinarTopics - Add description text and update topic cards
- Add a paragraph below the heading with the provided text about the webinar's target audience
- Update the 3 topic cards with new content:
  1. **Kassa va moliyaviy intizom** - Chetlab sotish holatlari va kassadagi kamomad ("minus") paydo bo'lishining sabablarini aniqlash hamda ularni bartaraf etish usullari.
  2. **Mulk himoyasi** - O'g'rilik, tovarlarni almashtirib qo'yish va yashirin yo'qotishlarning oldini olish bo'yicha amaliy choralar.
  3. **Hisob-kitob nazorati** - Narxlar o'zgarishi, mahsulot miqdori bilan bog'liq firibgarliklar va noto'g'ri hisob-kitoblarni qanday aniqlash mumkinligi.
- Change from 2x2 grid to 3-column (or stacked) layout since there are now 3 items instead of 4
- Each card gets a bold title + description text

### 2. Remove WebinarCTA section
- Remove `WebinarCTA` import and usage from `WebinarFoydaWebinar.tsx`
- The "Do'koningiz xavfsizligini ta'minlashga tayyormisiz?" section will be gone

### 3. Update WebinarBonuses - New texts and bolder design
- Card 1: **Avtomatlashtirish eksperti bilan uchrashuv** / Do'koningizni tizimlashtirish va foydani oshirish bo'yicha individual tavsiyalar
- Card 2: **Do'koningiz uchun amaliy qo'llanmalar** / Savdo nazorati, yo'qotishlarni kamaytirish va samaradorlikni oshirish bo'yicha tayyor yechimlar
- Make cards more colorful: gradient backgrounds, larger icons (w-10 h-10 or bigger), vibrant primary/accent colors instead of subtle borders

### 4. Move Speaker section before Registration
- Reorder sections in `WebinarFoydaWebinar.tsx` to:
  1. Hero
  2. Topics
  3. Bonuses
  4. Speaker
  5. Inline Registration

### Technical Details

**Files to modify:**
- `src/components/webinar/WebinarTopics.tsx` - add description paragraph, update to 3 titled topic cards
- `src/components/webinar/WebinarBonuses.tsx` - new texts, more colorful/vibrant card design with bigger icons
- `src/pages/WebinarFoydaWebinar.tsx` - remove WebinarCTA, reorder Speaker before Registration
