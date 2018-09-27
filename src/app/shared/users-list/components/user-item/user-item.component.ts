import { Component, HostBinding, Input } from '@angular/core';
import { User } from '../../../../../models/user.model';
import { env } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
})

export class UserItemComponent {
  @HostBinding('class') classes = 'user-item';
  @Input() user: User;
  awsImage: string = env.awsImage;
}
