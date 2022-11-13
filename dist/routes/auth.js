import { AuthController } from "../controllers/authController.js";
import express from "express";
const authRouter = express.Router();
const authController = new AuthController();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
export { authRouter };
//# sourceMappingURL=auth.js.map