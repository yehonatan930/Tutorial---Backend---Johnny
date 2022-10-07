import { FindOptionsWhere, createQueryBuilder, FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { PostDTO } from "../models/PostDTO";
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

const getUserPosts = async (options: FindOneOptions<User>) => {
  const user = await AppDataSource.getRepository(User).findOne(options);

  const cards = user.posts.map((post: Post) => new PostDTO(post));
  return cards;

  // return await AppDataSource.getRepository(User)
  //   .createQueryBuilder("user")
  //   .leftJoinAndSelect("user.posts", "post")
  //   .where("user.name = :name", { name: userName })
  //   .printSql()
  //   .getOne();
};

const deleteUser = async (criteria: DeleteCriteria<User>) => {
  return await AppDataSource.getRepository(User).delete(criteria);
};

export { createUser, getAllUsers, getUser, deleteUser, getUserPosts };
