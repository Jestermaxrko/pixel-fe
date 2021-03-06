import { Component, OnChanges, Input, ViewChild, Renderer2, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { PostsService } from '../../../../../services/posts.service';
import { ModalWindowService } from '../../../../../services/modal-window.service';
import { env } from '../../../../../environments/environment';
import { Post } from '../../../../../models/post.model';
import { User } from '../../../../../models/user.model';
import { Comment } from '../../../../../models/comment.model';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
})

export class PostFooterComponent implements OnChanges {
  @Input() post: Post;
  @ViewChild('comments') commentsDiv;
  @ViewChild('textarea') textarea;
  @HostBinding('class') classes = 'post-footer';
  awsImage: string = env.awsImage;
  user: User;
  liked: boolean;
  likedClass: string;
  commentsToDisplay: Comment[];
  displayLen: number;
  initCommentsLen = 5;
  loadMoreComments = false;
  loadAllComments = false;
  hideAllComments = false;
  newCommentText = '';
  textFieldActive = false;
  textAreaBlick = false;
  addedCommentBlick = false;
  heightSet = false;
  commentDebounce = false;
  newCommentTimer: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postsService: PostsService,
    private renderer: Renderer2,
    private modalService: ModalWindowService) {
  }

  ngOnChanges () {
    this.authService.getAuthState().subscribe((res: any): void => {
      this.user = res.user;
    });

    this.displayLen = this.initCommentsLen;
    this.liked = this.post.likes.findIndex((item: User): boolean => item._id === this.user._id) > -1;

    this.likedClass = this.liked ? ' icon--like-active' : ' icon--like-noactive';

    this.loadMoreComments = this.post.comments.length > this.displayLen;
    this.getDisplayedComments();
  }

  getDisplayedComments = (): void => {
    const filterCondition: number = this.post.comments.length - this.displayLen - 1;
    this.commentsToDisplay = this.post.comments.filter((item, i): boolean => i > filterCondition);

    if (this.commentsToDisplay.length > 5 && !this.heightSet) {
      const newHeigth: number = this.commentsDiv.nativeElement.clientHeight;
      this.renderer.setStyle(this.commentsDiv.nativeElement, 'height', `${newHeigth}px`);
      this.heightSet = true;
    }

    if (this.post.comments.length <= this.commentsToDisplay.length
      && this.commentsToDisplay.length > this.initCommentsLen) {
      this.loadMoreComments = false;
      this.hideAllComments = true;
    }
  }

  getMoreComments = (): void => {
    this.displayLen += this.initCommentsLen;
    this.displayLen = this.loadAllComments ? this.post.comments.length : this.displayLen;
    this.loadAllComments = this.displayLen >= 10;
    this.getDisplayedComments();
  }

  hideComments = (): void => {
    this.displayLen = this.initCommentsLen;
    this.loadMoreComments = true;
    this.loadAllComments = false;
    this.hideAllComments = false;
    this.getDisplayedComments();
  }

  changeLike = (): void => {
    const type: string = this.liked ? 'unlike' : 'like';
    this.liked = !this.liked;
    this.likedClass = this.liked ? ' icon--like-active' : ' icon--like-noactive';
    this.postsService.likePost(this.post._id, this.user._id, type);

    if (type === 'like') {
      this.post.likes = [...this.post.likes, this.user];
    } else {
      this.post.likes = this.post.likes.filter(item => item._id !== this.user._id);
    }
  }

  submitForm = (e: Event): void => {
    e.preventDefault();
    if (this.commentDebounce) { return; }
    if (this.newCommentText) {
      this.postsService.commentPost(this.post._id, this.user._id, this.newCommentText);

      const newCommentObj: Comment = {
        comment: this.newCommentText,
        author: this.user,
      };

      this.post.comments = [...this.post.comments, newCommentObj];
      this.newCommentText = '';
      this.addedCommentBlick = true;

      this.loadMoreComments = this.post.comments.length > this.displayLen && !this.hideAllComments;
      this.getDisplayedComments();
    }
  }

  navigateBottom = (): void => {
    this.commentsDiv.nativeElement.scrollTop = this.commentsDiv.nativeElement.scrollHeight;
    clearTimeout(this.newCommentTimer);
    this.newCommentTimer = setTimeout((): void => {
      this.addedCommentBlick = false;
    },                                1500);
  }

  activateTextArea = (): void => {
    this.textFieldActive =  true;
    this.textAreaBlick = true;
    setTimeout((): void => { this.textAreaBlick = false; }, 500);
    this.textarea.nativeElement.focus();
  }

  handleComment = (e: Event): void => {
    this.newCommentText = (<HTMLInputElement>e.target).value;
  }

  openLikesList = () => {
    if (this.post.likes.length) {
      this.modalService.openModal(
        'users-list',
        this.router.url,
        { users: this.post.likes, title: 'Likes', icon: 'favorite' },
      );
    }
  }
}
