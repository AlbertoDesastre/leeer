import { describe, expect, it } from "vitest";
import { CreateStoryUseCase } from "../../src/features/stories/application/use-cases/create-story.use-case.js";
import { InMemoryStoryRepository } from "../../src/features/stories/infrastructure/repositories/in-memory-story.repository.js";

describe("CreateStoryUseCase", () => {
  it("creates a story without knowing the database provider", async () => {
    const useCase = new CreateStoryUseCase(new InMemoryStoryRepository());
    const story = await useCase.execute({ title: "  Mi novela  " });
    expect(story.title).toBe("Mi novela");
  });
});
