import { NextFunction, Request, Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getAllPostCards,
  likePost,
  unLikePost,
} from "../services/postsService";

const errorHandler = (err: Error, response: Response) => {
  response.send(`n error has occured.\n${err.message}`);
};

const all = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPosts();
    response.send(posts);
  } catch (err) {
    errorHandler(err, response);
  }
};

const allPostCards = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPostCards();
    response.send(posts);
  } catch (err) {
    errorHandler(err, response);
  }
};

const one = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(
      { id: Number.parseInt(request.params.id) },
      false
    );
    response.send(post);
  } catch (err) {
    errorHandler(err, response);
  }
};

const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.send(await createPost(request.body));
  } catch (err) {
    errorHandler(err, response);
  }
};

const like = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.send(
      await likePost(
        Number.parseInt(request.params.id),
        request.params.userName
      )
    );
  } catch (err) {
    errorHandler(err, response);
  }
};

const unLike = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.send(
      await unLikePost(
        Number.parseInt(request.params.id),
        request.params.userName
      )
    );
  } catch (err) {
    errorHandler(err, response);
  }
};

const del = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.send(await deletePost(request.params.id));
  } catch (err) {
    errorHandler(err, response);
  }
};

export default {
  all,
  one,
  create,
  del,
  allPostCards,
  like,
  unLike,
};
