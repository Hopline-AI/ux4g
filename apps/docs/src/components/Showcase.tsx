import { useState, type ReactNode, type CSSProperties } from "react";
import {
  // actions
  Button,
  IconButton,
  // forms
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Search,
  DatePicker,
  RangeSlider,
  ColorPicker,
  FileUpload,
  type UploadedFile,
  // display
  Card,
  Badge,
  Chip,
  Avatar,
  // feedback
  Alert,
  Progress,
  Spinner,
  EmptyState,
  // overlay
  Modal,
  Tooltip,
  Menu,
  Toast,
  // data
  Table,
  Accordion,
  Pagination,
  // navigation
  Tabs,
  Breadcrumb,
  Stepper,
  // media
  Carousel,
} from "@hopline/ux4g-react";

/* ------------------------------------------------------------------ */
/* Small inline-SVG icon set (Lucide geometry, 24x24, 2px stroke)      */
/* so the showcase needs no icon font.                                 */
/* ------------------------------------------------------------------ */
function Icon({ path, size = 20 }: { path: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {path}
    </svg>
  );
}
const icons = {
  plus: <path d="M12 5v14M5 12h14" />,
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  trash: <><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></>,
  more: <><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>,
  inbox: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" /></>,
};

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */
const groupStyle: CSSProperties = { marginTop: "var(--space-12)" };

function Group({ id, title, summary, children }: { id: string; title: string; summary: string; children: ReactNode }) {
  return (
    <section id={id} style={groupStyle} aria-labelledby={`${id}-h`}>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h2
          id={`${id}-h`}
          style={{
            fontSize: "var(--headline-3-size)",
            lineHeight: "var(--headline-3-line)",
            fontWeight: "var(--weight-semibold)",
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </h2>
        <p style={{ color: "var(--color-text-muted)", marginTop: "var(--space-2)", fontSize: "var(--body-2-size)" }}>
          {summary}
        </p>
      </div>
      <div style={{ display: "grid", gap: "var(--space-5)" }}>{children}</div>
    </section>
  );
}

function Demo({ name, hint, children }: { name: string; hint?: string; children: ReactNode }) {
  return (
    <article
      className="demo-card"
      style={{
        border: "var(--border-thin) solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
        position: "relative",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          padding: "var(--space-3) var(--space-4)",
          borderBottom: "var(--border-thin) solid var(--color-divider)",
          background: "var(--color-surface-subtle)",
          borderTopLeftRadius: "var(--radius-lg)",
          borderTopRightRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--body-2-size)",
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-text)",
          }}
        >
          {name}
        </h3>
        {hint ? (
          <span style={{ fontSize: "var(--body-3-size)", color: "var(--color-text-subtle)" }}>{hint}</span>
        ) : null}
      </header>
      <div
        style={{
          padding: "var(--space-6)",
          display: "flex",
          gap: "var(--space-4)",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive sub-demos (need their own state)                        */
/* ------------------------------------------------------------------ */
function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm submission"
        description="Your application will be sent to the department for review."
        footer={
          <>
            <Button variant="primary" appearance="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </>
        }
      >
        Once submitted you will receive an acknowledgement reference number by SMS and email.
      </Modal>
    </>
  );
}

function ToastDemo() {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <Toast variant="success" title="Saved" onClose={() => setShow(false)}>
          Your changes have been saved.
        </Toast>
      ) : (
        <Button variant="primary" appearance="outlined" onClick={() => setShow(true)}>
          Show toast
        </Button>
      )}
      <Toast variant="info" title="Update available">
        A new version of the form is ready.
      </Toast>
    </>
  );
}

function SearchDemo() {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Search value={value} onChange={setValue} placeholder="Search services" />
    </div>
  );
}

function DatePickerDemo() {
  const [value, setValue] = useState("2026-06-08");
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <DatePicker label="Appointment date" value={value} onChange={setValue} />
    </div>
  );
}

