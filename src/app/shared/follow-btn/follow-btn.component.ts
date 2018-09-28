import { Component, Input, HostBinding } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-follow-btn',
  template: `
    <mat-slide-toggle
      (click)="handleFollow()"
      [checked]="false"
    ></mat-slide-toggle>
  `,
})
export class FollowBtnComponent {
  @HostBinding('class') classes = 'follow-btn';
  @Input() currentUserID: string;
  @Input() signedInUserID: string;
  debounce = false;

  constructor(
    private usersService: UsersService) {
  }

  handleFollow = (): void => {
    if (this.debounce) { return; }
    this.debounce = true;
    const data = {
      current: this.signedInUserID,
      following: this.currentUserID,
    };
    this.usersService.follow(data);
  }
}
