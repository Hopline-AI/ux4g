import React from "react";

export interface ToastProps {
  variant?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

/** UX4G Toast — a transient notification card. Stack several in a fixed corner viewport. */
export function Toast({ variant = "info", title, onClose, children }: ToastProps) {
  const tones = ({
    info:    { bar: "var(--info-700)",    icon: "info" },
    success: { bar: "var(--success-600)", icon: "success" },
    warning: { bar: "var(--warning-500)", icon: "warning" },
    danger:  { bar: "var(--danger-500)",  icon: "danger" },
  } as Record<string, { bar: string; icon: string }>)[variant];
  const glyphs: Record<string, React.ReactNode> = {
    info:    (<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>),
    success: (<><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></>),
    warning: (<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></>),
    danger:  (<><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></>),
  };
  return (
    <div role="status" style={{
      display: "flex", gap: 12, alignItems: "flex-start", width: 360, maxWidth: "calc(100vw - 32px)",
      padding: "14px 14px 14px 16px", background: "var(--color-surface)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-l)", borderLeft: `4px solid ${tones.bar}`,
    }}>
      <span style={{ display: "inline-flex", color: tones.bar, flex: "none", marginTop: 1 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{glyphs[tones.icon]}</svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>{title}</div>}
        {children && <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: "18px", color: "var(--color-text-muted)", marginTop: title ? 2 : 0 }}>{children}</div>}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose}
          style={{ flex: "none", display: "inline-flex", width: 22, height: 22, alignItems: "center", justifyContent: "center", padding: 0, border: "none", background: "transparent", color: "var(--neutral-500)", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      )}
    </div>
  );
}

export default Toast;
