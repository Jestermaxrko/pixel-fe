import { Component, OnInit, Input } from '@angular/core';
import { env } from '../../../../../environments/environment';
import { Post } from '../../../../../models/post.model';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
})

export class PostHeaderComponent implements OnInit {
  @Input() post: Post;
  awsImage: string = env.awsImage;

  constructor() { }

  ngOnInit() { }
}
