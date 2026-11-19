# Design System Gaps - Library Component Colors

This document tracks colors used by library components that have no ideal match in the design system.

## Gap: Light disabled/inactive colors for UI elements

**Issue:**
The design system semantic color tokens focus on enabled/active states. Disabled states need lighter variants of text and borders to appear faded.

**Original disabled colors:**
- `#d2d5d8` - light disabled text (RGB 210, 213, 216)
- `#ccc` - light disabled icons (RGB 204, 204, 204)  
- `#dcdcdc` - disabled input backgrounds (RGB 220, 220, 220)

**Available DS tokens for comparison:**
- `--color-foreground` (#353434) - dark charcoal for body text
- `--color-muted-foreground` (#404A53) - darker gray for secondary text  
- `--brand-pale-teal` (#B9D5D3) - light blue-gray (RGB 185, 213, 211), closest to disabled grays

**Current mapping (using pale-teal as best fit):**
- Form input disabled backgrounds: `--brand-pale-teal` (#B9D5D3)
- Steps inactive states: `--brand-pale-teal` (#B9D5D3) 
- Note: pale-teal has a slight teal tint vs. the neutral grays originally used

**Components affected:**
- Form/Inputs/style.tsx - disabled input backgrounds
- Steps/StepsUpperBar - inactive step indicators

**Recommendation:**
Add semantic disabled state tokens that are light neutral grays:
- `--color-disabled-foreground` around RGB(200, 203, 206) for disabled text
- `--color-disabled-background` around RGB(220, 220, 220) for disabled inputs
These would be neutral (no tint) unlike pale-teal's blue-green hint.

**Usage count:** 5 components use disabled states

---

## Non-gaps (Resolved)

These were initially considered gaps but have acceptable DS mappings:

- **Semi-transparent overlay** (#a9a9a9b0 in FileUpload): Mapped to `--brand-medium-gray` with opacity. This works because the overlay purpose (dim the preview) is achieved with the brand gray.
