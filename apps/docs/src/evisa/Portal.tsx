/* UX4G e-Visa — landing page: government service portal (task-first,
   three-column). Composed from @hopline/ux4g-react components + tokens only. */
import React from "react";
import { Button, Card, List, Alert, Select, AccessibilityWidget } from "@hopline/ux4g-react";
import { Icon } from "./icons";
import { GovHeader, PortalFooter } from "./chrome";

/* ---------- section header bar ---------- */
function SectionBar({ title, action, id }: { icon?: string; title: string; action?: React.ReactNode; id?: string }) {
  return (
    <div id={id} style={{ scrollMarginTop: 76, display: "flex", alignItems: "baseline", gap: 12, paddingBottom: 12, marginBottom: 24, borderBottom: "1px solid var(--color-border)" }}>
      <h2 className="ux-headline-5" style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 500, letterSpacing: "0", color: "var(--color-text)" }}>{title}</h2>
      {action && <span style={{ marginLeft: "auto", alignSelf: "center" }}>{action}</span>}
    </div>
  );
}

function TileIcon({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: 10, background: "var(--color-primary-subtle)", display: "grid", placeItems: "center", flexShrink: 0 }}>
      <Icon name={name} size={Math.round(size * 0.5)} color="var(--color-primary)" stroke={1.9} />
    </span>
  );
}

/* restrained rail heading (plain UX4G Title — DS List/Card sit beneath) */
function RailHeading({ title, id }: { icon?: string; title: string; id?: string }) {
  return (
    <h2 id={id} className="ux-title-3" style={{ scrollMarginTop: 76, margin: "0 0 12px", paddingBottom: 8, borderBottom: "1px solid var(--color-divider)", fontSize: 16, lineHeight: 1.3, fontWeight: 600, letterSpacing: "0", color: "var(--color-text)" }}>{title}</h2>
  );
}

