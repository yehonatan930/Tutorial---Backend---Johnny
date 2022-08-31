// Controller - deals with requests and responses

import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSpecificUser,
} from './User.service';
import { getAllLegalAge } from './User.useCase';

const ERR_MSG = 'An error has occured.';

async function all(request: Request, response: Response, next: NextFunction) {
  try {
    const users = await getAllUsers();
    response.send(users);
  } catch (err) {
    errorHandler(err, response);
  }
}

async function one(request: Request, response: Response, next: NextFunction) {
  try {
    response.send(await getSpecificUser({ id: request.params.id }));
  } catch (err) {
    errorHandler(err, response);
  }
}

async function save(request: Request, response: Response, next: NextFunction) {
  try {
    response.send(await createUser(request.body));
  } catch (err) {
    errorHandler(err, response);
  }
}

async function del(request: Request, response: Response, next: NextFunction) {
  try {
    response.send(await deleteUser(request.params.id));
  } catch (err) {
    errorHandler(err, response);
  }
}

async function legal(request: Request, response: Response, next: NextFunction) {
  try {
    response.send(await getAllLegalAge());
  } catch (err) {
    errorHandler(err, response);
  }
}

function errorHandler(err: Error, response: Response) {
  response.send(ERR_MSG);
}

export default {
  all,
  one,
  save,
  del,
  legal,
};
