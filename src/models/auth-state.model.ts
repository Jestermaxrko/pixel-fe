export interface AuthState {
  isAuthorized: boolean;
  user: Object;
  loading: boolean;
  err: boolean;
  authLoading: boolean;
  errMsg: string;
  confMsg: string;
}
