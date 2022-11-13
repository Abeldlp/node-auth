import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map