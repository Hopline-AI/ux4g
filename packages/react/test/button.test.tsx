import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/actions/Button";

describe("Button", () => {
  it("renders children inside a button with the ux-btn class", () => {
    render(<Button>Apply for a certificate</Button>);
    const btn = screen.getByRole("button", { name: "Apply for a certificate" });
    expect(btn).toHaveClass("ux-btn");
  });
  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Continue</Button>);
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });
});
