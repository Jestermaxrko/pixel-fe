import { authReducer } from './auth-reducer';
import { postsReducer } from './post-reducer';
import { Auth } from '../models/auth.model';
import { PostState } from '../models/posts-state.model';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
  authReducer: Auth;
  postsReducer: PostState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer,
  postsReducer,
};
