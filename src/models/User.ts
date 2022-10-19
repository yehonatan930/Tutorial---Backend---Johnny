import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Post } from "./Post";

@Entity({ name: "instagramUsers" })
export class User {
  @PrimaryColumn()
  name: string;

  @Column()
  avatarSrc: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany((type) => Post, (post) => post.likes)
  likes: Post[];

  constructor(name?: string, avaterSrc?: string, posts?: Post[]) {
    this.name = name;
    this.avatarSrc = avaterSrc;
    this.posts = posts;
  }
}
