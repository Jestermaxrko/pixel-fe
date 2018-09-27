import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import userModel from '../models/user.model';
import { UsersApi } from '../api/users.api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private store: Store<any>,
    private usersApi: UsersApi) {
  }

  getUsersState = (): Observable<any> => this.store.select('usersReducer');

  loadCurrentFollowings = (user: userModel): void => {
    this.store.dispatch({ type: 'LOAD_CURRENT_FOLLOWINGS', payload: user });
  }

  follow = (data: object): void => {
    this.usersApi.follow(data).subscribe(
      (res: any): void => this.store.dispatch({ type: 'FOLLOW_SUCCESS', payload: res.payload }),
      (err: any): void => this.store.dispatch({ type: 'USERS_ERR', payload: err }),
    );
  }

  unfollow = (data: object): void => {
    this.usersApi.unfollow(data).subscribe(
      (res: any): void => this.store.dispatch({ type: 'UNFOLLOW_SUCCESS', payload: res.payload }),
      (err: any): void => this.store.dispatch({ type: 'USERS_ERR', payload: err }),
    );
  }

  cleanUsersArray = (): void => {
    this.store.dispatch({ type: 'CLEAN_USERS_ARRAY' });
  }

  getProfile = (nickname) => {
    this.store.dispatch({ type: 'USERS_LOADING' });
    this.usersApi.getProfile(nickname).subscribe(
      (res: any): void => this.store.dispatch({ type: 'GET_PROFILE_SUCCESS', payload: res.payload }),
      (err: any): void => this.store.dispatch({ type: 'USERS_ERR', payload: err }),
    );
  }
}
