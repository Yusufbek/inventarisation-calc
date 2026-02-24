

# Two Changes: Remove Success Page Link + Add Audit Card to Homepage

## 1. Remove "Bosh sahifaga qaytish" link from success screen

In `src/pages/AuditFormPage.tsx`, remove the button/link at lines 186-191 that says "Bosh sahifaga qaytish". The success screen will just show the checkmark, confirmation title, and subtitle -- no navigation link.

## 2. Add Audit Ramadan Offer card to CalculatorHub

In `src/components/CalculatorHub.tsx`, add a new card under the "Amaliy Qo'llanmalar" section for the Audit Ramadan Offer. The uploaded golden "A" image will be copied to `src/assets/audit-icon.png` and used as the card icon. The card will link to `/audit/ramadan-offer`.

## Technical Details

### Files to modify:

1. **`src/pages/AuditFormPage.tsx`** -- Remove lines 186-191 (the "Bosh sahifaga qaytish" button)

2. **`src/components/CalculatorHub.tsx`** -- Add a new Card after the Inventarizatsiya PDF card, with the audit icon image, title "Audit Ramadan Offer", and a "Boshlash" button linking to `/audit/ramadan-offer`

### New asset:
- Copy `user-uploads://ChatGPT_Image_24_февр._2026_г._09_57_46.png` to `src/assets/audit-icon.png`

