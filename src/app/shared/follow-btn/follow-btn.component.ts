import { Component, Input, HostBinding } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-follow-btn',
  template: `
    <button mat-raised-button (click)="handleFollow()">Follow</button>
  `,
})
export class FollowBtnComponent {
  @HostBinding('class') classes = 'follow-btn';
  @Input() currentUserID: string;
  @Input() signedInUserID: string;

  constructor(
    private usersService: UsersService) {
  }

  handleFollow = (): void => {
    const data = {
      current: this.signedInUserID,
      following: this.currentUserID,
    };

    this.usersService.follow(data);
  }
}
