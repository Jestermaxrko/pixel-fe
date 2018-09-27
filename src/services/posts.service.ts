import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
    private postsApi: PostsApi) {
  }

  getPostsState = (): Observable<any> => this.store.select('postsReducer');

  likePost = (postId: string, userId: string, type: string): void => {
    this.postsApi.likePost(postId, userId, type).subscribe(
      (res: any): void => this.store.dispatch({ type: 'LIKES_CHANGED_SUCCESS', payload: res.newLikes }),
      (err: any): void => this.store.dispatch({ type: 'LIKES_CHANGED_ERROR', payload: err }),
    );
  }

  commentPost = (postId: string, userId: string, comment: string): void => {
    this.postsApi.commentPost(postId, userId, comment).subscribe(
      (res: any): void => this.store. dispatch({ type: 'COMMENT_ADDED_SUCCESS', payload: res.newComments }),
      (err: any): void => this.store.dispatch({ type: 'COMMENT_ADDED_ERROR', payload: err }),
    );
  }

  getSinglePost = (postId: string) => {
    this.postsApi.getSinglePost(postId).subscribe(
      (res: any): void => this.store.dispatch({ type: 'ADD_POST_TO_SESSION', payload: [res.post] }),
      (err: any): void => this.store.dispatch({ type: 'POST_ADD_ERROR', payload: err }),
    );
  }
}
