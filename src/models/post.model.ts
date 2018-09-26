import commentModel from './comment.model';
import userModel from './user.model';

export interface Post {
  author: userModel;
  comments: commentModel[];
  description: string;
  geolocation: string;
  image: string;
  likes: userModel[];
  timestamp: number;
  type: string;
  deleted: boolean;
  _id: string;
}

export default Post;
