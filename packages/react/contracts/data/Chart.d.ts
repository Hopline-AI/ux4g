import * as React from "react";

export type ChartType = "bar" | "line" | "pie" | "doughnut" | "radar" | "polarArea";

/**
 * UX4G Chart — a themed Chart.js v4 wrapper. Requires Chart.js to be present on
 * the page as `window.Chart` (load it from a CDN/bundle). Applies UX4G fonts,
 * the brand categorical palette, soft grids and dark tooltips; dataset colours
 * are auto-filled from the palette when you don't supply them.
 *
 * @startingPoint section="Data" subtitle="Branded Chart.js wrapper — bar/line/pie/radar" viewport="640x360"
 */
export interface ChartProps {
  type: ChartType;
  data: any;
  options?: any;
  height?: number;
  palette?: string[];
}

export declare const UX4G_CHART_PALETTE: string[];
export declare function Chart(props: ChartProps): JSX.Element;
export default Chart;
