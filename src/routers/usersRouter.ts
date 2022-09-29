import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/", usersController.all);
usersRouter.get("/currentLoggedIn", usersController.currentLoggedIn);
usersRouter.get("/:name", usersController.one);
usersRouter.post("/", usersController.create);
usersRouter.delete("/:name", usersController.del);

export default usersRouter;
