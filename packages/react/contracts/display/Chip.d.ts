import * as React from "react";

/** UX4G Chip — compact filter / choice / input token. Add `onRemove` for a removable input chip; needs Material Symbols for the × and any icon. */
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  /** Show a remove (×) button and handle its click. */
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export declare function Chip(props: ChipProps): JSX.Element;
export default Chip;
