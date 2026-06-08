import React from "react";

export interface ListItemData {
  /** Leading slot — icon, avatar or monogram. */
  leading?: React.ReactNode;
  /** Small uppercase label above the title. */
  overline?: React.ReactNode;
  title: React.ReactNode;
  /** Supporting text under the title. */
  description?: React.ReactNode;
  /** Trailing slot — meta text, a control, or a chevron. */
  trailing?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
}

export interface ListProps {
  items: ListItemData[];
  /** Hairline dividers between rows. @default true */
  dividers?: boolean;
  /** Hover/press affordance on rows. @default false */
  interactive?: boolean;
  /** Wrap in a bordered, rounded surface. @default true */
  bordered?: boolean;
  /** Show a chevron on every row (overridden by an item's own `trailing`). */
  chevron?: boolean;
}

const Chevron = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
);

/** UX4G List — vertical list of rows with leading/trailing slots, one to three
 *  lines of text, optional dividers and interactivity. */
export function List({ items, dividers = true, interactive = false, bordered = true, chevron = false }: ListProps) {
  return (
    <ul style={{
      listStyle: "none", margin: 0, padding: 0, fontFamily: "var(--font-sans)", width: "100%",
      background: bordered ? "var(--color-surface)" : "transparent",
      border: bordered ? "1px solid var(--color-border)" : "none",
      borderRadius: bordered ? "var(--radius-lg)" : 0, overflow: "hidden",
    }}>
      {items.map((it, i) => {
        const clickable = !it.disabled && (interactive || it.href || it.onClick);
        const Tag: any = it.href ? "a" : "div";
        const trailing = it.trailing ?? (chevron ? <span style={{ color: "var(--neutral-400)", display: "inline-flex" }}>{Chevron}</span> : null);
        return (
          <li key={i} style={{ borderBottom: dividers && i < items.length - 1 ? "1px solid var(--color-divider)" : "none" }}>
            <Tag href={it.href} onClick={it.disabled ? undefined : it.onClick}
              aria-current={it.active ? "true" : undefined} aria-disabled={it.disabled || undefined}
              tabIndex={clickable ? 0 : undefined} role={!it.href && clickable ? "button" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", minHeight: 56,
                textDecoration: "none", color: "inherit", cursor: clickable ? "pointer" : "default",
                background: it.active ? "var(--color-primary-subtle)" : "transparent",
                opacity: it.disabled ? 0.5 : 1, transition: "background var(--duration-fast)",
                boxShadow: it.active ? "inset 3px 0 0 var(--color-primary)" : "none",
              }}
              onMouseEnter={(e) => { if (clickable && !it.active) (e.currentTarget as HTMLElement).style.background = "var(--neutral-100)"; }}
              onMouseLeave={(e) => { if (!it.active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              {it.leading != null && (
                <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>{it.leading}</span>
              )}
              <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                {it.overline && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--color-text-subtle)" }}>{it.overline}</span>}
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</span>
                {it.description && <span style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.4 }}>{it.description}</span>}
              </span>
              {trailing && <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-muted)", fontSize: 13 }}>{trailing}</span>}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
