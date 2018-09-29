import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-followings-list',
  templateUrl: './followings-list.component.html',
})
export class FollowingsListComponent {
  @HostBinding('class') classes = 'followings-list';
  @Input() users: object[];
  @Input() awsImage: string;
}
