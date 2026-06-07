import React from "react";

export interface MenuItem {
  label: React.ReactNode;
  /** Optional leading inline-SVG / node. */
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  /** The element that opens the menu (a Button / IconButton). */
  trigger: React.ReactElement;
  items: MenuItem[];
  /** @default "left" */
  align?: "left" | "right";
}

/** UX4G Menu — a dropdown of actions anchored to a trigger. */
export function Menu({ trigger, items, align = "left" }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const triggerEl = React.cloneElement(trigger, { onClick: () => setOpen((o) => !o) });
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      {triggerEl}
      {open && (
        <div role="menu" style={{
          position: "absolute", top: "calc(100% + 6px)", [align]: 0, zIndex: 950, minWidth: 200,
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-l)", padding: 6,
        }}>
          {items.map((it, i) => (
            <button key={i} role="menuitem" disabled={it.disabled}
              onClick={() => { if (!it.disabled) { it.onClick && it.onClick(); setOpen(false); } }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
                padding: "8px 10px", border: "none", borderRadius: "var(--radius-sm)", background: "transparent",
                fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, cursor: it.disabled ? "not-allowed" : "pointer",
                color: it.danger ? "var(--color-danger)" : "var(--color-text)", opacity: it.disabled ? 0.5 : 1,
              }}
              onMouseEnter={(e) => { if (!it.disabled) (e.currentTarget as HTMLElement).style.background = it.danger ? "var(--danger-50)" : "var(--neutral-100)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              {it.icon && <span style={{ display: "inline-flex", color: it.danger ? "var(--color-danger)" : "var(--neutral-600)" }}>{it.icon}</span>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
