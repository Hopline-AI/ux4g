import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AccessibilityWidget } from "../src/accessibility/AccessibilityWidget";

/**
 * Regression coverage for the "Bigger Text" / "Smaller Text" tools. The original
 * implementation scaled the root `font-size` as a percentage, which only affects
 * rem/em text — but UX4G's type is authored entirely in px, so it was a silent
 * no-op on every kit page. These tests pin the working behaviour: scale via CSS
 * `zoom` (which moves px content), and never fall back to the font-size percentage.
 *
 * jsdom does not persist the non-standard `zoom` property, so we assert the
 * component's contract through the style API rather than the computed value.
 */
describe("AccessibilityWidget — text scaling", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const openPanel = () => fireEvent.click(screen.getByRole("button", { name: "Accessibility options" }));

  it("scales the target with CSS zoom (px-safe), not an ineffective root font-size", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const setSpy = vi.spyOn(target.style, "setProperty");
    render(<AccessibilityWidget target={target} />);
    openPanel();

    // grab the tile once (its accessible name gains a "%" caption after the first click)
    const bigger = screen.getByRole("button", { name: "Bigger Text" });
    fireEvent.click(bigger);
    fireEvent.click(bigger);

    // the fix: scale via zoom so px-based content actually grows...
    expect(setSpy).toHaveBeenCalledWith("zoom", "1.2");
    // ...and never via the old, no-op font-size percentage
    expect(target.style.fontSize).toBe("");
    expect(setSpy).not.toHaveBeenCalledWith("font-size", expect.stringContaining("%"));
  });

  it("Smaller Text sets zoom below 1, and Reset removes it", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const setSpy = vi.spyOn(target.style, "setProperty");
    const removeSpy = vi.spyOn(target.style, "removeProperty");
    render(<AccessibilityWidget target={target} />);
    openPanel();

    fireEvent.click(screen.getByRole("button", { name: "Smaller Text" }));
    expect(setSpy).toHaveBeenCalledWith("zoom", "0.9");

    fireEvent.click(screen.getByRole("button", { name: /Reset all/ }));
    expect(removeSpy).toHaveBeenCalledWith("zoom");
  });
});
