
## Add Badge to Magnet Calculator Hero Page

Adding a badge-style text element to the hero/landing page of the Magnet Calculator to indicate this tool is specifically for retail store owners.

### What Will Be Added

A badge with the text **"Faqat Chakana Savdo do'kon egalari uchun"** (Only for retail store owners) will be placed on the hero page, positioned above the main heading.

### Visual Result

```text
┌─────────────────────────────────────────────────┐
│                                                 │
│              [BILLZ CALCULATOR Logo]            │
│                                                 │
│           ┌─────────────────────────┐           │
│           │      [Hero Image]       │           │
│           └─────────────────────────┘           │
│                                                 │
│  ╭──────────────────────────────────────────╮   │
│  │ Faqat Chakana Savdo do'kon egalari uchun │   │  ← NEW BADGE
│  ╰──────────────────────────────────────────╯   │
│                                                 │
│     Inventarizatsiyasiz har oy qancha           │
│          pul yo'qotyapsiz?                      │
│                                                 │
│     5 ta savolga javob bering...                │
│                                                 │
│         [Hisoblashni boshlash]                  │
└─────────────────────────────────────────────────┘
```

### Technical Changes

**File: `src/components/HeroSection.tsx`**

1. Add import for the Badge component
2. Insert a Badge element above the heading (inside the `space-y-6` div)
3. Style the badge with:
   - `variant="secondary"` for the subtle gray/blue background
   - Rounded pill shape (default from Badge component)
   - Slightly larger padding for better visibility: `px-4 py-1.5`
   - Appropriate text size: `text-sm`

### Design Notes

- Uses the existing Badge component which follows the project's corporate SaaS aesthetic
- The `secondary` variant provides a subtle, professional look that doesn't compete with the main heading
- The badge will be centered to match the overall text alignment of the hero section
