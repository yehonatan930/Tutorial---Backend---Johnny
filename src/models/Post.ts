import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
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

  @ManyToOne((type) => User, (user) => user.posts, { eager: true })
  user: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  likes: User[];

  constructor(
    photoSrc?: string,
    createdAt?: Date,
    user?: User,
    likes?: User[]
  ) {
    this.photoSrc = photoSrc;
    this.createdAt = createdAt;
    this.user = user;
    this.likes = likes;
  }
}
