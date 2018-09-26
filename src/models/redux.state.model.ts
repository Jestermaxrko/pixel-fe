import userModel from './user.model';
import postModel from './post.model';

export interface Action {
  type: string;
  payload: any;
}

export interface AuthState {
  isAuthorized: boolean;
  user: userModel;
  loading: boolean;
  err: boolean;
  authLoading: boolean;
  errMsg: string;
  confMsg: string;
}

export interface UsersState {
  error: boolean;
  errorMessage: string;
  users: object[];
  loading: boolean;
}

export interface PostState {
  error: boolean;
  errorMessage: string;
  successMessage: string;
  currentSessionPosts: postModel[];
  wasLoadedFirstTime: boolean;
  isLoading: boolean;
}
