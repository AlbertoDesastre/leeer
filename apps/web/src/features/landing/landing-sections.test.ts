import { describe, expect, it } from "vitest";

import { getNextLandingSectionIndex, landingSections } from "./landing-sections";

describe("landing feature selector navigation", () => {
  it("moves through every section and loops at the end", () => {
    expect(getNextLandingSectionIndex(0, "ArrowDown", landingSections.length)).toBe(1);
    expect(getNextLandingSectionIndex(landingSections.length - 1, "ArrowDown", landingSections.length)).toBe(0);
  });

  it("moves backwards and loops to the last section", () => {
    expect(getNextLandingSectionIndex(1, "ArrowUp", landingSections.length)).toBe(0);
    expect(getNextLandingSectionIndex(0, "ArrowUp", landingSections.length)).toBe(landingSections.length - 1);
  });

  it("supports Home and End without reacting to unrelated keys", () => {
    expect(getNextLandingSectionIndex(1, "Home", landingSections.length)).toBe(0);
    expect(getNextLandingSectionIndex(0, "End", landingSections.length)).toBe(landingSections.length - 1);
    expect(getNextLandingSectionIndex(1, "Enter", landingSections.length)).toBe(1);
  });
});
