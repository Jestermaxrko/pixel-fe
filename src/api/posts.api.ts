import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/environment';
import { HttpService } from '../services/http.service';

@Injectable()
export class PostsApi {
  constructor(
    private http: HttpClient,
    private httpService: HttpService) {
  }

  likePost = (postId: string, userId: string, type: string): Observable<any> => {
    return this.http.patch(`${env.host}:${env.port}/${type}-post`, { postId, userId }, { headers: this.httpService.getHeaders() });
  }

  commentPost = (postId: string, userNickname: string, userAvatar: string, comment: string): Observable<any> => {
    return this.http.patch(
      `${env.host}:${env.port}/comment-post`,
      { postId, userNickname, userAvatar, comment }, { headers: this.httpService.getHeaders() },
    );
  }

  getSinglePost = (postId: string): Observable<any> => {
    return this.http.get(`${env.host}:${env.port}/post/${postId}`, { headers: this.httpService.getHeaders() });
  }
}
