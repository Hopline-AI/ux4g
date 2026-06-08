import React from "react";

export interface PopoverProps {
  /** Element that toggles the popover (rendered inline). */
  trigger: React.ReactNode;
  /** Optional bold heading inside the panel. */
  title?: React.ReactNode;
  /** Panel body. */
  children: React.ReactNode;
  /** Side of the trigger the panel opens on. @default "bottom" */
  placement?: "top" | "bottom" | "left" | "right";
  /** Panel width in px. @default 264 */
  width?: number;
  /** Start open. @default false */
  defaultOpen?: boolean;
}

/** UX4G Popover — click-triggered floating panel with an arrow. Richer than a
 *  Tooltip: holds a title, body content and actions. Closes on outside-click
 *  and Escape. */
export function Popover({ trigger, title, children, placement = "bottom", width = 264, defaultOpen = false }: PopoverProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const vertical = placement === "top" || placement === "bottom";
  const gap = 12;
  const panelPos: React.CSSProperties = { position: "absolute", zIndex: 60, width };
  if (placement === "bottom") Object.assign(panelPos, { top: `calc(100% + ${gap}px)`, left: "50%", transform: "translateX(-50%)" });
  if (placement === "top") Object.assign(panelPos, { bottom: `calc(100% + ${gap}px)`, left: "50%", transform: "translateX(-50%)" });
  if (placement === "right") Object.assign(panelPos, { left: `calc(100% + ${gap}px)`, top: "50%", transform: "translateY(-50%)" });
  if (placement === "left") Object.assign(panelPos, { right: `calc(100% + ${gap}px)`, top: "50%", transform: "translateY(-50%)" });

  // Arrow
  const arrow: React.CSSProperties = {
    position: "absolute", width: 12, height: 12, background: "var(--color-surface)",
    borderTop: "1px solid var(--color-border)", borderLeft: "1px solid var(--color-border)",
  };
  if (placement === "bottom") Object.assign(arrow, { top: -7, left: "50%", transform: "translateX(-50%) rotate(45deg)" });
  if (placement === "top") Object.assign(arrow, { bottom: -7, left: "50%", transform: "translateX(-50%) rotate(225deg)" });
  if (placement === "right") Object.assign(arrow, { left: -7, top: "50%", transform: "translateY(-50%) rotate(-45deg)" });
  if (placement === "left") Object.assign(arrow, { right: -7, top: "50%", transform: "translateY(-50%) rotate(135deg)" });

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <span onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="dialog" style={{ display: "inline-flex", cursor: "pointer" }}>
        {trigger}
      </span>
      {open && (
        <div role="dialog" style={{
          ...panelPos, background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-l)", padding: 16,
          fontFamily: "var(--font-sans)",
        }}>
          <span style={arrow} aria-hidden="true" />
          {title && <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", marginBottom: 6 }}>{title}</div>}
          <div style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>{children}</div>
        </div>
      )}
    </span>
  );
}

export default Popover;
