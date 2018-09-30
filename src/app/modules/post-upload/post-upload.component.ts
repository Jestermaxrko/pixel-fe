import { Component, OnInit, OnDestroy, HostBinding, ViewChild, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { PostState, AuthState } from '../../../models/redux.state.model';

interface Size {
  width: number;
  height: number;
}

@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
})

export class PostUploadComponent implements OnInit {
  @HostBinding('class') classes = 'post-upload';
  @ViewChild('canvas') canvas;
  @ViewChild('postInfo') postInfo;
  @ViewChild('dropArea') dropArea;
  @ViewChild('dropAreaBox') dropAreaBox;
  @ViewChild('changeInput') changeInput;
  MAX_WIDTH = 600;
  MAX_HEIGHT = 500;
  authState: AuthState;
  postsState: PostState;
  location: string;
  description: string;
  hideUpload = false;
  loading = false;
  photoDataUrl: string = null;
  postSavingStarted = false;

  constructor(
    private postService: PostsService,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(res => this.authState = res);
    this.postService.getPostsState().subscribe(res => this.postsState = res);
  }

  changePhoto = (): void => {
    this.changeInput.nativeElement.click();
  }

  changeFileHandler = (e: Event): void => {
    if ((<HTMLInputElement>e.target).files[0]) {
      this.loading = true;
      this.hideUpload = true;
      this.getDataURL((<HTMLInputElement>e.target).files[0]);
    }
  }

  dropHandler = (e: any): void => {
    e.preventDefault();
    const imageType = /image.*/;

    if (e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type.match(imageType)) {
        this.loading = true;
        this.hideUpload = true;
        this.getDataURL(e.dataTransfer.files[0]);
      }
    }
  }

  dragOverHandler = (e: Event): void => {
    e.preventDefault();
  }

  startDrag = (): void => {
    this.renderer.addClass(this.dropArea.nativeElement, 'drop-area--drop');
    this.renderer.addClass(this.dropAreaBox.nativeElement, 'drop-area-box--drop');
  }

  endDrag = (): void => {
    this.renderer.removeClass(this.dropArea.nativeElement, 'drop-area--drop');
    this.renderer.removeClass(this.dropAreaBox.nativeElement, 'drop-area-box--drop');
  }

  getDataURL = (file: File) => {
    const reader = new FileReader();
    const fileSize = `${(file.size / 1000000).toFixed(2)} MB`;
    reader.onload =  (e: any) =>  {
      this.photoDataUrl = e.target.result;
      this.uploadToCanvas(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  uploadToCanvas = (src: string): void => {
    const image = new Image();

    image.onload =  () => {
      const ctx: any = this.canvas.nativeElement.getContext('2d');
      const size: Size = this.resizeImage(image.width, image.height);

      if (window.innerWidth < 900) {
        this.renderer.setStyle(this.postInfo.nativeElement, 'width', `${size.width}px`);
      }

      this.canvas.nativeElement.width =  size.width;
      this.canvas.nativeElement.height = size.height;
      ctx.drawImage(image, 0, 0, size.width,  size.height);
      this.loading = false;
    };
    image.src = src;
  }

  resizeImage = (width: number, height: number): Size => {
    this.MAX_WIDTH = window.innerWidth < 600 ?  0.90 * window.innerWidth : 600;
    this.MAX_HEIGHT = window.innerWidth < 600 ?  0.5 * window.innerHeight : 500;
    let newWidth: number = width;
    let newHeight: number = height;

    if (width > height) {
      if (width > this.MAX_WIDTH) {
        newHeight *= this.MAX_WIDTH / width;
        newWidth = this.MAX_WIDTH;
      }
    } else {
      if (height > this.MAX_HEIGHT) {
        newWidth *= this.MAX_HEIGHT / height;
        newHeight = this.MAX_HEIGHT;
      }
    }

    return { width: newWidth, height: newHeight };
  }

  @HostListener('window:resize', ['$event']) onResize = (e): void => {
    if (this.hideUpload) {
      this.uploadToCanvas(this.photoDataUrl);
      if (e.target.innerWidth < 900) {
        const width = this.canvas.nativeElement.width;
        this.renderer.setStyle(this.postInfo.nativeElement, 'width', `${width}px`);
      } else {
        this.renderer.setStyle(this.postInfo.nativeElement, 'width', '25%');
      }
    }
  }

  closeCurrentPost = (): void => {
    this.hideUpload = false;
    this.loading = false;
    this.photoDataUrl = null;
  }

  savePost = (): void => {
    this.postSavingStarted = true;
    this.postService.uploadPost(this.photoDataUrl, this.description, this.location, this.authState.user._id);
  }

  redirectToOwnPage = (): void => {
    this.router.navigateByUrl(`/profile/${this.authState.user.nickname}`);
  }

  reciveLocation = (location: string): void => {
    this.location = location;
  }

  preventEnter = (e: Event): void => {
    e.preventDefault();
  }

  handleDescription = (e: Event): void => {
    this.description = (<HTMLInputElement>e.target).value;
  }
}
