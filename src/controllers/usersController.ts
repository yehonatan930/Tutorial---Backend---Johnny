import { NextFunction, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserPosts,
  getCurrentLoggedInUser,
} from "../services/usersService";

const errorHandler = (err: Error, response: Response) => {
  response.send(err);
};

const all = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    response.send(users);
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
    const user = await getUser({ name: request.params.name });
    response.send(user);
  } catch (err) {
    errorHandler(err, response);
  }
};

const posts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await getUserPosts(request.params.name);
    response.send(posts);
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
    response.send(await createUser(request.body));
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
    response.send(await deleteUser(request.params.id));
  } catch (err) {
    errorHandler(err, response);
  }
};

const currentLoggedIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await getCurrentLoggedInUser();
    response.send(user);
  } catch (err) {
    errorHandler(err, response);
  }
};

export default {
  all,
  one,
  posts,
  create,
  del,
  currentLoggedIn,
};
