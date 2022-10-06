import { Post } from "./Post";

export class PostDTO {
  id: number;
  photoSrc: string;
  createdAt: Date;
  avatarSrc: string;
  userName: string;
  likesNum: number;
  isLikedByCurrentUser: boolean;

  constructor(post: Post) {
    this.id = post.id;
    this.photoSrc = post.photoSrc;
    this.createdAt = post.createdAt;
    this.avatarSrc = post.user.avatarSrc;
    this.userName = post.user.name;
    this.likesNum = post.likes.length;
    this.isLikedByCurrentUser = false;
  }
}
