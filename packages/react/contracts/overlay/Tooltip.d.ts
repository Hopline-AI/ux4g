import * as React from "react";

/** UX4G Tooltip — small dark label shown on hover/focus around a single child. */
export interface TooltipProps {
  label: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
export default Tooltip;
