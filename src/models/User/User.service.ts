// Service - basic CRUD

import { FindOptionsWhere, ObjectID } from 'typeorm';
import { AppDataSource } from '../../utils/data-source';
import { User } from './User.entity';

type DeleteCriteria =
  | string
  | number
  | string[]
  | FindOptionsWhere<User>
  | Date
  | ObjectID
  | number[]
  | Date[]
  | ObjectID[];

async function createUser(user: User) {
  return await AppDataSource.getRepository(User).save(user);
}

async function getAllUsers() {
  return await AppDataSource.getRepository(User).find();
}

async function getSpecificUser(
  where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
) {
  return await AppDataSource.getRepository(User).findOneBy(where);
}

async function deleteUser(criteria: DeleteCriteria) {
  return await AppDataSource.getRepository(User).delete(criteria);
}

export { createUser, getAllUsers, getSpecificUser, deleteUser };
