import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { User } from "../models/User";

const littleGirlSrc =
  "https://i.pinimg.com/564x/b6/c0/62/b6c0621d822e3e0213a8681e7b3e9474.jpg";

export const initialize = async () => {
  const user = await AppDataSource.getRepository(User).save(
    new User("Jouchan", littleGirlSrc, [])
  );
  const post = await AppDataSource.getRepository(Post).save(
    new Post(littleGirlSrc, new Date(), user, [])
  );
};
