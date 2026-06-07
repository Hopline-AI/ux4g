import * as React from "react";

/** UX4G Progress — linear bar or circular ring; pass `value` 0–100, or omit for indeterminate. */
export interface ProgressProps {
  value?: number;
  variant?: "primary" | "success" | "danger" | "warning";
  size?: "sm" | "md";
  showValue?: boolean;
  circular?: boolean;
}

export declare function Progress(props: ProgressProps): JSX.Element;
export default Progress;
