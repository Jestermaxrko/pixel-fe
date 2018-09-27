import { Component, Input, HostBinding } from '@angular/core';
import { Post } from '../../../../../models/post.model';
import { env } from '../../../../../environments/environment';

@Component({
  selector: 'app-minimized-post',
  templateUrl: './minimized-post.component.html',
})
export class MinimizedPostComponent {
  @HostBinding('class') classes = 'mini-post';
  @Input() post: Post;
  awsImage: string = env.awsImage;
}
