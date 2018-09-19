import { ACTION_LOGOUT, ACTION_LOGIN, ACTION_LOADING} from '../actions/authActions';

export interface AuthReducerState {
  login: boolean;
  user: Object;
  loading: boolean;
}

const initialState: AuthReducerState = {
  login: false,
  user: null,
  loading: false
};

export function reducer(state = initialState, action): AuthReducerState {
  switch (action.type) {
    case ACTION_LOGOUT:
      return {
        ...state,
        login: false,
        user: null
      };
    case ACTION_LOGIN:
      return {
        ...state,
        login: true,
        user: action.payload,
        loading: false
      };
    case ACTION_LOADING:
      return {
        ...state,
        loading: true
      };
    default: return state;
  }
}
