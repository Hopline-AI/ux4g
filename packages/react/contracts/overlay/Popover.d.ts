import * as React from "react";

/**
 * UX4G Popover — a click-triggered floating panel with an arrow. Unlike a
 * Tooltip it can hold a title, body content and actions; it closes on
 * outside-click and Escape and exposes `aria-expanded` / `role="dialog"`.
 *
 * @startingPoint section="Overlay" subtitle="Click-triggered panel with title, body and arrow" viewport="520x320"
 */
export interface PopoverProps {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  width?: number;
  defaultOpen?: boolean;
}

export declare function Popover(props: PopoverProps): JSX.Element;
export default Popover;
