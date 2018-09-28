import { Component, OnInit, HostBinding, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { PostState } from '../../../models/redux.state.model';
import { ModalState } from '../../../models/modal-window.state.model';
import { ModalWindowService } from '../../../services/modal-window.service';
import { Post } from '../../../models/post.model';
import { env } from '../../../environments/environment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
})
export class PostPageComponent implements OnInit {
  @HostBinding('class') classes = 'post-page';
  postId: string;
  postsState: PostState;
  post: Post;
  modalState: ModalState;
  awsImage: string = env.awsImage;
  showPostPage: boolean;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private modalService: ModalWindowService,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any): void => { this.postId = params['id']; });

    this.postsService.getPostsState().subscribe((res) => {
      this.postsState = res;
      this.post = this.postsState.currentSessionPosts.find(item => item._id === this.postId);
    });

    this.modalService.getModalState().subscribe((res) => {
      this.modalState = res;
      this.showPostPage = !this.modalState.modalHolder.includes('/profile/');
    });

    if (!this.post) { this.postsService.getSinglePost(this.postId); }
  }

}
