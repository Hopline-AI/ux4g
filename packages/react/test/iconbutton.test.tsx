import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IconButton } from "../src/actions/IconButton";

describe("IconButton", () => {
  it("exposes its accessible name through aria-label", () => {
    render(<IconButton aria-label="Search"><svg aria-hidden="true" /></IconButton>);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });
});
