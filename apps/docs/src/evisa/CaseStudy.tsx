/* UX4G e-Visa — case study writeup. Composed from @hopline/ux4g-react
   components + tokens only. */
import React from "react";
import { Button, Card, Badge, Chip, Alert, Table, AccessibilityWidget } from "@hopline/ux4g-react";
import { Icon } from "./icons";

const COL = 920;

function Doc({ children, narrow, style }: { children: React.ReactNode; narrow?: boolean; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: narrow ? 760 : COL, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--color-primary)", whiteSpace: "nowrap" }}>
      <span aria-hidden="true" style={{ width: 22, height: 2, background: "var(--color-primary)", borderRadius: 2 }} />
      {children}
    </span>
  );
}

function SectionNum({ n, kicker, title, lead }: { n: number; kicker: string; title: string; lead?: string }) {
  return (
    <header style={{ marginBottom: 28 }}>
      <Eyebrow>{"0" + n + " · " + kicker}</Eyebrow>
      <h2 style={{ margin: "12px 0 0", fontSize: 30, fontWeight: 600, letterSpacing: "-0.5px", lineHeight: 1.15, color: "var(--color-text)" }}>{title}</h2>
      {lead && <p style={{ margin: "12px 0 0", fontSize: 17, lineHeight: "27px", color: "var(--color-text-muted)" }}>{lead}</p>}
    </header>
  );
}

function Section({ bg, id, children }: { bg: string; id?: string; children: React.ReactNode }) {
  const bordered = bg !== "var(--color-surface)";
  return (
    <section id={id} style={{ background: bg, scrollMarginTop: 70, borderTop: bordered ? "1px solid var(--color-divider)" : "none", borderBottom: bordered ? "1px solid var(--color-divider)" : "none" }}>
      <div style={{ padding: "72px 0" }}>{children}</div>
    </section>
  );
}

/* shared screenshot frame */
function Shot({ label, variant, src, alt, note }: { label: string; variant?: "neutral" | "primary"; src: string; alt: string; note?: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-s)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
          <Badge variant={variant || "primary"} appearance="solid">{label}</Badge>
        </div>
        <img src={src} alt={alt} loading="lazy" style={{ display: "block", width: "100%", background: "var(--color-surface-subtle)" }} />
      </div>
      {note && <figcaption style={{ fontSize: 13.5, lineHeight: "20px", color: "var(--color-text-muted)", marginTop: 10 }}>{note}</figcaption>}
    </figure>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section style={{ background: "linear-gradient(180deg, var(--color-primary-subtle), var(--color-surface))", borderBottom: "1px solid var(--color-divider)" }}>
      <Doc style={{ paddingTop: 64, paddingBottom: 64 }}>
        <Eyebrow>UX4G Design System 2.0 · Case study</Eyebrow>
        <h1 style={{ margin: "18px 0 0", fontSize: "clamp(34px,5vw,52px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.08, color: "var(--color-text)", textWrap: "balance" }}>
          Redesigning India's e-Visa portal
        </h1>
        <p style={{ margin: "20px 0 0", fontSize: 19, lineHeight: "29px", color: "var(--color-text-muted)", maxWidth: 680 }}>
          A government service used by millions of travellers, rebuilt on the UX4G design system — calmer, clearer, mobile-ready and accessible by default, without losing a single piece of essential content.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {["Government services", "Accessibility-first", "WCAG 2.2 AA", "Responsive", "Plain language"].map((t, i) => (
            <Badge key={i} variant="primary" appearance="tonal">{t}</Badge>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <a href="/examples/evisa" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="large" iconRight={<Icon name="arrowRight" size={18} color="#fff" />}>View the redesign</Button>
          </a>
          <a href="/examples/evisa/apply" style={{ textDecoration: "none" }}>
            <Button variant="primary" appearance="outlined" size="large">Try the apply flow</Button>
          </a>
        </div>
      </Doc>
    </section>
  );
}

/* ---------- at a glance ---------- */
function Glance() {
  const items = [
    { icon: "list", k: "One", v: "clear primary action", d: "A single, prominent “Apply now” path replaces a wall of equally-weighted buttons." },
    { icon: "shield", k: "3-tier", v: "government header", d: "Utility strip, emblem masthead and primary navigation — a recognised gov pattern." },
    { icon: "fileText", k: "4-step", v: "guided application", d: "A stepper, autosave and a live summary replace one long, intimidating form." },
    { icon: "checkCircle", k: "AA", v: "WCAG 2.2 conformance", d: "Visible focus, 44px targets, text resizing and reduced-motion support throughout." },
  ];
  return (
    <Doc style={{ paddingTop: 56, paddingBottom: 8 }}>
      <div className="ev-grid ev-grid-4" style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(4,1fr)" }}>
        {items.map((it, i) => (
          <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20, boxShadow: "var(--shadow-xs)" }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--color-primary-subtle)", display: "grid", placeItems: "center", marginBottom: 14 }}>
              <Icon name={it.icon} size={20} color="var(--color-primary)" />
            </span>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", lineHeight: 1.1 }}>{it.k}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-primary)", marginBottom: 8 }}>{it.v}</div>
            <div style={{ fontSize: 13.5, lineHeight: "20px", color: "var(--color-text-muted)" }}>{it.d}</div>
          </div>
        ))}
      </div>
    </Doc>
  );
}

