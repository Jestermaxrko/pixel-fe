import { reducer } from './auth-reducer';
import { Auth } from '../models/auth';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
  authReducer: Auth;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer: reducer,
};
