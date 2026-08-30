import { describe, expect, it } from "vitest";
import { storyListDtoSchema } from "../dtos/story.dto";

describe("story dto", () => {
  it("rejects a story without a title", () => {
    expect(() =>
      storyListDtoSchema.parse([
        { id: crypto.randomUUID(), title: "", createdAt: new Date().toISOString() },
      ]),
    ).toThrow();
  });
});
