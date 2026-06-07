import React from "react";

export interface TooltipProps {
  /** Tooltip text. */
  label: React.ReactNode;
  /** @default "top" */
  placement?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
}

/** UX4G Tooltip — small label on hover/focus. Wraps a single interactive child. */
export function Tooltip({ label, placement = "top", children }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const pos: React.CSSProperties = {
    top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left:   { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right:  { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  }[placement];
  return (
    <span style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      <span role="tooltip" style={{
        position: "absolute", zIndex: 900, ...pos, pointerEvents: "none",
        opacity: open ? 1 : 0, transition: "opacity var(--duration-fast) var(--ease-standard)",
        background: "var(--neutral-900)", color: "var(--white)", fontFamily: "var(--font-sans)",
        fontSize: 12, lineHeight: "16px", fontWeight: 500, padding: "6px 9px", borderRadius: "var(--radius-sm)",
        whiteSpace: "nowrap", boxShadow: "var(--shadow-md)",
      }}>{label}</span>
    </span>
  );
}

export default Tooltip;
