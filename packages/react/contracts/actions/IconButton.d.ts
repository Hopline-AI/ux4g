import * as React from "react";

/** UX4G IconButton — square, icon-only action. Always pass `aria-label`. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "neutral" */
  variant?: "neutral" | "primary" | "danger";
  /** @default "ghost" */
  appearance?: "ghost" | "tonal" | "filled";
  /** @default "default" */
  size?: "small" | "default" | "large";
  /** Accessible name — required for icon-only controls. */
  "aria-label": string;
  children?: React.ReactNode;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
export default IconButton;
