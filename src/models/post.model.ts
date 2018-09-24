import { Comment } from './comment.model';
import { User } from './user.model';
export interface Post {
  author: User;
  comments: Comment[];
  description: string;
  geolocation: string;
  image: string;
  likes: string[];
  timestamp: number;
  type: string;
  deleted: boolean;
  _id: string;
}
