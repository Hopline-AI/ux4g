/* UX4G e-Visa — inline SVG icon set (Lucide geometry: 24×24, 2px stroke, round
   caps). No font dependency, renders crisply everywhere. This is the same
   inline-SVG approach the UX4G components use internally. */
import React from "react";

const P: Record<string, string> = {
  plane: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5S18 3 16.5 4.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 4.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
  creditCard: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z|M2 10h20|M6 15h4",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z|M2.5 6.5 12 13l9.5-6.5",
  stamp: "M5 21h14|M7 17h10v2H7z|M9 17c0-2-2-3-2-6a5 5 0 0 1 10 0c0 3-2 4-2 6",
  checkCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M8.5 12.5l2.5 2.5 5-5",
  check: "M5 12.5l4.5 4.5L19 7",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z|M9 12l2 2 4-4",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z|M21 21l-4.3-4.3",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  chevronRight: "M9 6l6 6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  arrowRight: "M5 12h14|M13 6l6 6-6 6",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M2 12h20|M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 7v5l3.5 2",
  printer: "M6 9V2h12v7|M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2|M6 14h12v8H6z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3",
  user: "M20 21a8 8 0 1 0-16 0|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  briefcase: "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z|M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2|M3 13h18",
  medical: "M22 12h-4l-3 9L9 3l-3 9H2",
  graduation: "M22 10 12 5 2 10l10 5 10-5z|M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M23 21v-2a4 4 0 0 0-3-3.9|M16 3.1a4 4 0 0 1 0 7.8",
  transit: "M17 2l4 4-4 4|M3 11V9a4 4 0 0 1 4-4h14|M7 22l-4-4 4-4|M21 13v2a4 4 0 0 1-4 4H3",
  layers: "M12 2 2 7l10 5 10-5-10-5z|M2 17l10 5 10-5|M2 12l10 5 10-5",
  factory: "M2 20h20|M4 20V9l6 4V9l6 4V6l4 2v12|M8 20v-4h4v4",
  helpCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3|M12 17h.01",
  mapPin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z|M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  calendar: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M3 9h18|M8 2v4|M16 2v4",
  alertTriangle: "M10.3 3.2 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z|M12 9v4|M12 17h.01",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 16v-4|M12 8h.01",
  building: "M4 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18|M16 8h3a1 1 0 0 1 1 1v13|M2 22h20|M8 7h2|M8 11h2|M8 15h2",
  pause: "M6 4h4v16H6z|M14 4h4v16h-4z",
  play: "M6 4l14 8-14 8z",
  externalLink: "M15 3h6v6|M10 14 21 3|M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5",
  list: "M8 6h13|M8 12h13|M8 18h13|M3 6h.01|M3 12h.01|M3 18h.01",
  refresh: "M21 12a9 9 0 1 1-3-6.7L21 8|M21 3v5h-5",
  lock: "M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z|M8 11V7a4 4 0 0 1 8 0v4",
  menu: "M3 6h18|M3 12h18|M3 18h18",
  x: "M18 6 6 18|M6 6l12 12",
  passport: "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z|M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M8.5 16h7",
  smartphone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z|M12 18h.01",
};

export type IconName = keyof typeof P;

export interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Icon({ name, size = 24, stroke = 2, color = "currentColor", style, ...rest }: IconProps) {
  const d = P[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}
      {...rest}
    >
      {d.split("|").map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
