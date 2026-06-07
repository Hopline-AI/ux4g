import React from "react";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

/** UX4G Radio — circular single-select control. Group via shared `name`. */
export function Radio({
  label, checked, defaultChecked, onChange, name, value, disabled = false,
  id, className = "", style = {}, ...rest
}: RadioProps) {
  const generated = React.useId();
  const fid = id || generated;
  const on = checked ?? defaultChecked;
  return (
    <label htmlFor={fid} className={`ux-choice ${className}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <input id={fid} type="radio" name={name} value={value} checked={checked}
        defaultChecked={defaultChecked} onChange={onChange} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span className="ux-choice__box" aria-hidden="true"
        style={{
          width: 20, height: 20, flex: "none", borderRadius: "var(--radius-full)",
          border: `1.5px solid ${on ? "var(--color-primary)" : "var(--neutral-400)"}`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "border-color var(--duration-fast)",
        }}>
        <span style={{ width: 10, height: 10, borderRadius: "var(--radius-full)", background: "var(--color-primary)", transform: on ? "scale(1)" : "scale(0)", transition: "transform var(--duration-fast) var(--ease-standard)" }} />
      </span>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--color-text)" }}>{label}</span>}
    </label>
  );
}

export default Radio;
