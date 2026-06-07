import React from "react";

export interface ColorPickerProps {
  label?: string;
  /** Selected hex value. */
  value?: string;
  defaultValue?: string;
  onChange?: (hex: string) => void;
  /** Curated swatches. */
  swatches?: string[];
  /** Show a native color input for custom colours. @default true */
  allowCustom?: boolean;
}

const DEFAULT_SWATCHES = ["#613AF5", "#107400", "#DB2829", "#EE8033", "#1937B2", "#8981AB", "#212121"];

/** UX4G ColorPicker — choose a brand/theme colour from curated swatches (+ optional custom). */
export function ColorPicker({
  label, value, defaultValue = "#613AF5", onChange,
  swatches = DEFAULT_SWATCHES, allowCustom = true,
}: ColorPickerProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const v = (value ?? internal).toUpperCase();
  const set = (hex: string) => { const h = hex.toUpperCase(); if (value === undefined) setInternal(h); onChange && onChange(h); };
  const all = swatches.map((s) => s.toUpperCase());
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{label}</span>}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {all.map((c) => {
          const active = c === v;
          return (
            <button key={c} type="button" aria-label={c} onClick={() => set(c)}
              style={{
                width: 30, height: 30, borderRadius: "var(--radius-md)", background: c, cursor: "pointer",
                border: active ? "2px solid var(--color-text)" : "2px solid var(--color-border)",
                boxShadow: active ? "0 0 0 2px var(--white) inset" : "none", padding: 0,
              }} />
          );
        })}
        {allowCustom && (
          <label style={{ width: 30, height: 30, borderRadius: "var(--radius-md)", border: "1.5px dashed var(--color-border-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--neutral-600)", position: "relative" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            <input type="color" value={/^#[0-9A-F]{6}$/.test(v) ? v : "#613AF5"} onChange={(e) => set(e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
          </label>
        )}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginLeft: 2 }}>{v}</span>
      </div>
    </div>
  );
}

export default ColorPicker;
