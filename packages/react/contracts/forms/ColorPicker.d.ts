import * as React from "react";

/** UX4G ColorPicker — pick a theme/brand colour from curated swatches, with an optional custom picker. */
export interface ColorPickerProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (hex: string) => void;
  swatches?: string[];
  allowCustom?: boolean;
}

export declare function ColorPicker(props: ColorPickerProps): JSX.Element;
export default ColorPicker;
