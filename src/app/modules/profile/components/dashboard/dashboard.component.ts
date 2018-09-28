import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { AuthState, UsersState } from '../../../../../models/redux.state.model';
import followingModel from '../../../../../models/following.model';
import { User } from '../../../../../models/user.model';
import { UsersService } from '../../../../../services/users.service';
import { env } from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') classes = 'profile-dashboard';
  @Input() currentUser: User;
  @Input() signedInUser: User;
  paramsNickname = '';
  pageOwner: string;
  authState: AuthState;
  usersState: UsersState;
  awsImage: string = env.awsImage;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe((res: AuthState): void => { this.authState = res; });
    this.usersService.getUsersState().subscribe((res: UsersState): void => {
      this.usersState = res;
      if (this.usersState.users) {
        this.checkOwner(this.paramsNickname);
      }
    });

    this.route.params.subscribe((params: any): void => {
      this.paramsNickname = params['nickname'];
      this.checkOwner(this.paramsNickname);
    });
  }

  checkOwner = (paramsNickname: string): void => {
    if (paramsNickname === this.authState.user.nickname) {
      this.pageOwner = 'signed in user';
      return;
    }

    const isFollowing: boolean = this.usersState.users.some((user: followingModel): boolean => {
      return user.nickname === paramsNickname && user.following;
    });
    if (isFollowing) {
      this.pageOwner = 'following';
      return;
    }

    this.pageOwner = 'random';
  }
}
