import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { UsersService } from '../../../../../services/users.service';
import { AuthState } from '../../../../../models/redux.state.model';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent implements OnInit {
  auth: AuthState;

  constructor(
    private authService: AuthService,
    private usersService: UsersService) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe((res): void => { this.auth = res; });
  }

  handleSignOut = (): void => {
    this.authService.signOut();
    this.usersService.cleanUsersArray();
  }
}
