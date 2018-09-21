import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApi } from '../api/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  constructor(
    private store: Store<any>,
    private router: Router,
    private auth: AuthApi,
  ) { }

  getAuthState = (): Observable<any> => this.store.select('authReducer');

  signIn = (email: string, password: string): void => {
    this.store.dispatch({ type: 'LOADING' });
    this.auth.signIn(email, password).subscribe((res: any) => {
      if (res) {
        this.router.navigateByUrl('/');
        window.localStorage.setItem('authToken', res.accessToken);
        this.store.dispatch({ type: 'LOGIN', payload: res.user });
      } else { this.store.dispatch({ type: 'SIGN_OUT' }); }
    });
  }

  signOut = (): void => {
    this.auth.signOut().subscribe((): void => {
      window.localStorage.removeItem('authToken');
      this.router.navigateByUrl('/sign-in');
      this.store.dispatch({ type: 'SIGN_OUT' });
    },                            (): void => this.store.dispatch({ type: 'ERR' }));
  }

  validateToken = () => {
    this.store.dispatch({ type: 'LOADING' });
    this.auth.validateToken().subscribe((res: any) => {
      if (res)  {
        this.router.navigateByUrl('/');
        this.store.dispatch({ type: 'LOGIN', payload: res.user });
      }
    });
  }
}
