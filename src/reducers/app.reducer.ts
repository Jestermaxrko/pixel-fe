import { authReducer } from './auth.reducer';
import { postsReducer } from './post.reducer';
import { usersReducer } from './users.reducer';
import { AuthState, UsersState, PostState } from '../models/redux.state.model';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
  authReducer: AuthState;
  postsReducer: PostState;
  usersReducer: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer,
  postsReducer,
  usersReducer,
};
