import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ModalWindowService } from '../../../../../services/modal-window.service';
import { Post } from '../../../../../models/post.model';
import { Router } from '@angular/router';

interface Payload {
  index: number;
  posts: Post[];
}

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
})

export class PostViewerComponent implements OnInit {
  @Input() payload: Payload;
  @HostBinding('class') classes = 'post-viewer';
  posts: Post[];
  curIndex =  0;
  leftButton: boolean;
  rightButton: boolean;

  constructor(
    private modalService: ModalWindowService,
    private router: Router) {
  }

  ngOnInit() {
    this.payload.posts = this.payload.posts.sort((a, b) => b.timestamp - a.timestamp);
    this.curIndex = this.payload.index;
    this.leftButton = this.curIndex > 0;
    this.rightButton = !(this.curIndex > this.payload.posts.length - 2);

  }

  handleClose = (): void => {
    this.modalService.closeModal();
  }

  changePost = (value: number): void => {
    const newIndex: number = this.curIndex + value;
    if (newIndex < 0 || newIndex > this.payload.posts.length - 1) { return ; }

    this.curIndex =  newIndex < 0 || newIndex > this.payload.posts.length - 1 ? this.curIndex : newIndex ;

    this.leftButton = this.curIndex > 0;
    this.rightButton = !(this.curIndex > this.payload.posts.length - 2);

    const link: string = this.payload.posts[this.curIndex]._id;
    const modalHolder = `/profile/${this.payload.posts[this.curIndex].author.nickname}`;

    this.router.navigateByUrl(`/post/${link}`);
    this.modalService.openModal(
      'post-viewer',
      modalHolder,
      { posts: this.payload.posts, index: this.curIndex },
    );
  }
}
