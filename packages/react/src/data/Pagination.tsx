import React from "react";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Sibling pages either side of current. @default 1 */
  siblings?: number;
}

/** UX4G Pagination — page navigation for tables and lists. 1-indexed. */
export function Pagination({ page, pageCount, onChange, siblings = 1 }: PaginationProps) {
  const range: (number | "…")[] = [];
  const push = (n: number | "…") => range.push(n);
  const lo = Math.max(2, page - siblings);
  const hi = Math.min(pageCount - 1, page + siblings);
  push(1);
  if (lo > 2) push("…");
  for (let i = lo; i <= hi; i++) push(i);
  if (hi < pageCount - 1) push("…");
  if (pageCount > 1) push(pageCount);

  const btn = (active: boolean): React.CSSProperties => ({
    minWidth: 36, height: 36, padding: "0 8px", display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: active ? 600 : 500,
    border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
    background: active ? "var(--violet-50)" : "var(--color-surface)",
    color: active ? "var(--violet-700)" : "var(--color-text)",
    borderRadius: "var(--radius-md)", cursor: "pointer",
  });
  const arrow = (dir: "prev" | "next", disabled: boolean) => (
    <button type="button" aria-label={dir} disabled={disabled}
      onClick={() => onChange(dir === "prev" ? page - 1 : page + 1)}
      style={{ ...btn(false), opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
  return (
    <nav aria-label="Pagination" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {arrow("prev", page <= 1)}
      {range.map((n, i) => n === "…"
        ? <span key={`e${i}`} style={{ minWidth: 24, textAlign: "center", color: "var(--color-text-subtle)", fontFamily: "var(--font-sans)" }}>…</span>
        : <button key={n} type="button" aria-current={n === page ? "page" : undefined} onClick={() => onChange(n)} style={btn(n === page)}>{n}</button>
      )}
      {arrow("next", page >= pageCount)}
    </nav>
  );
}

export default Pagination;
