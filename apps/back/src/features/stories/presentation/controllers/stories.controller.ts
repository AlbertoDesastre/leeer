import { storySchema } from "@leeer/contracts";
import type { Request, Response } from "express";
import type { CreateStoryUseCase } from "../../application/use-cases/create-story.use-case.js";
import type { ListStoriesUseCase } from "../../application/use-cases/list-stories.use-case.js";
import { createStoryInputSchema } from "../schemas/story.schema.js";

export class StoriesController {
  constructor(private readonly listStories: ListStoriesUseCase, private readonly createStory: CreateStoryUseCase) {}

  list = async (_req: Request, res: Response) => {
    const stories = await this.listStories.execute();
    res.json(stories.map((story) => storySchema.parse({ ...story, createdAt: story.createdAt.toISOString() })));
  };

  create = async (req: Request, res: Response) => {
    const input = createStoryInputSchema.parse(req.body);
    const story = await this.createStory.execute(input);
    res.status(201).json(storySchema.parse({ ...story, createdAt: story.createdAt.toISOString() }));
  };
}
