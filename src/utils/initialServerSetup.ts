import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { User } from "../models/User";
import usersRouter from "../routers/usersRouter";

export const initialize = async () => {
  // await AppDataSource.getRepository(User).save(
  //   new User(
  //     "Germain",
  //     "https://static.zman.co.il/www/uploads/2021/08/F210315YS70.jpg",
  //     []
  //   )
  // );
  const users = await AppDataSource.getRepository(User).find();

  users.forEach(async (user) => {
    await AppDataSource.getRepository(Post).save(
      new Post(user.avatarSrc, new Date(), user, [])
    );
  });
};
