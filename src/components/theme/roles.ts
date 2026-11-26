import { createGlobalStyle } from 'styled-components';

/**
 * Library UI roles using beta's exact hex values.
 * Global style on :where(:root) with zero specificity, so any app rule wins.
 *
 * These roles hold colors from the library's beta version that the design
 * system doesn't yet provide. They're centralized here (the ONLY place hex
 * literals are allowed in the library) so they can be updated or removed
 * when the design system covers them.
 */
export const UIRoles = createGlobalStyle`
  :where(:root) {
    /* Border roles */
    --ui-border: #8e8e8e5b;

    /* Focus roles */
    --ui-focus-outline: #10161a66;
    --ui-focus-ring: #137cbd;
    --ui-focus-glow: #137cbd4c;

    /* Interactive state roles */
    --ui-hover: #a7b6c24c;
    --ui-drag-active: #add8e6;
    --ui-item-selected: #68a7da99;
    --ui-area-active: #4bacef66;
    --ui-calendar-today: #bbdefb99;

    /* Text roles */
    --ui-text-subtle-primary: #808080;
    --ui-text-subtle-transparent: #313b4344;
    --ui-text-disabled-light: #d2d5d8;
    --ui-text-disabled-medium: #cccccc;
    --ui-fill-disabled: #ced9e080;

    /* Utility roles */
    --ui-skeleton: #10161a19;
    --ui-overlay-backdrop: #0000004c;
    --ui-overlay-preview: #a9a9a9b0;
    --ui-shadow: #10161a33;

    /* Active/background roles */
    --ui-pagination-active: #396faa;
    --ui-steps-active: #137cbd;
    --ui-muted-neutral-light: #e8e8e8;
    --ui-muted-neutral-medium: #dcdcdc;
    --ui-progress-pending: #eff6fd;
    --ui-success-background: #92d36e;

    /* Foreground roles */
    --ui-active-foreground: #ffffff;
    --ui-foreground-on-card: #182026;
    --ui-foreground-on-card-dark: #3d3e3e;
    --ui-muted-foreground-text-medium: #7b7d82;
    --ui-muted-foreground-text-dark: #5d5d5d;

    /* Additional roles */
    --ui-destructive: #ff0000;
    --ui-selection-primary: #0072ce;
    /* Beta's own colors per spot (split where beta used different colors) */
    --ui-error-text: #e21a1a;
    --ui-error-ring: #db3737;
    --ui-divider-light: #ebecedb5;
    --ui-dialog-border: #808080;
    --ui-list-border: #bbbdbf;
    --ui-upload-border: #5c7080;
    --ui-row-hover: #ebeced69;
    --ui-text-black: #000000;
    --ui-date-selected: #137cbd;
    --ui-text-subtle: #5c7080;
    --ui-icon-muted: #7486949c;
    --ui-pagination-text: #666666;
    --ui-input-border-strong: #bdbfc0;
    --ui-option-hover: #e1f5fecc;
    --ui-shadow-light: #10161a26;
    --ui-empty-fill: #f5f5f5;
    --ui-steps-line: #c7cbd3;
    --ui-steps-pending-fill: #e9ecf3;
    --ui-steps-active-text: #252628;
    --ui-label-background: #ffffff;
    --ui-input-ring: #10161a26;
    --ui-tabs-border: #dbdcdd;
  }
`;

export default UIRoles;
