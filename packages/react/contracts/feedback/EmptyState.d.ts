import * as React from "react";

/**
 * UX4G EmptyState — placeholder for empty lists, no-results and first-run.
 *
 * @startingPoint section="Feedback" subtitle="Empty / no-results placeholder with action" viewport="700x320"
 */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export declare function EmptyState(props: EmptyStateProps): JSX.Element;
export default EmptyState;
