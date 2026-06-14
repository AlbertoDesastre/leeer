import express from "express";
import { Router } from "express";

type ServerConfig = {
  port: number;
};

export const server = (config: ServerConfig, routes: Router) => {
  const app = express();

  const start = () => {
    app.use(routes);
    app.use(express.json());

    return app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  };

  return { start };
};
