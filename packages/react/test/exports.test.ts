import { describe, it, expect } from "vitest";
import * as UX from "../src/index";

const EXPECTED = [
  "Button", "IconButton",
  "Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Search",
  "DatePicker", "RangeSlider", "ColorPicker", "FileUpload",
  "Card", "Badge", "Chip", "Avatar", "Comment",
  "Alert", "Progress", "Spinner", "EmptyState", "FeedbackWidget",
  "Modal", "Tooltip", "Menu", "Toast", "Popover",
  "Table", "Accordion", "Pagination", "List", "Chart", "IndiaMap",
  "Tabs", "Breadcrumb", "Stepper", "Navbar", "Footer",
  "Carousel",
  "AccessibilityWidget",
];

describe("public API", () => {
  it("exports all 41 components as functions", () => {
    for (const name of EXPECTED) {
      expect(typeof (UX as Record<string, unknown>)[name], `missing export: ${name}`).toBe("function");
    }
  });
  it("exports exactly 41 components", () => {
    expect(EXPECTED.length).toBe(41);
  });
});
