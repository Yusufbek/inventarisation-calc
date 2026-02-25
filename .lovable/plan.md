

# Filter Ineligible Store Segments in Audit Form

## What changes

When a user completes all 6 steps but their selected store segment is one of the ineligible categories ("Dorixona", "Kafe va restoran", "Ishlab chiqarish"), instead of sending the webhook and showing the success screen, they will see a different message explaining their store type is not eligible for the audit.

## Technical details

**File: `src/pages/AuditFormPage.tsx`**

1. Define an array of ineligible segments:
   ```
   const INELIGIBLE_SEGMENTS = ["Dorixona", "Kafe va restoran", "Ishlab chiqarish"];
   ```

2. Add a new state `isIneligible` (boolean, default false).

3. In `handleNext`, when `step === TOTAL_STEPS`:
   - Check if `storeSegment` is in `INELIGIBLE_SEGMENTS`
   - If yes: set `isIneligible = true` (no webhook, no pixel events)
   - If no: call `handleSubmit()` as before

4. Add an early return for `isIneligible` state (similar to the success screen) showing:
   - An `XCircle` or `AlertCircle` icon (from lucide-react)
   - Title: "Afsuski, sizning do'koningiz audit uchun mos emas"
   - Subtitle: "Hozircha biz faqat chakana savdo do'konlari uchun audit xizmatini taqdim etamiz."

No webhook call, no pixel event -- just a static rejection screen.

