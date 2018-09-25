import { Component, Input, HostBinding } from '@angular/core';
import { env } from '../../../../../environments/environment';
import { Post } from '../../../../../models/post.model';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
})

export class PostHeaderComponent {
  @Input() post: Post;
  @HostBinding('class') classes = 'post-header';
  awsImage: string = env.awsImage;
}
