import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthState, UsersState } from '../../../models/redux.state.model';
import { env } from '../../../environments/environment';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-feed-aside',
  templateUrl: './feed-aside.component.html',
})
export class FeedAsideComponent implements OnInit {
  authState: AuthState;
  followings: object[];
  awsImage = env.awsImage;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe(
      (res: AuthState): void => { this.authState = res; },
    );
    this.usersService.getUsersState().subscribe(
      (res: UsersState): void => {
        this.followings = res.users.filter((item: any): boolean => item.following);
      },
    );
  }
}
