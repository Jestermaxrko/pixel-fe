import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../../../models/post.model';
import { env } from '../../../../../environments/environment';

@Component({
  selector: 'app-minimized-post',
  templateUrl: './minimized-post.component.html',
})

export class MinimizedPostComponent {
  @HostBinding('class') classes = 'mini-post';
  @Input() post: Post;
  @Output() postViewerOpen = new EventEmitter();
  awsImage: string = env.awsImage;

  handeOpenPostViewer = () => {
    this.postViewerOpen.emit(this.post._id);
  }
}
