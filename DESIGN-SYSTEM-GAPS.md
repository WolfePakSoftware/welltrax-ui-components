# Colors the design system doesn't cover (library)

The design system serves the whole organization, so the library uses it as it is and never adds to it. Where it has no exact color for a library need, the library uses beta's exact hex values. These choices are centralized in src/components/theme/roles.ts as --ui-* roles (the ONLY place hex literals are allowed), so they can be maintained in one place and removed later when the design system covers them.

## UI roles (src/components/theme/roles.ts)

The library defines 30 --ui-* roles using beta's exact hex values. Components use these roles, never inline colors. Each role holds a specific color from beta that serves a distinct visual purpose.

### Role categories

- **Borders** (2): --ui-border, --ui-input-border
- **Focus states** (3): --ui-focus-outline, --ui-focus-ring, --ui-focus-glow
- **Interactive states** (5): --ui-hover, --ui-drag-active, --ui-item-selected, --ui-area-active, --ui-calendar-today
- **Text** (5): --ui-text-subtle-primary, --ui-text-subtle-transparent, --ui-text-disabled-light, --ui-text-disabled-medium, --ui-fill-disabled
- **Utility** (4): --ui-skeleton, --ui-overlay-backdrop, --ui-overlay-preview, --ui-shadow
- **Backgrounds** (6): --ui-pagination-active, --ui-steps-active, --ui-muted-neutral-light, --ui-muted-neutral-medium, --ui-progress-pending, --ui-success-background
- **Foreground** (4): --ui-active-foreground, --ui-foreground-on-card, --ui-foreground-on-card-dark, --ui-muted-foreground-text-medium, --ui-muted-foreground-text-dark

Roles are split where beta used visibly different colors (CIEDE2000 > 2.0). No color merges are allowed over this threshold.
