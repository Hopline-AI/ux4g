import { Button, Input, Card, Modal, Alert } from "@hopline/ux4g-react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>UX4G Playground</h1>
      <Alert variant="info" title="Heads up">This page renders from the workspace packages.</Alert>
      <Card><Input label="Full name" helperText="As printed on your ID" /></Card>
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="primary" onClick={() => setOpen(true)}>Open dialog</Button>
        <Button variant="primary" appearance="outlined">Secondary</Button>
      </div>
      <Modal open={open} title="Confirm" onClose={() => setOpen(false)}>This is a UX4G modal.</Modal>
    </main>
  );
}
