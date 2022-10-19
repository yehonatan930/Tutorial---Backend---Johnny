import { getCurrentLoggedInUser } from "../services/usersService";
import { Post } from "./Post";
import { User } from "./User";

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
    this.likesNum = post.likes ? post.likes.length : 0;
    this.isLikedByCurrentUser = false;
  }

  async setIsLikedByCurrentUser(postLikes: User[]) {
    const loggedInUser = await getCurrentLoggedInUser();

    this.isLikedByCurrentUser = postLikes
      .map((user) => user.name)
      .includes(loggedInUser.name);
  }
}
