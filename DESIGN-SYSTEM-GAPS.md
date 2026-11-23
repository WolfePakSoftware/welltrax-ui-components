# Colors the design system doesn't cover (library)

The design system serves the whole organization, so the library uses it as it is and never adds to it. Where it has no exact color for a library need, the library uses the nearest existing token or a tint of one, and the choice is listed here so it can be removed later.

## Disabled states

The design system has no disabled text or disabled background token; its `color.muted` token is described for "disabled states".

- Disabled field and date icon fill: `var(--color-muted)` (library PR #23; before that, foreground tints of 10% and 17% over the card).
- Disabled dates: the normal text color at `opacity: 0.5`, as the design system demos do (`opacity-50`).

## Semi-transparent overlay

- FileUpload preview overlay: `--brand-medium-gray` with opacity, an existing token.
