import type { Story } from "../entities/story.js";

export interface StoryRepository {
  list(): Promise<Story[]>;
  create(story: Story): Promise<Story>;
}
