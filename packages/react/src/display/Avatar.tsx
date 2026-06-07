import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
  shape?: "circle" | "rounded";
  status?: "online" | "busy" | "away" | null;
}

/** UX4G Avatar — user/entity image with initials fallback and optional status dot. */
export function Avatar({
  src, name = "", size = 40, shape = "circle",
  status = null, className = "", style = {}, ...rest
}: AvatarProps) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const radius = shape === "rounded" ? "var(--radius-md)" : "var(--radius-full)";
  const statusColor = status ? ({ online: "var(--color-success)", busy: "var(--color-danger)", away: "var(--color-warning)" } as Record<string, string>)[status] : undefined;
  return (
    <span className={className} style={{ position: "relative", display: "inline-flex", width: size, height: size, flex: "none", ...style }} {...rest}>
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius }} />
      ) : (
        <span aria-label={name} style={{
          width: "100%", height: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: radius, background: "var(--violet-100)", color: "var(--violet-700)",
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.4,
        }}>{initials || "?"}</span>
      )}
      {statusColor && (
        <span aria-hidden="true" style={{
          position: "absolute", right: 0, bottom: 0, width: size * 0.28, height: size * 0.28,
          borderRadius: "var(--radius-full)", background: statusColor, border: "2px solid var(--white)",
        }} />
      )}
    </span>
  );
}

export default Avatar;
