import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { env } from '../../../../../environments/environment';
import { Post } from '../../../../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})

export class PostComponent implements OnInit {
  @Input() post: Post;
  @HostBinding('class') classes = 'post';
  awsImage: string = env.awsImage;
  constructor() { }

  ngOnInit() { }
}
