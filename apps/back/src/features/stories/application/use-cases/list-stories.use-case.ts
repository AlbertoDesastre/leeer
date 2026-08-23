import type { StoryRepository } from "../../domain/repositories/story.repository.js";
export class ListStoriesUseCase { constructor(private readonly stories: StoryRepository) {} execute() { return this.stories.list(); } }
