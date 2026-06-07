import * as React from "react";

/** UX4G Badge — status pill or dot. Use `appearance="dot"` for a bare indicator. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  variant?: "neutral" | "primary" | "success" | "danger" | "warning" | "info";
  /** @default "tonal" */
  appearance?: "tonal" | "solid" | "dot";
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
export default Badge;
