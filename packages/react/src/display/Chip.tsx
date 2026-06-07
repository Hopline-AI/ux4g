import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

/** UX4G Chip — compact filter/choice/input token. Optional leading icon & remove. */
export function Chip({
  children, selected = false, onRemove, onClick, icon = null,
  disabled = false, className = "", style = {}, ...rest
}: ChipProps) {
  const clickable = !!onClick && !disabled;
  return (
    <span
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      data-clickable={clickable ? "true" : "false"}
      className={`ux-chip ${className}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px",
        fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, lineHeight: 1,
        borderRadius: "var(--radius-full)", whiteSpace: "nowrap", userSelect: "none",
        border: `1px solid ${selected ? "var(--color-primary)" : "var(--color-border)"}`,
        background: selected ? "var(--violet-50)" : "var(--white)",
        color: selected ? "var(--violet-700)" : "var(--color-text)",
        cursor: clickable ? "pointer" : "default", opacity: disabled ? 0.5 : 1,
        transition: "background var(--duration-fast), border-color var(--duration-fast)", ...style,
      }}
      {...rest}
    >
      {icon && <span aria-hidden="true" style={{ display: "inline-flex", fontSize: 18, marginLeft: -2 }}>{icon}</span>}
      {children}
      {onRemove && (
        <button type="button" aria-label="Remove" className="ux-chip__remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, marginRight: -4, padding: 0, border: "none", borderRadius: "var(--radius-full)", background: "transparent", color: "inherit", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      )}
    </span>
  );
}

export default Chip;
