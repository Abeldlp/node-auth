import { UserController } from "../controllers/userController.js";
import { AuthMiddleware } from "../middlewares/auth.js";
import express from "express";
const userRouter = express.Router();
const userController = new UserController();
const auth = new AuthMiddleware();
userRouter.get("/", auth.verifyToken, userController.getAllUsers);
export { userRouter };
//# sourceMappingURL=user.js.map