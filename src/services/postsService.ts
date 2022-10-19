import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { PostDTO } from "../models/PostDTO";
import { User } from "../models/User";
import { DeleteCriteria } from "../types";
import { getUser } from "./usersService";

const createPost = async (post: Post) => {
  return await AppDataSource.getRepository(Post).save(post);
};

const likePost = async (postId: number, userName: string) => {
  const user = await getUser({ name: userName });
  const post = await getPost({ id: postId }, true);
  if (post.likes) {
    post.likes.push(user);
  } else {
    post.likes = [user];
  }
  return await AppDataSource.getRepository(Post).save(post);
};

const unLikePost = async (postId: number, userName: string) => {
  const user = await getUser({ name: userName });
  const post = await getPost({ id: postId }, true);
  post.likes = post.likes.filter((user) => user.name !== userName);
  return await AppDataSource.getRepository(Post).save(post);
};

const getAllPosts = async () => {
  return await AppDataSource.getRepository(Post).find();
};

const getAllPostCards = async () => {
  const posts = await AppDataSource.getRepository(Post).find({
    order: { createdAt: "DESC" },
    relations: {
      likes: true,
    },
  });

  const cards = await Promise.all(
    posts.map(async (post: Post) => {
      const card = new PostDTO(post);
      await card.setIsLikedByCurrentUser(post.likes);
      return card;
    })
  );

  return cards;
};

const getPost = async (
  where: FindOptionsWhere<Post> | FindOptionsWhere<Post>[],
  areLikesNeeded: boolean
) => {
  return await AppDataSource.getRepository(Post).findOne({
    where: where,
    relations: { likes: areLikesNeeded },
  });
};

const deletePost = async (criteria: DeleteCriteria<Post>) => {
  return await AppDataSource.getRepository(Post).delete(criteria);
};

export {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  getAllPostCards,
  likePost,
  unLikePost,
};
