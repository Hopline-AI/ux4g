import React from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

/** UX4G Switch — on/off toggle for settings and preferences. */
export function Switch({
  label, checked, defaultChecked, onChange, disabled = false,
  id, className = "", style = {}, ...rest
}: SwitchProps) {
  const generated = React.useId();
  const fid = id || generated;
  const [internal, setInternal] = React.useState<boolean>(defaultChecked || false);
  const isOn = checked ?? internal;
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => { if (checked === undefined) setInternal(e.target.checked); onChange && onChange(e); };
  return (
    <label htmlFor={fid} className={`ux-choice ${className}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <input id={fid} type="checkbox" role="switch" checked={isOn} onChange={handle} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span className="ux-switch__track" aria-hidden="true"
        style={{
          width: 40, height: 24, flex: "none", borderRadius: "var(--radius-full)", padding: 2, boxSizing: "border-box",
          background: isOn ? "var(--color-primary)" : "var(--neutral-300)",
          transition: "background var(--duration-base) var(--ease-standard)", display: "inline-flex", alignItems: "center",
        }}>
        <span style={{
          width: 20, height: 20, borderRadius: "var(--radius-full)", background: "var(--white)",
          boxShadow: "var(--shadow-s)", transform: isOn ? "translateX(16px)" : "translateX(0)",
          transition: "transform var(--duration-base) var(--ease-standard)",
        }} />
      </span>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--color-text)" }}>{label}</span>}
    </label>
  );
}

export default Switch;
