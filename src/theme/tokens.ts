/**
 * welltrax-ui-components TypeScript token definitions
 * Values imported from @pakenergy/design-system
 * NO HEX LITERALS - all values from design system tokens.json
 */

import dsTokens from '@pakenergy/design-system/dist/tokens.json';

export interface BrandColors {
  navy: string;
  brightBlue: string;
  cyan: string;
  teal: string;
  white: string;
  red: string;
  orange: string;
  tan: string;
  charcoal: string;
  mediumGray: string;
  lightGray: string;
  green: string;
}

export interface SemanticColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  error: string;
  errorForeground: string;
  warning: string;
  warningForeground: string;
  success: string;
  successForeground: string;
  info: string;
  infoForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface Theme {
  brand: BrandColors;
  semantic: SemanticColors;
  chart: [string, string, string, string, string];
}

export const theme: Theme = {
  brand: {
    navy: dsTokens.brand.navy.$value,
    brightBlue: dsTokens.brand['bright-blue'].$value,
    cyan: dsTokens.brand.cyan.$value,
    teal: dsTokens.brand.teal.$value,
    white: dsTokens.brand.white.$value,
    red: dsTokens.brand.red.$value,
    orange: dsTokens.brand.orange.$value,
    tan: dsTokens.brand.tan.$value,
    charcoal: dsTokens.brand.charcoal.$value,
    mediumGray: dsTokens.brand['medium-gray'].$value,
    lightGray: dsTokens.brand['light-gray'].$value,
    green: dsTokens.brand.green.$value,
  },
  semantic: {
    primary: dsTokens.brand['bright-blue'].$value,
    primaryForeground: dsTokens.brand.white.$value,
    secondary: dsTokens.brand['light-gray'].$value,
    secondaryForeground: dsTokens.brand.charcoal.$value,
    background: dsTokens.brand['light-gray'].$value,
    foreground: dsTokens.brand.charcoal.$value,
    card: dsTokens.brand.white.$value,
    cardForeground: dsTokens.brand.charcoal.$value,
    popover: dsTokens.brand.white.$value,
    popoverForeground: dsTokens.brand.charcoal.$value,
    muted: dsTokens.brand['light-gray'].$value,
    mutedForeground: dsTokens.brand['medium-gray'].$value,
    accent: dsTokens.brand.teal.$value,
    accentForeground: dsTokens.brand.white.$value,
    destructive: dsTokens.brand.red.$value,
    destructiveForeground: dsTokens.brand.white.$value,
    error: dsTokens.brand.red.$value,
    errorForeground: dsTokens.brand.white.$value,
    warning: dsTokens.brand.orange.$value,
    warningForeground: dsTokens.brand.charcoal.$value,
    success: dsTokens.brand.green.$value,
    successForeground: dsTokens.brand.white.$value,
    info: dsTokens.brand.cyan.$value,
    infoForeground: dsTokens.brand.white.$value,
    border: dsTokens.brand['medium-gray'].$value,
    input: dsTokens.brand['medium-gray'].$value,
    ring: dsTokens.brand['bright-blue'].$value,
  },
  chart: [
    dsTokens.brand.navy.$value,
    dsTokens.brand['bright-blue'].$value,
    dsTokens.brand.cyan.$value,
    dsTokens.brand.teal.$value,
    dsTokens.brand.orange.$value,
  ],
};

export default theme;
