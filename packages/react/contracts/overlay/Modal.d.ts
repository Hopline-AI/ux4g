import * as React from "react";

/**
 * UX4G Modal — centered dialog over a scrim. Controlled via `open`; Esc and
 * scrim-click call `onClose`.
 *
 * @startingPoint section="Overlay" subtitle="Dialog with title, body & action footer" viewport="700x420"
 */
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  hideClose?: boolean;
  children?: React.ReactNode;
}

export declare function Modal(props: ModalProps): JSX.Element | null;
export default Modal;
