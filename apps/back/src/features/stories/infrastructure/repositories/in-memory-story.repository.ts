import type { Story } from "../../domain/entities/story.js";
import type { StoryRepository } from "../../domain/repositories/story.repository.js";

export class InMemoryStoryRepository implements StoryRepository {
  private readonly items: Story[] = [{ id: "4b330eed-c720-437a-8643-c67e36d52476", title: "La primera historia", createdAt: new Date("2026-08-23T12:00:00.000Z") }];
  async list() { return [...this.items]; }
  async create(story: Story) { this.items.push(story); return story; }
}
