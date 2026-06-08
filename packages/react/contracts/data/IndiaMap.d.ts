import * as React from "react";
import { IndiaStateGeo } from "./IndiaGeo";

/**
 * UX4G India Map — a data-driven choropleth of India (29 states + 7 union
 * territories). Colour each region by a metric, with hover tooltips, click
 * selection, a gradient legend, and full keyboard + ARIA support (Tab to move,
 * Arrow keys to the nearest region, Enter/Space to select; an aria-live region
 * announces the selection). Per the UX4G "Map of India" guidelines: use for
 * region-based data / heatmaps, not as a substitute for a simple dropdown.
 *
 * @startingPoint section="Data" subtitle="Interactive choropleth — colour states by a metric" viewport="720x680"
 */
export interface IndiaMapProps {
  values?: Record<string, number>;
  colorScale?: string[];
  domain?: [number, number];
  emptyColor?: string;
  selected?: string;
  onSelect?: (code: string, region: IndiaStateGeo) => void;
  formatValue?: (v: number) => string;
  legendLabel?: string;
  showLegend?: boolean;
  height?: number;
  theme?: "light" | "dark";
}

export declare function IndiaMap(props: IndiaMapProps): JSX.Element;
export default IndiaMap;
