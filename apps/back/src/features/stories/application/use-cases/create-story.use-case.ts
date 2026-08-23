import type { CreateStoryInput } from "@leeer/contracts";
import type { Story } from "../../domain/entities/story.js";
import type { StoryRepository } from "../../domain/repositories/story.repository.js";

export class CreateStoryUseCase {
  constructor(private readonly stories: StoryRepository) {}
  async execute(input: CreateStoryInput): Promise<Story> {
    const story: Story = { id: crypto.randomUUID(), title: input.title.trim(), createdAt: new Date() };
    return this.stories.create(story);
  }
}
