import { tokens } from "./tokens.generated";

export { tokens };
export type { TokenName } from "./tokens.generated";

/** Ergonomic, typed view over the flat token map. */
export const theme = {
  color: {
    primary: tokens["color-primary"],
    primaryHover: tokens["color-primary-hover"],
    primaryActive: tokens["color-primary-active"],
    secondary: tokens["color-secondary"],
    success: tokens["color-success"],
    danger: tokens["color-danger"],
    warning: tokens["color-warning"],
    info: tokens["color-info"],
    text: tokens["color-text"],
    textMuted: tokens["color-text-muted"],
    surface: tokens["color-surface"],
    border: tokens["color-border"],
    focus: tokens["color-focus"],
  },
  space: {
    1: tokens["space-1"], 2: tokens["space-2"], 3: tokens["space-3"],
    4: tokens["space-4"], 5: tokens["space-5"], 6: tokens["space-6"],
    8: tokens["space-8"], 10: tokens["space-10"],
  },
  radius: {
    sm: tokens["radius-sm"], md: tokens["radius-md"], lg: tokens["radius-lg"],
    xl: tokens["radius-xl"], full: tokens["radius-full"],
  },
  shadow: {
    xs: tokens["shadow-xs"], md: tokens["shadow-md"], xl: tokens["shadow-xl"],
  },
  font: {
    sans: tokens["font-sans"], ui: tokens["font-ui"], mono: tokens["font-mono"],
  },
} as const;
