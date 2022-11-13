import "dotenv/config";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
