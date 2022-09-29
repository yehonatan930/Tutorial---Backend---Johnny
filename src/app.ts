import "dotenv/config";
import * as express from "express";
import { AppDataSource } from "./data-source";
import { cors } from "./middlewares/cors";
import usersRouter from "./routers/usersRouter";
import postsRouter from "./routers/postsRouter";
import { initialize } from "./utils/initialServerSetup";

AppDataSource.initialize()
  .then(() => {
    // initialize();
    console.log("DB has been connected!");
  })
  .catch((err) => {
    console.error("Error during DB connecteion:", err);
  });

const app = express();
app.use(express.json());
app.use(cors);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(process.env.SERVER_PORT);
console.log(
  `Express server has started on port ${process.env.SERVER_PORT}.
  Open http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/ to see results`
);
