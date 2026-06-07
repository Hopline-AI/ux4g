import React from "react";

export interface SpinnerProps {
  /** Pixel diameter. @default 24 */
  size?: number;
  /** Stroke colour (CSS). Defaults to the primary colour. */
  color?: string;
  label?: string;
}

/** UX4G Spinner — indeterminate loading indicator. */
export function Spinner({ size = 24, color = "var(--color-primary)", label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} style={{ display: "inline-flex", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: "ux-spinner 0.8s linear infinite" }}>
        <circle cx="12" cy="12" r="9" stroke="var(--neutral-200)" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <style>{"@keyframes ux-spinner{to{transform:rotate(360deg)}}"}</style>
    </span>
  );
}

export default Spinner;
