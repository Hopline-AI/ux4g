import React from "react";

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  /** @default "default" */
  size?: "default" | "large";
}

/** UX4G Search — a search input with leading icon and clear button. */
export function Search({ value, onChange, onSearch, placeholder = "Search", size = "default", style, ...rest }: SearchProps) {
  const [internal, setInternal] = React.useState("");
  const v = value ?? internal;
  const set = (s: string) => { if (value === undefined) setInternal(s); onChange && onChange(s); };
  const h = size === "large" ? 48 : 43;
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", ...style }}>
      <span style={{ position: "absolute", left: 14, display: "inline-flex", color: "var(--neutral-500)", pointerEvents: "none" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
      </span>
      <input
        type="search" value={v} placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && onSearch) onSearch(v); }}
        className="ux-field"
        style={{
          width: "100%", height: h, boxSizing: "border-box", padding: `0 ${v ? 40 : 14}px 0 42px`,
          fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--color-text)", background: "var(--white)",
          border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-full)", outline: "none",
          transition: "border-color var(--duration-fast), box-shadow var(--duration-fast)",
        }}
        {...rest}
      />
      {v && (
        <button type="button" aria-label="Clear" onClick={() => set("")}
          style={{ position: "absolute", right: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, padding: 0, border: "none", borderRadius: "var(--radius-full)", background: "var(--neutral-200)", color: "var(--neutral-700)", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      )}
    </div>
  );
}

export default Search;
