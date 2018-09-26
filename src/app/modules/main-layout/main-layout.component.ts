import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { AuthState, UsersState } from '../../../models/redux.state.model';

@Component({
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  authState: AuthState;
  usersState: UsersState;

  constructor (
    private authService: AuthService,
    private usersService: UsersService) {
  }

  ngOnInit () {
    const accessToken = window.localStorage.getItem('authToken');

    this.usersService.getUsersState().subscribe((res: UsersState): void => { this.usersState = res; });
    this.authService.getAuthState().subscribe((res: AuthState): void => {
      this.authState = res;
      if (this.usersState.users === null && this.authState.user) {
        this.usersService.loadCurrentFollowings(this.authState.user);
      }
    });

    if (accessToken && !this.authState.isAuthorized) {
      this.authService.validateToken();
    }
  }
}
