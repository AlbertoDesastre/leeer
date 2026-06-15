import express from 'express';
import { Express, Router } from 'express';

type ServerOptions = {
    port: number;
    routes: Router;
}

export class Server {
    app = express();

    constructor() { }

    async start(options: ServerOptions) {
        this.app.use(options.routes);
        this.app.use(express.json());

        await this.app.listen(options.port, () => {
            console.log(`Server is running on port ${options.port}`);
        });
    }
}