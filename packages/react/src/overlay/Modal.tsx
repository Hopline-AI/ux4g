import React from "react";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Footer actions row (right-aligned), e.g. Buttons. */
  footer?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Hide the × button. @default false */
  hideClose?: boolean;
  children?: React.ReactNode;
}

/** UX4G Modal — centered dialog over a scrim. Controlled via `open`. */
export function Modal({ open, onClose, title, description, footer, size = "md", hideClose = false, children }: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const width = { sm: 400, md: 520, lg: 720 }[size];
  return (
    <div role="dialog" aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(33,33,33,0.45)", backdropFilter: "blur(2px)" }}>
      <div style={{ width: "100%", maxWidth: width, maxHeight: "calc(100vh - 48px)", overflow: "auto", background: "var(--color-surface)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column" }}>
        {(title || !hideClose) && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "24px 24px 0" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 600, color: "var(--color-text)", lineHeight: "26px" }}>{title}</h2>}
              {description && <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-muted)", marginTop: 6, lineHeight: "20px" }}>{description}</p>}
            </div>
            {!hideClose && (
              <button type="button" aria-label="Close" onClick={onClose}
                style={{ flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, marginTop: -4, marginRight: -4, padding: 0, border: "none", borderRadius: "var(--radius-md)", background: "transparent", color: "var(--neutral-600)", cursor: "pointer" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            )}
          </div>
        )}
        {children != null && <div style={{ padding: 24, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: "22px", color: "var(--color-text)" }}>{children}</div>}
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "0 24px 24px" }}>{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
