import { UserController } from "../controllers/userController.js";
import express, { Router } from "express";

const userRouter: Router = express.Router();
const userController = new UserController();

userRouter.get("/", userController.getAllUsers);

export { userRouter };
