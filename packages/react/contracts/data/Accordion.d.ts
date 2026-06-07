import * as React from "react";

export interface AccordionItem {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

/** UX4G Accordion — collapsible panels for FAQs and grouped settings. */
export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
}

export declare function Accordion(props: AccordionProps): JSX.Element;
export default Accordion;
