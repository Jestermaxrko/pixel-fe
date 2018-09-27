import { User } from './user.model';

export interface Comment {
  comment: string;
  author: User;
}

export default Comment;
