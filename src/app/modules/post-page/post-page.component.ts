import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { PostState } from '../../../models/redux.state.model';
import { Post } from '../../../models/post.model';
import { env } from '../../../environments/environment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  host: {
    '(window:resize)': 'onLoad()',
  },
})
export class PostPageComponent implements OnInit {
  @HostBinding('class') classes = 'post-page';
  postId: string;
  postsState: PostState;
  post: Post;
  awsImage: string = env.awsImage;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any): void => { this.postId = params['id']; });

    this.postsService.getPostsState().subscribe((res) => {
      this.postsState = res;
      this.post = this.postsState.currentSessionPosts.find(item => item._id === this.postId);
    });

    if (!this.post) { this.postsService.getSinglePost(this.postId); }
  }
}
