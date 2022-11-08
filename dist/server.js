import "dotenv/config";
import express from "express";
import { userRouter } from "./routes/user";
const app = express();
const port = process.env.PORT || 3000;
app.use("/users", userRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map