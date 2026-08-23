import { describe, expect, it } from "vitest";
import { storyListSchema } from "@leeer/contracts";

describe("story contract", () => {
  it("rejects a story without a title", () => {
    expect(() => storyListSchema.parse([{ id: crypto.randomUUID(), title: "", createdAt: new Date().toISOString() }])).toThrow();
  });
});
