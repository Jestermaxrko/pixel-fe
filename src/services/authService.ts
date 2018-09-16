import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthApi } from '../api/authApi';
import {Router} from '@angular/router';
import {Store } from '@ngrx/store';
import { Action } from '../../node_modules/rxjs/internal/scheduler/Action';

@Injectable()
export class AuthService {
  constructor(
    private store: Store<any>,
    private http: HttpClient,
    private router: Router,
    private auth: AuthApi) {
  }

  getAuthState = (): Observable<any> => {
    return this.store.select('authReducer');
  }

  loginUser = (email: string, password: string ): void => {
    this.store.dispatch({ type: 'LOADING' });
      this.auth.authUser(email, password).subscribe((res: any) => {
        if (res) {
          this.router.navigateByUrl('/');
          window.localStorage.setItem('authToken', res.accessToken);
          this.store.dispatch({ type: 'LOGIN', payload: res.user });
        } else { this.store.dispatch({ type: 'LOGOUT' }); }
    });
  }

  validateToken = () => {
    this.store.dispatch({ type: 'LOADING' });
    this.auth.validateToken().subscribe( (res: any) => {
      if (res)  {
        this.router.navigateByUrl('/');
        this.store.dispatch({ type: 'LOGIN', payload: res.user });
      }
    });
  }
}
