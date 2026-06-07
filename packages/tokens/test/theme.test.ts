import { describe, it, expect } from "vitest";
import { theme, tokens } from "../src/theme";

describe("UX4G tokens", () => {
  it("resolves the primary color alias to violet 600", () => {
    expect(tokens["color-primary"]).toBe("#613AF5");
    expect(theme.color.primary).toBe("#613AF5");
  });

  it("resolves a spacing token", () => {
    expect(tokens["space-4"]).toBe("16px");
    expect(theme.space[4]).toBe("16px");
  });

  it("resolves the focus ring through a nested var()", () => {
    expect(tokens["focus-ring"]).toBe("0 0 0 4px rgba(97, 58, 245, 0.48)");
  });

  it("exposes the three font families", () => {
    expect(theme.font.sans).toMatch(/Noto Sans/);
    expect(theme.font.ui).toMatch(/Roboto/);
    expect(theme.font.mono).toMatch(/Red Hat Mono/);
  });
});
