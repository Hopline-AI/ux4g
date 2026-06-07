import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Modal } from "../src/overlay/Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(<Modal open={false} title="Confirm">Body text</Modal>);
    expect(screen.queryByText("Body text")).toBeNull();
  });
  it("renders title and body when open", () => {
    render(<Modal open title="Confirm submission">Your grievance is ready.</Modal>);
    expect(screen.getByText("Confirm submission")).toBeInTheDocument();
    expect(screen.getByText("Your grievance is ready.")).toBeInTheDocument();
  });
});
