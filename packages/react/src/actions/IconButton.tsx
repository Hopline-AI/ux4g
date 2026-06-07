import React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "neutral" | "primary" | "danger";
  appearance?: "ghost" | "tonal" | "filled";
  size?: "small" | "default" | "large";
  "aria-label": string;
  children?: React.ReactNode;
}

/**
 * UX4G IconButton — a square, icon-only action (close, menu, more, edit).
 * Pass a Material Symbols span (or any node) as children.
 */
export function IconButton({
  children,
  variant = "neutral",
  appearance = "ghost",
  size = "default",
  disabled = false,
  "aria-label": ariaLabel,
  className = "",
  style = {},
  ...rest
}: IconButtonProps) {
  const tone = ({
    neutral: { base: "var(--neutral-700)", on: "var(--white)", solid: "var(--neutral-800)", tint: "var(--neutral-100)", hover: "var(--neutral-100)" },
    primary: { base: "var(--violet-600)", on: "var(--white)", solid: "var(--violet-600)", tint: "var(--violet-50)", hover: "var(--violet-50)" },
    danger:  { base: "var(--danger-500)", on: "var(--white)", solid: "var(--danger-500)", tint: "var(--danger-50)", hover: "var(--danger-50)" },
  } as Record<string, { base: string; on: string; solid: string; tint: string; hover: string }>)[variant];

  const dim = ({ small: 32, default: 40, large: 48 } as Record<string, number>)[size];

  const looks: React.CSSProperties = ({
    ghost:  { background: "transparent", color: "var(--ib-color)" },
    tonal:  { background: tone.tint, color: "var(--ib-color)" },
    filled: { background: tone.solid, color: tone.on },
  } as Record<string, React.CSSProperties>)[appearance];

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      className={`ux-iconbtn ${className}`}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: dim, height: dim, flex: "none", padding: 0,
        border: "none", borderRadius: "var(--radius-md)",
        fontSize: size === "small" ? 18 : 22, lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--duration-fast) var(--ease-standard)",
        ["--ib-color" as any]: tone.base, ["--ib-hover" as any]: tone.hover,
        ...looks, ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;
