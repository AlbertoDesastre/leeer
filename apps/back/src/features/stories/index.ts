import { CreateStoryUseCase } from "./application/use-cases/create-story.use-case.js";
import { ListStoriesUseCase } from "./application/use-cases/list-stories.use-case.js";
import { InMemoryStoryRepository } from "./infrastructure/repositories/in-memory-story.repository.js";
import { StoriesController } from "./presentation/controllers/stories.controller.js";
import { createStoriesRouter } from "./presentation/routes/stories.router.js";

const repository = new InMemoryStoryRepository();
const controller = new StoriesController(new ListStoriesUseCase(repository), new CreateStoryUseCase(repository));
export const storiesRouter = createStoriesRouter(controller);
