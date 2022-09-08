import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity({ name: "instagramUsers" })
export class User {
  @PrimaryColumn()
  name: string;

  @Column()
  avatarSrc: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  constructor(name?: string, avaterSrc?: string, posts?: Post[]) {
    this.name = name;
    this.avatarSrc = avaterSrc;
    this.posts = posts;
  }
}
