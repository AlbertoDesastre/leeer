import { envConfig } from "./src/config/envs";
import { Server } from "./src/presentation/Server.ts"
import { AppRoutes } from "./src/presentation/routes.ts"

const main = () => {
    new Server().start({
        port: envConfig.PORT,
        routes: AppRoutes.routes
    });
};

(() => main())();
