import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "primary" | "success" | "danger" | "warning" | "info";
  appearance?: "tonal" | "solid" | "dot";
  children?: React.ReactNode;
}

/** UX4G Badge — status pill (text) or count/dot indicator. */
export function Badge({
  children, variant = "neutral", appearance = "tonal",
  className = "", style = {}, ...rest
}: BadgeProps) {
  const tones = ({
    neutral: { solid: "var(--neutral-700)", tint: "var(--neutral-100)", text: "var(--neutral-700)" },
    primary: { solid: "var(--violet-600)", tint: "var(--violet-50)", text: "var(--violet-700)" },
    success: { solid: "var(--success-600)", tint: "var(--success-50)", text: "var(--success-700)" },
    danger:  { solid: "var(--danger-500)",  tint: "var(--danger-50)",  text: "var(--danger-700)" },
    warning: { solid: "var(--warning-500)", tint: "var(--warning-50)", text: "var(--warning-700)" },
    info:    { solid: "var(--info-700)",    tint: "var(--info-50)",    text: "var(--info-800)" },
  } as Record<string, { solid: string; tint: string; text: string }>)[variant];

  if (appearance === "dot") {
    return <span className={className} aria-hidden="true" style={{ display: "inline-block", width: 8, height: 8, borderRadius: "var(--radius-full)", background: tones.solid, ...style }} {...rest} />;
  }

  const isSolid = appearance === "solid";
  return (
    <span className={className}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4, height: 20, padding: "0 8px",
        fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, lineHeight: 1, letterSpacing: "0.3px",
        borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
        background: isSolid ? tones.solid : tones.tint, color: isSolid ? "var(--white)" : tones.text, ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
