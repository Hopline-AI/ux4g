import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../src/forms/Input";

describe("Input", () => {
  it("links its label to the field and marks it required", () => {
    render(<Input label="Email" required />);
    const field = screen.getByLabelText(/Email/);
    expect(field).toBeRequired();
  });
  it("sets aria-invalid when state is error", () => {
    render(<Input label="Email" state="error" helperText="Invalid email address" />);
    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-invalid", "true");
  });
  it("omits aria-invalid in the default state", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/Email/)).not.toHaveAttribute("aria-invalid");
  });
});
