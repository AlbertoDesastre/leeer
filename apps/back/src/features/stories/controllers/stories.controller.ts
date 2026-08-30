import type { Request, Response } from "express";
import { createStoryInputDtoSchema, storyDtoSchema } from "../dtos/story.dto.js";
import type { StoriesService } from "../services/stories.service.js";

export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  list = async (_req: Request, res: Response) => {
    const stories = await this.storiesService.list();
    res.json(
      stories.map((story) =>
        storyDtoSchema.parse({ ...story, createdAt: story.createdAt.toISOString() }),
      ),
    );
  };

  create = async (req: Request, res: Response) => {
    const input = createStoryInputDtoSchema.parse(req.body);
    const story = await this.storiesService.create(input);
    res
      .status(201)
      .json(storyDtoSchema.parse({ ...story, createdAt: story.createdAt.toISOString() }));
  };
}
