import { Component, Input, HostBinding } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import followingModel from '../../../models/following.model';

@Component({
  selector: 'app-unfollow-btn',
  template: `
    <button mat-raised-button (click)="handleUnfollow()">Unfollow</button>
  `,
})
export class UnfollowBtnComponent {
  @HostBinding('class') classes = 'unfollow-btn';
  @Input() currentUser: followingModel;
  @Input() signedInUserID: string;

  constructor(
    private usersService: UsersService) {
  }

  handleUnfollow = (): void => {
    const data = {
      current: this.signedInUserID,
      followingId: this.currentUser.followingId,
      followingInfoId: this.currentUser.followingInfoId,
    };

    this.usersService.unfollow(data);
  }
}
