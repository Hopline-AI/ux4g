import React from "react";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  icon?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

/** UX4G Alert — inline status message (info, success, warning, danger). */
export function Alert({
  children, title, variant = "info",
  onClose, icon, className = "", style = {}, ...rest
}: AlertProps) {
  const tones = ({
    info:    { fg: "var(--info-800)",    bd: "var(--info-200)",    bg: "var(--info-50)",    icon: "info" },
    success: { fg: "var(--success-800)", bd: "var(--success-200)", bg: "var(--success-50)", icon: "success" },
    warning: { fg: "var(--warning-800)", bd: "var(--warning-200)", bg: "var(--warning-50)", icon: "warning" },
    danger:  { fg: "var(--danger-800)",  bd: "var(--danger-200)",  bg: "var(--danger-50)",  icon: "danger" },
  } as Record<string, { fg: string; bd: string; bg: string; icon: string }>)[variant];

  const glyphs: Record<string, React.ReactNode> = {
    info:    (<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>),
    success: (<><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></>),
    warning: (<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></>),
    danger:  (<><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></>),
  };

  return (
    <div role="alert" className={`ux-alert ${className}`}
      style={{
        display: "flex", gap: 12, padding: "12px 14px", borderRadius: "var(--radius-md)",
        background: tones.bg, border: `1px solid ${tones.bd}`, color: tones.fg, ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ display: "inline-flex", flex: "none", marginTop: 1 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {glyphs[icon || tones.icon] || glyphs.info}
        </svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, lineHeight: "22px", marginBottom: children ? 2 : 0 }}>{title}</div>}
        {children && <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: "20px", color: "var(--neutral-700)" }}>{children}</div>}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose}
          style={{ flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, marginTop: -1, padding: 0, border: "none", background: "transparent", color: "inherit", cursor: "pointer", borderRadius: "var(--radius-xs)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      )}
    </div>
  );
}

export default Alert;
