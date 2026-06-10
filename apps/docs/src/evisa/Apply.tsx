/* UX4G e-Visa — multi-step application flow. Composed from @hopline/ux4g-react
   components + tokens only. Mounted client:only (pure interactive form). */
import React from "react";
import {
  Button, Card, Alert, Select, Input, DatePicker, Checkbox, FileUpload,
  Stepper, Breadcrumb, Progress, AccessibilityWidget, type UploadedFile,
} from "@hopline/ux4g-react";
import { Icon } from "./icons";
import { GovHeader, PortalFooter } from "./chrome";

const STEPS = [
  { label: "Visa & travel", description: "Type and dates" },
  { label: "Applicant details", description: "About you" },
  { label: "Passport & photo", description: "Upload documents" },
  { label: "Review & pay", description: "Confirm and submit" },
];

const VISA_TYPES = [
  { id: "tourist", icon: "globe", name: "e-Tourist Visa", desc: "Sightseeing, recreation or visiting friends and family.", fee: "US$ 25", validity: "30 days" },
  { id: "business", icon: "briefcase", name: "e-Business Visa", desc: "Trade, meetings or setting up a venture.", fee: "US$ 80", validity: "1 year" },
  { id: "medical", icon: "medical", name: "e-Medical Visa", desc: "Treatment at a recognised Indian hospital.", fee: "US$ 80", validity: "60 days" },
  { id: "student", icon: "graduation", name: "e-Student Visa", desc: "Study at a recognised Indian institution.", fee: "US$ 80", validity: "Course duration" },
];

/* dynamic date bounds — apply at least 4 days before travel; applicants must be 18+ */
const iso = (d: Date) => d.toISOString().slice(0, 10);
const MIN_ARRIVAL = iso(new Date(Date.now() + 4 * 86400000));
const MAX_DOB = (() => { const d = new Date(); d.setFullYear(d.getFullYear() - 18); return iso(d); })();

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function FieldGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className="ev-field-grid" style={{ display: "grid", gridTemplateColumns: "repeat(" + cols + ", minmax(0,1fr))", gap: "16px 24px" }}>
      {children}
    </div>
  );
}

function StepTitle({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--color-primary)" }}>Step {n} of 4</div>
      <h1 style={{ margin: "8px 0 4px", fontSize: 26, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--color-text)" }}>{title}</h1>
      {sub && <p style={{ margin: 0, fontSize: 15, lineHeight: "22px", color: "var(--color-text-muted)" }}>{sub}</p>}
    </div>
  );
}

/* inline error for controls that don't take state/helperText (date, upload, checkbox) — icon + text, never colour alone */
function ErrText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 13, color: "var(--color-danger)" }}>
      <Icon name="alertTriangle" size={14} color="var(--color-danger)" />
      {msg}
    </div>
  );
}

