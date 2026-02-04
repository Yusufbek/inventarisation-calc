

## Create PDF Download Landing Page (Inventarizatsiya PDF)

A single-page PDF download landing page with a hero image at top, followed by text content below, and a sticky CTA. The flow mirrors the Magnet Calculator pattern for webhook submission and Telegram redirect.

### Page Layout

```text
+--------------------------------------------------+
|              [Hero Image - full width]            |
|                                                   |
+--------------------------------------------------+
|                                                   |
|                   Bepul PDF                       |  <- primary color tag
|                                                   |
|   4000+ o'zbek do'konlari to'g'ri                |
|   inventarizatsiya qilib, millionlab             |  <- headline
|   so'm yo'qotishni qanday to'xtatdi              |
|                                                   |
|              [Yuklab olish]                       |  <- CTA button
+--------------------------------------------------+
|                                                   |
|            Nimalar ichida?                        |  <- section heading
|                                                   |
|   [✓] Tovar sanash tartibi                       |
|       (kim, qachon, qanday)                      |
|                                                   |
|   [✓] Xatolarni oldindan yopish:                 |
|       nazorat ro'yxati                           |
|                                                   |
|   [✓] Sanab bo'lgandan keyin:                    |
|       farqni topish va tuzatish                  |
|                                                   |
+--------------------------------------------------+
|                                                   |
|      [STICKY CTA: Yuklab olish]                  |  <- always visible at bottom
|                                                   |
+--------------------------------------------------+
```

### User Flow

1. User lands on `/webinar/inventarizatsiya-pdf`
2. User clicks "Yuklab olish" CTA (either in content or sticky bar)
3. Loading state appears ("Tayyorlanmoqda...")
4. Webhook sends `{ pdf_type: "inventarizatsiya", ...utmParams }`
5. Webhook responds with `telegram_url`
6. Success screen shows with Telegram button (same style as Magnet Calculator)
7. User clicks to go to Telegram

### Success Screen (Same as Magnet Calculator)

```text
+--------------------------------------------------+
|               [BILLZ Calculator Logo]             |
|                                                   |
|                [Telegram Icon]                   |  <- blue circle with Telegram icon
|                                                   |
|              PDF tayyor!                          |  <- headline
|                                                   |
|    Telegram botda PDF yuklab olishingiz mumkin   |  <- description
|                                                   |
|           [Telegram botga o'tish]                |  <- blue button, redirects user
+--------------------------------------------------+
```

### Technical Implementation

**Files to Create:**

1. **`src/pages/WebinarInventarizatsiyaPdf.tsx`**
   - Main page component with states: default, loading, success (telegram URL received)
   - Webhook submission logic matching Magnet Calculator pattern
   - PageView tracking on mount
   - `PDFDownload` pixel event on Telegram button click

2. **`src/components/webinar/PdfHero.tsx`**
   - Hero image at top (full width, rounded corners)
   - "Bepul PDF" tag (primary color)
   - Headline text
   - CTA button

3. **`src/components/webinar/PdfContent.tsx`**
   - "Nimalar ichida?" section heading
   - Three bullet points with checkmark icons
   - Clean card-style layout

4. **`src/components/webinar/PdfStickyCta.tsx`**
   - Fixed at bottom of viewport
   - Always visible (no scroll-based show/hide)
   - Same styling as other sticky CTAs in the project

**Files to Modify:**

1. **`src/App.tsx`**
   - Add route: `/webinar/inventarizatsiya-pdf`

**Assets to Copy:**

1. Hero image → `src/assets/pdf-hero-inventory.webp`
2. PDF file → `public/pdfs/inventarizatsiya-guide.pdf`
   - Accessible at: `https://inventarisation-calc.lovable.app/pdfs/inventarizatsiya-guide.pdf`

### Webhook Details

**URL:** `https://n8n-m2.makebillz.top/webhook/f88e72ec-197c-401a-8028-6d9cf5ee188d` (same as Magnet Calculator)

**Payload:**
```json
{
  "pdf_type": "inventarizatsiya",
  "utm_source": "...",
  "utm_medium": "...",
  "utm_campaign": "...",
  "utm_term": "...",
  "utm_content": "...",
  "fbclid": "..."
}
```

**Expected Response:**
```json
{
  "telegram_url": "https://t.me/..."
}
```

### Pixel/Analytics Events

- `pageView()` on page mount
- `eventCustom("PDFDownload", { content_name: "Inventarizatsiya PDF" })` when user clicks Telegram button (with CAPI event for deduplication)

### Styling Notes

- Follows "Clean Corporate SaaS" aesthetic
- Hero image with rounded corners (24-32px radius)
- Primary blue for accents and CTA buttons
- White/light grey backgrounds
- Soft shadows on cards
- Pill-style CTA button (50px radius)

