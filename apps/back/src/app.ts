import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { storiesRouter } from "./features/stories/index.js";
import { errorHandler } from "./shared/http/errors.js";

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/v1/stories", storiesRouter);
  app.use(errorHandler);
  return app;
}
