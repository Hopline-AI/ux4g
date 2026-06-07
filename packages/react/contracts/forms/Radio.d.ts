import * as React from "react";

/** UX4G Radio — circular single-select control. Group options with a shared `name`. */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export declare function Radio(props: RadioProps): JSX.Element;
export default Radio;