export default function Apply() {
  const [step, setStep] = React.useState<number>(() => Number(localStorage.getItem("ev-apply-step") || 0));
  const [f, setF] = React.useState<Record<string, any>>(() => {
    try { return JSON.parse(localStorage.getItem("ev-apply-data") || "") || {}; } catch (e) { return {}; }
  });
  const [photoFiles, setPhotoFiles] = React.useState<UploadedFile[]>([]);
  const [passFiles, setPassFiles] = React.useState<UploadedFile[]>([]);
  const [errs, setErrs] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k: string, v: any) => {
    setF((p) => { const n = { ...p, [k]: v }; localStorage.setItem("ev-apply-data", JSON.stringify(n)); return n; });
    setErrs((p) => { if (!p[k]) return p; const n = { ...p }; delete n[k]; return n; });
  };
  const clearErr = (k: string) => setErrs((p) => { if (!p[k]) return p; const n = { ...p }; delete n[k]; return n; });
  const go = (s: number) => { const n = Math.max(0, Math.min(3, s)); setStep(n); localStorage.setItem("ev-apply-step", String(n)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const visa = VISA_TYPES.find((v) => v.id === f.visaType);

  /* ---------- validation (plain-language, per step) ---------- */
  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!f.visaType) e.visaType = "Select a visa type.";
      if (!f.nationality) e.nationality = "Select your nationality.";
      if (!f.passportType) e.passportType = "Select your passport type.";
      if (!f.arrival) e.arrival = "Enter your expected date of arrival.";
      if (!f.port) e.port = "Select your port of arrival.";
      if (!f.validPassport) e.validPassport = "Confirm your passport is valid for at least 6 months from arrival.";
    }
    if (s === 1) {
      if (!f.given) e.given = "Enter your given name(s) as per your passport.";
      if (!f.surname) e.surname = "Enter your surname as per your passport.";
      if (!f.dob) e.dob = "Enter your date of birth.";
      if (!f.gender) e.gender = "Select your gender.";
      if (!f.cob) e.cob = "Select your country of birth.";
      if (!f.email || !EMAIL_RE.test(f.email)) e.email = "Enter a valid email address.";
      else if (f.email !== f.email2) e.email2 = "Email addresses do not match.";
      if (!f.phone) e.phone = "Enter your mobile number.";
    }
    if (s === 2) {
      if (!photoFiles.length) e.photo = "Upload a passport-style photograph.";
      if (!passFiles.length) e.passfile = "Upload your passport bio-page.";
    }
    if (s === 3) {
      if (!f.agree) e.agree = "Confirm the declaration to continue.";
    }
    return e;
  };
  const tryContinue = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrs(e); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setErrs({});
    if (step < 3) go(step + 1);
    else { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };
  const errCount = Object.keys(errs).length;
  const errSummary = errCount > 0 && (
    <div role="alert" style={{ marginBottom: 24 }}>
      <Alert variant="danger" title="There's a problem">
        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
          {Object.values(errs).map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </Alert>
    </div>
  );

  /* ---------- step 1 ---------- */
  const step1 = (
    <div>
      <StepTitle n={1} title="Choose your visa and travel dates" sub="Select the category that matches your reason for travel, then tell us when you plan to arrive." />
      <div
        role="radiogroup"
        aria-label="Visa type"
        aria-invalid={errs.visaType ? "true" : undefined}
        className="ev-visa-choices"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: errs.visaType ? 8 : 32 }}
      >
        {VISA_TYPES.map((v) => {
          const sel = f.visaType === v.id;
          return (
            <button
              key={v.id}
              role="radio"
              aria-checked={sel}
              onClick={() => set("visaType", v.id)}
              style={{
                textAlign: "left", cursor: "pointer", display: "flex", gap: 12, padding: 16, borderRadius: 12, alignItems: "flex-start",
                background: sel ? "var(--color-primary-subtle)" : "var(--color-surface)", font: "inherit",
                border: "1.5px solid " + (sel ? "var(--color-primary)" : errs.visaType ? "var(--color-danger)" : "var(--color-border)"),
                boxShadow: sel ? "var(--shadow-s)" : "none", transition: "all var(--duration-fast)",
              }}
            >
              <span style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0, display: "grid", placeItems: "center", background: sel ? "var(--color-primary)" : "var(--color-primary-subtle)" }}>
                <Icon name={v.icon} size={22} color={sel ? "var(--color-text-on-primary, #fff)" : "var(--color-primary)"} stroke={1.9} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, fontWeight: 600, lineHeight: 1.2, color: "var(--color-text)" }}>
                  {v.name}
                  {sel && <Icon name="checkCircle" size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />}
                </span>
                <span style={{ fontSize: 13, lineHeight: "18px", color: "var(--color-text-muted)" }}>{v.desc}</span>
                <span style={{ fontSize: 12, color: "var(--color-text-subtle)" }}>Fee from {v.fee} · {v.validity}</span>
              </span>
            </button>
          );
        })}
      </div>
      {errs.visaType && <div style={{ marginBottom: 24 }}><ErrText msg={errs.visaType} /></div>}
      <FieldGrid>
        <Select label="Your nationality" required value={f.nationality || ""} onChange={(e) => set("nationality", e.target.value)} state={errs.nationality ? "error" : "default"} helperText={errs.nationality} placeholder="Select a country" options={["United States", "United Kingdom", "Australia", "Canada", "Germany", "France", "Japan", "Singapore", "United Arab Emirates", "Other"]} />
        <Select label="Passport type" required value={f.passportType || ""} onChange={(e) => set("passportType", e.target.value)} state={errs.passportType ? "error" : "default"} helperText={errs.passportType} placeholder="Select type" options={["Ordinary passport", "Official passport", "Diplomatic passport"]} />
        <div>
          <DatePicker label="Expected date of arrival" required value={f.arrival || ""} onChange={(v) => set("arrival", v)} min={MIN_ARRIVAL} />
          {errs.arrival ? <ErrText msg={errs.arrival} /> : <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>Apply at least 4 days before you travel.</p>}
        </div>
        <Select label="Port of arrival" required value={f.port || ""} onChange={(e) => set("port", e.target.value)} state={errs.port ? "error" : "default"} helperText={errs.port} placeholder="Select an airport / seaport" options={["Delhi (DEL)", "Mumbai (BOM)", "Bengaluru (BLR)", "Chennai (MAA)", "Kolkata (CCU)", "Hyderabad (HYD)", "Goa (GOI)", "Kochi (COK)"]} />
      </FieldGrid>
      <div style={{ marginTop: 24 }}>
        <Checkbox label="My passport is valid for at least 6 months from my date of arrival." checked={!!f.validPassport} onChange={(e) => set("validPassport", e.target.checked)} />
        <ErrText msg={errs.validPassport} />
      </div>
    </div>
  );

  /* ---------- step 2 ---------- */
  const step2 = (
    <div>
      <StepTitle n={2} title="Tell us about yourself" sub="Enter your details exactly as they appear in your passport." />
      <FieldGrid>
        <Input label="Given name(s) / first name" required placeholder="As per passport" value={f.given || ""} onChange={(e) => set("given", e.target.value)} state={errs.given ? "error" : "default"} helperText={errs.given} />
        <Input label="Surname / family name" required placeholder="As per passport" value={f.surname || ""} onChange={(e) => set("surname", e.target.value)} state={errs.surname ? "error" : "default"} helperText={errs.surname} />
        <div>
          <DatePicker label="Date of birth" required value={f.dob || ""} onChange={(v) => set("dob", v)} max={MAX_DOB} />
          <ErrText msg={errs.dob} />
        </div>
        <Select label="Gender" required value={f.gender || ""} onChange={(e) => set("gender", e.target.value)} placeholder="Select" state={errs.gender ? "error" : "default"} helperText={errs.gender} options={["Female", "Male", "Transgender", "Prefer not to say"]} />
        <Select label="Country of birth" required value={f.cob || ""} onChange={(e) => set("cob", e.target.value)} placeholder="Select a country" state={errs.cob ? "error" : "default"} helperText={errs.cob} options={["United States", "United Kingdom", "Australia", "Canada", "Germany", "Other"]} />
        <Input label="Town / city of birth" placeholder="e.g. London" value={f.townBirth || ""} onChange={(e) => set("townBirth", e.target.value)} />
      </FieldGrid>
      <h2 style={{ fontSize: 16, fontWeight: 600, margin: "32px 0 16px", color: "var(--color-text)" }}>Contact details</h2>
      <FieldGrid>
        <Input label="Email address" type="email" required placeholder="you@example.com" value={f.email || ""} onChange={(e) => set("email", e.target.value)} state={errs.email ? "error" : "default"} helperText={errs.email || "Your ETA will be sent here."} />
        <Input label="Confirm email address" type="email" required placeholder="Re-enter your email" value={f.email2 || ""} onChange={(e) => set("email2", e.target.value)} state={errs.email2 || (f.email2 && f.email !== f.email2) ? "error" : "default"} helperText={errs.email2 || (f.email2 && f.email !== f.email2 ? "Email addresses do not match." : undefined)} />
        <Input label="Mobile number" type="tel" required placeholder="+1 555 000 0000" value={f.phone || ""} onChange={(e) => set("phone", e.target.value)} state={errs.phone ? "error" : "default"} helperText={errs.phone} />
        <Input label="Address while in India" placeholder="Hotel or host address" value={f.addr || ""} onChange={(e) => set("addr", e.target.value)} />
      </FieldGrid>
    </div>
  );

  /* ---------- step 3 ---------- */
  const step3 = (
    <div>
      <StepTitle n={3} title="Upload your photo and passport" sub="Clear, recent files help us approve your application without delay." />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <FileUpload label="Passport-style photograph" accept="image/*" hint="JPG or PNG, square, face clearly visible · up to 1 MB" onChange={(fl) => { setPhotoFiles(fl); clearErr("photo"); }} />
          <ErrText msg={errs.photo} />
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13, lineHeight: "20px", color: "var(--color-text-muted)" }}>
            <li>Plain light background, no shadows.</li>
            <li>Full face, eyes open, no head covering except for religious reasons.</li>
          </ul>
        </div>
        <div>
          <FileUpload label="Passport bio-page" accept=".pdf,image/*" hint="PDF, JPG or PNG · up to 2 MB" onChange={(fl) => { setPassFiles(fl); clearErr("passfile"); }} />
          <ErrText msg={errs.passfile} />
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>Scan the page showing your photo, name and passport number.</p>
        </div>
        <Alert variant="info" title="What happens next">
          After you submit, our team reviews your documents. If anything needs changing, you'll be emailed and can re-upload within 24 hours.
        </Alert>
      </div>
    </div>
  );

  /* ---------- step 4 ---------- */
  const reviewRow = (label: string, value?: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "8px 0", borderBottom: "1px solid var(--color-divider)" }}>
      <span style={{ fontSize: 14, lineHeight: "20px", color: "var(--color-text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14, lineHeight: "20px", fontWeight: 600, color: "var(--color-text)", textAlign: "right", minWidth: 0 }}>{value || "—"}</span>
    </div>
  );
  const step4 = submitted ? (
    <div>
      <Alert variant="success" title="Application submitted successfully">
        Your reference number is <strong>EVISA-2026-004821</strong>. We've emailed a confirmation to <strong>{f.email || "your inbox"}</strong>. You'll receive your ETA within 24–72 hours.
      </Alert>
      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <Button variant="primary" iconLeft={<Icon name="download" size={18} color="currentColor" />}>Download acknowledgement</Button>
        <a href="/examples/evisa" style={{ textDecoration: "none" }}>
          <Button variant="primary" appearance="outlined">Back to portal</Button>
        </a>
      </div>
    </div>
  ) : (
    <div>
      <StepTitle n={4} title="Review and pay" sub="Check your details, then pay the visa fee securely to submit your application." />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card padding={24} title="Visa & travel" actions={<Button size="small" appearance="text" onClick={() => go(0)}>Edit</Button>}>
          {reviewRow("Visa type", visa ? visa.name : "—")}
          {reviewRow("Nationality", f.nationality)}
          {reviewRow("Date of arrival", f.arrival)}
          {reviewRow("Port of arrival", f.port)}
        </Card>
        <Card padding={24} title="Applicant" actions={<Button size="small" appearance="text" onClick={() => go(1)}>Edit</Button>}>
          {reviewRow("Name", [f.given, f.surname].filter(Boolean).join(" "))}
          {reviewRow("Date of birth", f.dob)}
          {reviewRow("Email", f.email)}
        </Card>
        <div style={{ background: "var(--color-surface-subtle)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, color: "var(--color-text-muted)" }}>Visa fee (indicative)</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text)" }}>{visa ? visa.fee : "US$ 25"}</span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>The exact amount and any applicable bank charges are confirmed on the secure payment page.</p>
        </div>
        <div>
          <Checkbox label="I confirm the information provided is accurate and I accept the terms of use." checked={!!f.agree} onChange={(e) => set("agree", e.target.checked)} />
          <ErrText msg={errs.agree} />
        </div>
      </div>
    </div>
  );

  const body = [step1, step2, step3, step4][step];

  /* ---------- summary rail ---------- */
  const railRows: [string, string][] = [
    ["Visa type", visa ? visa.name : "Not selected"],
    ["Nationality", f.nationality || "—"],
    ["Arrival", f.arrival || "—"],
    ["Validity", visa ? visa.validity : "—"],
  ];
  const rail = (
    <aside className="ev-apply-rail" style={{ position: "sticky", top: 76, alignSelf: "start", display: "flex", flexDirection: "column", gap: 16 }}>
      <Card padding={20}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 16 }}>Your application</div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--color-text-muted)", marginBottom: 8 }}>
            <span>Progress</span>
            <span>{Math.round(((step + 1) / 4) * 100)}%</span>
          </div>
          <Progress value={((step + 1) / 4) * 100} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {railRows.map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "8px 0", borderTop: i ? "1px solid var(--color-divider)" : "none" }}>
              <span style={{ fontSize: 13, lineHeight: "18px", color: "var(--color-text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>{k}</span>
              <span style={{ fontSize: 13, lineHeight: "18px", fontWeight: 600, color: "var(--color-text)", textAlign: "right", minWidth: 0 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, padding: "8px 12px", background: "var(--color-success-subtle)", borderRadius: 8 }}>
          <Icon name="checkCircle" size={16} color="var(--color-success)" />
          <span style={{ fontSize: 12.5, lineHeight: "17px", color: "var(--color-success)", fontWeight: 500 }}>Your progress is saved automatically</span>
        </div>
      </Card>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, border: "1px solid var(--color-border)", borderRadius: 12, background: "var(--color-surface)" }}>
        <Icon name="helpCircle" size={20} color="var(--color-primary)" />
        <span style={{ fontSize: 13, lineHeight: "18px", color: "var(--color-text-muted)" }}>
          Need help? Call <strong style={{ color: "var(--color-text)" }}>+91 82 7808 7808</strong> (24×7)
        </span>
      </div>
    </aside>
  );

  return (
    <>
      <GovHeader active="apply" withTicker={false} />
      <div className="ev-section ev-breadcrumb-row" style={{ paddingTop: 16 }}>
        <Breadcrumb items={[{ label: "Home", href: "/examples/evisa" }, { label: "Apply for e-Visa" }]} />
      </div>
      <div className="ev-section" style={{ paddingBottom: 16 }}>
        <div className="ev-stepper" style={{ padding: "16px 0 8px" }}>
          <Stepper steps={STEPS} current={step} />
        </div>
      </div>
      <div className="ev-section ev-apply-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 36, paddingBottom: 72, alignItems: "start" }}>
        <div>
          <Card padding={28}>
            {errSummary}
            {body}
          </Card>
          {!submitted && (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              {step > 0 ? (
                <Button appearance="outlined" variant="primary" onClick={() => go(step - 1)} iconLeft={<Icon name="chevronRight" size={17} color="currentColor" style={{ transform: "rotate(180deg)" }} />}>Back</Button>
              ) : (
                <a href="/examples/evisa" style={{ textDecoration: "none" }}>
                  <Button appearance="text" variant="primary">Cancel</Button>
                </a>
              )}
              {step < 3 ? (
                <Button variant="primary" onClick={tryContinue} iconRight={<Icon name="arrowRight" size={18} color="currentColor" />}>Save and continue</Button>
              ) : (
                <Button variant="success" onClick={tryContinue} iconLeft={<Icon name="lock" size={17} color="currentColor" />}>Pay and submit</Button>
              )}
            </div>
          )}
        </div>
        {rail}
      </div>
      <PortalFooter />
      <AccessibilityWidget position="bottom-right" />
    </>
  );
}