/* ---------- compact intro band ---------- */
function Intro() {
  const facts: [string, string][] = [
    ["calendar", "Apply at least 4 days before you travel"],
    ["passport", "Passport valid for 6+ months on arrival"],
    ["creditCard", "Fee payable online — from US$ 25"],
  ];
  return (
    <section id="main" style={{ background: "var(--color-surface-subtle)", borderBottom: "1px solid var(--color-divider)" }}>
      <div className="ev-section ev-intro" style={{ paddingTop: 32, paddingBottom: 32, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 600, letterSpacing: "-0.4px", lineHeight: 1.15, color: "var(--color-text)" }}>Apply for an Indian e-Visa</h1>
          <p style={{ margin: "10px 0 0", fontSize: 16.5, lineHeight: "25px", color: "var(--color-text-muted)", maxWidth: 620 }}>
            Apply online, pay the fee and receive your Electronic Travel Authorisation (ETA) by email. No visit to an embassy or consulate is required.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
            <a href="/examples/evisa/apply" style={{ textDecoration: "none" }}>
              <Button variant="primary" iconLeft={<Icon name="plane" size={18} color="#fff" />}>Apply now</Button>
            </a>
            <a href="#track" style={{ textDecoration: "none" }}>
              <Button variant="primary" appearance="outlined" iconLeft={<Icon name="search" size={18} color="var(--color-primary)" />}>Track application</Button>
            </a>
          </div>
        </div>
        <aside className="ev-keyfacts" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "16px 18px", width: 280, boxShadow: "var(--shadow-xs)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 10 }}>Before you start</div>
          {facts.map(([ic, t], i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0", borderTop: i ? "1px solid var(--color-divider)" : "none" }}>
              <Icon name={ic} size={17} color="var(--color-text-muted)" style={{ marginTop: 2 }} />
              <span style={{ fontSize: 13.5, lineHeight: "19px", color: "var(--color-text)" }}>{t}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

/* ---------- 7-task service launcher ---------- */
function Services() {
  const svc = [
    { icon: "plane", title: "Apply for e-Visa", href: "/examples/evisa/apply", primary: true },
    { icon: "clock", title: "Track application status", href: "#track" },
    { icon: "creditCard", title: "Verify payment / pay fee", href: "#" },
    { icon: "printer", title: "Print e-Visa (ETA)", href: "#" },
    { icon: "refresh", title: "Complete a saved form", href: "#" },
    { icon: "upload", title: "Re-upload documents", href: "#" },
    { icon: "fileText", title: "Sample application", href: "#" },
  ];
  return (
    <section className="ev-section" style={{ paddingTop: 36 }} id="services">
      <SectionBar title="e-Visa services" />
      <div className="ev-services-grid">
        {svc.map((s, i) => (
          <a key={i} href={s.href} className={"ev-tile" + (s.primary ? " is-primary" : "")} style={{ textDecoration: "none" }}>
            <TileIcon name={s.icon} size={34} />
            <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--color-text)", flex: 1, minWidth: 0 }}>{s.title}</span>
            <Icon name="chevronRight" size={17} color="var(--color-text-subtle)" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- anti-fraud advisory (full width) ---------- */
function Advisory() {
  return (
    <section className="ev-section" style={{ paddingTop: 28 }}>
      <Alert variant="warning" title="Beware of fraudulent fees and websites">
        The Government of India does <strong>not</strong> charge any emergency, express or additional fee for an e-Visa.
        This is the only official portal — ignore agents who promise faster approval for extra payment.
      </Alert>
    </section>
  );
}

/* ---------- left navigation rail ---------- */
function LeftNav() {
  const links = [
    { icon: "globe", label: "Eligible countries / nationalities" },
    { icon: "fileText", label: "Instructions for applicants" },
    { icon: "passport", label: "Documents required" },
    { icon: "helpCircle", label: "Frequently asked questions" },
    { icon: "creditCard", label: "Payment related" },
    { icon: "mapPin", label: "Authorised immigration checkposts" },
    { icon: "phone", label: "Contact the helpdesk", href: "#help" },
  ];
  return (
    <nav aria-label="e-Visa information" className="ev-leftnav" style={{ alignSelf: "start" }}>
      <RailHeading title="Information" />
      <List
        bordered
        dividers
        interactive
        chevron
        items={links.map((l) => ({ leading: <Icon name={l.icon} size={18} color="var(--color-primary)" />, title: l.label, href: l.href || "#" }))}
      />
    </nav>
  );
}

/* ---------- how to apply: numbered process flow ---------- */
function Process() {
  const steps = [
    { icon: "fileText", title: "Apply online", body: "Complete the form and upload your photo and passport page." },
    { icon: "creditCard", title: "Pay the fee", body: "Pay by credit card, debit card or a payment wallet." },
    { icon: "mail", title: "Receive your ETA", body: "Your authorisation is emailed to you, usually in 24–72 hours." },
    { icon: "plane", title: "Fly to India", body: "Show the ETA at immigration, where the e-Visa is stamped." },
  ];
  return (
    <div>
      <SectionBar title="How to apply" id="how-it-works" />
      <div className="ev-process">
        <div className="ev-process-line" aria-hidden="true" />
        {steps.map((s, i) => (
          <div key={i} className="ev-step">
            <span className="ev-step-num">{i + 1}</span>
            <Icon name={s.icon} size={22} color="var(--color-primary)" style={{ margin: "12px 0 8px" }} />
            <h3 style={{ margin: "0 0 5px", fontSize: 15, fontWeight: 600, color: "var(--color-text)" }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: "19px", color: "var(--color-text-muted)" }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- visa categories (clean card grid, no chips) ---------- */
function Categories() {
  const cats = [
    { icon: "globe", name: "e-Tourist Visa", desc: "Sightseeing, recreation or visiting friends and family.", validity: "30 days, 1 year or 5 years" },
    { icon: "briefcase", name: "e-Business Visa", desc: "Trade, meetings, recruitment or setting up a venture.", validity: "Up to 1 year, multiple entry" },
    { icon: "medical", name: "e-Medical Visa", desc: "Medical treatment at a recognised Indian hospital.", validity: "60 days, triple entry" },
    { icon: "user", name: "e-Medical Attendant Visa", desc: "Accompany a patient on an e-Medical Visa.", validity: "60 days, triple entry" },
    { icon: "graduation", name: "e-Student Visa", desc: "Study at a recognised Indian institution.", validity: "1 year, multiple entry" },
    { icon: "users", name: "e-Family Visa", desc: "Visit close family members residing in India.", validity: "1 year, multiple entry" },
    { icon: "transit", name: "e-Transit Visa", desc: "Pass through India en route to another country.", validity: "15 days, double entry" },
    { icon: "layers", name: "e-Miscellaneous Visa", desc: "Purposes not covered by other categories.", validity: "As approved" },
    { icon: "factory", name: "e-Production Investment Visa", desc: "Investment and production-linked activity.", validity: "Up to 1 year, multiple entry" },
  ];
  return (
    <div style={{ marginTop: 40 }}>
      <SectionBar title="e-Visa categories" id="visa-types" />
      <div className="ev-cat-grid">
        {cats.map((c, i) => (
          <a key={i} href="/examples/evisa/apply" className="ev-cat" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10 }}>
              <TileIcon name={c.icon} size={38} />
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.2 }}>{c.name}</h3>
            </div>
            <p style={{ margin: "0 0 12px", fontSize: 13.5, lineHeight: "20px", color: "var(--color-text-muted)" }}>{c.desc}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 10, borderTop: "1px solid var(--color-divider)" }}>
              <Icon name="clock" size={14} color="var(--color-text-subtle)" />
              <span style={{ fontSize: 12.5, color: "var(--color-text-muted)", flex: 1 }}>{c.validity}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary)", display: "inline-flex", alignItems: "center", gap: 2 }}>
                Apply<Icon name="chevronRight" size={14} color="var(--color-primary)" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- right rail: eligibility + help + links ---------- */
function Eligibility() {
  const [done, setDone] = React.useState(false);
  return (
    <div>
      <RailHeading title="Check eligibility" id="eligibility" />
      <Card padding={16}>
        <p style={{ margin: "0 0 12px", fontSize: 13.5, lineHeight: "19px", color: "var(--color-text-muted)" }}>Confirm you can apply online in about 30 seconds.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Select label="Your nationality" placeholder="Select a country" options={["United States", "United Kingdom", "Australia", "Canada", "Germany", "France", "Japan", "Singapore", "United Arab Emirates", "Other"]} />
          <Select label="Purpose of visit" placeholder="Select a purpose" options={["Tourism / sightseeing", "Business", "Medical treatment", "Study", "Visiting family", "Transit"]} />
          <Button variant="primary" fullWidth onClick={() => setDone(true)} iconRight={<Icon name="arrowRight" size={17} color="#fff" />}>Check eligibility</Button>
        </div>
        {done && (
          <div style={{ marginTop: 12 }}>
            <Alert variant="success" title="You can apply online">
              <a href="/examples/evisa/apply" style={{ fontWeight: 600, color: "var(--color-success)" }}>Start your application →</a>
            </Alert>
          </div>
        )}
      </Card>
    </div>
  );
}

function Helpdesk() {
  const contacts = [
    { leading: <Icon name="phone" size={18} color="var(--color-primary)" />, overline: "e-Visa helpdesk (24 × 7)", title: "+91 82 7808 7808" },
    { leading: <Icon name="mail" size={18} color="var(--color-primary)" />, overline: "Email", title: "indian-evisa@gov.in" },
    { leading: <Icon name="creditCard" size={18} color="var(--color-primary)" />, overline: "SBI ePay payments", title: "+91 022 6536 1671" },
    { leading: <Icon name="creditCard" size={18} color="var(--color-primary)" />, overline: "Axis Bank payments", title: "+91 1800 419 0073" },
  ];
  return (
    <div style={{ marginTop: 28 }} id="help">
      <RailHeading title="Helpdesk" />
      <List bordered dividers items={contacts} />
    </div>
  );
}

function UsefulLinks() {
  const links = ["Ministry of Home Affairs", "Ministry of External Affairs", "Ministry of Tourism", "Bureau of Immigration", "Incredible India"];
  return (
    <div style={{ marginTop: 28 }}>
      <RailHeading title="Useful web links" />
      <List
        bordered
        dividers
        interactive
        chevron
        items={links.map((l) => ({ leading: <Icon name="externalLink" size={16} color="var(--color-text-subtle)" />, title: l, href: "#" }))}
      />
    </div>
  );
}

export default function Portal() {
  return (
    <>
      <GovHeader active="home" />
      <Intro />
      <Services />
      <Advisory />
      <section className="ev-section ev-portal-grid" style={{ paddingTop: 40, paddingBottom: 72 }}>
        <LeftNav />
        <div>
          <Process />
          <Categories />
        </div>
        <div className="ev-rightrail" style={{ alignSelf: "start" }}>
          <Eligibility />
          <Helpdesk />
          <UsefulLinks />
        </div>
      </section>
      <PortalFooter />
      <AccessibilityWidget position="bottom-right" />
    </>
  );
}
