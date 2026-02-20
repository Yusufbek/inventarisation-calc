

# Update Success Text and Redirect to New Success Page

## 1. Update success message text
Change the text in both `WebinarInlineRegistration.tsx` (line 167) and `WebinarRegistrationPopup.tsx` (line 221) from:
> "Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz. Telegram guruhimizga qo'shiling:"

to:
> "Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz. Vebinar bo'lib o'tadigan telegram guruhga qo'shilib oling"

## 2. Create a dedicated success page
**New file:** `src/pages/WebinarSuccess.tsx`
- A standalone page with the success UI (green checkmark, congratulations message, updated text, Telegram button)
- Includes the `WebinarFinished` pixel and CAPI tracking on Telegram button click
- Clean, centered layout matching the current success state design

## 3. Register the route
**File:** `src/App.tsx`
- Add route: `/webinar/foyda-webinar/success` pointing to the new `WebinarSuccess` page

## 4. Redirect on successful submission instead of showing inline success
**File:** `src/components/webinar/WebinarInlineRegistration.tsx`
- Import `useNavigate` from `react-router-dom`
- On successful webhook response (`data.access === "granted"`), call `navigate("/webinar/foyda-webinar/success")` instead of `setIsSuccess(true)`
- Remove the inline success state UI and `isSuccess` state (no longer needed)

**File:** `src/components/webinar/WebinarRegistrationPopup.tsx`
- Same change: import `useNavigate`, redirect to `/webinar/foyda-webinar/success` on success
- Remove inline success state UI and `isSuccess` state

### Technical Summary
**Files to create:**
- `src/pages/WebinarSuccess.tsx` -- standalone success page with Telegram CTA and tracking

**Files to modify:**
- `src/App.tsx` -- add `/webinar/foyda-webinar/success` route
- `src/components/webinar/WebinarInlineRegistration.tsx` -- navigate to success page on submit, remove inline success UI
- `src/components/webinar/WebinarRegistrationPopup.tsx` -- navigate to success page on submit, remove inline success UI
