import { getAllUsers } from "../controllers/userController";
import express from "express";
const userRouter = express.Router();
userRouter.get("/", getAllUsers);
export { userRouter };
//# sourceMappingURL=user.js.map