function RangeSliderDemo() {
  const [value, setValue] = useState(40);
  return (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <RangeSlider label="Annual income (lakh)" value={value} onChange={setValue} min={0} max={100} unit="L" showValue />
    </div>
  );
}

function ColorPickerDemo() {
  const [value, setValue] = useState("#613AF5");
  return <ColorPicker label="Theme colour" value={value} onChange={setValue} allowCustom />;
}

function FileUploadDemo() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  return (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <FileUpload label="Upload documents" hint="PDF or JPG, up to 5 MB" accept=".pdf,.jpg" multiple files={files} onChange={setFiles} />
    </div>
  );
}

function TabsDemo() {
  const [value, setValue] = useState("overview");
  return (
    <div style={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={setValue}
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "documents", label: "Documents", badge: "3" },
          { value: "history", label: "History" },
          { value: "closed", label: "Archived", disabled: true },
        ]}
      />
      <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)", fontSize: "var(--body-2-size)" }}>
        Active panel: {value}
      </p>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} pageCount={12} onChange={setPage} />;
}

/* ------------------------------------------------------------------ */
/* The full showcase                                                   */
/* ------------------------------------------------------------------ */
export default function Showcase() {
  const tableColumns = [
    { key: "scheme", header: "Scheme" },
    { key: "owner", header: "Department" },
    {
      key: "status",
      header: "Status",
      render: (row: { status: string }) => (
        <Badge variant={row.status === "Open" ? "success" : "neutral"} appearance="tonal">
          {row.status}
        </Badge>
      ),
    },
    { key: "applicants", header: "Applicants", align: "right" as const },
  ];
  const tableRows = [
    { scheme: "PM Awas Yojana", owner: "MoHUA", status: "Open", applicants: "12,480" },
    { scheme: "Skill India", owner: "MSDE", status: "Open", applicants: "8,902" },
    { scheme: "Digital Literacy", owner: "MeitY", status: "Closed", applicants: "5,113" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* ---------------- actions ---------------- */}
      <Group id="actions" title="Actions" summary="Buttons and icon-only triggers in three colourways and four fill treatments.">
        <Demo name="Button">
          <Button variant="primary">Primary</Button>
          <Button variant="primary" appearance="outlined">Outlined</Button>
          <Button variant="primary" appearance="text">Text</Button>
          <Button variant="primary" appearance="tonal">Tonal</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" iconLeft={<Icon path={icons.plus} />}>New</Button>
          <Button variant="primary" appearance="outlined" iconRight={<Icon path={icons.arrowRight} />}>Next</Button>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </Demo>
        <Demo name="IconButton" hint="always pass aria-label">
          <IconButton aria-label="Add item" variant="primary"><Icon path={icons.plus} /></IconButton>
          <IconButton aria-label="Edit" variant="neutral" appearance="tonal"><Icon path={icons.edit} /></IconButton>
          <IconButton aria-label="Delete" variant="danger" appearance="filled"><Icon path={icons.trash} /></IconButton>
          <IconButton aria-label="More" variant="neutral"><Icon path={icons.more} /></IconButton>
        </Demo>
      </Group>

      {/* ---------------- forms ---------------- */}
      <Group id="forms" title="Forms" summary="Inputs and choice controls with real labels, helper text and validation states.">
        <Demo name="Input">
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Input label="Full name" placeholder="Asha Rao" helperText="As printed on your ID." />
          </div>
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Input label="Email" state="error" defaultValue="not-an-email" helperText="Enter a valid email address." />
          </div>
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Input label="PAN" state="success" defaultValue="ABCDE1234F" helperText="Verified." />
          </div>
        </Demo>
        <Demo name="Textarea">
          <div style={{ width: "100%", maxWidth: 460 }}>
            <Textarea label="Address" rows={3} placeholder="House, street, city, PIN" helperText="Include the postal code." />
          </div>
        </Demo>
        <Demo name="Select">
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Select
              label="State"
              placeholder="Choose a state"
              options={["Assam", "Kerala", "Maharashtra", "Odisha", "Punjab"]}
            />
          </div>
        </Demo>
        <Demo name="Checkbox">
          <Checkbox label="I agree to the terms" defaultChecked />
          <Checkbox label="Subscribe to updates" />
          <Checkbox label="Partial selection" indeterminate />
          <Checkbox label="Disabled" disabled />
        </Demo>
        <Demo name="Radio" hint="share a name">
          <Radio name="lang" value="hi" label="Hindi" defaultChecked />
          <Radio name="lang" value="en" label="English" />
          <Radio name="lang" value="ta" label="Tamil" />
        </Demo>
        <Demo name="Switch">
          <Switch label="Email notifications" defaultChecked />
          <Switch label="SMS alerts" />
          <Switch label="Disabled" disabled />
        </Demo>
        <Demo name="Search"><SearchDemo /></Demo>
        <Demo name="DatePicker"><div style={{ minHeight: 300, width: "100%" }}><DatePickerDemo /></div></Demo>
        <Demo name="RangeSlider"><RangeSliderDemo /></Demo>
        <Demo name="ColorPicker"><ColorPickerDemo /></Demo>
        <Demo name="FileUpload"><FileUploadDemo /></Demo>
      </Group>

      {/* ---------------- display ---------------- */}
      <Group id="display" title="Display" summary="Surfaces and identity primitives: cards, badges, chips and avatars.">
        <Demo name="Card">
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Card
              title="Application received"
              subtitle="Reference UX-2026-0042"
              actions={
                <>
                  <Button variant="primary" appearance="text" size="small">Details</Button>
                  <Button variant="primary" size="small">Track</Button>
                </>
              }
            >
              We are reviewing your documents. You will be notified at each stage.
            </Card>
          </div>
        </Demo>
        <Demo name="Badge">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success" appearance="solid">Approved</Badge>
          <Badge variant="danger">Rejected</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success" appearance="dot">Online</Badge>
        </Demo>
        <Demo name="Chip">
          <Chip>All schemes</Chip>
          <Chip selected>Education</Chip>
          <Chip icon={<Icon path={icons.inbox} size={16} />}>With icon</Chip>
          <Chip onRemove={() => {}}>Removable</Chip>
          <Chip disabled>Disabled</Chip>
        </Demo>
        <Demo name="Avatar">
          <Avatar name="Asha Rao" />
          <Avatar name="Vikram Singh" status="online" />
          <Avatar name="Meera Iyer" status="busy" shape="rounded" />
          <Avatar name="Government Portal" size={56} />
        </Demo>
      </Group>

      {/* ---------------- feedback ---------------- */}
      <Group id="feedback" title="Feedback" summary="Status messages and progress indicators that keep people informed.">
        <Demo name="Alert">
          <div style={{ width: "100%", display: "grid", gap: "var(--space-3)" }}>
            <Alert variant="info" title="Heads up">Applications close on 30 June.</Alert>
            <Alert variant="success" title="Submitted">Your form was received.</Alert>
            <Alert variant="warning" title="Action needed">Two documents are missing.</Alert>
            <Alert variant="danger" title="Failed" onClose={() => {}}>The upload could not be completed.</Alert>
          </div>
        </Demo>
        <Demo name="Progress">
          <div style={{ width: "100%", maxWidth: 320, display: "grid", gap: "var(--space-4)" }}>
            <Progress value={68} showValue />
            <Progress value={40} variant="success" />
            <Progress variant="primary" />
          </div>
          <Progress value={75} circular showValue />
        </Demo>
        <Demo name="Spinner">
          <Spinner />
          <Spinner size={32} />
          <Spinner label="Loading your dashboard" />
        </Demo>
        <Demo name="EmptyState">
          <div style={{ width: "100%", maxWidth: 460 }}>
            <EmptyState
              icon={<Icon path={icons.inbox} size={40} />}
              title="No applications yet"
              description="When you apply for a scheme it will appear here."
              action={<Button variant="primary" iconLeft={<Icon path={icons.plus} />}>Start an application</Button>}
            />
          </div>
        </Demo>
      </Group>

      {/* ---------------- overlay ---------------- */}
      <Group id="overlay" title="Overlay" summary="Layered surfaces: dialogs, tooltips, menus and transient toasts.">
        <Demo name="Modal" hint="opens on click"><ModalDemo /></Demo>
        <Demo name="Tooltip" hint="hover or focus">
          <div style={{ paddingTop: "var(--space-6)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Tooltip label="Saves a draft you can finish later">
              <Button variant="primary" appearance="outlined">Save draft</Button>
            </Tooltip>
            <Tooltip label="Right" placement="right">
              <Button variant="primary" appearance="text">Hover me</Button>
            </Tooltip>
          </div>
        </Demo>
        <Demo name="Menu" hint="click the trigger">
          <div style={{ minHeight: 220, width: "100%" }}>
            <Menu
              trigger={<Button variant="primary" appearance="outlined" iconRight={<Icon path={icons.more} size={18} />}>Actions</Button>}
              items={[
                { label: "Edit", icon: <Icon path={icons.edit} size={18} />, onClick: () => {} },
                { label: "Download", icon: <Icon path={icons.download} size={18} />, onClick: () => {} },
                { label: "Delete", icon: <Icon path={icons.trash} size={18} />, danger: true, onClick: () => {} },
              ]}
            />
          </div>
        </Demo>
        <Demo name="Toast"><ToastDemo /></Demo>
      </Group>

      {/* ---------------- data ---------------- */}
      <Group id="data" title="Data" summary="Tables, collapsible panels and pagination for dense information.">
        <Demo name="Table">
          <div style={{ width: "100%" }}>
            <Table columns={tableColumns} rows={tableRows} striped hover />
          </div>
        </Demo>
        <Demo name="Accordion">
          <div style={{ width: "100%", maxWidth: 560 }}>
            <Accordion
              defaultOpen={["a"]}
              items={[
                { value: "a", title: "Who can apply?", content: "Any resident citizen who meets the scheme eligibility." },
                { value: "b", title: "What documents are needed?", content: "Proof of identity, address and income." },
                { value: "c", title: "How long does it take?", content: "Most applications are processed within 15 working days." },
              ]}
            />
          </div>
        </Demo>
        <Demo name="Pagination"><PaginationDemo /></Demo>
      </Group>

      {/* ---------------- navigation ---------------- */}
      <Group id="navigation" title="Navigation" summary="Wayfinding: tab bars, breadcrumb trails and step indicators.">
        <Demo name="Tabs"><TabsDemo /></Demo>
        <Demo name="Breadcrumb">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Schemes", href: "/schemes" },
              { label: "PM Awas Yojana" },
            ]}
          />
        </Demo>
        <Demo name="Stepper">
          <div style={{ width: "100%" }}>
            <Stepper
              current={1}
              steps={[
                { label: "Details", description: "Personal information" },
                { label: "Documents", description: "Upload proofs" },
                { label: "Review", description: "Confirm and submit" },
              ]}
            />
          </div>
        </Demo>
      </Group>

      {/* ---------------- media ---------------- */}
      <Group id="media" title="Media" summary="Slide decks for banners and galleries.">
        <Demo name="Carousel">
          <div style={{ width: "100%", maxWidth: 640 }}>
            <Carousel height={220} dots arrows>
              {[
                { bg: "var(--violet-600)", text: "Apply for schemes online" },
                { bg: "var(--info-700)", text: "Track every application" },
                { bg: "var(--success-600)", text: "Get notified at each step" },
              ].map((slide) => (
                <div
                  key={slide.text}
                  style={{
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    background: slide.bg,
                    color: "var(--white)",
                    fontSize: "var(--headline-4-size)",
                    fontWeight: "var(--weight-medium)",
                    textAlign: "center",
                    padding: "var(--space-6)",
                  }}
                >
                  {slide.text}
                </div>
              ))}
            </Carousel>
          </div>
        </Demo>
      </Group>
    </div>
  );
}
