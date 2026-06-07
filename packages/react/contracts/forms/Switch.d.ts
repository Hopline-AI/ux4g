import * as React from "react";

/** UX4G Switch — on/off toggle for settings. Controlled (`checked`) or uncontrolled (`defaultChecked`). */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export declare function Switch(props: SwitchProps): JSX.Element;
export default Switch;
