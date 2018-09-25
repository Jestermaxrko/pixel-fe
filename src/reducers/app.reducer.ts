import { authReducer } from './auth.reducer';
import { postsReducer } from './post.reducer';
import { AuthState } from '../models/auth-state.model';
import { PostState } from '../models/posts-state.model';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
  authReducer: AuthState;
  postsReducer: PostState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer,
  postsReducer,
};
