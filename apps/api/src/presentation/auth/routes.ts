import { Router } from "express";

export class AuthRoutes {
    public static get routes(): Router {
        const router = Router();

        router.post("/login", (req, res) => {
            return res.json("Login")
        });
        router.post("/register", (req, res) => {
            return res.json("Register")
        });

        return router;
    }
} 