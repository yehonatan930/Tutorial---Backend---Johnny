import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./models/Post";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
  type: process.env.SOURCE_TYPE as "postgres",
  host: process.env.SOURCE_HOST,
  port: Number.parseInt(process.env.SOURCE_PORT),
  username: process.env.SOURCE_USER,
  password: process.env.SOURCE_PASSWORD,
  database: process.env.SOURCE_DATABASE,
  schema: process.env.SOURCE_SCHEMA,
  synchronize: true,
  logging: false,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
});
