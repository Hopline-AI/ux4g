import React from "react";

export interface CrumbItem { label: React.ReactNode; href?: string; }

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: CrumbItem[];
}

/** UX4G Breadcrumb — hierarchy trail. Pass items with label + optional href. */
export function Breadcrumb({ items = [], className = "", style = {}, ...rest }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`ux-breadcrumb ${className}`} style={style} {...rest}>
      <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              {last || !it.href ? (
                <span aria-current={last ? "page" : undefined}
                  style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: last ? 600 : 400, color: last ? "var(--color-text)" : "var(--color-text-muted)" }}>
                  {it.label}
                </span>
              ) : (
                <a href={it.href} className="ux-link"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-muted)", textDecoration: "none" }}>
                  {it.label}
                </a>
              )}
              {!last && <span aria-hidden="true" style={{ display: "inline-flex", color: "var(--neutral-400)" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg></span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
