import { reducer, AuthReducerState } from './authReducer';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
  authReducer: AuthReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer: reducer,
};
