import { envConfig } from "./src/config/envs";
import { server } from "./src/infrastructure/server";
import { authRoutes } from "./src/modules/auth/auth.routes";
import { Router } from "express";

const main = () => {
  const router = Router();
  const serverInstance = server(
    {
      port: Number(envConfig.PORT),
    },
    authRoutes(router),
  );

  serverInstance.start();
};

(() => main())();
