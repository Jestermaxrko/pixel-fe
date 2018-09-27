import postModel from './post.model';
import followingModel from './following.model';

export interface RandomUser {
  avatar: string;
  bio: string;
  fullName: string;
  website: string;
  nickname: string;
  posts: postModel[];
  _id: string;
  followers: followingModel[];
}

export default RandomUser;
