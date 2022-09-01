import { Router } from "express";
import userController from "../controllers/usersController";

const userRouter = Router();

userRouter.get("/", userController.all);
userRouter.get("/:name", userController.one);
userRouter.post("/", userController.create);
userRouter.delete("/:name", userController.del);

export default userRouter;
