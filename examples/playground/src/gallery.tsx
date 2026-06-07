import { type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "@hopline/ux4g-tokens/styles.css";
import { Button, Input, Card, Alert, Badge, Chip, Avatar } from "@hopline/ux4g-react";

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section data-testid={id} style={{ padding: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {children}
    </section>
  );
}

function Gallery() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", fontFamily: "var(--font-sans)" }}>
      <Section id="buttons">
        <Button variant="primary">Primary</Button>
        <Button variant="primary" appearance="outlined">Outlined</Button>
        <Button variant="primary" appearance="text">Text</Button>
        <Button variant="primary" appearance="tonal">Tonal</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Section>
      <Section id="inputs">
        <Input label="Default" helperText="Helper text" />
        <Input label="Error" state="error" helperText="Invalid email address" />
        <Input label="Success" state="success" helperText="Looks good" />
      </Section>
      <Section id="card">
        <Card title="Card title" subtitle="Card subtitle">Card body content.</Card>
      </Section>
      <Section id="alerts">
        <Alert variant="info" title="Info">Informational message.</Alert>
        <Alert variant="success" title="Success">Saved.</Alert>
        <Alert variant="warning" title="Warning">Careful.</Alert>
        <Alert variant="danger" title="Danger">Something went wrong.</Alert>
      </Section>
      <Section id="badges">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success" appearance="solid">Solid</Badge>
        <Badge variant="danger">Danger</Badge>
      </Section>
      <Section id="chips">
        <Chip>Filter</Chip>
        <Chip selected>Selected</Chip>
      </Section>
      <Section id="avatars">
        <Avatar name="Asha Rao" />
        <Avatar name="Vikram Singh" status="online" />
      </Section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<Gallery />);
