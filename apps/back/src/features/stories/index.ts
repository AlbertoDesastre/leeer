import { StoriesController } from "./controllers/stories.controller.js";
import { createStoriesRouter } from "./routes.js";
import { InMemoryStoryRepository } from "./services/stories.repository.js";
import { StoriesService } from "./services/stories.service.js";

const repository = new InMemoryStoryRepository();
const controller = new StoriesController(new StoriesService(repository));
export const storiesRouter = createStoriesRouter(controller);
