import postModel from './post.model';

export interface User {
  _id: string;
  nickname: string;
  avatar: string;
  email: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  isAdmin: boolean;
  status: string;
  fullName: string;
  website: string;
  bio: string;
  socketId: string;
  isActive: boolean;
  disabled: boolean;
  password: string;
  googleID: string;
  facebookID: string;
  posts: postModel[];
  followingsInfo: Object[];
  followings: Object[];
  followers: Object[];
}

export default User;
