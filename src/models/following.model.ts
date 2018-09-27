import postModel from './post.model';

export interface Following {
  avatar: string;
  bio: string;
  fullName: string;
  nickname: string;
  posts: postModel[];
  socketId: string;
  status: string;
  website: string;
  _id: string;
  favorite: boolean;
  followingId: string;
  followingInfoId: string;
  following: boolean;
}

export default Following;
