import { AuthState } from '../models/auth-state.model';
import { Action } from '../models/action.model';

import {
  SIGN_IN_SUCCESS, LOADING,
  SIGN_IN_ERROR, AUTH_LOADING, SIGN_OUT, ERR,
  SIGN_UP_SUCCESS, SIGN_UP_ERROR,
  VERIFY_SUCCESS, VERIFY_ERROR,
  CLEAR_ERRORS,
} from '../actions/auth.action';

const initialState: AuthState = {
  isAuthorized: false,
  user: null,
  loading: false,
  err: false,
  authLoading: false,
  errMsg: '',
  confMsg: '',
};

export function authReducer(state = initialState, action: Action): AuthState {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        user: action.payload,
        loading: false,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        err: false,
        authLoading: false,
        confMsg: action.payload,
      };

    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        authLoading: false,
        err: true,
        errMsg: action.payload,
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        user: action.payload,
        errMsg: '',
        err: false,
        loading: false,
      };

    case VERIFY_ERROR:
      return {
        ...state,
        isAuthorized: false,
        errMsg: 'ERRROR',
        err: true,
        loading: false,
      };

    case AUTH_LOADING:
      return {
        ...state,
        err: false,
        errMsg: '',
        authLoading: true,

      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case ERR:
      return {
        ...state,
        err: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        err: false,
        errMsg: '',
        confMsg: '',
      };

    case 'VALIDATE_ERROR':
      return {
        ...state,
      };

    default: return state;
  }
}
