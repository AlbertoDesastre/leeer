import { describe, expect, it } from "vitest";
import { InMemoryStoryRepository } from "../../src/features/stories/services/stories.repository.js";
import { StoriesService } from "../../src/features/stories/services/stories.service.js";

describe("StoriesService", () => {
  it("creates a story without knowing the database provider", async () => {
    const service = new StoriesService(new InMemoryStoryRepository());
    const story = await service.create({ title: "  Mi novela  " });
    expect(story.title).toBe("Mi novela");
  });
});
