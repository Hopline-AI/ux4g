// Per-component usage snippets shown in the docs Showcase "Show code" panel.
// Keyed by the component slug (name.toLowerCase()). Concise, representative
// usage — import + the primary props — so developers can copy code directly
// without the shadcn CLI. Every app also needs the tokens stylesheet once:
//   import "@hopline/ux4g-tokens/styles.css";
export const CODE: Record<string, string> = {
  // actions
  button: `import { Button } from "@hopline/ux4g-react";

<Button variant="primary">Primary</Button>
<Button variant="primary" appearance="outlined">Outlined</Button>
<Button variant="success" iconLeft={<PlusIcon />}>New</Button>
<Button variant="danger" size="large">Delete</Button>`,
  iconbutton: `import { IconButton } from "@hopline/ux4g-react";

<IconButton aria-label="Add item" variant="primary">
  <PlusIcon />
</IconButton>`,

  // forms
  input: `import { Input } from "@hopline/ux4g-react";

<Input label="Full name" placeholder="Asha Rao" helperText="As printed on your ID." />
<Input label="Email" state="error" helperText="Enter a valid email address." />`,
  textarea: `import { Textarea } from "@hopline/ux4g-react";

<Textarea label="Address" rows={3} placeholder="House, street, city, PIN" helperText="Include the postal code." />`,
  select: `import { Select } from "@hopline/ux4g-react";

<Select
  label="State"
  placeholder="Choose a state"
  options={["Assam", "Kerala", "Maharashtra", "Odisha", "Punjab"]}
/>`,
  checkbox: `import { Checkbox } from "@hopline/ux4g-react";

<Checkbox label="I agree to the terms" defaultChecked />
<Checkbox label="Partial selection" indeterminate />`,
  radio: `import { Radio } from "@hopline/ux4g-react";

<Radio name="lang" value="hi" label="Hindi" defaultChecked />
<Radio name="lang" value="en" label="English" />`,
  switch: `import { Switch } from "@hopline/ux4g-react";

<Switch label="Email notifications" defaultChecked />`,
  search: `import { Search } from "@hopline/ux4g-react";

const [value, setValue] = useState("");

<Search value={value} onChange={setValue} placeholder="Search services" />`,
  datepicker: `import { DatePicker } from "@hopline/ux4g-react";

const [date, setDate] = useState("2026-06-08");

<DatePicker label="Appointment date" value={date} onChange={setDate} />`,
  rangeslider: `import { RangeSlider } from "@hopline/ux4g-react";

const [value, setValue] = useState(40);

<RangeSlider label="Annual income (lakh)" value={value} onChange={setValue}
  min={0} max={100} unit="L" showValue />`,
  colorpicker: `import { ColorPicker } from "@hopline/ux4g-react";

const [color, setColor] = useState("#613AF5");

<ColorPicker label="Theme colour" value={color} onChange={setColor} allowCustom />`,
  fileupload: `import { FileUpload, type UploadedFile } from "@hopline/ux4g-react";

const [files, setFiles] = useState<UploadedFile[]>([]);

<FileUpload label="Upload documents" hint="PDF or JPG, up to 5 MB"
  accept=".pdf,.jpg" multiple files={files} onChange={setFiles} />`,

  // display
  card: `import { Card, Button } from "@hopline/ux4g-react";

<Card
  title="Application received"
  subtitle="Reference UX-2026-0042"
  actions={<Button variant="primary" size="small">Track</Button>}
>
  We are reviewing your documents. You will be notified at each stage.
</Card>`,
  badge: `import { Badge } from "@hopline/ux4g-react";

<Badge variant="success" appearance="solid">Approved</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="success" appearance="dot">Online</Badge>`,
  chip: `import { Chip } from "@hopline/ux4g-react";

<Chip selected>Education</Chip>
<Chip onRemove={() => {}}>Removable</Chip>`,
  avatar: `import { Avatar } from "@hopline/ux4g-react";

<Avatar name="Asha Rao" status="online" />
<Avatar name="Meera Iyer" shape="rounded" size={56} />`,
  comment: `import { Comment } from "@hopline/ux4g-react";

<Comment author="Asha Rao" timestamp="2 hours ago"
  body="The new grievance form is much clearer.">
  <Comment author="Support Desk" timestamp="1 hour ago" highlight
    body="Thank you for the feedback, Asha." />
</Comment>`,

  // feedback
  alert: `import { Alert } from "@hopline/ux4g-react";

<Alert variant="success" title="Submitted">Your form was received.</Alert>
<Alert variant="danger" title="Failed" onClose={() => {}}>The upload could not be completed.</Alert>`,
  progress: `import { Progress } from "@hopline/ux4g-react";

<Progress value={68} showValue />
<Progress value={75} circular showValue />`,
  spinner: `import { Spinner } from "@hopline/ux4g-react";

<Spinner label="Loading your dashboard" />`,
  emptystate: `import { EmptyState, Button } from "@hopline/ux4g-react";

<EmptyState
  title="No applications yet"
  description="When you apply for a scheme it will appear here."
  action={<Button variant="primary">Start an application</Button>}
/>`,
  feedbackwidget: `import { FeedbackWidget } from "@hopline/ux4g-react";

// Ships as a fixed corner launcher; pass \`inline\` to embed it.
<FeedbackWidget
  categories={["Ease of use", "Speed", "Clarity", "Accessibility"]}
  onSubmit={(data) => console.log(data)}
/>`,

  // overlay
  modal: `import { Modal, Button } from "@hopline/ux4g-react";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Confirm submission"
  footer={<Button variant="primary" onClick={() => setOpen(false)}>Submit</Button>}>
  You will receive an acknowledgement reference number by SMS and email.
</Modal>`,
  tooltip: `import { Tooltip, Button } from "@hopline/ux4g-react";

<Tooltip label="Saves a draft you can finish later" placement="top">
  <Button appearance="outlined">Save draft</Button>
</Tooltip>`,
  menu: `import { Menu, Button } from "@hopline/ux4g-react";

<Menu
  trigger={<Button appearance="outlined">Actions</Button>}
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Delete", danger: true, onClick: () => {} },
  ]}
/>`,
  toast: `import { Toast } from "@hopline/ux4g-react";

<Toast variant="success" title="Saved" onClose={() => {}}>
  Your changes have been saved.
</Toast>`,
  popover: `import { Popover, Button } from "@hopline/ux4g-react";

<Popover trigger={<Button appearance="outlined">Eligibility</Button>} title="Who can apply?">
  Any resident citizen aged 18 or above with a valid ID.
</Popover>`,

  // data
  table: `import { Table, Badge } from "@hopline/ux4g-react";

const columns = [
  { key: "scheme", header: "Scheme" },
  { key: "owner", header: "Department" },
  { key: "status", header: "Status",
    render: (row) => <Badge variant="success">{row.status}</Badge> },
];

<Table columns={columns} rows={rows} striped hover />`,
  accordion: `import { Accordion } from "@hopline/ux4g-react";

<Accordion
  defaultOpen={["a"]}
  items={[
    { value: "a", title: "Who can apply?", content: "Any resident citizen." },
    { value: "b", title: "What documents are needed?", content: "ID, address and income." },
  ]}
/>`,
  pagination: `import { Pagination } from "@hopline/ux4g-react";

const [page, setPage] = useState(3);

<Pagination page={page} pageCount={12} onChange={setPage} />`,
  list: `import { List, Badge } from "@hopline/ux4g-react";

<List interactive chevron items={[
  {
    title: "Income certificate",
    description: "Issued by the Revenue Department",
    trailing: <Badge variant="success">Verified</Badge>,
    href: "#",
  },
]} />`,
  chart: `import { Chart } from "@hopline/ux4g-react";
// Requires Chart.js v4 on the page as window.Chart (CDN or bundle).

<Chart
  type="bar"
  height={300}
  data={{
    labels: ["Apr", "May", "Jun"],
    datasets: [{ label: "Applications", data: [320, 410, 380] }],
  }}
/>`,
  indiamap: `import { IndiaMap } from "@hopline/ux4g-react";

const [selected, setSelected] = useState("MH");

<IndiaMap
  values={{ UP: 240, MH: 198, KA: 120, TN: 134 }}
  selected={selected}
  onSelect={setSelected}
  legendLabel="Scheme adoption (thousands)"
/>`,

  // navigation
  tabs: `import { Tabs } from "@hopline/ux4g-react";

const [value, setValue] = useState("overview");

<Tabs value={value} onChange={setValue} tabs={[
  { value: "overview", label: "Overview" },
  { value: "documents", label: "Documents", badge: "3" },
]} />`,
  breadcrumb: `import { Breadcrumb } from "@hopline/ux4g-react";

<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Schemes", href: "/schemes" },
  { label: "PM Awas Yojana" },
]} />`,
  stepper: `import { Stepper } from "@hopline/ux4g-react";

<Stepper current={1} steps={[
  { label: "Details", description: "Personal information" },
  { label: "Documents", description: "Upload proofs" },
  { label: "Review", description: "Confirm and submit" },
]} />`,
  navbar: `import { Navbar, Button } from "@hopline/ux4g-react";

<Navbar
  topStrip
  title="Department of Public Services"
  subtitle="Government of India"
  links={[
    { label: "Home", href: "#", active: true },
    { label: "Schemes", href: "#" },
    { label: "Track application", href: "#" },
  ]}
  actions={<Button size="small">Sign in</Button>}
/>`,
  footer: `import { Footer } from "@hopline/ux4g-react";

<Footer
  tagline="Accessible building blocks for India's digital public services."
  columns={[
    { title: "Services", links: [{ label: "Apply for a scheme", href: "#" }] },
    { title: "About", links: [{ label: "Accessibility", href: "#" }] },
  ]}
  policyLinks={[{ label: "Privacy policy", href: "#" }]}
/>`,

  // media
  carousel: `import { Carousel } from "@hopline/ux4g-react";

<Carousel height={220} dots arrows>
  <div>Slide one</div>
  <div>Slide two</div>
  <div>Slide three</div>
</Carousel>`,

  // accessibility
  accessibilitywidget: `import { AccessibilityWidget } from "@hopline/ux4g-react";

// Mount once at your app root — a fixed universal-access launcher
// (text size, spacing, dyslexia, contrast, motion and more).
<AccessibilityWidget />`,
};
