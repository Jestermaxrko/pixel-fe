import { Component, Input, HostBinding } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import followingModel from '../../../models/following.model';

@Component({
  selector: 'app-unfollow-btn',
  template: `
    <mat-slide-toggle
      (click)="handleUnfollow()"
      [color]="'accent'"
      [checked]="true"
    ></mat-slide-toggle>
  `,
})
export class UnfollowBtnComponent {
  @HostBinding('class') classes = 'unfollow-btn';
  @Input() currentUser: followingModel;
  @Input() signedInUserID: string;
  @Input() loading: boolean;
  debounce = false;

  constructor(
    private usersService: UsersService) {
  }

  handleUnfollow = (): void => {
    if (this.debounce) { return; }
    this.debounce = true;
    const data = {
      current: this.signedInUserID,
      followingId: this.currentUser.followingId,
      followingInfoId: this.currentUser.followingInfoId,
    };
    this.usersService.unfollow(data);
  }
}
