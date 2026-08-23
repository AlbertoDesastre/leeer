import { describe, expect, it } from "vitest";
import { getHomeHighlights } from "./home.service";
describe("home service", () => { it("returns the starter highlights", () => { expect(getHomeHighlights()).toContain("Escritura"); }); });
