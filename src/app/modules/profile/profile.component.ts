import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { UsersState, AuthState } from '../../../models/redux.state.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './profile.component.html',
  selector: 'app-profile',
})
export class ProfileComponent implements OnInit {
  @Input() nickFromPost: string;
  usersState: UsersState;
  authState: AuthState;
  paramsNickname = '';
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsersState().subscribe((res: UsersState): void => {
      this.usersState = res;
      this.findCurrentUser();
    });

    this.route.params.subscribe((params: any): void => {
      this.paramsNickname = params['nickname'] || this.nickFromPost;
      this.findCurrentUser();
      const isInArr = this.usersState.users.some((item: any): boolean => item.nickname === this.paramsNickname);
      if (isInArr) { return; }
      this.usersService.getProfile(this.paramsNickname);
    });

    this.authService.getAuthState().subscribe((res: AuthState): void => { this.authState = res; });
  }

  findCurrentUser = () => {
    const currentUser = this.usersState.users.find((item: any): boolean => item.nickname === this.paramsNickname);
    if (currentUser) { this.currentUser = currentUser; }
  }
}
