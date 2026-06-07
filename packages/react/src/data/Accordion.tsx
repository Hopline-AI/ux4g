import React from "react";

export interface AccordionItem {
  /** Stable id; also used for default open state. */
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once. @default false */
  multiple?: boolean;
  /** Values open by default. */
  defaultOpen?: string[];
}

/** UX4G Accordion — collapsible panels for FAQs and grouped content. */
export function Accordion({ items, multiple = false, defaultOpen = [] }: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultOpen);
  const toggle = (v: string) => setOpen((cur) =>
    cur.includes(v) ? cur.filter((x) => x !== v) : multiple ? [...cur, v] : [v]);
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {items.map((it, i) => {
        const isOpen = open.includes(it.value);
        return (
          <div key={it.value} style={{ borderTop: i ? "1px solid var(--color-divider)" : "none" }}>
            <button type="button" aria-expanded={isOpen} onClick={() => toggle(it.value)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%",
                textAlign: "left", padding: "16px 18px", border: "none", background: isOpen ? "var(--neutral-50)" : "var(--color-surface)",
                cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--color-text)",
              }}>
              {it.title}
              <span style={{ display: "inline-flex", color: "var(--neutral-600)", flex: "none", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform var(--duration-base) var(--ease-standard)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 18px 18px", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: "22px", color: "var(--color-text-muted)" }}>{it.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
