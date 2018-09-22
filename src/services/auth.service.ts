import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApi } from '../api/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  SIGN_IN_SUCCESS, LOADING,
  SIGN_IN_ERROR, AUTH_LOADING, SIGN_OUT, ERR,
  SIGN_UP_SUCCESS, SIGN_UP_ERROR,
  VERIFY_SUCCESS, VERIFY_ERROR,
  CLEAR_ERRORS,
} from '../actions/auth';

@Injectable()
export class AuthService {
  constructor(
    private store: Store<any>,
    private router: Router,
    private auth: AuthApi,
  ) { }

  getAuthState = (): Observable<any> => this.store.select('authReducer');

  clearErrors = (): void => this.store.dispatch({ type: CLEAR_ERRORS });

  signUp = (email: string, nickname: string, password: string, passwordConf: string) => {
    this.store.dispatch({ type: AUTH_LOADING });
    this.auth.signUp(email, nickname, password, passwordConf).subscribe(
      (res: any): void => this.store.dispatch({ type: SIGN_UP_SUCCESS, payload: res.text }),
      (err): void => this.store.dispatch({ type: SIGN_UP_ERROR, payload: err.error.error }),
    );
  }

  verifyEmail = (hash: string) => {
    this.auth.verifyEmail(hash).subscribe(
      (res: any): void => this.store.dispatch({ type: VERIFY_SUCCESS, payload: res.user }),
      (err): void => {
        this.router.navigateByUrl('/sign-in');
        this.store.dispatch({ type: VERIFY_ERROR, payload: err.error.error });
      },
    );
  }

  signIn = (email: string, password: string): void => {
    this.store.dispatch({ type: AUTH_LOADING });
    this.auth.signIn(email, password).subscribe(
      (res: any): void => {
        this.router.navigateByUrl('/');
        window.localStorage.setItem('authToken', res.accessToken);
        this.store.dispatch({ type: SIGN_IN_SUCCESS, payload: res.user });
      },
      (err): void => this.store.dispatch({ type: SIGN_IN_ERROR, payload: err.error.error }),
    );
  }

  signOut = (): void => {
    this.auth.signOut().subscribe(
      (): void => {
        window.localStorage.removeItem('authToken');
        this.router.navigateByUrl('/sign-in');
        this.store.dispatch({ type: SIGN_OUT });
      },
      (): void => this.store.dispatch({ type: ERR }));
  }

  validateToken = () => {
    this.store.dispatch({ type: LOADING });
    this.auth.validateToken().subscribe(
      (res: any) => {
        this.router.navigateByUrl('/');
        this.store.dispatch({ type: SIGN_IN_SUCCESS, payload: res.user });
      },
      (err): void => this.store.dispatch({ type: SIGN_IN_ERROR, payload: err.error.error }),
    );
  }
}
