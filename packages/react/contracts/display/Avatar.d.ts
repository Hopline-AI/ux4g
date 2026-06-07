import * as React from "react";

/** UX4G Avatar — image with initials fallback and optional status dot. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Full name — drives initials fallback and alt text. */
  name?: string;
  /** Pixel size. @default 40 */
  size?: number;
  /** @default "circle" */
  shape?: "circle" | "rounded";
  status?: "online" | "busy" | "away" | null;
}

export declare function Avatar(props: AvatarProps): JSX.Element;
export default Avatar;
