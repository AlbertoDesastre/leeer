import { Router } from "express";

export const authRoutes = (router: Router) => {
    router.post("/login", (req, res) => {
        return res.send("login");
    });
    router.post("/register", (req, res) => {
        return res.send("register");
    });

    return router;
};
