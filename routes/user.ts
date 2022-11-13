import { UserController } from "../controllers/userController.js";
import { AuthMiddleware } from "../middlewares/auth.js";
import express, { Router } from "express";

const userRouter: Router = express.Router();
const userController = new UserController();
const auth = new AuthMiddleware();

userRouter.get("/", auth.verifyToken, userController.getAllUsers);

export { userRouter };
