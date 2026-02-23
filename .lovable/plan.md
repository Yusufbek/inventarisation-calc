

# Ramadan Audit Landing Page

## Overview
Create a new high-conversion landing page at `/audit/ramadan-offer` with a countdown timer, problem/outcome framing, service details, trust signals, and a lead capture form. All CTAs scroll to the bottom form which collects name, phone, store revenue, and region.

## Page Sections

### 1. Hero Section
- Store interior image on the right (reuse `/images/webinar/hero-specialist.jpg` or a new store image like `/images/clothing-shop.png`)
- Headline: "SHU RAMAZONDA DO'KONINGIZNI BEPUL AUDIT QILAMIZ"
- Subtext about identifying hidden losses
- "Kuniga faqat 5 ta do'kon tanlab olinadi" urgency line
- CTA button scrolls to form
- Trust line: "5000 dan ortiq do'kon egalari bizga ishonadi"

### 2. Sticky Timer Bar (fixed on scroll)
- Countdown timer starting from a set duration (e.g., resets daily or counts down to midnight)
- Shows remaining spots: "Faqat 3 ta joy qoldi"
- Fixed to top of screen on scroll with high z-index

### 3. Problem to Outcome Section
- Headline: "Savdo bor-u... lekin foyda yo'qmi?"
- Four problem cards with icons (lock, money, tag, chart)
- Bottom text about showing where money leaks
- CTA button

### 4. What You Get Section
- Five audit service items with icons
- Crossed-out price ($100) with "BEPUL" Ramadan offer
- CTA button

### 5. Trust and Expertise Section
- Headline: "Nima uchun do'kon egalari auditlarimizga ishonadi?"
- Four trust points with checkmarks
- Optional team/specialist images

### 6. Final CTA + Lead Form
- Ramadan-themed header with moon icon
- Urgency copy about 5 daily audits
- Form fields: Name, Phone (+998 prefix), Store Revenue (dropdown/select), Region (dropdown/select)
- Submit button: "Bepul auditga yozilish"
- Sends data to the same webhook pattern used in webinar pages
- On success: show thank you message or redirect

## Technical Details

### Files to create (7):
- `src/pages/AuditRamadanOffer.tsx` -- main page component, composes all sections
- `src/components/audit/AuditHero.tsx` -- hero section with image, headline, CTA
- `src/components/audit/AuditStickyTimer.tsx` -- fixed countdown bar with timer logic (useState + useEffect interval)
- `src/components/audit/AuditProblems.tsx` -- problem/outcome section with 4 pain points
- `src/components/audit/AuditServices.tsx` -- what you get section with 5 items + pricing
- `src/components/audit/AuditTrust.tsx` -- trust/expertise section with checkmarks
- `src/components/audit/AuditForm.tsx` -- final CTA + lead capture form (name, phone, revenue select, region select)

### Files to modify (1):
- `src/App.tsx` -- add route `/audit/ramadan-offer` pointing to `AuditRamadanOffer`

### Form Submission
- Webhook URL: same n8n endpoint pattern (`https://n8n-m2.makebillz.top/webhook/...`) or a new one -- will use the existing webhook for now and include audit-specific fields
- Payload: `{ name, phone, storeRevenue, region, type: "ramadan-audit", ...utmParams }`
- UTM parameter collection (same pattern as webinar pages)
- Phone validation with +998 prefix (same pattern)
- Facebook Pixel tracking on page view and form submission

### Countdown Timer Logic
- Timer counts down to the end of the current day (midnight)
- Resets daily to create ongoing urgency
- Uses `useState` + `setInterval` in `useEffect`

### Revenue and Region Options
- Revenue options: predefined ranges (e.g., "50 mln gacha", "50-200 mln", "200-500 mln", "500 mln dan ortiq")
- Region options: Uzbekistan regions (Toshkent, Samarqand, Buxoro, etc.)

### Styling
- Follows existing design system (Tailwind + CSS variables)
- Ramadan theme: moon/crescent accents in the final CTA section
- Mobile-first responsive design
- Sticky timer uses `fixed top-0` positioning with backdrop blur

