import { Router } from "express";
import type { StoriesController } from "./controllers/stories.controller.js";

export function createStoriesRouter(controller: StoriesController) {
  const router = Router();
  router.get("/", controller.list);
  router.post("/", controller.create);
  return router;
}
