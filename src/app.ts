import "dotenv/config";
import * as express from "express";
import { AppDataSource } from "./data-source";
import { cors } from "./middlewares/cors";
import userRouter from "./routers/usersRouter";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());
app.use(cors);

app.use("/users", userRouter);
app.use("/posts", userRouter);

app.listen(process.env.SERVER_PORT);
console.log(
  `Express server has started on port ${process.env.SERVER_PORT}.
  Open http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/ to see results`
);
