import { describe, it, expect } from "vitest";
import * as UX from "../src/index";

const EXPECTED = [
  "Button", "IconButton",
  "Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Search",
  "DatePicker", "RangeSlider", "ColorPicker", "FileUpload",
  "Card", "Badge", "Chip", "Avatar",
  "Alert", "Progress", "Spinner", "EmptyState",
  "Modal", "Tooltip", "Menu", "Toast",
  "Table", "Accordion", "Pagination",
  "Tabs", "Breadcrumb", "Stepper",
  "Carousel",
];

describe("public API", () => {
  it("exports all 32 components as functions", () => {
    for (const name of EXPECTED) {
      expect(typeof (UX as Record<string, unknown>)[name], `missing export: ${name}`).toBe("function");
    }
  });
  it("exports exactly 32 components", () => {
    expect(EXPECTED.length).toBe(32);
  });
});
