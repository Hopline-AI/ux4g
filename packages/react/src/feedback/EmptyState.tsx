import React from "react";

export interface EmptyStateProps {
  /** An illustration or inline-SVG icon node. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary action (e.g. a Button). */
  action?: React.ReactNode;
}

/** UX4G EmptyState — friendly placeholder for empty lists, search and dashboards. */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 24px", gap: 6 }}>
      {icon && (
        <div style={{ width: 56, height: 56, marginBottom: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", background: "var(--violet-50)", color: "var(--violet-600)" }}>{icon}</div>
      )}
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>{title}</div>
      {description && <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: "20px", color: "var(--color-text-muted)", maxWidth: 360 }}>{description}</div>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}

export default EmptyState;
