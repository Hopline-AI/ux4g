import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  size?: "small" | "default" | "large";
  state?: "default" | "error" | "success";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  required?: boolean;
}

/**
 * UX4G Input — single-line text field with optional label, helper,
 * leading/trailing adornments and validation state.
 */
export function Input({
  label,
  helperText,
  type = "text",
  size = "default",
  state = "default",
  disabled = false,
  required = false,
  iconLeft = null,
  iconRight = null,
  id,
  className = "",
  style = {},
  ...rest
}: InputProps) {
  const generated = React.useId();
  const fid = id || generated;
  const h = ({ small: 36, default: 43, large: 48 } as Record<string, number>)[size];
  const invalid = state === "error";
  const stateColor = state === "success" ? "var(--color-success)" : state === "error" ? "var(--color-danger)" : "var(--color-text-muted)";

  return (
    <div className={`ux-field-group ${className}`} style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <label htmlFor={fid} style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)", letterSpacing: "0.1px" }}>
          {label}{required && <span style={{ color: "var(--color-danger)", marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {iconLeft && <span aria-hidden="true" style={{ position: "absolute", left: 12, display: "inline-flex", color: "var(--neutral-600)", fontSize: 20, pointerEvents: "none" }}>{iconLeft}</span>}
        <input
          id={fid}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          className="ux-field"
          style={{
            width: "100%", height: h, boxSizing: "border-box",
            padding: `0 ${iconRight ? 40 : 12}px 0 ${iconLeft ? 40 : 12}px`,
            fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--color-text)",
            background: disabled ? "var(--neutral-100)" : "var(--white)",
            border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)",
            outline: "none", transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          }}
          {...rest}
        />
        {iconRight && <span aria-hidden="true" style={{ position: "absolute", right: 12, display: "inline-flex", color: "var(--neutral-600)", fontSize: 20, pointerEvents: "none" }}>{iconRight}</span>}
      </div>
      {helperText && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: "16px", letterSpacing: "0.4px", color: stateColor }}>{helperText}</span>
      )}
    </div>
  );
}

export default Input;
