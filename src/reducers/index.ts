import { reducer, authReducerState } from './authReducer';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
  authReducer: authReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer: reducer
};
