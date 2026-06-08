import * as React from "react";

/**
 * UX4G Accessibility Widget — a fixed "universal access" launcher that opens a
 * panel of live adjustments (text size, line/letter spacing, contrast,
 * grayscale, highlight links, readable font, big cursor, pause motion, reading
 * guide). Settings apply to `target` and persist to localStorage.
 *
 * @startingPoint section="Accessibility" subtitle="Universal-access launcher & adjustment panel" viewport="700x420"
 */
export interface AccessibilityWidgetProps {
  position?: "bottom-right" | "bottom-left";
  /** Element the adjustments apply to. Defaults to document.documentElement. */
  target?: HTMLElement | null;
}

export declare function AccessibilityWidget(props: AccessibilityWidgetProps): JSX.Element;
export default AccessibilityWidget;
