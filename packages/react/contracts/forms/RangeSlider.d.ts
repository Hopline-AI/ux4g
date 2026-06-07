import * as React from "react";

/** UX4G RangeSlider — single-value slider with a filled violet track and value bubble. */
export interface RangeSliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  unit?: string;
  disabled?: boolean;
}

export declare function RangeSlider(props: RangeSliderProps): JSX.Element;
export default RangeSlider;
