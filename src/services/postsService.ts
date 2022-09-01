import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { DeleteCriteria } from "../types";

const createPost = async (post: Post) => {
  return await AppDataSource.getRepository(Post).save(post);
};

const getAllPosts = async () => {
  return await AppDataSource.getRepository(Post).find();
};

const getPost = async (
  where: FindOptionsWhere<Post> | FindOptionsWhere<Post>[]
) => {
  return await AppDataSource.getRepository(Post).findOneBy(where);
};

const deletePost = async (criteria: DeleteCriteria<Post>) => {
  return await AppDataSource.getRepository(Post).delete(criteria);
};

export { createPost, getAllPosts, getPost, deletePost };
