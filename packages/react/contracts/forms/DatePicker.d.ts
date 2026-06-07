import * as React from "react";

/** UX4G DatePicker — field that opens a month calendar popover; value is ISO yyyy-mm-dd. */
export interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (iso: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  required?: boolean;
}

export declare function DatePicker(props: DatePickerProps): JSX.Element;
export default DatePicker;
