import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  state?: "default" | "error" | "success";
  required?: boolean;
}

/** UX4G Textarea — multi-line text field. */
export function Textarea({
  label, helperText, rows = 4,
  state = "default", disabled = false, required = false,
  id, className = "", style = {}, ...rest
}: TextareaProps) {
  const generated = React.useId();
  const fid = id || generated;
  const invalid = state === "error";
  const stateColor = state === "success" ? "var(--color-success)" : state === "error" ? "var(--color-danger)" : "var(--color-text-muted)";
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <label htmlFor={fid} style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>
          {label}{required && <span style={{ color: "var(--color-danger)", marginLeft: 2 }}>*</span>}
        </label>
      )}
      <textarea
        id={fid} rows={rows} disabled={disabled}
        required={required} aria-invalid={invalid || undefined} className="ux-field"
        style={{
          width: "100%", boxSizing: "border-box", padding: 12, resize: "vertical",
          fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: "24px", color: "var(--color-text)",
          background: disabled ? "var(--neutral-100)" : "var(--white)",
          border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", outline: "none",
          transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
        }}
        {...rest}
      />
      {helperText && <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: "16px", letterSpacing: "0.4px", color: stateColor }}>{helperText}</span>}
    </div>
  );
}

export default Textarea;
