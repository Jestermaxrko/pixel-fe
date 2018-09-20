import { SIGN_OUT, ACTION_LOGIN, ACTION_LOADING, ERR } from '../actions/auth';

export interface AuthReducerState {
  login: boolean;
  user: Object;
  loading: boolean;
  err: boolean;
}

const initialState: AuthReducerState = {
  login: false,
  user: null,
  loading: false,
  err: false,
};

export function reducer(state = initialState, action): AuthReducerState {
  switch (action.type) {
    case SIGN_OUT:
      return {
        ...state,
        login: false,
        user: null,
      };
    case ACTION_LOGIN:
      return {
        ...state,
        login: true,
        user: action.payload,
        loading: false,
      };
    case ACTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERR:
      return {
        ...state,
        err: true,
      };
    default: return state;
  }
}
