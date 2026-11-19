# Design System Gaps - Library Component Colors

This document tracks colors used by library components that have no ideal match in the design system.

## Gap: Light Disabled/Inactive Gray

**Original colors:**
- `#d2d5d8` - DayPicker disabled days (RGB 210, 213, 216)
- `#ccc` - Pagination disabled arrows (RGB 204, 204, 204)

**Issue:**
The design system has two grays for text:
- `--color-foreground` (#353434) - dark charcoal for body text
- `--color-muted-foreground` (#404A53) - darker gray for secondary text
- `--color-muted` (#F2F9FC) - very light gray for backgrounds

There is no "light but visible" gray suitable for disabled text. Disabled elements should appear faded/lighter than enabled text to indicate their inactive state.

**Current mapping:**
- DayPicker disabled days: `--brand-medium-gray` (#404A53) - darker than original, may not look sufficiently disabled
- Pagination disabled arrows: `--color-muted-foreground` (#404A53) - same issue

**Recommendation:**
Add a semantic token like `--color-disabled-foreground` with a value around RGB(200, 203, 206) - light enough to appear disabled but dark enough to be visible.

**Components affected:**
- Form/Inputs/style.tsx - DayPicker disabled days
- Pagination/styles.tsx - disabled navigation arrows

**Usage count:** 2 components

---

## Non-gaps (Resolved)

These were initially considered gaps but have acceptable DS mappings:

- **Semi-transparent overlay** (#a9a9a9b0 in FileUpload): Mapped to `--brand-medium-gray` with opacity. This works because the overlay purpose (dim the preview) is achieved with the brand gray.
