import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "danger";
  appearance?: "filled" | "outlined" | "text" | "tonal";
  size?: "small" | "default" | "large";
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

type Tone = { base: string; hover: string; active: string; tint: string; on: string };

/**
 * UX4G Button — the primary call-to-action primitive.
 * Variant sets the colourway; appearance sets the fill treatment.
 */
export function Button({
  children,
  variant = "primary",
  appearance = "filled",
  size = "default",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  className = "",
  style = {},
  ...rest
}: ButtonProps) {
  const tone: Tone = ({
    primary: { base: "var(--violet-600)", hover: "var(--violet-700)", active: "var(--violet-800)", tint: "var(--violet-50)", on: "var(--white)" },
    success: { base: "var(--success-600)", hover: "var(--success-700)", active: "var(--success-800)", tint: "var(--success-50)", on: "var(--white)" },
    danger:  { base: "var(--danger-500)",  hover: "var(--danger-600)",  active: "var(--danger-700)",  tint: "var(--danger-50)",  on: "var(--white)" },
  } as Record<string, Tone>)[variant];

  const sizes = ({
    small:   { height: 32, padding: "6px 16px", font: 14 },
    default: { height: 40, padding: "10px 24px", font: 16 },
    large:   { height: 48, padding: "12px 28px", font: 16 },
  } as Record<string, { height: number; padding: string; font: number }>)[size];

  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    height: sizes.height, padding: sizes.padding, width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: sizes.font, lineHeight: 1.5,
    letterSpacing: "0.15px", borderRadius: "var(--radius-md)", border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer", whiteSpace: "nowrap", userSelect: "none",
    transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
    ["--btn-base" as any]: tone.base, ["--btn-hover" as any]: tone.hover, ["--btn-active" as any]: tone.active,
    ["--btn-tint" as any]: tone.tint, ["--btn-on" as any]: tone.on,
  };

  const looks: React.CSSProperties = ({
    filled:   { background: "var(--btn-base)", color: "var(--btn-on)" },
    outlined: { background: "transparent", color: "var(--btn-base)", borderColor: "var(--btn-base)" },
    text:     { background: "transparent", color: "var(--btn-base)" },
    tonal:    { background: "var(--btn-tint)", color: "var(--btn-base)" },
  } as Record<string, React.CSSProperties>)[appearance];

  const disabledLook: React.CSSProperties = disabled
    ? (appearance === "filled"
        ? { background: "var(--neutral-200)", color: "var(--neutral-500)", borderColor: "transparent" }
        : { background: "transparent", color: "var(--neutral-400)", borderColor: appearance === "outlined" ? "var(--neutral-300)" : "transparent" })
    : {};

  return (
    <button
      type={type}
      disabled={disabled}
      data-appearance={appearance}
      className={`ux-btn ${className}`}
      style={{ ...base, ...looks, ...disabledLook, ...style }}
      {...rest}
    >
      {iconLeft && <span className="ux-btn__icon" aria-hidden="true" style={{ display: "inline-flex", fontSize: "1.25em" }}>{iconLeft}</span>}
      {children}
      {iconRight && <span className="ux-btn__icon" aria-hidden="true" style={{ display: "inline-flex", fontSize: "1.25em" }}>{iconRight}</span>}
    </button>
  );
}

export default Button;
