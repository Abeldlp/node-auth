import "dotenv/config";
import express, { Express } from "express";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