/* ---------- 01 · the problem ---------- */
function Problem() {
  const issues: [string, string][] = [
    ["No visual hierarchy", "Every block competed for attention with equal weight — the eye had nowhere to land and no obvious place to start."],
    ["No clear call to action", "“Apply” was one of seven identical grey buttons in a row, indistinguishable from “Print” or “Re-upload”."],
    ["A scrolling marquee", "Critical notices moved continuously, were unpausable and unreadable for many users — an accessibility and comprehension problem."],
    ["Dense, dated styling", "Tightly-packed blue boxes, mixed fonts and inconsistent spacing read as an older, less trustworthy interface."],
    ["Not built for mobile", "A fixed desktop layout meant pinching and horizontal scrolling on the phones most travellers actually use."],
    ["Buried, fragmented help", "Phone numbers, advisories and links were scattered across the page with no clear grouping."],
  ];
  return (
    <Section bg="var(--color-surface)">
      <Doc>
        <SectionNum n={1} kicker="The problem" title="A trusted service that was hard to use" lead="The original portal contained everything a traveller needs — but presented it as an undifferentiated wall of boxes, buttons and moving text. The content was right; the experience wasn't." />
        <div style={{ border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-s)", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "var(--color-surface-subtle)", borderBottom: "1px solid var(--color-divider)" }}>
            <Badge variant="neutral" appearance="solid">Before</Badge>
            <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>indianvisaonline.gov.in/evisa — the original portal</span>
          </div>
          <img src="/evisa/screenshots/before.png" alt="The original India e-Visa portal" style={{ display: "block", width: "100%" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "18px 28px" }} className="ev-issue-grid">
          {issues.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: 999, flexShrink: 0, background: "var(--color-danger-subtle)", color: "var(--color-danger)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--color-text)", marginBottom: 3 }}>{it[0]}</div>
                <div style={{ fontSize: 14, lineHeight: "21px", color: "var(--color-text-muted)" }}>{it[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 02 · research & insights ---------- */
function Research() {
  const insights = [
    { icon: "list", t: "One task dominates", d: "Of the original page's many equally-weighted actions — apply, pay, verify, print, re-upload, check status — applying is the task almost every first-time visitor arrives to do. The page should be organised around it." },
    { icon: "smartphone", t: "Mobile is the first screen", d: "Travellers reach the portal from search, on their phones, often mid-planning. A fixed desktop layout turns the most common context into the hardest one." },
    { icon: "phone", t: "Getting stuck is the norm", d: "The original page gives top billing to four helplines and re-upload instructions — strong evidence that applicants routinely hit dead ends the interface itself should prevent." },
    { icon: "shield", t: "Trust comes from familiarity", d: "Citizens recognise official services by shared government patterns — the emblem masthead, the tricolour strip, the accessibility bar. Departing from them costs credibility." },
  ];
  return (
    <Section bg="var(--color-surface-subtle)">
      <Doc>
        <SectionNum n={2} kicker="Research & insights" title="What informed the redesign" lead="This phase was an expert review, not field research: a heuristic audit of the original portal, a task analysis of what travellers come to do, and a standards review against the obligations that bind Indian government services." />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
          {["Heuristic audit", "Traveller task analysis", "GIGW 3.0", "WCAG 2.2 AA", "RPwD Act", "UX4G content guidance"].map((t, i) => <Chip key={i}>{t}</Chip>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="ev-ba-grid">
          {insights.map((p, i) => (
            <Card key={i} padding={24}>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: "var(--color-primary-subtle)", display: "grid", placeItems: "center" }}>
                  <Icon name={p.icon} size={22} color="var(--color-primary)" />
                </span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--color-text-subtle)", marginBottom: 4 }}>{"Insight 0" + (i + 1)}</div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>{p.t}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: "22px", color: "var(--color-text-muted)" }}>{p.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Alert variant="info" title="A note on evidence">
            These insights come from expert review of the live portal and published government standards. Moderated usability testing with real travellers is the recommended next step — see “What's next” below.
          </Alert>
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 03 · principles ---------- */
function Principles() {
  const ps = [
    { icon: "list", t: "Lead with one action", d: "Most visitors come to do one thing: apply. The redesign makes that the unmistakable primary path and lets everything else support it." },
    { icon: "user", t: "Plain, reassuring language", d: "Headings and labels speak to the traveller in plain English, explaining what to do and what happens next — in line with UX4G's content voice." },
    { icon: "shield", t: "Accessible by default", d: "Accessibility is built into the tokens and components, not bolted on: focus, contrast, target size, motion and a universal-access widget." },
    { icon: "globe", t: "Consistent with government", d: "The three-tier emblem masthead, tricolour strip and portal footer make it instantly read as an official Government of India service." },
  ];
  return (
    <Section bg="var(--color-surface)">
      <Doc>
        <SectionNum n={3} kicker="Approach" title="Four principles, drawn from UX4G" lead="The UX4G design system gave us the tokens, components and content guidance. These principles shaped how we applied them." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="ev-ba-grid">
          {ps.map((p, i) => (
            <Card key={i} padding={24}>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: "var(--color-primary-subtle)", display: "grid", placeItems: "center" }}>
                  <Icon name={p.icon} size={22} color="var(--color-primary)" />
                </span>
                <div>
                  <h3 style={{ margin: "2px 0 6px", fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>{p.t}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: "22px", color: "var(--color-text-muted)" }}>{p.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 04 · process & iterations ---------- */
function Process() {
  return (
    <Section bg="var(--color-surface-subtle)">
      <Doc>
        <SectionNum n={4} kicker="Process & iterations" title="From audit to government-grade" lead="The redesign moved in deliberate passes: rebuild the service on UX4G's defaults first, then re-theme and harden it into a recognisable Government of India portal. Nothing essential from the original was removed at any stage." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px 24px", alignItems: "start" }} className="ev-ba-grid">
          <Shot label="Baseline" variant="neutral" src="/evisa/screenshots/before.png" alt="Original e-Visa portal" note="The audit artefact: every box, button, notice and helpline on the original page was inventoried so no content would be lost." />
          <Shot label="Iteration 1" variant="primary" src="/evisa/screenshots/iter-violet.png" alt="First iteration on UX4G defaults" note="First pass on UX4G 2.0 defaults — the violet theme, a welcoming hero and one primary action — to prove the hierarchy before any theming." />
          <Shot label="Iteration 2" variant="primary" src="/evisa/screenshots/after-portal.png" alt="Re-themed government portal" note="Re-themed via UX4G's themeable primary to a gov blue, with the emblem masthead, a denser portal layout and a “Before you start” rail." />
          <Shot label="Iteration 3" variant="primary" src="/evisa/screenshots/after-apply.png" alt="Guided four-step application" note="The application itself: a four-step guided flow with a stepper, a live summary rail and automatic saving." />
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 05 · key decisions ---------- */
function Decisions() {
  const ds = [
    { tag: "Information architecture", problem: "Seven equal buttons and stacked boxes with no grouping.", solution: "A clear top-to-bottom story: apply → how it works → visa types → advisory → manage → help. Returning users get a dedicated “Manage your application” area instead of competing with first-timers." },
    { tag: "Hero & eligibility check", problem: "The page opened cold, with no welcome and no guidance on where to start.", solution: "A warm hero states the value in one line and offers a 30-second eligibility quick-check — nationality, purpose and arrival date — so people self-qualify before investing time in the form." },
    { tag: "The marquee", problem: "Continuous, unpausable scrolling text carried important legal notices.", solution: "Kept as a clearly-labelled “Notices” ticker that pauses on hover and focus, has an explicit pause control, and fully stops for anyone who prefers reduced motion — the message survives, the barrier doesn't." },
    { tag: "Visa categories", problem: "Nine visa types listed as flat blue links.", solution: "Scannable cards, each with an icon, a one-line plain-language description and indicative validity, so travellers can recognise the right category at a glance." },
    { tag: "Guided application", problem: "Applying meant facing one long, unforgiving form.", solution: "A four-step flow with a progress stepper, a live application summary, automatic saving and inline validation — breaking a daunting task into calm, recoverable steps." },
    { tag: "Help & trust", problem: "Helpdesk numbers, advisories and partner logos were scattered.", solution: "Consolidated into a single help section with an FAQ accordion and clearly-grouped helpdesk contacts, plus a prominent anti-fraud advisory and a trust-badge band in the footer." },
  ];
  return (
    <Section bg="var(--color-surface)">
      <Doc>
        <SectionNum n={5} kicker="Key decisions" title="What changed, and why" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ds.map((d, i) => (
            <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-xs)" }}>
              <div style={{ marginBottom: 14 }}><Badge variant="primary" appearance="tonal">{d.tag}</Badge></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="ev-pa-grid">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--color-text-subtle)", marginBottom: 6 }}>
                    <Icon name="x" size={14} color="var(--color-danger)" />Problem
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: "23px", color: "var(--color-text-muted)" }}>{d.problem}</p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--color-success)", marginBottom: 6 }}>
                    <Icon name="check" size={14} color="var(--color-success)" />Solution
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: "23px", color: "var(--color-text)" }}>{d.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 28, alignItems: "start" }} className="ev-ba-grid">
          <Shot label="How to apply" variant="primary" src="/evisa/screenshots/after-process.png" alt="How-to-apply process and eligibility check" note="The four-step process strip and the 30-second eligibility quick-check, side by side on the landing page." />
          <Shot label="Review & pay" variant="primary" src="/evisa/screenshots/after-review.png" alt="Review and pay step" note="The final review step: completed stepper, a full summary of entered details and a clear, single payment action." />
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 06 · mobile showcase ---------- */
function Mobile() {
  const phone = (src: string, alt: string, caption: string) => (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 414, maxWidth: "100%", borderRadius: 40, padding: 12, background: "var(--color-text)", boxShadow: "0 18px 40px rgba(33,33,33,.22)" }}>
        <div style={{ borderRadius: 28, overflow: "hidden", background: "var(--color-surface)" }}>
          <img src={src} alt={alt} loading="lazy" style={{ display: "block", width: "100%" }} />
        </div>
      </div>
      <figcaption style={{ fontSize: 13.5, lineHeight: "20px", color: "var(--color-text-muted)", marginTop: 12, textAlign: "center", maxWidth: 360 }}>{caption}</figcaption>
    </figure>
  );
  const points: [string, string][] = [
    ["Navigation collapses", "The primary nav folds into a menu button; “Apply now” stays visible in the masthead."],
    ["Content reflows, never shrinks", "The portal grid, process strip and category cards stack into a single column — no pinching, no horizontal scrolling."],
    ["The form stays recoverable", "On the apply flow the summary rail moves above the form, fields go full-width and progress keeps saving automatically."],
    ["Targets stay generous", "Every control keeps the 44px minimum target, regardless of screen size."],
  ];
  return (
    <Section bg="var(--color-surface-subtle)">
      <Doc>
        <SectionNum n={6} kicker="Mobile" title="The same service in one hand" lead="Most travellers will meet this service on a phone. These are captures of the actual redesign rendered at 390px — or open either page and resize the window to try it yourself." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start", marginBottom: 36 }} className="ev-ba-grid">
          {phone("/evisa/screenshots/mobile-portal.png", "Redesigned portal at phone width", "The landing page at 390px — single column, menu button, the apply action always within reach.")}
          {phone("/evisa/screenshots/mobile-apply.png", "Apply flow at phone width", "The guided application at 390px — full-width fields, the summary above the form, autosave throughout.")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px 28px" }} className="ev-issue-grid">
          {points.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: "var(--color-primary-subtle)", display: "grid", placeItems: "center" }}>
                <Icon name="smartphone" size={15} color="var(--color-primary)" />
              </span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--color-text)", marginBottom: 3 }}>{it[0]}</div>
                <div style={{ fontSize: 14, lineHeight: "21px", color: "var(--color-text-muted)" }}>{it[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 07 · accessibility ---------- */
function Accessibility() {
  const a: [string, string][] = [
    ["Visible focus", "Every interactive element carries the signature 4px focus halo plus a 2px keyboard outline — never removed."],
    ["44px targets", "Buttons, links and controls meet the minimum 44×44px touch and click target size."],
    ["Text resizing", "The utility strip lets anyone scale text up or down; the preference persists across visits."],
    ["Reduced motion", "The notices ticker and all transitions respect prefers-reduced-motion and stop entirely when requested."],
    ["Real form semantics", "Labels, required indicators, helper text and error states are wired with proper ARIA, never colour alone."],
    ["Universal-access widget", "The UX4G accessibility launcher offers contrast, spacing, dyslexia-friendly font, link highlighting and more."],
  ];
  return (
    <Section bg="var(--color-surface)">
      <Doc>
        <SectionNum n={7} kicker="Accessibility" title="Built to be used by everyone" lead="Government services must work for every citizen. Accessibility was a constraint from the first token, aligned with WCAG 2.2 AA, GIGW 3.0 and the RPwD Act." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px 28px" }} className="ev-issue-grid">
          {a.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: "var(--color-success-subtle)", display: "grid", placeItems: "center" }}>
                <Icon name="check" size={16} color="var(--color-success)" />
              </span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--color-text)", marginBottom: 3 }}>{it[0]}</div>
                <div style={{ fontSize: 14, lineHeight: "21px", color: "var(--color-text-muted)" }}>{it[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- 08 · measuring success ---------- */
function Metrics() {
  const rows = [
    { metric: "Application completion", why: "The share of started applications that reach submission — the single clearest measure of whether the guided flow works.", signal: "Fewer abandoned applications; recoverable drafts resumed and finished." },
    { metric: "Time to complete", why: "The redesign promises “most forms take ~15 minutes”; the median should honour that promise.", signal: "Median completion at or under 15 minutes." },
    { metric: "Helpdesk contact rate", why: "The original page leads with four helplines — every avoidable call is a sign the interface failed first.", signal: "Fewer contacts per 1,000 applications about form, payment and re-upload issues." },
    { metric: "Mobile parity", why: "Phones are the most common context; success there can't lag the desktop experience.", signal: "Mobile completion within a few points of desktop." },
    { metric: "Ineligible entries", why: "The 30-second eligibility check should stop people investing time in applications that will be refused.", signal: "Fewer ineligible applications entering — and being rejected from — the form." },
    { metric: "Accessibility conformance", why: "WCAG 2.2 AA is an obligation, not an aspiration, for a government service.", signal: "A clean independent audit plus task success in assistive-technology testing." },
  ];
  return (
    <Section bg="var(--color-surface-subtle)">
      <Doc>
        <SectionNum n={8} kicker="Measuring success" title="How we'll know it worked" lead="The redesign has not yet faced live traffic, so this is a measurement plan rather than a results table — the six signals we would instrument from day one." />
        <Table
          columns={[
            { key: "metric", header: "Metric", render: (r: { metric: string }) => <strong style={{ fontWeight: 600 }}>{r.metric}</strong> },
            { key: "why", header: "Why it matters" },
            { key: "signal", header: "Success looks like" },
          ]}
          rows={rows}
        />
      </Doc>
    </Section>
  );
}

/* ---------- 09 · design system, reflections & next ---------- */
function SystemAndOutcome() {
  const used = ["Navbar pattern", "Footer", "Button", "Card", "Alert", "Badge", "Chip", "Input", "Select", "DatePicker", "Checkbox", "FileUpload", "Stepper", "Breadcrumb", "Accordion", "Progress", "Table", "AccessibilityWidget"];
  const next: [string, string][] = [
    ["Test with travellers", "Moderated usability sessions — including participants using screen readers and magnification — to validate the expert-review insights against real behaviour."],
    ["Localise the service", "Hindi and regional-language versions; Noto Sans was chosen precisely for its Indic-script coverage, so the type system is ready."],
    ["Connect the real journeys", "Wire the apply, payment and track-application flows to live services, including the e-mail touchpoints where the ETA actually arrives."],
    ["Instrument and iterate", "Ship the measurement plan above with the service, publish the numbers, and let them drive the next round of changes."],
  ];
  return (
    <Section bg="var(--color-surface)">
      <Doc>
        <SectionNum n={9} kicker="Design system & next steps" title="Everything is UX4G" lead="The redesign composes UX4G 2.0 components and tokens — re-themed to a government blue through the system's own themeable primary, with the 8-point spacing grid and the soft elevation scale — so it stays consistent with the wider family of Indian government services." />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
          {used.map((u, i) => <Chip key={i}>{u}</Chip>)}
        </div>
        <div style={{ marginBottom: 28 }}>
          <Alert variant="info" title="How it's built">
            Every interface on these pages is composed from <strong>@hopline/ux4g-react</strong> components and design tokens. The only additions are a small inline-SVG icon helper (the same Lucide approach UX4G ships internally) and plain CSS-grid layout wrappers. The government blue is a single themeable-primary override; no component was forked or restyled.
          </Alert>
        </div>
        <Alert variant="info" title="Expected impact">
          By giving travellers one obvious path, plain-language guidance and a recoverable, mobile-friendly application, the redesign aims to reduce drop-off, cut avoidable helpdesk contacts and make the service usable by significantly more people — while keeping the authority and completeness of the original.
        </Alert>
        <h3 style={{ margin: "40px 0 18px", fontSize: 20, fontWeight: 600, color: "var(--color-text)" }}>What's next</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 28px", marginBottom: 8 }} className="ev-issue-grid">
          {next.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: 999, flexShrink: 0, background: "var(--color-primary-subtle)", color: "var(--color-primary)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--color-text)", marginBottom: 3 }}>{it[0]}</div>
                <div style={{ fontSize: 14, lineHeight: "21px", color: "var(--color-text-muted)" }}>{it[1]}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <a href="/examples/evisa" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="large" iconRight={<Icon name="arrowRight" size={18} color="#fff" />}>Explore the redesigned portal</Button>
          </a>
          <a href="/examples/evisa/apply" style={{ textDecoration: "none" }}>
            <Button variant="primary" appearance="outlined" size="large">Walk through the apply flow</Button>
          </a>
        </div>
      </Doc>
    </Section>
  );
}

/* ---------- slim document chrome (this is a write-up, not the portal) ---------- */
function Mark() {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)", letterSpacing: "-0.2px" }}>e-Visa</span>;
  }
  return <img src="/evisa/assets/evisa-logo.png" alt="Indian e-Visa" onError={() => setFailed(true)} style={{ height: 30, width: "auto" }} />;
}

function DocBar() {
  const navLink: React.CSSProperties = { fontSize: 13.5, fontWeight: 600, color: "var(--color-text-link)", textDecoration: "none", whiteSpace: "nowrap" };
  return (
    <header style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
      <div style={{ maxWidth: COL, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <Mark />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", whiteSpace: "nowrap" }}>e-Visa portal redesign</span>
          <Badge variant="primary" appearance="tonal">Case study</Badge>
        </span>
        <nav aria-label="Case study" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="/" style={navLink}>UX4G design system</a>
          <a href="/examples/evisa" style={navLink}>Redesigned portal</a>
          <a href="/examples/evisa/apply" style={navLink}>Apply flow</a>
        </nav>
      </div>
    </header>
  );
}

function DocFoot() {
  const link: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "var(--color-text-link)", textDecoration: "none" };
  return (
    <footer style={{ borderTop: "1px solid var(--color-divider)", background: "var(--color-surface-subtle)" }}>
      <div style={{ maxWidth: COL, margin: "0 auto", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Case study · Redesigning India's e-Visa portal · Built on the UX4G Design System 2.0</span>
        <span style={{ display: "flex", gap: 18 }}>
          <a href="/examples/evisa" style={link}>Redesigned portal</a>
          <a href="/examples/evisa/apply" style={link}>Apply flow</a>
        </span>
      </div>
    </footer>
  );
}

export default function CaseStudy() {
  return (
    <>
      <DocBar />
      <Hero />
      <Glance />
      <Problem />
      <Research />
      <Principles />
      <Process />
      <Decisions />
      <Mobile />
      <Accessibility />
      <Metrics />
      <SystemAndOutcome />
      <DocFoot />
      <AccessibilityWidget position="bottom-right" />
    </>
  );
}
