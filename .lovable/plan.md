

# Enhance "Nimalarni o'rganasiz?" Section UI

## Overview
Make the topics section more visually appealing with unique colors per card, larger icons, subtle gradients, numbered badges, and tighter descriptions.

## Changes to `src/components/webinar/WebinarTopics.tsx`

### 1. Unique color scheme per card
Each of the 3 cards gets its own color identity:
- **Card 1 (Kassa)**: Blue/primary gradient background (`from-primary/10 to-primary/5`), blue icon
- **Card 2 (Mulk himoyasi)**: Green/success gradient (`from-emerald-50 to-emerald-50/50`), green icon
- **Card 3 (Hisob-kitob)**: Amber/orange gradient (`from-amber-50 to-amber-50/50`), amber icon

### 2. Larger, bolder icon containers
- Increase icon container from `w-10 h-10` to `w-14 h-14`
- Increase icon size from `w-5 h-5` to `w-7 h-7`
- Add a numbered step badge (01, 02, 03) in the top-right corner of each card for visual structure

### 3. Card styling upgrades
- Add gradient backgrounds instead of flat `bg-card`
- Add a colored left border accent (`border-l-4`) matching each card's theme color
- Add subtle hover shadow transition (`hover:shadow-lg`)
- Slightly increase padding for breathing room

### 4. Shorter description texts
Trim descriptions to be punchier:
1. "Chetlab sotish va kassadagi kamomadni aniqlash hamda bartaraf etish usullari."
2. "O'g'rilik va yashirin yo'qotishlarning oldini olish bo'yicha amaliy choralar."
3. "Narx va miqdor bilan bog'liq firibgarliklarni aniqlash usullari."

### 5. Section background
- Change from `bg-secondary/30` to white (`bg-background`) for a cleaner canvas that lets the colorful cards pop

### Technical Details
**File to modify:** `src/components/webinar/WebinarTopics.tsx`
- Update the `topics` array to include per-card color config (gradient, iconBg, iconColor, borderColor, step number)
- Update card JSX to use these per-card styles
- Shorten description strings
- Enlarge icon containers

