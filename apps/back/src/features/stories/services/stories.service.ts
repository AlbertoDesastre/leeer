import type { CreateStoryInputDto } from "../dtos/story.dto.js";
import type { InMemoryStoryRepository, StoryRecord } from "./stories.repository.js";

export class StoriesService {
  constructor(private readonly stories: InMemoryStoryRepository) {}

  list(): Promise<StoryRecord[]> {
    return this.stories.list();
  }

  async create(input: CreateStoryInputDto): Promise<StoryRecord> {
    const story: StoryRecord = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      createdAt: new Date(),
    };

    return this.stories.create(story);
  }
}
