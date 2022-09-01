import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "instagramPosts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photoSrc: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.posts)
  userName: User;

  @ManyToMany(() => Post)
  @JoinTable()
  likes: Post[];
}
