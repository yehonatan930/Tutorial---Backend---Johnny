import { Router } from "express";
import postsController from "../controllers/postsController";

const postsRouter = Router();

postsRouter.get("/", postsController.all);
postsRouter.get("/postCards", postsController.allPostCards);
postsRouter.get("/:id", postsController.one);
postsRouter.post("/", postsController.create);
postsRouter.delete("/:id", postsController.del);

export default postsRouter;
