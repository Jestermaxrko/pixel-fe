import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostsApi } from '../api/posts.api';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})

export class PostsService {
  posts: Post[];
  constructor(
    private store: Store<any>,
    private postsApi: PostsApi,
  ) { }

  getPostsState = (): Observable<any> => this.store.select('postsReducer');

  likePost = (postId: string, userId: string, type: string): void => {
    this.postsApi.likePost(postId, userId, type).subscribe(
      (res: any): void => this.store.dispatch({ type: 'LIKES_CHANGED_SUCCESS', payload: res.newLikes }),
      (err: any): void => this.store.dispatch({ type: 'LIKES_CHANGED_ERROR', payload: err }),
    );
  }

  commentPost = (postId: string, userNickname: string, userAvatar: string, comment: string): void => {
    this.postsApi.commentPost(postId, userNickname, userAvatar, comment).subscribe(
      (res: any): void => this.store. dispatch({ type: 'COMMENT_ADDED_SUCCESS', payload: res.newComments }),
      (err: any): void => this.store.dispatch({ type: 'LCOMMENT_ADDED_ERROR', payload: err }),
    );
  }
}
