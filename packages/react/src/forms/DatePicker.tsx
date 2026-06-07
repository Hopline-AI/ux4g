import React from "react";

export interface DatePickerProps {
  label?: string;
  /** ISO yyyy-mm-dd. */
  value?: string;
  onChange?: (iso: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  required?: boolean;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmt = (s: string) => { const [y, m, d] = s.split("-").map(Number); return `${String(d).padStart(2, "0")} ${MONTHS[m - 1].slice(0, 3)} ${y}`; };

/** UX4G DatePicker — text field that opens a month calendar popover. */
export function DatePicker({ label, value, onChange, placeholder = "Select a date", min, max, required }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => value ? new Date(value) : new Date());
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const disabled = (d: number) => { const s = iso(new Date(y, m, d)); return (min && s < min) || (max && s > max); };

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
      {label && <label style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{label}{required && <span style={{ color: "var(--color-danger)" }}> *</span>}</label>}
      <button type="button" onClick={() => setOpen((o) => !o)} className="ux-field"
        style={{ display: "flex", alignItems: "center", gap: 10, height: 43, padding: "0 12px", textAlign: "left", background: "var(--white)", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 16, color: value ? "var(--color-text)" : "var(--neutral-500)" }}>
        <span style={{ display: "inline-flex", color: "var(--neutral-600)" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg></span>
        {value ? fmt(value) : placeholder}
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, zIndex: 950, width: 280, padding: 14, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-l)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button type="button" aria-label="Previous month" onClick={() => setView(new Date(y, m - 1, 1))} style={navBtn}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg></button>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>{MONTHS[m]} {y}</span>
            <button type="button" aria-label="Next month" onClick={() => setView(new Date(y, m + 1, 1))} style={navBtn}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {DOW.map((d, i) => <div key={i} style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--color-text-subtle)", padding: "4px 0" }}>{d}</div>)}
            {cells.map((d, i) => {
              if (d == null) return <div key={i} />;
              const s = iso(new Date(y, m, d));
              const sel = value === s, dis = disabled(d);
              return (
                <button key={i} type="button" disabled={!!dis}
                  onClick={() => { onChange && onChange(s); setOpen(false); }}
                  style={{
                    height: 32, borderRadius: "var(--radius-sm)", border: "none", cursor: dis ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: sel ? 600 : 500,
                    background: sel ? "var(--color-primary)" : "transparent", color: sel ? "var(--white)" : dis ? "var(--neutral-300)" : "var(--color-text)",
                  }}>{d}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, border: "none", borderRadius: "var(--radius-sm)", background: "var(--neutral-100)", color: "var(--neutral-700)", cursor: "pointer" };

export default DatePicker;
