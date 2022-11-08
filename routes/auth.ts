import { AuthController } from "../controllers/authController.js";
import express, { Router } from "express";

const authRouter: Router = express.Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export { authRouter };
