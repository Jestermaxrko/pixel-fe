import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../../services/posts.service';
import { PostState } from '../../../../../models/posts-state.model';
import { Post } from '../../../../../models/post.model';

@Component({
  selector: 'app-feedline',
  templateUrl: './feedline.component.html',
})

export class FeedlineComponent implements OnInit {
  postsState: PostState;
  feedLinePosts: Post[];
  constructor( private postsService: PostsService) { }


  ngOnInit() {
    this.postsService.getPostsState().subscribe((res): any => {
      this.feedLinePosts = res.currentSessionPosts.filter((item: Post): boolean => item.type === 'feed');
    });
  }
}
