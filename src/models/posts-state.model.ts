import { Post } from './post.model';

export interface PostState {
  error: boolean;
  errorMessage: string;
  successMessage: string;
  currentSessionPosts: Post[];
  wasLoadedFirstTime: boolean;
  isLoading: boolean;
}
