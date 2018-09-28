import { Component, Input, OnChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ModalWindowService } from '../../../../../services/modal-window.service';
import { AuthState } from '../../../../../models/redux.state.model';
import { AuthService } from '../../../../../services/auth.service';
import { Post } from '../../../../../models/post.model';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
})
export class UserPostsComponent implements OnChanges {
  @HostListener('class') classes = 'user-posts';
  @Input() currentUser: User;
  private readonly rowLen: number = 3;
  authState: AuthState;
  ownPage: boolean;
  createdRows: Post[][] = [];

  constructor(
    private authService: AuthService,
    private modalService: ModalWindowService,
    private router: Router) {
  }

  ngOnChanges() {
    this.authService.getAuthState().subscribe((res: AuthState): void => { this.authState = res; });
    this.ownPage = this.authState.user._id === this.currentUser._id;
    this.createRows();
  }

  createRows = () => {
    const posts: Post[] = this.currentUser.posts;
    if (posts.length) {
      const rowsCount: number = Math.ceil(posts.length / this.rowLen) || 1;
      let curPost = 0;
      let rows: Post[][] = [];

      for (let i = 0; i < rowsCount; i += 1) {
        let row: Post[] = [];
        for (let j = 0; j < this.rowLen; j += 1) {
          if (curPost < posts.length) {
            row = [...row, posts[curPost]];
            curPost += 1;
          } else { break; }
        }
        rows = [...rows, row];
      }
      this.createdRows = rows;
    } else { this.createdRows = []; }
  }

  openPostViewer = (selectedPostId: string) => {
    const posts: Post[] = this.currentUser.posts;
    const selectedIndex: number = posts.findIndex(item =>  item._id === selectedPostId);
    const postLink = `/post/${posts[selectedIndex]._id}`;
    this.router.navigateByUrl(postLink);
    this.modalService.openModal('post-viewer', this.router.url, { posts, index: selectedIndex });
  }
}
