import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../../../../services/posts.service';
import { PostState } from '../../../../../models/redux.state.model';
import { Post } from '../../../../../models/post.model';

@Component({
  selector: 'app-feedline',
  templateUrl: './feedline.component.html',
})

export class FeedlineComponent implements OnInit {
  @ViewChild('scroll') scroll;
  postsState: PostState;
  allFeedLinePosts: Post[];
  feedLinePosts: Post[];
  initPostsLen = 5;
  curPostsLen: number;
  upstairShow = false;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPostsState().subscribe((res): any => {
      this.curPostsLen = this.initPostsLen;
      this.allFeedLinePosts = res.currentSessionPosts.filter((item: Post): boolean => item.type === 'feed');
      this.feedLinePosts = this.allFeedLinePosts.filter((item: Post, i: number): boolean =>  i < this.curPostsLen);
    });
  }

  loadMoreComments = (e): void => {
    if (e.end === this.feedLinePosts.length - 1) {
      this.curPostsLen += this.initPostsLen;
      this.feedLinePosts = this.allFeedLinePosts.filter((item, i) =>  i < this.curPostsLen);
    }
  }

  checkUpstairButton = (e): void => {
    if (e.start > 0) { this.upstairShow = true; } else { this.upstairShow = false; }
  }

  navigateTop = (): void => {
    this.scroll.scrollToIndex(0, true, 0, 2000);
  }
}
