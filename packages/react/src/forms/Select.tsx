import React from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  placeholder?: string;
  options?: (string | SelectOption)[];
  size?: "small" | "default" | "large";
  state?: "default" | "error" | "success";
  required?: boolean;
}

/** UX4G Select — native dropdown styled to match Input. */
export function Select({
  label, helperText, value, onChange, options = [], placeholder,
  size = "default", state = "default", disabled = false, required = false,
  id, className = "", style = {}, children, ...rest
}: SelectProps) {
  const generated = React.useId();
  const fid = id || generated;
  const h = ({ small: 36, default: 43, large: 48 } as Record<string, number>)[size];
  const invalid = state === "error";
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <label htmlFor={fid} style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>
          {label}{required && <span style={{ color: "var(--color-danger)", marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={fid} value={value} onChange={onChange} disabled={disabled} required={required}
          aria-invalid={invalid || undefined} className="ux-field"
          style={{
            width: "100%", height: h, boxSizing: "border-box", padding: "0 40px 0 12px",
            fontFamily: "var(--font-sans)", fontSize: 16, color: value ? "var(--color-text)" : "var(--neutral-500)",
            background: disabled ? "var(--neutral-100)" : "var(--white)", appearance: "none", WebkitAppearance: "none",
            border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", outline: "none", cursor: "pointer",
            transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
          {children}
        </select>
        <span aria-hidden="true"
          style={{ position: "absolute", right: 10, pointerEvents: "none", color: "var(--neutral-600)", display: "inline-flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </div>
      {helperText && <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: "16px", letterSpacing: "0.4px", color: invalid ? "var(--color-danger)" : "var(--color-text-muted)" }}>{helperText}</span>}
    </div>
  );
}

export default Select;
