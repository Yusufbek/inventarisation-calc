

# Fixes: Revenue Mapping, UTM Persistence, and Landing Page UI Cleanup

## 1. Revenue Mapping for Webhook

In `AuditFormPage.tsx`, map the selected daily revenue option to a business size code before sending to the webhook:

- "500 000 so'mdan kamroq" -> `nano`
- "600 000 - 2 500 000 so'm" -> `micro`
- "2 500 000 - 25 000 000 so'm" -> `small`
- "25 000 000 dan ko'proq so'm" -> `medium`

The payload will send `dailyRevenue: "nano"` (etc.) instead of the display text.

## 2. UTM Persistence Fix

The current approach saves UTMs on the landing page and reads them on the form page. The issue is likely that `navigate("/audit/ramadan-offer/form")` does a client-side route change, but the `sessionStorage` save runs inside `useEffect` which may not complete before navigation.

Fix: Instead of relying solely on `sessionStorage` saved in `useEffect`, also pass UTMs forward by appending them to the navigation URL as query params. Update `goToForm()` in `AuditRamadanOffer.tsx` to forward the stored UTM params:

```
const goToForm = () => {
  const saved = sessionStorage.getItem("audit_utm_params");
  const params = saved ? new URLSearchParams(JSON.parse(saved)).toString() : "";
  navigate(`/audit/ramadan-offer/form${params ? `?${params}` : ""}`);
};
```

This ensures the form page always has UTMs available via URL params.

## 3. Landing Page UI Cleanup

Simplify and declutter all sections for a cleaner, more elegant look:

**AuditHero.tsx:**
- Remove the BillzLogo from the hero (it's redundant with the sticky timer bar area)
- Tighten text -- shorter, punchier subtext
- Remove the gradient overlay on the image
- Cleaner spacing

**AuditProblems.tsx:**
- Remove the extra paragraph below the cards ("Biz pulingiz aynan qayerdan...")
- Keep it minimal: headline, cards, CTA

**AuditServices.tsx:**
- Remove the "Ramazon taklifi" small text line (redundant)
- Keep the price crossing and BEPUL badge clean

**AuditForm.tsx (bottom CTA section):**
- Simplify to just a bold headline and CTA button
- Remove the extra paragraph about "Ramazon oyi davomida..."
- Remove the "RAMAZON TASHABBUSI" badge -- keep it clean with just headline + button

**AuditTrust.tsx:**
- Keep as is (already clean)

## Technical Details

### Files to modify (4):

1. **`src/pages/AuditFormPage.tsx`**
   - Add revenue-to-code mapping (`revenueMap` object)
   - Use mapped value in payload instead of display text

2. **`src/pages/AuditRamadanOffer.tsx`**
   - Update `goToForm()` to forward UTM params via URL query string

3. **`src/components/audit/AuditHero.tsx`**
   - Remove BillzLogo
   - Remove image gradient overlay
   - Tighten spacing

4. **`src/components/audit/AuditProblems.tsx`**
   - Remove extra paragraph text below cards

5. **`src/components/audit/AuditServices.tsx`**
   - Remove "Ramazon taklifi" text line

6. **`src/components/audit/AuditForm.tsx`**
   - Simplify to just headline + CTA button (remove badge and extra paragraph)

