import React from "react";

export interface RangeSliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** Show the current value bubble. @default true */
  showValue?: boolean;
  /** Optional unit suffix for the value label, e.g. "%". */
  unit?: string;
  disabled?: boolean;
}

/** UX4G RangeSlider — single-value slider with a filled track (themed via accent-color). */
export function RangeSlider({
  label, value, defaultValue = 0, min = 0, max = 100, step = 1,
  onChange, showValue = true, unit = "", disabled = false,
}: RangeSliderProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const v = value ?? internal;
  const pct = ((v - min) / (max - min)) * 100;
  const set = (n: number) => { if (value === undefined) setInternal(n); onChange && onChange(n); };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: disabled ? 0.5 : 1 }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{label}</span>}
          {showValue && <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--violet-700)" }}>{v}{unit}</span>}
        </div>
      )}
      <input type="range" min={min} max={max} step={step} value={v} disabled={disabled}
        onChange={(e) => set(Number(e.target.value))}
        style={{
          width: "100%", height: 6, borderRadius: "var(--radius-full)", appearance: "none", WebkitAppearance: "none",
          outline: "none", cursor: disabled ? "not-allowed" : "pointer",
          background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${pct}%, var(--neutral-200) ${pct}%, var(--neutral-200) 100%)`,
        }}
        className="ux-range" />
      <style>{`
        .ux-range::-webkit-slider-thumb{ -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#fff; border:2px solid var(--color-primary); box-shadow:var(--shadow-s); cursor:pointer; }
        .ux-range::-moz-range-thumb{ width:20px; height:20px; border-radius:50%; background:#fff; border:2px solid var(--color-primary); box-shadow:var(--shadow-s); cursor:pointer; }
        .ux-range:focus-visible{ box-shadow: var(--focus-ring); }
      `}</style>
    </div>
  );
}

export default RangeSlider;
