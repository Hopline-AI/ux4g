import * as React from "react";

/**
 * UX4G Footer — government portal footer. Brand mark + tagline + social icons,
 * a set of link columns, and a grounding dark bottom strip carrying the
 * copyright line and policy links (privacy, terms, accessibility).
 *
 * @startingPoint section="Navigation" subtitle="Portal footer with link columns + policy strip" viewport="1280x360"
 */
export interface FooterProps {
  logo?: React.ReactNode;
  tagline?: React.ReactNode;
  columns?: FooterColumn[];
  social?: FooterSocial[];
  copyright?: React.ReactNode;
  policyLinks?: FooterLink[];
}

export interface FooterLink { label: React.ReactNode; href?: string; }
export interface FooterColumn { title: React.ReactNode; links: FooterLink[]; }
export interface FooterSocial { label: string; href?: string; icon: React.ReactNode; }

export declare function Footer(props: FooterProps): JSX.Element;
export default Footer;
