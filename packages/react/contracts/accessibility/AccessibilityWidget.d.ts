import * as React from "react";

/**
 * UX4G Accessibility Widget — a fixed "universal-access" launcher that opens a
 * 3-column tile grid of live adjustments: Bigger / Smaller Text, Text Spacing,
 * Line Height, Dyslexia Friendly, ADHD Mode (reading mask), Saturation,
 * Light-Dark, Invert Colors, Highlight Links, Text to Speech, Cursor, Pause
 * Animation, Hide Images and Contrast. Settings apply to `target` and persist
 * to localStorage.
 *
 * @startingPoint section="Accessibility" subtitle="Universal-access launcher & 15-tool adjustment panel" viewport="720x520"
 */
export interface AccessibilityWidgetProps {
  position?: "bottom-right" | "bottom-left";
  /** Element the adjustments apply to. Defaults to document.documentElement. */
  target?: HTMLElement | null;
}

export declare function AccessibilityWidget(props: AccessibilityWidgetProps): JSX.Element;
export default AccessibilityWidget;
