

# Audit Page: Mobile Fixes + Multi-Step Form

## 1. Mobile UI Fixes

Fix responsive issues across all audit sections:

- **AuditStickyTimer**: Make text smaller on mobile, stack vertically or truncate, ensure "Faqat 3 ta joy qoldi" shows on mobile too
- **AuditHero**: Reduce heading size on mobile, ensure image doesn't overflow, tighten spacing
- **AuditProblems**: Ensure cards stack cleanly on small screens with proper padding
- **AuditServices**: Tighten mobile spacing, ensure price badge wraps properly
- **AuditTrust**: Adjust padding/spacing for mobile
- **AuditForm section header**: Keep as intro text on the landing page but CTA buttons now navigate to the form page

## 2. Multi-Step Form on Separate Page

Instead of an inline form at the bottom, CTA buttons will navigate to a new route (`/audit/ramadan-offer/form`) that shows a one-question-per-page wizard with 6 steps:

**Step 1**: Ismingiz (text input)
**Step 2**: Telefon raqamingiz (phone input with +998 prefix)
**Step 3**: Do'koningiz nomi (text input)
**Step 4**: Do'koningiz segmenti (single select from 14 options: Kiyim do'koni, Poyabzal do'koni, Oziq-ovqat do'koni, Qurilish mollari do'koni, Kosmetika do'koni, Aksessuar do'koni, Elektronika do'koni, Uy-ro'zg'or buyumlari, Dorixona, Kafe va restoran, Ishlab chiqarish, Ombor, Boshqa)
**Step 5**: Kunlik tushum (taxminan) qancha? (single select: 500 000 so'mdan kamroq / 600 000 - 2 500 000 so'm / 2 500 000 - 25 000 000 so'm / 25 000 000 dan ko'proq so'm)
**Step 6**: Viloyat (single select from existing 14 regions)

Each step shows a progress bar, the question, input field, and a "Keyingisi" (Next) button. The last step shows "Bepul auditga yozilish" as submit.

On success, show a confirmation screen within the same page.

## 3. Landing Page CTA Changes

All "Bepul auditga yozilish" buttons on the landing page will navigate to `/audit/ramadan-offer/form` instead of scrolling to a bottom form. The bottom form section header text (Ramadan urgency copy) stays as a final CTA section but with a button that also navigates to the form page.

## Technical Details

### Files to create (1):
- `src/pages/AuditFormPage.tsx` -- multi-step form page with 6 steps, progress bar, one question per page, submission logic, success state

### Files to modify (7):
- `src/App.tsx` -- add route `/audit/ramadan-offer/form`
- `src/pages/AuditRamadanOffer.tsx` -- change `scrollToForm` to `useNavigate` to form page
- `src/components/audit/AuditHero.tsx` -- mobile spacing/sizing fixes, change onCtaClick type
- `src/components/audit/AuditStickyTimer.tsx` -- mobile text sizing fixes
- `src/components/audit/AuditProblems.tsx` -- mobile padding fixes
- `src/components/audit/AuditServices.tsx` -- mobile spacing fixes
- `src/components/audit/AuditForm.tsx` -- simplify to just the CTA section with a navigation button (remove inline form fields)

### Form payload (updated):
```json
{
  "name": "...",
  "phone": "+998...",
  "storeName": "...",
  "storeSegment": "...",
  "dailyRevenue": "...",
  "region": "...",
  "type": "ramadan-audit",
  "utm_source": "...",
  ...
}
```

### Tracking:
- Facebook Pixel `Lead` event on successful submission (same as current)
- CAPI event on submission (same as current)

