import React from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: (string | TabItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
}

/** UX4G Tabs — underline tab bar. Controlled via `value`/`onChange` or uncontrolled. */
export function Tabs({
  tabs = [], value, defaultValue, onChange, fullWidth = false,
  className = "", style = {}, ...rest
}: TabsProps) {
  const norm: TabItem[] = tabs.map((t) => (typeof t === "string" ? { value: t, label: t } : t));
  const [internal, setInternal] = React.useState<string | undefined>(defaultValue ?? norm[0]?.value);
  const active = value ?? internal;
  const select = (v: string) => { if (value === undefined) setInternal(v); onChange && onChange(v); };

  return (
    <div role="tablist" className={`ux-tabs ${className}`}
      style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--color-border)", ...style }} {...rest}>
      {norm.map((t) => {
        const on = t.value === active;
        return (
          <button key={t.value} role="tab" aria-selected={on} disabled={t.disabled}
            onClick={() => !t.disabled && select(t.value)} className="ux-tab"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, flex: fullWidth ? 1 : "none",
              justifyContent: "center", padding: "10px 16px", marginBottom: -1,
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: on ? 600 : 500, letterSpacing: "0.1px",
              color: on ? "var(--color-primary)" : "var(--color-text-muted)",
              background: "transparent", border: "none", cursor: t.disabled ? "not-allowed" : "pointer",
              opacity: t.disabled ? 0.5 : 1,
              borderBottom: `2px solid ${on ? "var(--color-primary)" : "transparent"}`,
              transition: "color var(--duration-fast), border-color var(--duration-fast)",
            }}>
            {t.icon && <span aria-hidden="true" style={{ display: "inline-flex" }}>{t.icon}</span>}
            {t.label}
            {t.badge != null && (
              <span style={{ marginLeft: 2, minWidth: 18, height: 18, padding: "0 5px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, borderRadius: "var(--radius-full)", background: on ? "var(--violet-100)" : "var(--neutral-200)", color: on ? "var(--violet-700)" : "var(--neutral-700)" }}>{t.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
