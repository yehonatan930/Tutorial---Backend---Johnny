import { Router } from "express";
import postsController from "../controllers/postsController";

const postRouter = Router();

postRouter.get("/", postsController.all);
postRouter.get("/:id", postsController.one);
postRouter.post("/", postsController.create);
postRouter.delete("/:id", postsController.del);

export default postRouter;
