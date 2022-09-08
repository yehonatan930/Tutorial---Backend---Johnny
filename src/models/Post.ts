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
  user: User;

  @ManyToMany(() => Post)
  @JoinTable()
  likes: Post[];

  constructor(
    photoSrc?: string,
    createdAt?: Date,
    user?: User,
    likes?: Post[]
  ) {
    this.photoSrc = photoSrc;
    this.createdAt = createdAt;
    this.user = user;
    this.likes = likes;
  }
}
