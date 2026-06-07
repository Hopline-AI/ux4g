import * as React from "react";

export interface StepperStep {
  label: React.ReactNode;
  description?: React.ReactNode;
}

/** UX4G Stepper — shows progress through an ordered multi-step flow. `current` is 0-indexed. */
export interface StepperProps {
  steps: StepperStep[];
  current: number;
  orientation?: "horizontal" | "vertical";
}

export declare function Stepper(props: StepperProps): JSX.Element;
export default Stepper;
