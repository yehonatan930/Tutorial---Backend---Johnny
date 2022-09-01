import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { DeleteCriteria } from "../types";

const createUser = async (user: User) => {
  return await AppDataSource.getRepository(User).save(user);
};

const getAllUsers = async () => {
  return await AppDataSource.getRepository(User).find();
};

const getUser = async (
  where: FindOptionsWhere<User> | FindOptionsWhere<User>[]
) => {
  return await AppDataSource.getRepository(User).findOneBy(where);
};

const deleteUser = async (criteria: DeleteCriteria<User>) => {
  return await AppDataSource.getRepository(User).delete(criteria);
};

export { createUser, getAllUsers, getUser, deleteUser };
