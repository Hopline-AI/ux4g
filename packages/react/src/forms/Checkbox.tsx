import React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  indeterminate?: boolean;
}

/** UX4G Checkbox — square selection control with violet checked fill. */
export function Checkbox({
  label, checked, defaultChecked, onChange, disabled = false,
  indeterminate = false, id, className = "", style = {}, ...rest
}: CheckboxProps) {
  const generated = React.useId();
  const fid = id || generated;
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const on = checked || defaultChecked || indeterminate;
  return (
    <label htmlFor={fid} className={`ux-choice ${className}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <input ref={ref} id={fid} type="checkbox" checked={checked} defaultChecked={defaultChecked}
        onChange={onChange} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span className="ux-choice__box" aria-hidden="true"
        style={{
          width: 20, height: 20, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-xs)", border: `1.5px solid ${on ? "var(--color-primary)" : "var(--neutral-400)"}`,
          background: on ? "var(--color-primary)" : "var(--white)", color: "var(--white)",
          transition: "background var(--duration-fast), border-color var(--duration-fast)",
        }}>
        <span aria-hidden="true" style={{ display: "inline-flex", opacity: on ? 1 : 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            {indeterminate ? <path d="M5 12h14" /> : <path d="M20 6 9 17l-5-5" />}
          </svg>
        </span>
      </span>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--color-text)" }}>{label}</span>}
    </label>
  );
}

export default Checkbox;
