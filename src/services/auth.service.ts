import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApi } from '../api/auth.api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  constructor(
    private store: Store<any>,
    private router: Router,
    private auth: AuthApi) {
  }

  getAuthState = (): Observable<any> => this.store.select('authReducer');

  clearErrors = (): void => this.store.dispatch({ type: 'CLEAR_ERRORS' });

  signUp = (email: string, nickname: string, password: string, passwordConf: string) => {
    this.store.dispatch({ type: 'AUTH_LOADING' });
    this.auth.signUp(email, nickname, password, passwordConf).subscribe(
      (res: any): void => this.store.dispatch({ type: 'SIGN_UP_SUCCESS', payload: res.text }),
      (err: any): void => {
        if (err.status) {
          this.store.dispatch({ type: 'SIGN_UP_ERROR', payload: err.error.error });
        } else {
          this.store.dispatch({ type: 'SIGN_UP_ERROR', payload: 'Server is not available' });
        }
      },
    );
  }

  verifyEmail = (hash: string) => {
    this.auth.verifyEmail(hash).subscribe(
      (res: any): void => this.store.dispatch({ type: 'VERIFY_SUCCESS', payload: res.user }),
      (err: any): void => {
        this.router.navigateByUrl('/auth/sign-in');
        this.store.dispatch({ type: 'VERIFY_ERROR', payload: err.error.error });
      },
    );
  }

  signIn = (email: string, password: string): void => {
    this.store.dispatch({ type: 'AUTH_LOADING' });
    this.auth.signIn(email, password).subscribe(
      (res: any): void => {
        this.router.navigate(['/']);
        window.localStorage.setItem('authToken', res.accessToken);
        this.store.dispatch({ type: 'SIGN_IN_SUCCESS', payload: res.user });
        this.store.dispatch({ type: 'CREATE_SESSION_POSTS', payload: res.user });
      },
      (err: any): void => {
        if (err.status) {
          this.store.dispatch({ type: 'SIGN_IN_ERROR', payload: err.error.error });
        } else {
          this.store.dispatch({ type: 'SIGN_IN_ERROR', payload: 'Server is not available' });
        }
      },
    );
  }

  signOut = (): void => {
    this.auth.signOut().subscribe(
      (): void => {
        window.localStorage.removeItem('authToken');
        this.router.navigateByUrl('/auth/sign-in');
        this.store.dispatch({ type: 'SIGN_OUT' });
      },
      (): void => this.store.dispatch({ type: 'ERR' }),
    );
  }

  validateToken = () => {
    this.store.dispatch({ type: 'LOADING' });
    this.auth.validateToken().subscribe(
      (res: any) => {
        this.store.dispatch({ type: 'SIGN_IN_SUCCESS', payload: res.user });
        this.store.dispatch({ type: 'CREATE_SESSION_POSTS', payload: res.user });
      },
      (err): void => {
        window.localStorage.removeItem('authToken');
        this.router.navigateByUrl('/auth/sign-in');
        this.store.dispatch({ type: 'SIGN_IN_ERROR', payload: 'session timeout' });
      },
    );
  }

  isSignedIn = () => {
    return localStorage.getItem('authToken') !== null;
  }
}
