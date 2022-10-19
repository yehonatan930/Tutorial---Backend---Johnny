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

const getCurrentLoggedInUser = async () => {
  return await getUser({ name: "Jouchan" });
};

const getUserPosts = async (userName: string) => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: { name: userName },
    relations: { posts: true },
  });

  const cards = user.posts
    .sort((a: Post, b: Post) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
    .map((post: Post) => {
      const card = new PostDTO(post);
      card.setIsLikedByCurrentUser(post.likes);
      return card;
    });

  return cards;

  // const user = await AppDataSource.getRepository(User)
  //   .createQueryBuilder("user")
  //   .leftJoinAndSelect("user.posts", "post")
  //   .where("user.name = :name", { name: userName })
  //   .orderBy({ "post.createdAt": "DESC" }) // new to old
  //   .getOne();

  // const cards = user.posts.map((post: Post) => new PostDTO(post));

  // return cards;
};

const deleteUser = async (criteria: DeleteCriteria<User>) => {
  return await AppDataSource.getRepository(User).delete(criteria);
};

export {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  getUserPosts,
  getCurrentLoggedInUser,
};
